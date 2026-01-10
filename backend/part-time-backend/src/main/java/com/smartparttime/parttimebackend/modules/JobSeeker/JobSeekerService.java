package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.common.imageStorage.AzureImageStorageClient;
import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.repo.JobApplicationRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceStatus;
import com.smartparttime.parttimebackend.common.Services.EmbeddingService;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.*;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public class JobSeekerService {
    private final JobSeekerMapper jobSeekerMapper;
    private final EmbeddingService embeddingService;
    private final JobSeekerRepository jobSeekerRepository;
    private final UserRepository userRepository;
    private final AzureImageStorageClient imageStorageClient;
    private final JobApplicationRepository jobApplicationRepository;
    private final AttendanceRepository attendanceRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

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


        var savedUser= userRepository.save(user);
        generateSeekerEmbedding(savedUser.getId());

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

    @Transactional
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

        generateSeekerEmbedding(jobSeeker.getId());

        return jobSeekerMapper.toJobSeekerDto(jobSeeker);
    }

    public SeekerStatsDto seekerStats(UUID id) {
        var seeker = jobSeekerRepository.findById(id).orElse(null);
        if (seeker == null) {
            throw new NotFoundException("JobSeeker not found");
        }

        String fullName = seeker.getFirstName();
        var countUpcomingJobs=jobApplicationRepository.countByJobseeker_IdAndStatusNotAndSchedule_StartDatetimeAfter(id,ApplicationStatus.REJECTED, LocalDateTime.now());
        var activeApplications= jobApplicationRepository.countByJobseeker_IdAndStatusAndSchedule_StartDatetimeAfter(id,ApplicationStatus.PENDING,LocalDateTime.now());

        var earning = attendanceRepository.totalEarning(id, AttendanceStatus.CHECKED_OUT);
        var trustScore= userRepository.findById(id).get().getTrustScore();

        var upcomingJobs=attendanceRepository.jobsTo(id);
        return new SeekerStatsDto(fullName, countUpcomingJobs,activeApplications,earning,trustScore,upcomingJobs);


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

    @Transactional
    public void generateSeekerEmbedding(UUID seekerId) {
        JobSeeker seeker = jobSeekerRepository.findById(seekerId)
                .orElseThrow(() -> new NotFoundException("JobSeeker not found"));

        // Combine profile info to a single text string
        String profileText = String.format("%s %s %s %s",
                seeker.getSkills() != null ? seeker.getSkills() : "",
                seeker.getBio(),
                seeker.getGender(),
                seeker.getAddress()
        );

        List<Float> embedding = embeddingService.getEmbedding(profileText);

        try {
            // Store as JSON in the DB
            seeker.setEmbedding(objectMapper.writeValueAsString(embedding));
            jobSeekerRepository.save(seeker);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save embedding", e);
        }
    }


}
