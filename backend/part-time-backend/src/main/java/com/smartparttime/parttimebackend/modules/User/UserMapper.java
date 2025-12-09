package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserDto;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserRegisterResponse toResponse(User user);

    UserDto toDto(User user);

    User toEntity(UserRegisterRequest request);
}



