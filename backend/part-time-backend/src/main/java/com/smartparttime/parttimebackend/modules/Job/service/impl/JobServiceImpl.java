package com.smartparttime.parttimebackend.modules.Job.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.Application.repo.JobApplicationRepository;
import com.smartparttime.parttimebackend.modules.Chatbot.Service.EmbeddingService;
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
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class JobServiceImpl implements JobService {

    private final EmbeddingService  embeddingService;
    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private JobCategoryRepo categoryRepo;

    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private JobMapper jobMapper;
    @Autowired
    private JobApplicationRepository jobApplicationRepository;
    private final JobSeekerRepository jobSeekerRepository;
    private final NotificationService notificationService;
    @Autowired
    private JobCategoryMapper jobCategoryMapper;


    @Transactional
    @Override
    public JobResponseDto createJob(JobRequestDto request, UUID employerId){
        var employer = employerRepository.findById(employerId).orElseThrow();
        var job = jobMapper.toEntity(request);

        var category = categoryRepo.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        job.setCategory(category);
        job.setEmployer(employer);
        job.setPostedDate(LocalDate.now());
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
    public Page<JobListingResponse> filterJobsBySpecification(String location, String jobType, String title, String requirements, String category, String description, LocalDate date, BigDecimal minSalary, BigDecimal maxSalary, String requiredGender, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Job> spec = Specification.allOf();

        if (location != null) {
            spec = spec.and(JobSpec.hasLocation(location));
        }
        if (jobType != null) {
            spec = spec.and(JobSpec.hasJobType(jobType));
        }
        if (title != null) {
            spec = spec.and(JobSpec.hasTitle(title));
        }
        if (requirements != null) {
            spec = spec.and(JobSpec.hasRequirements(requirements));
        }
        if (category != null) {
            spec = spec.and(JobSpec.hasCategory(category));
        }
        if (description != null) {
            spec = spec.and(JobSpec.hasDescription(description));
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
        if (requiredGender != null) {
            spec =spec.and(JobSpec.hasRequiredGender(requiredGender));
        }

        Page<Job> jobsPage= jobRepo.findAll(spec, pageable);
        return jobsPage.map(jobMapper::toListing);
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

        return jobMapper.toDto(updated);
    }


    @Override
    public void deleteJob(UUID jobId) {
        var job = jobRepo.findById(jobId).orElse(null);
        if (job == null) {
            throw new NotFoundException("Job not found");
        }
        if(jobApplicationRepository.existsByJob_Id(jobId)) {
            throw new BadRequestException("Cannot delete job. Applications already exist.");
        }
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
