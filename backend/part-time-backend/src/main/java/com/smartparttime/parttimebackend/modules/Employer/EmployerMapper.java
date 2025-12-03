package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerAllDto;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerDto;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EmployerMapper {
    Employer toEntity(EmployerRegisterRequest employee);

    @Mapping(source = "user.email",target = "email")
    @Mapping(source = "user.trustScore",target = "trustScore")
    EmployerAllDto toDto(Employer employer);

    @Mapping(source = "user.email",target = "email")
    @Mapping(source = "user.trustScore",target = "trustScore")
    @Mapping(source = "user.isVerified",target = "isVerified")
    @Mapping(source = "user.createdAt",target = "createdAt")
    @Mapping(source = "user.updatedAt",target = "updatedAt")
    @Mapping(source = "user.contact",target = "contact")
    EmployerDto toEmployerDto(Employer employer);
}

