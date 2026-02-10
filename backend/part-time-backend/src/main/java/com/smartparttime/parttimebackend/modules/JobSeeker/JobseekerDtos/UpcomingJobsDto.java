package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class UpcomingJobsDto {
    private UUID id;
    private String title;
    private String name;
    private BigDecimal minSalary;
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
    private ApplicationStatus status;
}