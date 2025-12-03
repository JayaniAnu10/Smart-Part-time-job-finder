package com.smartparttime.parttimebackend.modules.User.UserDtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long id;
    private String email;
    private String role;
    private String contact;
    private Integer trustScore;
    private Boolean isVerified;
    private LocalDateTime createdAt;
}
