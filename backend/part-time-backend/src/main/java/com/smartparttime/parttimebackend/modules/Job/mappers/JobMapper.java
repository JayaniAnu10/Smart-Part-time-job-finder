package com.smartparttime.parttimebackend.modules.Job.mappers;

import com.smartparttime.parttimebackend.modules.Job.dto.*;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import org.mapstruct.*;
import org.springframework.data.domain.Page;

import java.util.List;


@Mapper(componentModel = "spring")
public interface JobMapper {

    Job toEntity(JobRequestDto request);

    @Mapping(source = "employer.companyName" ,target = "employer")
    @Mapping(source = "employer.id" ,target = "employerId")
    @Mapping(source = "category.category",target = "category")
    JobResponseDto toDto(Job savedJob);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(JobRequestDto request, @MappingTarget Job job);

    List<NearJobResponse> toNearMap(List<Job> jobs);

    @Mapping(source = "employer.companyName" ,target = "employer")
    @Mapping(source = "category.category",target = "category")
    JobListingDetailsDto toListing(Job job);

}
