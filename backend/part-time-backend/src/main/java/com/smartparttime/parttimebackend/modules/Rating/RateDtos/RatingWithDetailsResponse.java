package com.smartparttime.parttimebackend.modules.Rating.RateDtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingWithDetailsResponse {
    private UUID id;
    private UUID jobId;
    private String jobTitle;
    private UUID raterId;
    private String raterName;
    private UUID rateReceiverId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdDate;
}
