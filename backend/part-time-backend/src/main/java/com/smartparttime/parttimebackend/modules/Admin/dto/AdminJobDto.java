package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class AdminJobDto {
    private UUID id;
    private String title;
    private String category;
    private String employerEmail;
    private String status;
    private String postedDate;
}
