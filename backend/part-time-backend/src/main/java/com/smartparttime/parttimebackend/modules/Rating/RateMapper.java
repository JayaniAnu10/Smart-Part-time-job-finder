package com.smartparttime.parttimebackend.modules.Rating;

import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RateMapper {
    Rate toEntity(RatingRequest ratingRequest);
}
