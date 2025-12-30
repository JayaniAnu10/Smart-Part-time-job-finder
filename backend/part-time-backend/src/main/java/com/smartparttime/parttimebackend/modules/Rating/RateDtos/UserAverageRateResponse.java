package com.smartparttime.parttimebackend.modules.Rating.RateDtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UserAverageRateResponse {
    private BigDecimal averageRate;
    private Integer reviews;
}
