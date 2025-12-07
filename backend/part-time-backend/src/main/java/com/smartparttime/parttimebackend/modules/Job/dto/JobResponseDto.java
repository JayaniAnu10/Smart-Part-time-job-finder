package com.smartparttime.parttimebackend.modules.Job.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class JobResponseDto {

    private UUID id;

    private String title;

    private String description;

    private Integer categoryId;

    private String categoryName;

    private String location;

    private String jobType;

    private LocalDateTime deadline;

    private LocalDate postedDate;

    private String status;

    private BigDecimal salary;

    private Integer workingHours;

    private String skills;

    private UUID employerId;
}
