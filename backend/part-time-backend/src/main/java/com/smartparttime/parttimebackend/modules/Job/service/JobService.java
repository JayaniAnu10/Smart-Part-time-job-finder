package com.smartparttime.parttimebackend.modules.Job.service;

import com.smartparttime.parttimebackend.modules.Job.dto.JobRequestDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface JobService {


    JobResponseDto createJob(JobRequestDto request, UUID employerId);

    List<JobResponseDto> getAllJobs();

    JobResponseDto getJobById(UUID jobId);


    List<JobResponseDto> getJobsByEmployer(UUID employerId);

    Page<JobResponseDto> searchJobs(Integer categoryId,
                                    String location,
                                    String jobType,
                                    String keyword,
                                    int page,
                                    int size);

    JobResponseDto updateJob(UUID jobId, JobRequestDto dto);

    void deleteJob(UUID jobId);
}
