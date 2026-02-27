package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpcomingJobDetailsDto {
    // Job Basic Info
    private UUID jobId;
    private String jobTitle;
    private String jobDescription;
    private String category;
    private String jobType;
    
    // Employer Info
    private UUID employerId;
    private String employerName;
    private String employerContact;
    private BigDecimal employerRating;
    
    // Schedule Info
    private UUID scheduleId;
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
    
    // Compensation
    private BigDecimal minSalary;
    private BigDecimal maxSalary;
    
    // Location
    private String location;
    private Double latitude;
    private Double longitude;
    
    // Additional Details
    private String requirements;
    private String accommodation;
    private String requiredGender;
    
    // Application Info
    private UUID applicationId;
    private ApplicationStatus applicationStatus;
    private LocalDateTime appliedDate;
}
