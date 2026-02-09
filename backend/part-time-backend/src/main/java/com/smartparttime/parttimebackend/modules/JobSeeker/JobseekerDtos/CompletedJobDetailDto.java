package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompletedJobDetailDto {
    private UUID jobId;
    private UUID employerId;
    private String jobTitle;
    private String employerName;
    private List<LocalDateTime> jobScheduleDates;
    private Double workedHours;
    private BigDecimal salary;
    private Integer rating; // 0 if not rated
    private UUID ratingId; // null if not rated
    private String comment; // rating comment if exists
}