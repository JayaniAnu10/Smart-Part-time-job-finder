package com.smartparttime.parttimebackend.modules.User.UserDtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class UserDto {
    private UUID id;
    private String email;
    private String role;
    private Boolean isEmployer ;
    private Boolean isJobseeker ;
    private String contact;
    private Integer trustScore;
    private Boolean isVerified;
    private LocalDateTime createdAt;
}
