package com.smartparttime.parttimebackend.modules.Application.service;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.smartparttime.parttimebackend.common.Services.EmailService;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class JobApplicationAsyncService {

    private final JobRepo jobRepo;
    private final EmailService emailService;

    @Async("taskExecutor")
    public void approveApplication(JobApplication application){
        try{
            var job= application.getJob();


            job.setAvailableVacancies(job.getAvailableVacancies()-1);
            jobRepo.save(job);

            String email = application.getJobseeker().getEmail();
            String jobTitle = job.getTitle();
            LocalDateTime scheduleStartDate = application.getSchedule().getStartDatetime();
            LocalDateTime scheduleEndDate = application.getSchedule().getEndDatetime();

            String subject = "Job Application Approved";
            String body = "Your application has been approved for \"" + jobTitle + "\". "
                    + "Scheduled time: " + scheduleStartDate + " to " + scheduleEndDate + ".";
            emailService.sendSimpleEmail(email, subject, body);

                log.info("Approval email sent for applicationId={}, seekerId={}, jobId={}",
                    application.getId(),
                    application.getJobseeker().getId(),
                    job.getId());


        }catch(Exception e){
                log.error("Failed to process approval for applicationId={}.",
                    application.getId(), e);
                throw new RuntimeException("Failed to process application approval", e);
        }


    }
}
