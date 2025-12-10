package com.smartparttime.parttimebackend.modules.User.UserDtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    @NotBlank
    private String oldPassword;
    @NotBlank
    @Size(min = 6,message = "Should contain at least 6 characters")
    private String newPassword;
}