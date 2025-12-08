package com.smartparttime.parttimebackend.modules.Job.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JobScheduleDto {
    @NotNull(message = "Start date/time is required")
    private LocalDateTime startDatetime;

    @NotNull(message = "End date/time is required")
    private LocalDateTime endDatetime;
}
