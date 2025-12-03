package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;

@Data
public class JobSeekerRegisterRequest {
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

    private String profilePicture;

    @NotBlank(message = "nic is required")
    private String nic;

    private String skills;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min=6,max=16 ,message = "Password should be at least 6 characters")
    private String password;

    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

    @NotBlank(message = "Contact number is required")
    private String contact;
}
