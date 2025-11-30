package com.smartparttime.parttimebackend.modules.User.UserDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRegisterRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min=6,max=16 ,message = "Password should be at least 6 characters")
    private String password;

    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

    @NotBlank(message = "Role is required")
    private String role;

    @NotBlank(message = "Address is required")
    private String address;

    private String profilePicture;

    @NotBlank(message = "NIC is required")
    private String nic;

    @NotBlank(message = "Contact number is required")
    private String contact;
    private String language;
    private String skills;
}
