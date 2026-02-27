package com.smartparttime.parttimebackend.modules.Admin.controller;


import com.smartparttime.parttimebackend.modules.Admin.dto.AdminJobDetailsViewDto;
import com.smartparttime.parttimebackend.modules.Admin.dto.AdminJobDto;
import com.smartparttime.parttimebackend.modules.Admin.mapper.AdminJobMapper;
import com.smartparttime.parttimebackend.modules.Admin.repo.AdminJobRepo;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminJobService;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin/jobs")
public class AdminJobController {

    @Autowired
    private AdminJobService adminJobService;


    @GetMapping
    public List<AdminJobDto> getJobs() {
        return adminJobService.getAllJobs();
    }


    @GetMapping("/{id}")
    public AdminJobDto getJob(@PathVariable UUID id) {
        return adminJobService.getJobById(id);
    }

    @GetMapping("/status/{status}")
    public List<AdminJobDto> getJobsByStatus(@PathVariable JobStatus status) {
        return adminJobService.getJobsByStatus(status);
    }

    @PatchMapping("/{id}/approve")
    public AdminJobDto approveJob(@PathVariable UUID id) {
        return adminJobService.approveJob(id);
    }

    @PatchMapping("/{id}/reject")
    public AdminJobDto rejectJob(@PathVariable UUID id) {
        return adminJobService.rejectJob(id);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable UUID id) {
        adminJobService.deleteJob(id);
        return "Job deleted successfully";
    }


    @GetMapping("/search")
    public List<AdminJobDto> searchJobs(@RequestParam String keyword) {
        return adminJobService.searchJobs(keyword);
    }


    @GetMapping("/{id}/details")
    public AdminJobDetailsViewDto getJobDetails(@PathVariable UUID id) {
        return adminJobService.getJobDetails(id);
    }

    @GetMapping("/recent")
    public List<AdminJobDto> getRecentJobs() {
        return adminJobService.getRecentJobs();
    }



}
