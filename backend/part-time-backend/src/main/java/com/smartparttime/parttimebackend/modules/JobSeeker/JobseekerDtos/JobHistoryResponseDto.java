package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobHistoryResponseDto {
    private Long completedJobsCount;
    private BigDecimal totalEarnings;
    private BigDecimal averageRate;
    private List<CompletedJobDetailDto> completedJobs;
}