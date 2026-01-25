package com.smartparttime.parttimebackend.modules.Job.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartparttime.parttimebackend.common.Services.EmailService;
import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.repo.JobApplicationRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceRepository;
import com.smartparttime.parttimebackend.common.Services.EmbeddingService;
import com.smartparttime.parttimebackend.modules.Employer.EmployerRepository;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.Specifications.JobSpec;
import com.smartparttime.parttimebackend.modules.Job.dto.*;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobCategory;
import com.smartparttime.parttimebackend.modules.Job.entity.JobSchedule;
import com.smartparttime.parttimebackend.modules.Job.mappers.JobCategoryMapper;
import com.smartparttime.parttimebackend.modules.Job.mappers.JobMapper;
import com.smartparttime.parttimebackend.modules.Job.repo.JobCategoryRepo;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.Job.service.JobService;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeeker;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeekerRepository;
import com.smartparttime.parttimebackend.modules.Notification.service.NotificationService;
import com.smartparttime.parttimebackend.modules.Recommendation.Services.JobEmbeddingCache;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class JobServiceImpl implements JobService {

    private final EmbeddingService  embeddingService;
    @Autowired
    private final JobRepo jobRepo;

    @Autowired
    private final JobCategoryRepo categoryRepo;

    @Autowired
    private final EmployerRepository employerRepository;
    @Autowired
    private final JobMapper jobMapper;
    @Autowired
    private  final JobApplicationRepository jobApplicationRepository;
    private final JobSeekerRepository jobSeekerRepository;
    private final NotificationService notificationService;
    @Autowired
    private final JobCategoryMapper jobCategoryMapper;
    @Autowired
    private final AttendanceRepository attendanceRepository;
    private final JobEmbeddingCache jobEmbeddingCache;
    private final EmailService emailService;


    @Transactional
    @Override
    public JobResponseDto createJob(JobRequestDto request, UUID employerId) {
        var employer = employerRepository.findById(employerId).orElseThrow();
        var job = jobMapper.toEntity(request);

        var category = categoryRepo.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        job.setCategory(category);
        job.setEmployer(employer);
        job.setPostedDate(LocalDateTime.now());
        job.setStatus(JobStatus.ACTIVE);
        job.setIsUrgent(request.getIsUrgent() != null ? request.getIsUrgent() : false);

        Set<JobSchedule> schedules = request.getSchedules().stream()
                .map(dto -> {
                    JobSchedule schedule = new JobSchedule();
                    schedule.setStartDatetime(dto.getStartDatetime());
                    schedule.setEndDatetime(dto.getEndDatetime());
                    long hours = java.time.Duration.between(dto.getStartDatetime(), dto.getEndDatetime()).toHours();
                    schedule.setWorkingHours((int) hours);
                    schedule.setJob(job);
                    schedule.setRequiredWorkers(dto.getRequiredWorkers());
                    return schedule;
                }).collect(Collectors.toSet());

        job.setJobSchedules(schedules);

        Long totalRequiredWorkers = schedules.stream()
                .mapToLong(JobSchedule::getRequiredWorkers)
                .sum();

        job.setTotalVacancies(totalRequiredWorkers);

        job.setAvailableVacancies(totalRequiredWorkers);


        try{
            saveJobEmbedding(job, job.getJobSchedules());
        }catch (Exception e){
            throw new BadRequestException(e.getMessage());
        }

        var savedJob = jobRepo.save(job);
        jobEmbeddingCache.addOrUpdate(savedJob);


        return jobMapper.toDto(savedJob);
    }


    @Override
    public List<JobResponseDto> getAllJobs() {
        return jobRepo.findAll()
                .stream()
                .map(jobMapper::toDto)
                .collect(Collectors.toList());
    }


    @Override
    public JobResponseDto getJobById(UUID jobId) {
        var job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return jobMapper.toDto(job);
    }


    @Override
    public List<JobResponseDto> getJobsByEmployer(UUID employerId,int page,int size) {
        Pageable pageable = PageRequest.of(page, size);
        return jobRepo.findByEmployer_Id(employerId,pageable)
                .stream()
                .map(jobMapper::toDto)
                .collect(Collectors.toList());
    }


    @Override
    public JobListingResponse filterJobsBySpecification(String location, String jobType, String query,  String category, LocalDate date, BigDecimal minSalary, BigDecimal maxSalary, String requiredGender, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Job> spec = Specification.allOf();

        if (location != null && !location.isBlank()) {
            spec = spec.and(JobSpec.hasLocation(location));
        }
        if (jobType != null && !jobType.isBlank()) {
            spec = spec.and(JobSpec.hasJobType(jobType));
        }
        if (query != null) {
            spec = spec.and(JobSpec.hasTitleRequirementsDescription(query));
        }
        if (category != null && !category.equalsIgnoreCase("all") && !category.isBlank()) {
            spec = spec.and(JobSpec.hasCategory(category));
        }
        if (date != null) {
            spec = spec.and(JobSpec.hasDate(date));
        }
        if (minSalary != null) {
            spec =spec.and(JobSpec.hasMinSalaryGreaterThanOrEqualTo(minSalary));
        }
        if (maxSalary != null) {
            spec =spec.and(JobSpec.hasMaxSalaryLessThanOrEqualTo(maxSalary));
        }
        if (requiredGender != null && !requiredGender.isBlank()) {
            spec =spec.and(JobSpec.hasRequiredGender(requiredGender));
        }

        spec = spec.and(JobSpec.notExpired());

        Page<Job> jobsPage= jobRepo.findAll(spec, pageable);
        Page<JobListingDetailsDto> jobDtosPage = jobsPage.map(jobMapper::toListing);
        long totalJobs = jobRepo.count(JobSpec.notExpired());

        JobListingResponse res=new JobListingResponse();
        res.setJobs(jobDtosPage);
        res.setTotalJobs(totalJobs);
        return res;

    }


    @Override
    public JobResponseDto updateJob(UUID jobId, JobRequestDto request) {
        var job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        jobMapper.update(request,job);

        if (request.getCategoryId() != null) {
            JobCategory category = categoryRepo.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            job.setCategory(category);
        }

        try{
            saveJobEmbedding(job,job.getJobSchedules());
        }catch (Exception e){
            throw new BadRequestException("Json embedding conflict.");
        }

        var updated = jobRepo.save(job);
        jobEmbeddingCache.addOrUpdate(updated);

        return jobMapper.toDto(updated);
    }


    @Transactional
    @Override
    public void deleteJob(UUID jobId) {
        var job = jobRepo.findById(jobId).orElse(null);
        if (job == null) {
            throw new NotFoundException("Job not found");
        }

        var attendances = attendanceRepository.findByJob_Id(jobId);

        var applicants=jobApplicationRepository.getJobApplicationsByJob_Id(jobId);

        applicants.stream()
                .filter(app -> app.getStatus() == ApplicationStatus.APPROVED)
                .forEach(applicant -> emailService.sendJobDeletedEmail(
                        applicant.getJobseeker().getEmail(),
                        applicant.getJobseeker().getJobSeeker().getFirstName(),
                        applicant.getJobseeker().getJobSeeker().getLastName(),
                        job.getTitle()
                ));

        jobEmbeddingCache.remove(jobId);
        jobApplicationRepository.deleteAll(applicants);
        attendanceRepository.deleteAll(attendances);

        jobRepo.deleteById(jobId);
    }

    @Override
    public Page<JobResponseDto> getByLocation(int page, int size, String location) {
        Pageable pageable = PageRequest.of(page, size);
        var jobs = jobRepo.findByLocationContainingIgnoreCase(location,pageable);
        return jobs.map(jobMapper::toDto);
    }

    @Override
    public List<NearJobResponse> getNearByJobs(double userLat, double userLng, double radius) {
        var jobs =jobRepo.findNearbyJobs(userLat, userLng, radius);
        return jobMapper.toNearMap(jobs);
    }


    public void saveJobEmbedding(Job job, Set<JobSchedule> jobSchedules) throws JsonProcessingException {
        String fullJobText = String.format("""
            Job Id: %s
            Job Title: %s
            Job schedules: %s
            Location: %s
            Job Type: %s
            Min Salary: %s
            Max Salary: %s
            Description: %s
            Deadline: %s
            Requirements: %s
            Available vacancies: %s
            """,
                job.getId(),
                job.getTitle(),
                jobSchedules,
                job.getLocation(),
                job.getJobType(),
                job.getMinSalary(),
                job.getMaxSalary(),
                job.getDescription(),
                job.getDeadline(),
                job.getRequirements(),
                job.getAvailableVacancies()
        );

        List<Float> embedding = embeddingService.getEmbedding(fullJobText);

        String embeddingJson = new ObjectMapper().writeValueAsString(embedding);
        job.setEmbedding(embeddingJson);
    }


    public void markUrgent(UUID jobId, boolean urgent) {

        Job job = jobRepo.findById(jobId)
                .orElseThrow(() -> new NotFoundException("Job not found"));

        job.setIsUrgent(urgent);
        jobRepo.save(job);


        if (urgent) {
            List<JobSeeker> seekers =
                    jobSeekerRepository.findMatchingJobSeekers(
                            job.getRequirements(),
                            job.getLocation()
                    );

            List<UUID> seekerUserIds = seekers.stream()
                    .map(js -> js.getUser().getId())
                    .toList();

            notificationService.notifyUrgentJobToSeekers(
                    seekerUserIds,
                    job.getTitle(),
                    job.getLocation()
            );
        }
    }

    @Override
    public List<JobCategoryDto> getCategories() {
        var categories =categoryRepo.findAll();
        return jobCategoryMapper.toDto(categories);
    }





}
