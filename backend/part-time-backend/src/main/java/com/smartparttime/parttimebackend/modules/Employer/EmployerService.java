package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.UpdateEmployerRequest;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeeker;
import com.smartparttime.parttimebackend.modules.User.*;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import com.smartparttime.parttimebackend.modules.User.UserExceptions.PasswordMismatchException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@AllArgsConstructor
@Service
public class EmployerService {
    private final EmployerRepository employerRepository;
    private final EmployerMapper employerMapper;
    private final UserMapper userMapper;
    private final UserService userService;
    private final UserRepository userRepository;

    public UserRegisterResponse addEmployee(@Valid EmployerRegisterRequest request) {
        availabilityCheck(request.getEmail(), request.getRegistrationId());

        if(!request.getPassword().equals(request.getConfirmPassword())){
            throw new PasswordMismatchException("Passwords do not match");
        }

        var user = userMapper.employeeToEntity(request);
        user.setRole(Role.EMPLOYER);
        var savedUser = userService.registerUser(user);

        var emp=employerMapper.toEntity(request);
        emp.setUser(savedUser);
        employerRepository.save(emp);

        return userMapper.toResponse(savedUser);
    }


    public Employer getEmployerById(UUID id) {
        var employer = employerRepository.findById(id).orElse(null);
        if(employer == null){
            throw new NotFoundException("User not found");
        }
        return employer;
    }


    public User updateEmployer(UpdateEmployerRequest request,UUID id) {
        var employer=employerRepository.findById(id).orElse(null);
        if(employer==null){
            throw new NotFoundException("User not found");
        }

        availabilityCheck(request.getEmail(), request.getRegistrationId());

        employerMapper.update(request,employer);
        employerRepository.save(employer);
        return userRepository.findById(employer.getId()).orElseThrow();
    }


    public ResponseEntity<Void> deleteEmployer(UUID id) {
        var employer = employerRepository.findById(id).orElse(null);
        if(employer == null){
            return ResponseEntity.notFound().build();
        }
        employerRepository.deleteById(id);
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void availabilityCheck(String email, String registrationId) {
        if (userRepository.existsUserByEmail(email)) {
            throw new BadRequestException("Email already exists");
        }

        if (employerRepository.existsByRegistrationId(registrationId)) {
            throw new BadRequestException("Registration id already exists");
        }
    }
}
