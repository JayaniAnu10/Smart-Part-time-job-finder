package com.smartparttime.parttimebackend.modules.Job.dto;

import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class NearJobResponse {
    private UUID id;

    private String title;

    private JobStatus status;

    private BigDecimal salary;

    private Double latitude;

    private Double longitude;
}
