package com.smartparttime.parttimebackend.modules.Employer.EmployerDtos;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UpdateEmployerRequest {

    private String contact;
    private String companyName;
    private String companyAddress;
    private String contactPersonName;
    private String contactPersonPhone;
    private String website;
    private String description;
    private String registrationId;
    private String industry;
}
