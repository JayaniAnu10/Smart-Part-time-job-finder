package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.*;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class EmployerService {
    private final EmployerRepository employerRepository;
    private final EmployerMapper employerMapper;
    private final UserMapper userMapper;
    private final UserService userService;

    public UserRegisterResponse addEmployee(@Valid EmployerRegisterRequest request) {
        var user = userMapper.employeeToEntity(request);
        user.setRole(Role.EMPLOYER);
        var savedUser = userService.registerUser(user);

        var emp=employerMapper.toEntity(request);
        emp.setUser(savedUser);
        employerRepository.save(emp);

        return userMapper.toResponse(savedUser);
    }

}
