package com.smartparttime.parttimebackend.modules.Job.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.smartparttime.parttimebackend.modules.Job.JobStatus;

import lombok.Data;

@Data
public class JobStatDto {
    private Long applicants;
    private UUID id;
    private LocalDateTime postedDate;
    private JobStatus status;
    private String title;
    private LocalDateTime deadline;
    private String promotionCategoryName;

    // Constructor used by JPQL query (6 args, no promotionCategoryName)
    public JobStatDto(Long applicants, UUID id, LocalDateTime postedDate, JobStatus status, String title, LocalDateTime deadline) {
        this.applicants = applicants;
        this.id = id;
        this.postedDate = postedDate;
        this.status = status;
        this.title = title;
        this.deadline = deadline;
    }
}
