package com.smartparttime.parttimebackend.modules.Rating.service;

import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingResponse;

public interface RateService {
    RatingResponse addRate(RatingRequest request);
}
