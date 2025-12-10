package com.smartparttime.parttimebackend.modules.Employer.EmployerDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class EmployerRegisterRequest {
    @NotBlank(message = "Name is required")
    private String companyName;

    @NotNull(message = "User id is required")
    private UUID id;

    @NotBlank(message = "Address is required")
    private String companyAddress;

    private String logo;

    @NotBlank(message = "Registration Id is required")
    private String registrationId;

    private String website;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Field of industry is required")
    private String industry;

    @NotBlank(message = "Contact person is required")
    private String contactPersonName;

    @NotBlank(message = "Contact person is required")
    private String contactPersonPhone;

}
