package com.smartparttime.parttimebackend.modules.Rating.RateDtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class RatingUpdateRequest {
    @NotNull(message = "Required field")
    private UUID id;

    @NotNull(message = "Required field")
    private UUID raterId;

    @NotNull(message = "Required field")
    private UUID rateReceiverId;

    @Min(value = 0, message = "Rating must be between 0 and 5")
    @Max(value = 5, message = "Rating must be between 0 and 5")
    private Integer rating;

    private String comment;
}
