package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class JobStatsDto {
    private Long totalJobs;
    private BigDecimal totalEarning;
}
