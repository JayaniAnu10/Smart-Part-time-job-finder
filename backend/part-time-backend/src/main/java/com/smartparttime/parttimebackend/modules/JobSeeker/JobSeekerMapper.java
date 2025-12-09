package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerAllDto;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerDto;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerRegisterRequest;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.UpdateJobSeekerRequest;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface JobSeekerMapper {
    JobSeeker toEntity(JobSeekerRegisterRequest request);

    @Mapping(source = "user.email",target = "email")
    @Mapping(source = "user.trustScore",target = "trustScore")
    JobSeekerAllDto toDto(JobSeeker jobSeeker);

    @Mapping(source = "user.email",target = "email")
    @Mapping(source = "user.trustScore",target = "trustScore")
    @Mapping(source = "user.isVerified",target = "isVerified")
    @Mapping(source = "user.createdAt",target = "createdAt")
    @Mapping(source = "user.updatedAt",target = "updatedAt")
    @Mapping(source = "user.contact",target = "contact")
    JobSeekerDto toJobSeekerDto(JobSeeker jobSeeker);

    @Mapping(source = "email",target = "user.email")
    @Mapping(source = "contact",target = "user.contact")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void update(UpdateJobSeekerRequest request,@MappingTarget JobSeeker jobSeeker);

}
