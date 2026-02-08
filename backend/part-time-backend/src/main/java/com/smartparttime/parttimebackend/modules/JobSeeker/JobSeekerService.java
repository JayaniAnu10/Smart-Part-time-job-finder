package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.common.imageStorage.AzureImageStorageClient;
import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.repo.JobApplicationRepository;
import com.smartparttime.parttimebackend.modules.Attendance.Attendance;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceRepository;
import com.smartparttime.parttimebackend.modules.Attendance.AttendanceStatus;
import com.smartparttime.parttimebackend.common.Services.EmbeddingService;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.*;
import com.smartparttime.parttimebackend.modules.Rating.RateRepository;
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
import com.smartparttime.parttimebackend.modules.Rating.RateRepository;
import com.smartparttime.parttimebackend.modules.Rating.Rate;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import java.math.BigDecimal;
import java.time.Duration;
import java.util.*;
import java.util.*;

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
    private final RateRepository rateRepository;

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


    public JobHistoryResponseDto getJobHistory(UUID seekerId) {
        // Verify job seeker exists
        var seeker = jobSeekerRepository.findById(seekerId)
                .orElseThrow(() -> new NotFoundException("Job seeker not found"));

        // Get user for average rate
        var user = userRepository.findById(seekerId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        // Get all completed attendances for this seeker
        var completedAttendances = attendanceRepository.findByUser_IdAndStatus(
                seekerId,
                AttendanceStatus.CHECKED_OUT
        );

        // Calculate total earnings and group by job
        BigDecimal totalEarnings = BigDecimal.ZERO;
        Map<UUID, List<Attendance>> jobAttendanceMap = new HashMap<>();

        for (Attendance attendance : completedAttendances) {
            if (attendance.getJob() != null) {
                jobAttendanceMap
                        .computeIfAbsent(attendance.getJob().getId(), k -> new ArrayList<>())
                        .add(attendance);

                // Add to total earnings
                if (attendance.getJob().getMinSalary() != null) {
                    totalEarnings = totalEarnings.add(attendance.getJob().getMinSalary());
                }
            }
        }

        // Build completed job details
        List<CompletedJobDetailDto> completedJobs = new ArrayList<>();

        for (Map.Entry<UUID, List<Attendance>> entry : jobAttendanceMap.entrySet()) {
            UUID jobId = entry.getKey();
            List<Attendance> attendances = entry.getValue();

            if (attendances.isEmpty()) continue;

            Job job = attendances.get(0).getJob();

            // Get employer name
            String employerName = job.getEmployer() != null ?
                    job.getEmployer().getCompanyName() : "N/A";

            // Collect all schedule dates and calculate worked hours
            List<LocalDateTime> scheduleDates = new ArrayList<>();
            double totalWorkedHours = 0.0;

            for (Attendance attendance : attendances) {
                if (attendance.getSchedule() != null) {
                    scheduleDates.add(attendance.getSchedule().getStartDatetime());

                    // Calculate worked hours from schedule
                    if (attendance.getSchedule().getStartDatetime() != null &&
                            attendance.getSchedule().getEndDatetime() != null) {

                        LocalDateTime start = attendance.getSchedule().getStartDatetime();
                        LocalDateTime end = attendance.getSchedule().getEndDatetime();

                        Duration duration = Duration.between(start, end);
                        totalWorkedHours += duration.toMinutes() / 60.0;
                    }
                }
            }

            // Get rating for this job (if seeker rated the employer/job)
            Rate rate = rateRepository.findByRateReceiver_IdAndRater_IdAndJob_Id(
                    job.getEmployer().getId(),
                    seekerId,
                    jobId
            );

            Integer rating = (rate != null) ? rate.getRating() : 0;
            UUID ratingId = (rate != null) ? rate.getId() : null;
            String ratingComment = (rate != null) ? rate.getComment() : null;

            CompletedJobDetailDto jobDetail = new CompletedJobDetailDto(
                    jobId,
                    job.getEmployer() != null ? job.getEmployer().getId() : null,
                    job.getTitle(),
                    employerName,
                    scheduleDates,
                    totalWorkedHours,
                    job.getMinSalary(),
                    rating,
                    ratingId,
                    ratingComment
            );

            completedJobs.add(jobDetail);
        }

        // Get average rate from user
        BigDecimal averageRate = user.getAverageRate() != null ?
                user.getAverageRate() : BigDecimal.ZERO;

        return new JobHistoryResponseDto(
                (long) jobAttendanceMap.size(),
                totalEarnings,
                averageRate,
                completedJobs
        );
    }

}
