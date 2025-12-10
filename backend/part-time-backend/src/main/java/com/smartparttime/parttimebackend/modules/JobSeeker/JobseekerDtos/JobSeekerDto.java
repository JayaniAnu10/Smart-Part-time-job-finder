package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class JobSeekerDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String gender;
    private LocalDate dateOfBirth;
    private String bio;
    private String address;
    private String profilePicture;
    private String skills;
    private String nic;
    private String contact;
}
