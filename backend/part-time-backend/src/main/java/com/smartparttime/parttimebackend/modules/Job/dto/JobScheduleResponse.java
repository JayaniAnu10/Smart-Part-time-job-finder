package com.smartparttime.parttimebackend.modules.Job.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class JobScheduleResponse {
    private String id;
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
    private Integer requiredWorkers;


}
