package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.common.imageStorage.AzureImageStorageClient;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.*;
import com.smartparttime.parttimebackend.modules.User.*;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import com.smartparttime.parttimebackend.modules.User.UserExceptions.PasswordMismatchException;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
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
    public JobSeekerDto addSeeker(@Valid JobSeekerRegisterRequest request,
                                  MultipartFile profilePicture) throws IOException {
        availabilityCheck(request.getUserId(), request.getNic());

        var user = userRepository.findById(request.getUserId()).orElse(null);

        if (user == null) {
            throw new NotFoundException("User has not registered");
        }

        user.setIsJobseeker(true);

        var seeker=jobSeekerMapper.toEntity(request);
        seeker.setUser(user);
        user.setJobSeeker(seeker);

        if(profilePicture!=null && !profilePicture.isEmpty()){
            uploadImage(profilePicture, seeker);
        }


        userRepository.save(user);

        return jobSeekerMapper.toJobSeekerDto(seeker);
    }


    public JobSeeker getJobSeekerById(UUID id){
        var seeker = jobSeekerRepository.findById(id).orElse(null);
        if (seeker == null) {
            throw new NotFoundException("User not found");
        }
        return seeker;
    }

    public JobSeekerApplicantProfile getJobSeekerProfile(UUID id){
        jobSeekerRepository.findById(id).orElseThrow();
        var seeker= jobSeekerRepository.getJobSeekerProfile(id);
        var jobs = jobSeekerRepository.getJobSeekerJobs(id);

        JobSeekerApplicantProfile profile = new JobSeekerApplicantProfile();
        profile.setProfileDetails(seeker);
        profile.setJobDetails(jobs);

        return profile;

    }


    public JobSeekerDto updateJobSeeker(UpdateJobSeekerRequest request, UUID id) {
        var jobSeeker=jobSeekerRepository.findById(id).orElse(null);
        if(jobSeeker==null){
            throw new NotFoundException("JobSeeker not found");
        }

        if (jobSeekerRepository.existsByNic(request.getNic())) {
            throw new BadRequestException("Job seeker already exists");
        }

        jobSeekerMapper.update(request,jobSeeker);
        jobSeekerRepository.save(jobSeeker);
        return jobSeekerMapper.toJobSeekerDto(jobSeeker);
    }

    @Transactional
    public void updateProfile(MultipartFile profilePicture,UUID id) throws IOException {
        var seeker = jobSeekerRepository.findById(id).orElseThrow();
        var oldImageUrl = seeker.getProfilePicture();
        boolean isImageUpdated = false;

        if(profilePicture!=null && !profilePicture.isEmpty()){
            uploadImage(profilePicture, seeker);
            isImageUpdated = true;
        }

        jobSeekerRepository.save(seeker);

        if (isImageUpdated && oldImageUrl!= null) {
            imageStorageClient.deleteImage(oldImageUrl);
        }
    }



    private void uploadImage(MultipartFile profilePicture, JobSeeker seeker) throws IOException {
        String originalFilename = profilePicture.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            originalFilename = "unknown_file.jpg";
        }

        String containerName="blob-posts";
        try(InputStream inputStream= profilePicture.getInputStream()){
            String contentType = profilePicture.getContentType();
            String imageUrl= imageStorageClient.uploadImage(containerName, originalFilename,inputStream,contentType);
            seeker.setProfilePicture(imageUrl);
        }
    }

    @Transactional
    public ResponseEntity<Void> deleteSeeker(UUID id) {
        var seeker = jobSeekerRepository.findById(id).orElse(null);
        if(seeker == null){
            return ResponseEntity.notFound().build();
        }

        var user = userRepository.findById(seeker.getId()).orElseThrow();
        jobSeekerRepository.deleteById(id);

        user.setIsJobseeker(false);
        user.setJobSeeker(null);
        userRepository.save(user);


        return ResponseEntity.noContent().build();
    }


    private void availabilityCheck(UUID id, String nic) {
        if (jobSeekerRepository.existsById(id)) {
            throw new BadRequestException("Already registered as a seeker");
        }

        if (jobSeekerRepository.existsByNic(nic)) {
            throw new BadRequestException("Job seeker already exists");
        }
    }

}
