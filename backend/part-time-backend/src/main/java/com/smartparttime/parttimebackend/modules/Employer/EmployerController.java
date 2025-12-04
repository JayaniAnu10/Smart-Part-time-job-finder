package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerAllDto;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerDto;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.UpdateEmployerRequest;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerDto;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserDto;
import com.smartparttime.parttimebackend.modules.User.UserMapper;
import com.smartparttime.parttimebackend.modules.User.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/employer")
public class EmployerController {
    private final EmployerService employerService;
    private final UserRepository userRepository;
    private final EmployerRepository employerRepository;
    private final EmployerMapper employerMapper;
    private final UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(
            @Valid @RequestBody EmployerRegisterRequest request,
            UriComponentsBuilder uriBuilder)  {

        var userDto = employerService.addEmployee(request);
        var uri = uriBuilder.path("/users/{id}").buildAndExpand(userDto.getId()).toUri();
        return ResponseEntity.created(uri).body(userDto);

    }

    @GetMapping
    public Iterable<EmployerAllDto> getAllEmployers() {
        return employerRepository.findAll()
                .stream()
                .map(employerMapper::toDto)
                .toList();
    }


    @GetMapping("/{id}")
    public ResponseEntity<EmployerDto> getEmployerById(@PathVariable UUID id) {
        var employer= employerService.getEmployerById(id);
        return ResponseEntity.ok(employerMapper.toEmployerDto(employer));
    }


    @PatchMapping("/{id}")
    public ResponseEntity<?> updateEmployer(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateEmployerRequest request
    ){
        var user = employerService.updateEmployer(request,id);
        return ResponseEntity.ok(userMapper.toDto(user));
    }

}
