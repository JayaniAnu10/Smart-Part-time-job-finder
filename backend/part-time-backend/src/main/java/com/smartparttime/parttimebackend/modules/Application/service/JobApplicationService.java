package com.smartparttime.parttimebackend.modules.Application.service;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicantsResponse;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicationRequest;
import com.smartparttime.parttimebackend.modules.Application.dtos.JobApplicationResponse;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface JobApplicationService {

    JobApplicationResponse createApplication(JobApplicationRequest request);

    JobApplicationResponse getApplication(UUID id);

    List<JobApplicationResponse> getUserApplications(UUID id, int page, int size);

    List<JobApplicationResponse> getApplicationsByStatus(UUID id, ApplicationStatus status, int page ,int size);

    JobApplicantsResponse getApplicationsByJob(UUID jobId, int page, int size);

    JobApplicationResponse updateApplicationStatus(UUID id,ApplicationStatus status);

    void deleteApplication(UUID id);
}
