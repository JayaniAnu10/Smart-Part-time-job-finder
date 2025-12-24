package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Data
public class JobSeekerProfileDetails {
    private UUID jobSeekerId;
    private String fullName;
    private String email;
    private BigDecimal rate;
    private String contact;
    private String address;
    private String bio;
    private String skills;
    private Boolean isVerified;
    private String gender;
    private String profilePicture;


}
