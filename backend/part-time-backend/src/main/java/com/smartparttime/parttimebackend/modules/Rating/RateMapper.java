package com.smartparttime.parttimebackend.modules.Rating;

import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingRequest;
import com.smartparttime.parttimebackend.modules.Rating.RateDtos.RatingResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RateMapper {
    Rate toEntity(RatingRequest ratingRequest);

    @Mapping(source = "job.id" ,target = "jobId")
    @Mapping(source = "rater.id" , target = "raterId")
    @Mapping(source = "rateReceiver.id", target ="rateReceiverId" )
    RatingResponse toDto(Rate newRate);
}
