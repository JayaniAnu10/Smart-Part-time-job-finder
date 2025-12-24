package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@Data
public class JobSeekerProfileDetails {
    private UUID jobSeekerId;
    private String fullName;
    private String email;
    private LocalDate dateOfBirth;
    private BigDecimal rate;
    private String contact;
    private String address;
    private String bio;
    private String skills;
    private Boolean isVerified;
    private String gender;
    private String profilePicture;
    private Long completedJobs;
}
