package com.smartparttime.parttimebackend.modules.Job.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicStatsDto implements Serializable {
    
    private long totalJobs;
    private long activeJobs;
    private long totalJobSeekers;
    private long totalEmployers;
}
