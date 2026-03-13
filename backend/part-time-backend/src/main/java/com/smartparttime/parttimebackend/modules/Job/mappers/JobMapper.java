package com.smartparttime.parttimebackend.modules.Job.mappers;

import com.smartparttime.parttimebackend.modules.Job.PromoStatus;
import com.smartparttime.parttimebackend.modules.Job.dto.*;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Recommendation.Dto.ResponseDto;
import org.mapstruct.*;
import org.springframework.data.domain.Page;

import java.util.List;


@Mapper(componentModel = "spring")
public interface JobMapper {

    Job toEntity(JobRequestDto request);

    @Mapping(source = "employer.companyName" ,target = "employer")
    @Mapping(source = "employer.id" ,target = "employerId")
    @Mapping(source = "category.category",target = "category")
    @Mapping(source = "category.id",target = "categoryId")
    @Mapping(target = "promotionCategoryName", expression = "java(getActivePromotionCategoryName(savedJob))")
    JobResponseDto toDto(Job savedJob);

    @Mapping(source = "employer.companyName" ,target = "employer")
    @Mapping(source = "category.category",target = "category")
    ResponseDto toRecommended(Job job);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(JobRequestDto request, @MappingTarget Job job);

    List<NearJobResponse> toNearMap(List<Job> jobs);

    @Mapping(source = "employer.companyName" ,target = "employer")
    @Mapping(source = "category.category",target = "category")
    @Mapping(target = "promotionCategoryName", expression = "java(getActivePromotionCategoryName(job))")
    JobListingDetailsDto toListing(Job job);

    default String getActivePromotionCategoryName(Job job) {
        if (job.getPromotions() == null) return null;
        return job.getPromotions().stream()
                .filter(p -> PromoStatus.ACTIVE.equals(p.getStatus()))
                .map(p -> p.getCategory() != null ? p.getCategory().getName() : null)
                .filter(name -> name != null)
                .findFirst()
                .orElse(null);
    }

}