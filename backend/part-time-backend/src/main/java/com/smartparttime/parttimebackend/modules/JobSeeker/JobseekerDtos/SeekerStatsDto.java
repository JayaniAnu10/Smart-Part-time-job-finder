package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class SeekerStatsDto {
    private String name;
    private Long countUpcomingJobs;
    private Long activeApplications;
    private JobStatsDto earning;
    private List<UpcomingJobsDto> upcomingJobs;
}
