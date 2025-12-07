package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;

@Data
public class AdminComplaintActionDto {
    private String status;   // RESOLVED, REJECTED
    private String adminNote; // optional note
}
