package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class JobSeekerCompletedJobDto {
    private String title;
    private String companyName;
    private LocalDateTime completedDate;
    private Integer jobRating;
}
