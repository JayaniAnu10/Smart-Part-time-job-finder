package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.*;
import com.smartparttime.parttimebackend.modules.Job.dto.JobStatDto;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmployerMapper {
    Employer toEntity(EmployerRegisterRequest employer);

    @Mapping(source = "user.email",target = "email")
    @Mapping(source = "user.trustScore",target = "trustScore")
    EmployerAllDto toDto(Employer employer);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.email",target = "email")
    @Mapping(source = "user.createdAt",target = "createdAt")
    @Mapping(source = "user.updatedAt",target = "updatedAt")
    @Mapping(source = "user.contact",target = "contact")
    EmployerDto toEmployerDto(Employer employer);

    @Mapping(source = "contact",target = "user.contact")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void  update(UpdateEmployerRequest request, @MappingTarget Employer employer);

    EmployerStats toEmpStat(Long jobCount, Long applicantCount, Long pendingReviewCount, List<JobStatDto> jobStats, Double monthRate);
}

