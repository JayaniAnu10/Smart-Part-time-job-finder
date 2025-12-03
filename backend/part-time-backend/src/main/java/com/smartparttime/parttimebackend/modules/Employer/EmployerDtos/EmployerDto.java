package com.smartparttime.parttimebackend.modules.Employer.EmployerDtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EmployerDto {
    private String companyName;
    private String companyAddress;
    private String contactPersonName;
    private String contactPersonPhone;
    private String logo;
    private String website;
    private String description;
    private String registrationId;
    private String industry;
    private String email;
    private String isVerified;
    private String trustScore;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String contact;
}
