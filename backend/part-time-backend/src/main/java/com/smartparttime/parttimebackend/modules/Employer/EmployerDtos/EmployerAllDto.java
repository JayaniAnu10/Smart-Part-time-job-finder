package com.smartparttime.parttimebackend.modules.Employer.EmployerDtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EmployerAllDto {
    private String companyName;
    private String companyAddress;
    private String logo;
    private String industry;
    private String email;
    private String trustScore;
}
