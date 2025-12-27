package com.smartparttime.parttimebackend.modules.Job.mappers;

import com.smartparttime.parttimebackend.modules.Job.dto.JobCategoryDto;
import com.smartparttime.parttimebackend.modules.Job.entity.JobCategory;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface JobCategoryMapper {

    List<JobCategoryDto> toDto(List<JobCategory> categories);
}

