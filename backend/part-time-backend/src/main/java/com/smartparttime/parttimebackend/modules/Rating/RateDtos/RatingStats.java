package com.smartparttime.parttimebackend.modules.Rating.RateDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RatingStats {
    private Long totalRating;
    private Double averageRating;
}
