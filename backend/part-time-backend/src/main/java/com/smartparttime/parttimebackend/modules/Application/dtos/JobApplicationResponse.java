package com.smartparttime.parttimebackend.modules.Application.dtos;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class JobApplicationResponse {

    private UUID job;

    private UUID jobseeker;

    private LocalDateTime appliedDate;

    private ApplicationStatus status;
}
