package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.*;
import com.smartparttime.parttimebackend.modules.User.UserMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/employer")
public class EmployerController {
    private final EmployerService employerService;
    private final EmployerRepository employerRepository;
    private final EmployerMapper employerMapper;


    @PostMapping(value = "/register",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerEmployee(
            @Valid @RequestPart("request") EmployerRegisterRequest request,
            @RequestPart(value = "image",required = false) MultipartFile logo,
            UriComponentsBuilder uriBuilder){

        try{
            var userDto = employerService.addEmployee(request,logo);
            var uri = uriBuilder.path("/users/{id}").buildAndExpand(userDto.getUserId()).toUri();
            return ResponseEntity.created(uri).body(userDto);
        } catch(IOException e){
            return ResponseEntity.badRequest().body(Map.of("error","Failed to upload logo"));
        }


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
    public EmployerDto updateEmployer(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateEmployerRequest request
    ){
       return employerService.updateEmployer(request,id);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployer(@PathVariable UUID id){

        return employerService.deleteEmployer(id);
    }

    @PutMapping(value = "/{id}/logo",consumes =MediaType.MULTIPART_FORM_DATA_VALUE )
    public ResponseEntity<Void> updateLogo(
            @PathVariable UUID id,
            @RequestPart("image") MultipartFile logo
    ) throws IOException {

        employerService.updateProfile(logo,id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/stats/{id}")
    public ResponseEntity<EmployerStats> getEmployerStats(
            @PathVariable UUID id
    ){
        return ResponseEntity.ok(employerService.employerStats(id));
    }

}
