package com.smartparttime.parttimebackend.modules.Admin.service.impl;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminJobDto;
import com.smartparttime.parttimebackend.modules.Admin.mapper.AdminJobMapper;
import com.smartparttime.parttimebackend.modules.Admin.repo.AdminJobRepo;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminJobService;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdminJobServiceImpl implements AdminJobService {

    @Autowired
    private  AdminJobRepo adminJobRepo;
    @Autowired
    private  AdminJobMapper adminJobMapper;



    @Override
    public List<AdminJobDto> getAllJobs() {
        return adminJobRepo.findAllJobsWithDetails()
                .stream()
                .map(adminJobMapper::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public AdminJobDto getJobById(UUID jobId) {
        Job job = adminJobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return adminJobMapper.mapToDto(job);
    }

    @Override

    public List<AdminJobDto> getJobsByStatus(JobStatus status) {
        return adminJobRepo.findByStatus(status)
                .stream()
                .map(adminJobMapper::mapToDto)
                .collect(Collectors.toList());
    }


    @Override
    public AdminJobDto approveJob(UUID jobId) {
        Job job = adminJobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setStatus(JobStatus.ACTIVE);
        adminJobRepo.save(job);

        return adminJobMapper.mapToDto(job);
    }

    @Override
    public AdminJobDto rejectJob(UUID jobId) {
        Job job = adminJobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setStatus(JobStatus.CLOSED);
        adminJobRepo.save(job);

        return adminJobMapper.mapToDto(job);
    }

    @Override
    public void deleteJob(UUID jobId) {
        if (!adminJobRepo.existsById(jobId)) {
            throw new RuntimeException("Job not found");
        }
        adminJobRepo.deleteById(jobId);
    }

    @Override
    public List<AdminJobDto> searchJobs(String keyword) {
        return adminJobRepo.searchJobs(keyword)
                .stream()
                .map(adminJobMapper::mapToDto)
                .collect(Collectors.toList());
    }
}
