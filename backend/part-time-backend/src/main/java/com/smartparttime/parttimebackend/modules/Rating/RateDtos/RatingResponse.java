package com.smartparttime.parttimebackend.modules.Rating.RateDtos;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class RatingResponse {
    private UUID id;

    private UUID jobId;

    private UUID raterId;

    private UUID rateReceiverId;

    private Integer rating;

    private String comment;
}
