package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class JobSeekerRegisterRequest {
    @NotNull(message = "User id is required")
    private UUID userId;

    @NotBlank(message = "Name is required")
    private String firstName;

    @NotBlank(message = "Name is required")
    private String lastName;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotNull(message = "Birth date is required")
    private Date dateOfBirth;

    @NotBlank(message = "Bio is required")
    private String bio;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "nic is required")
    private String nic;

    private String skills;


}
