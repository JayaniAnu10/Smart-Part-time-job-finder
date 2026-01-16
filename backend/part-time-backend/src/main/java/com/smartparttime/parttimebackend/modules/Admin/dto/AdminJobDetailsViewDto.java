package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class AdminJobDetailsViewDto {

    private UUID id;

    private String title;
    private String companyName;
    private String location;
    private String category;
    private String status;
    private String postedDate;

    private String description;
    private String requirements;
    private String benefits;

    private BigDecimal minSalary;
    private BigDecimal maxSalary;
}
