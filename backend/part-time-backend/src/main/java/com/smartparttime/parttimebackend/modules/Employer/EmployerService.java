package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.common.imageStorage.AzureImageStorageClient;
import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.repo.JobApplicationRepository;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerDto;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerRegisterRequest;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.EmployerStats;
import com.smartparttime.parttimebackend.modules.Employer.EmployerDtos.UpdateEmployerRequest;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.User.*;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@AllArgsConstructor
@Service
public class EmployerService {
    private final EmployerRepository employerRepository;
    private final EmployerMapper employerMapper;
    private final UserRepository userRepository;
    private final AzureImageStorageClient imageStorageClient;
    private final JobRepo jobRepo;
    private final JobApplicationRepository jobApplicationRepository;

    @Transactional
    public EmployerDto addEmployee(@Valid EmployerRegisterRequest request, MultipartFile logo) throws IOException {
        availabilityCheck(request.getUserId(), request.getRegistrationId());

        var user = userRepository.findById(request.getUserId()).orElse(null);
        if (user == null) {
            throw new NotFoundException("User is not registered");
        }

        user.setIsEmployer(true);

        var emp=employerMapper.toEntity(request);
        emp.setUser(user);

        user.setEmployer(emp);

        if (logo != null && !logo.isEmpty()) {
            uploadImage(logo,emp);
        }

        userRepository.save(user);

        return employerMapper.toEmployerDto(emp);
    }


    public Employer getEmployerById(UUID id) {
        var employer = employerRepository.findById(id).orElse(null);
        if(employer == null){
            throw new NotFoundException("User not found");
        }
        return employer;
    }


    public EmployerDto updateEmployer(UpdateEmployerRequest request, UUID id) {
        var employer=employerRepository.findById(id).orElse(null);
        if(employer==null){
            throw new NotFoundException("User not found");
        }

        if (employerRepository.existsByRegistrationId(request.getRegistrationId())) {
            throw new BadRequestException("Registration id already exists");
        }


        employerMapper.update(request,employer);
        employerRepository.save(employer);
        return employerMapper.toEmployerDto(employer);
    }


    @Transactional
    public void updateProfile(MultipartFile logo,UUID id) throws IOException {
        var employer = employerRepository.findById(id).orElseThrow();
        var oldImageUrl = employer.getLogo();
        boolean isImageUpdated =  false;

        if(logo!=null && !logo.isEmpty()){
            uploadImage(logo, employer);
            isImageUpdated = true;
        }

        employerRepository.save(employer);

        if (isImageUpdated && oldImageUrl!= null) {
            imageStorageClient.deleteImage(oldImageUrl);
        }
    }



    private void uploadImage(MultipartFile logo, Employer employer) throws IOException {
        String originalFilename = logo.getOriginalFilename();
        if (originalFilename == null || originalFilename.isBlank()) {
            originalFilename = "unknown_file.jpg";
        }

        String containerName="blob-posts";
        try(InputStream inputStream= logo.getInputStream()){
            String contentType = logo.getContentType();
            String imageUrl= imageStorageClient.uploadImage(containerName, originalFilename,inputStream,contentType);
            employer.setLogo(imageUrl);
        }
    }


    @Transactional
    public ResponseEntity<Void> deleteEmployer(UUID id) {
        var employer = employerRepository.findById(id).orElse(null);
        if(employer == null){
            return ResponseEntity.notFound().build();
        }
        var user = userRepository.findById(employer.getId()).orElseThrow();


        employerRepository.deleteById(id);

        user.setIsEmployer(false);
        user.setEmployer(null);
        userRepository.save(user);


        return ResponseEntity.noContent().build();
    }

    private void availabilityCheck(UUID id, String registrationId) {
        if (employerRepository.existsById(id)) {
            throw new BadRequestException("Already registered as an employer");
        }

        if (employerRepository.existsByRegistrationId(registrationId)) {
            throw new BadRequestException("Registration id already exists");
        }
    }


    public EmployerStats employerStats(UUID id) {
        var employer = employerRepository.findById(id).orElse(null);
        if (employer == null) {
            throw new NotFoundException("Employer not found");
        }

        var jobCount = jobRepo.countByEmployer_IdAndStatus(id, JobStatus.ACTIVE);
        var applicantCount = jobApplicationRepository.countByJob_Employer_Id(id);
        var pendingReviewCount =jobApplicationRepository.countByJob_Employer_IdAndStatus(id, ApplicationStatus.PENDING);
        var jobs = jobRepo.getJobStatsByEmployer(id);
        var monthRate =calculateMonthlyGrowth(id);


        return employerMapper.toEmpStat(jobCount,applicantCount,pendingReviewCount,jobs,monthRate);
    }

    private Double calculateMonthlyGrowth(UUID id) {
        Object result = jobApplicationRepository.countThisAndLastMonthApplications(id);
        Object[] counts = (Object[]) result;

        long thisMonthCount = counts[0] != null ? ((Number) counts[0]).longValue() : 0L;
        long lastMonthCount = counts[1] != null ? ((Number) counts[1]).longValue() : 0L;

        if (lastMonthCount == 0) {
            return thisMonthCount > 0 ? 100.0 : 0.0;
        }

        return ((thisMonthCount - lastMonthCount) * 100.0) / lastMonthCount;
    }
}
