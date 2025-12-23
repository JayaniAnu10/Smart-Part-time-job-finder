package com.smartparttime.parttimebackend.modules.Application.controller;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.dtos.ApplicantsResponse;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicationRequest;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicationResponse;
import com.smartparttime.parttimebackend.modules.Application.service.JobApplicationService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/applications")
@AllArgsConstructor
public class ApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplicationResponse> submitApplication(@RequestBody JobApplicationRequest request) {
       var applied = jobApplicationService.createApplication(request);
       return ResponseEntity.ok(applied);
    }

    @GetMapping("/{id}")
    public JobApplicationResponse getApplication(@PathVariable UUID id) {
        return jobApplicationService.getApplication(id);
    }

    @GetMapping("/user/{id}")
    public List<JobApplicationResponse> getAllApplications(
            @PathVariable UUID id,
            @RequestParam(required = false) ApplicationStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (status != null){
            return jobApplicationService.getApplicationsByStatus(id,status, page, size);
        }

        return jobApplicationService.getUserApplications(id, page, size);
    }

    @GetMapping("/job/{id}")
    public Page<ApplicantsResponse> getApplicationsByJobId(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return jobApplicationService.getApplicationsByJob(id, page, size);

    }

    @PatchMapping("/{id}")
    public JobApplicationResponse updateApplicationStatus(
            @PathVariable UUID id,
            @RequestParam ApplicationStatus status) {
        return jobApplicationService.updateApplicationStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void  deleteJobApplication(
            @PathVariable UUID id
    ) {
        jobApplicationService.deleteApplication(id);
    }


}
