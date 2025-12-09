package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class AdminUserDto {
    private UUID id;
    private String name;
    private String email;
    private String type;
    private String status;
    private String createdAt;
}
