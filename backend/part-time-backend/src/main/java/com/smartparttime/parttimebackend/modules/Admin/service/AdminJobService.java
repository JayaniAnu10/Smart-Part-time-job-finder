package com.smartparttime.parttimebackend.modules.Admin.service;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminJobDetailsViewDto;
import com.smartparttime.parttimebackend.modules.Admin.dto.AdminJobDto;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;

import java.util.List;
import java.util.UUID;

public interface AdminJobService {

    List<AdminJobDto> getAllJobs();

    AdminJobDto getJobById(UUID jobId);

    List<AdminJobDto> getJobsByStatus(JobStatus status);

    AdminJobDto approveJob(UUID jobId);

    AdminJobDto rejectJob(UUID jobId);

    void deleteJob(UUID jobId);

    List<AdminJobDto> searchJobs(String keyword);

    AdminJobDetailsViewDto getJobDetails(UUID id);

    public List<AdminJobDto> getRecentJobs();



}
