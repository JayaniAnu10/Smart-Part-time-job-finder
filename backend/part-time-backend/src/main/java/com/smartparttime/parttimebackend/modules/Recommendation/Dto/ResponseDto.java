package com.smartparttime.parttimebackend.modules.Recommendation.Dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class ResponseDto {
    private UUID id;
    private String title;
    private String category;
    private String location;
    private BigDecimal minSalary;
    private String employer;
    private Boolean isUrgent;
}
