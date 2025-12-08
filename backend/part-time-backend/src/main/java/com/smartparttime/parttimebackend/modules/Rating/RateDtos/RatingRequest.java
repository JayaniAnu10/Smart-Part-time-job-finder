package com.smartparttime.parttimebackend.modules.Rating.RateDtos;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.UUID;

@Data
public class RatingRequest {
    @NotNull(message = "Field is required")
    private UUID jobId;

    @NotNull(message = "Field is required")
    private UUID raterId;

    @NotNull(message = "Field is required")
    private UUID rateReceiverId;

    @NotNull
    @Min(value = 0, message = "Rating must be between 0 and 5")
    @Max(value = 5, message = "Rating must be between 0 and 5")
    private Integer rating;

    private String comment;
}
