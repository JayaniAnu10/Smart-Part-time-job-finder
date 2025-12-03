package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.smartparttime.parttimebackend.modules.Employer.EmployerRepository;
import com.smartparttime.parttimebackend.modules.Employer.EmployerService;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerRegisterRequest;
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

@AllArgsConstructor
@RestController
@RequestMapping("/jobseeker")
public class JobSeekerController {
    private final EmployerService employerService;
    private final UserRepository userRepository;
    private final JobSeekerService jobSeekerService;
    private final JobSeekerRepository jobSeekerRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerSeeker(
            @Valid @RequestBody JobSeekerRegisterRequest request,
            UriComponentsBuilder uriBuilder
            ){
        if(userRepository.existsUserByEmail(request.getEmail())){
            return ResponseEntity.badRequest().body(
                    Map.of("email","Email already exists"));
        }

        if(jobSeekerRepository.existsByNic(request.getNic())){
            return ResponseEntity.badRequest().body(
                    Map.of("registrationId","Your registration id already exists"));
        }

        if(!request.getPassword().equals(request.getConfirmPassword())){
            return ResponseEntity.badRequest().body(
                    Map.of("password","Passwords do not match"));
        }

        var userDto = jobSeekerService.addSeeker(request);
        var uri = uriBuilder.path("/users/{id}").buildAndExpand(userDto.getId()).toUri();
        return ResponseEntity.created(uri).body(userDto);
    }
}
