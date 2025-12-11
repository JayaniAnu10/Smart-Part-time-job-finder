package com.smartparttime.parttimebackend.modules.Application.service.impl;

import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicationRequest;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicationResponse;
import com.smartparttime.parttimebackend.modules.Application.mapper.JobApplicationMapper;
import com.smartparttime.parttimebackend.modules.Application.repo.JobApplicationRepository;
import com.smartparttime.parttimebackend.modules.Application.service.JobApplicationService;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeekerRepository;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    private final JobApplicationMapper jobApplicationMapper;
    private final JobApplicationRepository jobApplicationRepository;
    private final JobSeekerRepository jobSeekerRepository;
    private final JobRepo jobRepo;
    private final UserRepository userRepository;

    public JobApplicationServiceImpl(JobApplicationMapper jobApplicationMapper, JobApplicationRepository jobApplicationRepository, JobSeekerRepository jobSeekerRepository, JobRepo jobRepo, UserRepository userRepository) {
        this.jobApplicationMapper = jobApplicationMapper;
        this.jobApplicationRepository = jobApplicationRepository;
        this.jobSeekerRepository = jobSeekerRepository;
        this.jobRepo = jobRepo;
        this.userRepository = userRepository;
    }

    @Override
    public JobApplicationResponse createApplication(JobApplicationRequest request) {

        var seeker = jobSeekerRepository.findById(request.getJobseeker()).orElse(null);
        if (seeker == null) {
            throw new NotFoundException("User not found");
        }

        var job = jobRepo.findById(request.getJobId()).orElse(null);
        if (job == null) {
            throw new NotFoundException("Job not found");
        }

        var user = userRepository.findById(request.getJobseeker()).orElseThrow();

        var application = new JobApplication();
        application.setJob(job);
        application.setJobseeker(user);
        application.setAppliedDate(LocalDateTime.now());
        application.setStatus(ApplicationStatus.PENDING);

        jobApplicationRepository.save(application);

        return jobApplicationMapper.toDto(application);
    }

    @Override
    public JobApplicationResponse getApplication( UUID id) {
        var application = jobApplicationRepository.findById(id).orElse(null);
        if (application == null) {
            throw new NotFoundException("Application not found");
        }

        return jobApplicationMapper.toDto(application);
    }

    @Override
    public List<JobApplicationResponse> getUserApplications(UUID id, int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        var user = jobSeekerRepository.findById(id).orElse(null);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        var applications = jobApplicationRepository.findByJobseeker_Id(id,pageable);
        if (applications.isEmpty()) {
            throw new NotFoundException("Application not found");
        }

        return applications
                .stream()
                .map(jobApplicationMapper::toDto)
                .toList();

    }

    @Override
    public List<JobApplicationResponse> getApplicationsByStatus(UUID id,ApplicationStatus status, int page ,int size) {
        Pageable  pageable = PageRequest.of(page,size);
        var user = jobSeekerRepository.findById(id).orElse(null);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        var applications = jobApplicationRepository.findByStatus(status,pageable);

        if (applications.isEmpty()) {
            throw new NotFoundException("Application not found");
        }

        return applications
                .stream()
                .map(jobApplicationMapper::toDto)
                .toList();
    }

    @Override
    public List<JobApplicationResponse> getApplicationsByJob(UUID jobId, int page, int size) {
        Pageable  pageable = PageRequest.of(page,size);
        var job = jobRepo.findById(jobId).orElse(null);
        if (job == null) {
            throw new NotFoundException("Job not found");
        }

        var applications = jobApplicationRepository.findByJob_Id(jobId,pageable);
        if (applications.isEmpty()) {
            throw new NotFoundException("Application not found");
        }

        return applications
                .stream()
                .map(jobApplicationMapper::toDto)
                .toList();


    }

    @Override
    public JobApplicationResponse updateApplicationStatus(UUID id, ApplicationStatus status) {
        var application = jobApplicationRepository.findById(id).orElse(null);
        if (application == null) {
            throw new NotFoundException("Application not found");
        }

        application.setStatus(status);
        jobApplicationRepository.save(application);

        return jobApplicationMapper.toDto(application);

    }
}
