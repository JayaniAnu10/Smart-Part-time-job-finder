package com.smartparttime.parttimebackend.modules.Rating.service;

import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingResponse;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingUpdateRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface RateService {
    RatingResponse addRate(RatingRequest request);

    RatingResponse getRateById(UUID id);

    Page<RatingResponse> getRatesByJob(UUID id, int page, int size);

    Page<RatingResponse> getRatesByRater(UUID id, int page, int size);

    Page<RatingResponse> getRatesByUser(UUID id, int page, int size);

    RatingResponse updateRate(RatingUpdateRequest request);

    ResponseEntity<Void> deleteRateById(UUID userId, UUID id);

}
