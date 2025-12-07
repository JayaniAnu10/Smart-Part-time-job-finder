package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AdminComplaintResponseDto {
    private UUID id;

    private UUID reporterId;
    private String reporterEmail;

    private UUID targetId;
    private String targetEmail;

    private UUID jobId;          // if complaint is related to a job
    private String jobTitle;     // optional

    private String description;
    private String status;       // PENDING / RESOLVED / REJECTED

    private LocalDateTime createdAt;
}
