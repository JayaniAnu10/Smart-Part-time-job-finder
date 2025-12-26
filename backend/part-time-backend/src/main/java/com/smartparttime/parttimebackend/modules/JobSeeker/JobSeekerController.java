package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.smartparttime.parttimebackend.common.imageStorage.AzureImageStorageClient;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.*;
import com.smartparttime.parttimebackend.modules.User.UserMapper;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/jobseeker")
public class JobSeekerController {
    private final UserMapper userMapper;
    private final JobSeekerService jobSeekerService;
    private final JobSeekerRepository jobSeekerRepository;
    private final JobSeekerMapper jobSeekerMapper;

    @PostMapping(path = "/register",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerSeeker(
            @Valid @RequestPart("request") JobSeekerRegisterRequest request,
            @RequestPart(value = "image",required = false) MultipartFile profilePicture,
            UriComponentsBuilder uriBuilder
            ){

        try{
            var userDto = jobSeekerService.addSeeker(request,profilePicture);
            var uri = uriBuilder.path("/users/{id}").buildAndExpand(userDto.getUserId()).toUri();
            return ResponseEntity.created(uri).body(userDto);
        } catch(IOException e){
            return ResponseEntity.badRequest().body(Map.of("error","Failed to upload profile picture"));
        }

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

    @GetMapping("profile/{id}")
    public JobSeekerApplicantProfile getSeekerProfile(@PathVariable UUID id) {
        return jobSeekerService.getJobSeekerProfile(id);

    }


    @PatchMapping("/{id}")
    public JobSeekerDto updateJobSeeker(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateJobSeekerRequest request
    ){
        return jobSeekerService.updateJobSeeker(request,id);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJobSeeker(@PathVariable UUID id){
        return jobSeekerService.deleteSeeker(id);
    }

    @PutMapping(value = "/{id}/profile-picture",consumes =MediaType.MULTIPART_FORM_DATA_VALUE )
    public ResponseEntity<Void> updateProfilePicture(
            @PathVariable UUID id,
            @RequestPart("image") MultipartFile profilePicture
    ) throws IOException {

        jobSeekerService.updateProfile(profilePicture,id);

        return ResponseEntity.ok().build();
    }
}
