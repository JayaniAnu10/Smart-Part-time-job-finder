package com.smartparttime.parttimebackend.modules.Job.service.impl;

import com.smartparttime.parttimebackend.modules.Employer.EmployerRepository;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.Specifications.JobSpec;
import com.smartparttime.parttimebackend.modules.Job.dto.JobRequestDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobResponseDto;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobCategory;
import com.smartparttime.parttimebackend.modules.Job.entity.JobSchedule;
import com.smartparttime.parttimebackend.modules.Job.mappers.JobMapper;
import com.smartparttime.parttimebackend.modules.Job.repo.JobCategoryRepo;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.Job.service.JobService;
import jakarta.transaction.Transactional;
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

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private JobCategoryRepo categoryRepo;

    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private JobMapper jobMapper;


    @Transactional
    @Override
    public JobResponseDto createJob(JobRequestDto request, UUID employerId) {
        var employer = employerRepository.findById(employerId).orElseThrow();
        var job = jobMapper.toEntity(request);

        var category = categoryRepo.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        job.setCategory(category);
        job.setEmployer(employer);
        job.setPostedDate(LocalDate.now());
        job.setStatus(JobStatus.ACTIVE);

        Set<JobSchedule> schedules = request.getSchedules().stream()
                .map(dto -> {
                    JobSchedule schedule = new JobSchedule();
                    schedule.setStartDatetime(dto.getStartDatetime());
                    schedule.setEndDatetime(dto.getEndDatetime());
                    schedule.setJob(job);
                    return schedule;
                }).collect(Collectors.toSet());

        job.setJobSchedules(schedules);

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
    public Page<JobResponseDto> filterJobsBySpecification(String location, String jobType, String title, String skills, String category, String description, LocalDate date, BigDecimal minSalary, BigDecimal maxSalary, int page,int size) {
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
        if (skills != null) {
            spec = spec.and(JobSpec.hasSkills(skills));
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
            spec =spec.and(JobSpec.hasSalaryGreaterThanOrEqualTo(minSalary));
        }
        if (maxSalary != null) {
            spec =spec.and(JobSpec.hasSalaryLessThanOrEqualTo(maxSalary));
        }

        Page<Job> jobsPage= jobRepo.findAll(spec, pageable);
        return jobsPage.map(jobMapper::toDto);
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

        var updated = jobRepo.save(job);

        return jobMapper.toDto(updated);
    }


    @Override
    public void deleteJob(UUID jobId) {
        jobRepo.deleteById(jobId);
    }

    @Override
    public Page<JobResponseDto> getByLocation(int page, int size, String location) {
        Pageable pageable = PageRequest.of(page, size);
        var jobs = jobRepo.findByLocationContainingIgnoreCase(location,pageable);
        return jobs.map(jobMapper::toDto);
    }

}
