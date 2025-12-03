package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User employeeToEntity(EmployerRegisterRequest request);
    UserRegisterResponse toResponse(User user);

    User seekerToEntity(JobSeekerRegisterRequest request);
}


