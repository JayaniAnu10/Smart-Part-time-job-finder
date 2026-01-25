package com.smartparttime.parttimebackend.modules.Job.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PromotionSuccessResponse {
    private String jobTitle;
    private String planName;
    private int duration;
    private BigDecimal price;
}
