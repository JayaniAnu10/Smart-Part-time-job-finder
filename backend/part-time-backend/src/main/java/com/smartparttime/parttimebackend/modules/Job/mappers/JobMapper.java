package com.smartparttime.parttimebackend.modules.Job.mappers;

import com.smartparttime.parttimebackend.modules.Job.dto.JobRequestDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobResponseDto;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface JobMapper {

    Job toEntity(JobRequestDto request);

    @Mapping(source = "employer.id" ,target = "employer")
    @Mapping(source = "category.id",target = "category")
    JobResponseDto toDto(Job savedJob);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(JobRequestDto request, @MappingTarget Job job);
}
