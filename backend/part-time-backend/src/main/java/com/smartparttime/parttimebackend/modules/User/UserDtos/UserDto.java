package com.smartparttime.parttimebackend.modules.User.UserDtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String address;
    private String profilePicture;
    private String nic;
    private String contact;
    private Integer trustScore;
    private String skills;
    private Boolean isVerified;
    private LocalDateTime createdAt;
}
