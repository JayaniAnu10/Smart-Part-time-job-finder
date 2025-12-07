package com.smartparttime.parttimebackend.modules.Job.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class JobRequestDto {

    private String title;

    private String description;

    private Integer categoryId;


    private String location;

    private String jobType;

    private LocalDateTime deadline;

    private BigDecimal salary;

    private Integer workingHours;

    private String skills;
}
