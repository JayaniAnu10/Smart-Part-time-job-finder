package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import java.time.LocalDateTime;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JobSeekerCompletedJobDto {
    private String title;
    private String companyName;
    private LocalDateTime completedDate;
    private Integer jobRating;
    private ApplicationStatus status;

}
