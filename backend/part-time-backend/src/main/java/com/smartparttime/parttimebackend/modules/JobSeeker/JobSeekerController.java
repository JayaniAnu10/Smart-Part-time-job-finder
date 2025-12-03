package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerAllDto;
import com.smartparttime.parttimebackend.modules.Employer.EmployerRepository;
import com.smartparttime.parttimebackend.modules.Employer.EmployerService;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerAllDto;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerDto;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserDto;
import com.smartparttime.parttimebackend.modules.User.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/jobseeker")
public class JobSeekerController {
    private final EmployerService employerService;
    private final UserRepository userRepository;
    private final JobSeekerService jobSeekerService;
    private final JobSeekerRepository jobSeekerRepository;
    private final JobSeekerMapper jobSeekerMapper;

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

    @GetMapping
    public Iterable<JobSeekerAllDto> getAllJobSeekers() {
        return jobSeekerRepository.findAll()
                .stream()
                .map(jobSeekerMapper::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobSeekerDto> getSeekerById(@PathVariable UUID id) {
        var seeker= jobSeekerService.getJobSeekerById(id);
        return ResponseEntity.ok(jobSeekerMapper.toJobSeekerDto(seeker));
    }
}
