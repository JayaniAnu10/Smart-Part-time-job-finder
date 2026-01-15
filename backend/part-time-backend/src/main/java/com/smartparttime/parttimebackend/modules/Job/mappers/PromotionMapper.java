package com.smartparttime.parttimebackend.modules.Job.mappers;

import com.smartparttime.parttimebackend.modules.Job.dto.PromotionSuccessResponse;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PromotionMapper {

    @Mapping(source = "job.title" ,target = "jobTitle")
    @Mapping(source = "category.name" ,target = "planName")
    @Mapping(source = "category.days",target = "duration")
    @Mapping(source = "category.price",target = "price")
    PromotionSuccessResponse toSuccess(Promotion promotion);
}
