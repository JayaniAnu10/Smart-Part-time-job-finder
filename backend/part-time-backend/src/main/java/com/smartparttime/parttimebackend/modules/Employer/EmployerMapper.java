package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerAllDto;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerDto;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.UpdateEmployerRequest;
import org.mapstruct.*;

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

}

