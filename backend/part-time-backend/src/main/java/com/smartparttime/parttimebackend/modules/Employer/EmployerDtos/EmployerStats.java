package com.smartparttime.parttimebackend.modules.Employer.EmployerDtos;

import com.smartparttime.parttimebackend.modules.Job.dto.JobStatDto;
import lombok.Data;

import java.util.List;

@Data
public class EmployerStats {
    private Long jobCount;
    private Long applicantCount;
    private Long pendingReviewCount;
    private List<JobStatDto> jobStats;
}
