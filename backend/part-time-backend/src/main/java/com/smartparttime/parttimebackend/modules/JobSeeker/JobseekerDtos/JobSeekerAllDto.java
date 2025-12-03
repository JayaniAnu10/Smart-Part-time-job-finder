package com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos;

import lombok.Data;

@Data
public class JobSeekerAllDto {
    private String firstName;
    private String lastName;
    private String address;
    private String profilePicture;
    private String email;
    private String trustScore;
}
