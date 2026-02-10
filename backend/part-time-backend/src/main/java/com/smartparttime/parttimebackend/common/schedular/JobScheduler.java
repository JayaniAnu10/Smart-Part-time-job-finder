package com.smartparttime.parttimebackend.common.schedular;

import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
@Slf4j
public class JobScheduler {

    private final JobRepo jobRepo;

    /**
     * Runs every hour to check and close jobs that have passed their deadline
     * Cron expression: second minute hour day month weekday
     * 0 0 * * * * = At the start of every hour
     */
    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void closeExpiredJobs() {
        log.info("Running scheduled task to close expired jobs");
        
        LocalDateTime now = LocalDateTime.now();
        
        // Find all ACTIVE jobs where deadline has passed
        int closedCount = jobRepo.closeExpiredJobs(now);
        
        if (closedCount > 0) {
            log.info("Closed {} expired jobs", closedCount);
        } else {
            log.debug("No expired jobs found");
        }
    }
}
