package com.smartparttime.parttimebackend.modules.Job.dto;

import lombok.Data;
import org.springframework.data.domain.Page;

@Data
public class JobListingResponse {
    private Page<JobListingDetailsDto> jobs;
    private Long totalJobs;
}
