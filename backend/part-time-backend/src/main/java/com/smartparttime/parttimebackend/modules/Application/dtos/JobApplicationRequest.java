package com.smartparttime.parttimebackend.modules.Application.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class JobApplicationRequest {
    @NotNull(message = "Field required")
    private UUID jobId;

    @NotNull(message = "Field required")
    private UUID jobseeker;

    @NotNull(message = "Field required")
    private UUID scheduleId;
}
