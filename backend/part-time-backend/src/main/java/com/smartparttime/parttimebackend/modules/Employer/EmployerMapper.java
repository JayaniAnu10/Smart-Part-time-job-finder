package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmployerMapper {
    Employer toEntity(EmployerRegisterRequest employee);
}
