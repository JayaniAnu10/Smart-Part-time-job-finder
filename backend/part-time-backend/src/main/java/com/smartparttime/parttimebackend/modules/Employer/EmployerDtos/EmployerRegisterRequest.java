package com.smartparttime.parttimebackend.modules.Employer.EmployerDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class EmployerRegisterRequest {
    @NotBlank(message = "Name is required")
    private String companyName;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min=6,max=16 ,message = "Password should be at least 6 characters")
    private String password;

    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

    @NotBlank(message = "Address is required")
    private String companyAddress;

    private String logo;

    @NotBlank(message = "Registration Id is required")
    private String registrationId;

    @NotBlank(message = "Contact number is required")
    private String contact;

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
