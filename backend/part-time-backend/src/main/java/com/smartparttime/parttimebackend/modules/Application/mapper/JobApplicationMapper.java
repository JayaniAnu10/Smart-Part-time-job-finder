package com.smartparttime.parttimebackend.modules.Application.mapper;

import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicationResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface JobApplicationMapper {

    @Mapping(source = "job.id",target = "job")
    @Mapping(source = "jobseeker.id",target = "jobseeker")
    JobApplicationResponse toDto(JobApplication application);
}
