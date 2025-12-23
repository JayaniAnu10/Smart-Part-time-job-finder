package com.smartparttime.parttimebackend.modules.Application.dtos;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Data
public class ApplicantsResponse {
    private UUID applicationId;
    private UUID jobSeekerId;
    private String fullName;
    private ApplicationStatus status;
    private BigDecimal averageRate;
    private String address;
    private String profilePicture;
    private Integer completedJobs;
    private LocalDateTime appliedDate;
}
