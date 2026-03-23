package com.smartparttime.parttimebackend.modules.Job.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.smartparttime.parttimebackend.modules.Job.dto.JobCategoryDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobListingResponse;
import com.smartparttime.parttimebackend.modules.Job.dto.JobRequestDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobResponseDto;
import com.smartparttime.parttimebackend.modules.Job.dto.NearJobResponse;
import com.smartparttime.parttimebackend.modules.Job.dto.PublicStatsDto;
import com.smartparttime.parttimebackend.modules.Job.service.JobService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final JobService jobService;

    @PostMapping("/create/{employerId}")
    public ResponseEntity<?> addJob(@Valid @RequestBody JobRequestDto jobRequestDto,
                                    @PathVariable UUID employerId) {
        try {
            JobResponseDto savedJob = jobService.createJob(jobRequestDto, employerId);
            return new ResponseEntity<>(savedJob, HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);
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
    public ResponseEntity<JobListingResponse> searchJobs(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String query,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false) BigDecimal minSalary,
            @RequestParam(required = false) BigDecimal maxSalary,
            @RequestParam(required = false) String requiredGender,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        JobListingResponse jobs = jobService.filterJobsBySpecification(
                location,
                jobType,
                query,
                category,
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




    @GetMapping("/category")
    public List<JobCategoryDto> getCategories(){
        return jobService.getCategories();
    }

    @GetMapping("/reverse")
    public ResponseEntity<String> reverseGeocode(@RequestParam double lat, @RequestParam double lon) {
        String url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lon;

        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "SmartPartTime/1.0 (contact@smartparttime.lk)"); // Nominatim requires User-Agent

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/stats")
    public PublicStatsDto getPublicStats() {
        return jobService.getPublicStats();
    }

}
