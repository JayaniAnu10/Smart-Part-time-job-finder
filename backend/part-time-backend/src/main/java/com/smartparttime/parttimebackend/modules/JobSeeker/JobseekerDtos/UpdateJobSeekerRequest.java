package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import jakarta.validation.constraints.Email;
import lombok.Data;

import java.util.Date;

@Data
public class UpdateJobSeekerRequest {
    @Email
    private String email;
    private String contact;
    private String firstName;
    private String lastName;
    private String gender;
    private Date dateOfBirth;
    private String bio;
    private String address;
    private String skills;
    private String nic;

}
