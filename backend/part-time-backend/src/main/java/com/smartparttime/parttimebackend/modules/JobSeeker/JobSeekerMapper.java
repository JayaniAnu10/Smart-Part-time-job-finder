package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.User;
import jakarta.validation.Valid;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface JobSeekerMapper {
    JobSeeker toEntity(JobSeekerRegisterRequest request);
}
