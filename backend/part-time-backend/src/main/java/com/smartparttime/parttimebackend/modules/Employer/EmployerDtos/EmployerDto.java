package com.smartparttime.parttimebackend.modules.Employer.EmployerDtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class EmployerDto {
    private UUID id;
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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String contact;
}
