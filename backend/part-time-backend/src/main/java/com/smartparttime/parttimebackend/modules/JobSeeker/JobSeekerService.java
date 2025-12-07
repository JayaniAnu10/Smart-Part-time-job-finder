package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.common.imageStorage.AzureImageStorageClient;
import com.smartparttime.parttimebackend.common.imageStorage.ImageStorageClient;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerRegisterRequest;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.UpdateJobSeekerRequest;
import com.smartparttime.parttimebackend.modules.User.*;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import com.smartparttime.parttimebackend.modules.User.UserExceptions.PasswordMismatchException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@AllArgsConstructor
@Service
public class JobSeekerService {
    private final JobSeekerMapper jobSeekerMapper;
    private final UserMapper userMapper;
    private final JobSeekerRepository jobSeekerRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final AzureImageStorageClient imageStorageClient;

    @Transactional
    public UserRegisterResponse addSeeker(@Valid JobSeekerRegisterRequest request,
                                          MultipartFile profilePicture) throws IOException {
        availabilityCheck(request.getEmail(), request.getNic());

        if(!request.getPassword().equals(request.getConfirmPassword())){
            throw new PasswordMismatchException("Passwords do not match");
        }

        var user = userMapper.seekerToEntity(request);
        user.setRole(Role.JOBSEEKER);
        var savedUser = userService.registerUser(user);

        var seeker=jobSeekerMapper.toEntity(request);
        seeker.setUser(savedUser);


        if(profilePicture!=null && !profilePicture.isEmpty()){
            String originalFilename = profilePicture.getOriginalFilename();
            if (originalFilename == null || originalFilename.isBlank()) {
                originalFilename = "unknown_file.jpg";
            }

            String containerName="blob-posts";
            try(InputStream inputStream=profilePicture.getInputStream()){
                String contentType = profilePicture.getContentType();
                String imageUrl= imageStorageClient.uploadImage(containerName, originalFilename,inputStream,contentType);
                seeker.setProfilePicture(imageUrl);
            }
        }

        jobSeekerRepository.save(seeker);

        return userMapper.toResponse(savedUser);
    }


    public JobSeeker getJobSeekerById(UUID id){
        var seeker = jobSeekerRepository.findById(id).orElse(null);
        if (seeker == null) {
            throw new NotFoundException("User not found");
        }
        return seeker;
    }


    public User updateJobSeeker(UpdateJobSeekerRequest request,UUID id) {
        var jobSeeker=jobSeekerRepository.findById(id).orElse(null);
        if(jobSeeker==null){
            throw new NotFoundException("JobSeeker not found");
        }

        availabilityCheck(request.getEmail(), request.getNic());

        jobSeekerMapper.update(request,jobSeeker);
        jobSeekerRepository.save(jobSeeker);
        return userRepository.findById(jobSeeker.getId()).orElseThrow();
    }


    public ResponseEntity<Void> deleteSeeker(UUID id) {
        var seeker = jobSeekerRepository.findById(id).orElse(null);
        if(seeker == null){
            return ResponseEntity.notFound().build();
        }
        jobSeekerRepository.deleteById(id);
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    private void availabilityCheck(String email, String nic) {
        if (userRepository.existsUserByEmail(email)) {
            throw new BadRequestException("Email already exists");
        }

        if (jobSeekerRepository.existsByNic(nic)) {
            throw new BadRequestException("Job seeker already exists");
        }
    }

}
