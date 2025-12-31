package com.smartparttime.parttimebackend.modules.Application.service.impl;


import com.smartparttime.parttimebackend.common.Services.EmailService;
import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Application.dtos.ApplicantsResponse;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicantsResponse;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicationRequest;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicationResponse;
import com.smartparttime.parttimebackend.modules.Application.mapper.JobApplicationMapper;
import com.smartparttime.parttimebackend.modules.Application.repo.JobApplicationRepository;
import com.smartparttime.parttimebackend.modules.Application.service.JobApplicationAsyncService;
import com.smartparttime.parttimebackend.modules.Application.service.JobApplicationService;
import com.smartparttime.parttimebackend.modules.Attendance.Attendance;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceService;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceStatus;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.Job.repo.JobScheduleRepository;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeekerRepository;
import com.smartparttime.parttimebackend.modules.Notification.service.NotificationService;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@AllArgsConstructor
@Service
public class JobApplicationServiceImpl implements JobApplicationService {
    private final JobApplicationMapper jobApplicationMapper;
    private final JobApplicationRepository jobApplicationRepository;
    private final JobSeekerRepository jobSeekerRepository;
    private final JobRepo jobRepo;
    private final UserRepository userRepository;
    private final JobScheduleRepository jobScheduleRepository;
    private final NotificationService notificationService;
    private final JobApplicationAsyncService asyncService;



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

       if( jobApplicationRepository.existsByJobseeker_IdAndSchedule_Id(seeker.getId(), request.getScheduleId())){
           throw new BadRequestException("Application already exists");
       }

        var user = userRepository.findById(request.getJobseeker()).orElseThrow();
        var schedule = jobScheduleRepository.findById(request.getScheduleId()).orElseThrow();

        var application = new JobApplication();
        application.setJob(job);
        application.setJobseeker(user);
        application.setAppliedDate(LocalDateTime.now());
        application.setStatus(ApplicationStatus.PENDING);
        application.setSchedule(schedule);

        jobApplicationRepository.save(application);

        notificationService.notifyJobApplied(
                job.getEmployer().getUser().getId(),
                job.getTitle()
        );


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
    public JobApplicantsResponse getApplicationsByJob(UUID jobId, int page, int size) {
        Pageable  pageable = PageRequest.of(page,size);
        var job = jobRepo.findById(jobId).orElse(null);
        if (job == null) {
            throw new NotFoundException("Job not found");
        }

        var applicants = jobApplicationRepository.findApplicationsByJobId(jobId,pageable);

        JobApplicantsResponse response = new JobApplicantsResponse();
        response.setTitle(job.getTitle());
        response.setApplicants(applicants);

        return response;
    }

    @Transactional
    @Override
    public JobApplicationResponse updateApplicationStatus(UUID id, ApplicationStatus status) {
        var application = jobApplicationRepository.findById(id).orElse(null);
        if (application == null) {
            throw new NotFoundException("Application not found");
        }

        application.setStatus(status);
        jobApplicationRepository.save(application);

        if(application.getJob().getAvailableVacancies()<=0){
            throw new BadRequestException("Already vacancies are filled");
        }

        if(status == ApplicationStatus.APPROVED) {
            asyncService.approveApplication(application);

        }

        notificationService.notifyStatusChanged(
                application.getJobseeker().getId(),
                application.getJob().getTitle(),
                status.name()
        );


        return jobApplicationMapper.toDto(application);

    }

    @Override
    public void  deleteApplication(UUID id) {
        var application = jobApplicationRepository.findById(id).orElse(null);
        if (application == null) {
            throw new NotFoundException("Application not found");
        }
        jobApplicationRepository.delete(application);
    }


}
