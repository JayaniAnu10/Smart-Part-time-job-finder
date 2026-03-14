package com.smartparttime.parttimebackend.modules.Application.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.smartparttime.parttimebackend.common.Services.EmailService;
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
    public void approveApplication(UUID applicationId,
                                   UUID jobId,
                                   UUID seekerId,
                                   String seekerEmail,
                                   String jobTitle,
                                   LocalDateTime scheduleStartDate,
                                   LocalDateTime scheduleEndDate){
        try{
            var job = jobRepo.findById(jobId).orElse(null);
            if (job == null) {
                log.warn("Approval email skipped. Job not found for applicationId={}, jobId={}", applicationId, jobId);
                return;
            }


            job.setAvailableVacancies(job.getAvailableVacancies()-1);
            jobRepo.save(job);

            String subject = "Job Application Approved";
            String body = "Your application has been approved for \"" + jobTitle + "\". "
                    + "Scheduled time: " + scheduleStartDate + " to " + scheduleEndDate + ".";
            emailService.sendSimpleEmail(seekerEmail, subject, body);

                log.info("Approval email sent for applicationId={}, seekerId={}, jobId={}",
                    applicationId,
                    seekerId,
                    jobId);


        }catch(Exception e){
                log.error("Failed to process approval for applicationId={}.",
                    applicationId, e);
                throw new RuntimeException("Failed to process application approval", e);
        }


    }
}
