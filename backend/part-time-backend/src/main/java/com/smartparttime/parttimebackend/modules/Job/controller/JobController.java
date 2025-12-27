package com.smartparttime.parttimebackend.modules.Job.controller;

import com.smartparttime.parttimebackend.modules.Job.dto.JobCategoryDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobRequestDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobResponseDto;
import com.smartparttime.parttimebackend.modules.Job.dto.NearJobResponse;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobCategory;
import com.smartparttime.parttimebackend.modules.Job.repo.JobCategoryRepo;
import com.smartparttime.parttimebackend.modules.Job.repo.JobRepo;
import com.smartparttime.parttimebackend.modules.Job.service.JobService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping("/create/{employerId}")
    public ResponseEntity<?> addJob(@Valid @RequestBody JobRequestDto jobRequestDto,
                                    @PathVariable UUID employerId) {
        try {
            JobResponseDto savedJob = jobService.createJob(jobRequestDto, employerId);
            return new ResponseEntity<>(savedJob, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }



    @GetMapping
    public ResponseEntity<List<JobResponseDto>> getAllJobs() {
        List<JobResponseDto> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }


    @GetMapping("/{id}")
    public ResponseEntity<JobResponseDto> getJobById(@PathVariable UUID id) {
        JobResponseDto job = jobService.getJobById(id);
        return ResponseEntity.ok(job);
    }



    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<JobResponseDto>> getJobsByEmployer(
            @PathVariable UUID employerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        List<JobResponseDto> jobs = jobService.getJobsByEmployer(employerId,page,size);
        return ResponseEntity.ok(jobs);
    }


    @GetMapping("/search")
    public ResponseEntity<Page<JobResponseDto>> searchJobs(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String keywords,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String skills,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false) BigDecimal minSalary,
            @RequestParam(required = false) BigDecimal maxSalary,
            @RequestParam(required = false) String requiredGender,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<JobResponseDto> jobs = jobService.filterJobsBySpecification(
                location,
                jobType,
                title,
                skills,
                category,
                keywords,
                date,
                minSalary,
                maxSalary,
                requiredGender,
                page,
                size);
        return ResponseEntity.ok(jobs);
    }


    @PatchMapping("/{jobId}")
    public ResponseEntity<JobResponseDto> updateJob(@PathVariable UUID jobId,
                                                    @RequestBody JobRequestDto jobRequestDto) {
        JobResponseDto updated = jobService.updateJob(jobId, jobRequestDto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/location")
    public ResponseEntity<?> getJobsByLocation(
            @RequestParam String location,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        Page<JobResponseDto> jobs = jobService.getByLocation(page,size,location);
        return ResponseEntity.ok(jobs);
    }


    @DeleteMapping("/{jobId}")
    public ResponseEntity<String> deleteJob(@PathVariable UUID jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.ok("Job deleted successfully");
    }


    @GetMapping("/nearby")
    public ResponseEntity<List<NearJobResponse>> getNearbyJobs(
            @RequestParam double latitude,
            @RequestParam double longitude,
            @RequestParam(defaultValue = "10") double radius // in km
    ) {
        List<NearJobResponse> jobs = jobService.getNearByJobs(latitude, longitude, radius);
        return ResponseEntity.ok(jobs);
    }


    @PatchMapping("/{jobId}/urgent")
    public void markJobUrgent(
            @PathVariable UUID jobId,
            @RequestParam boolean urgent
    ) {
        jobService.markUrgent(jobId, urgent);
    }

    @GetMapping("/category")
    public List<JobCategoryDto> getCategories(){
        return jobService.getCategories();
    }

}
