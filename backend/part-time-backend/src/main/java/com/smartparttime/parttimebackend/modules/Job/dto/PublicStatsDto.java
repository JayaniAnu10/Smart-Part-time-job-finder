package com.smartparttime.parttimebackend.modules.Job.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicStatsDto {
    
    private long totalJobs;
    private long activeJobs;
    private long totalJobSeekers;
    private long totalEmployers;
}
