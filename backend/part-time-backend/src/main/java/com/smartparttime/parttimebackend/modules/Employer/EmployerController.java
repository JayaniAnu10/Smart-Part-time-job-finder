package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/employer")
public class EmployerController {
    private final EmployerService employerService;
    private final UserRepository userRepository;
    private final EmployerRepository employerRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(
            @Valid @RequestBody EmployerRegisterRequest request,
            UriComponentsBuilder uriBuilder)  {
        if(userRepository.existsUserByEmail(request.getEmail())){
            return ResponseEntity.badRequest().body(
                    Map.of("email","Email already exists"));
        }

        if(employerRepository.existsByRegistrationId(request.getRegistrationId())){
            return ResponseEntity.badRequest().body(
                    Map.of("registrationId","Your registration id already exists"));
        }

        if(!request.getPassword().equals(request.getConfirmPassword())){
            return ResponseEntity.badRequest().body(
                    Map.of("password","Passwords do not match"));
        }

        var userDto = employerService.addEmployee(request);
        var uri = uriBuilder.path("/users/{id}").buildAndExpand(userDto.getId()).toUri();
        return ResponseEntity.created(uri).body(userDto);
    }
}
