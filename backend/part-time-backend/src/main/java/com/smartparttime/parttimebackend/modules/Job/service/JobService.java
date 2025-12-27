package com.smartparttime.parttimebackend.modules.Job.service;

import com.smartparttime.parttimebackend.modules.Job.dto.JobCategoryDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobRequestDto;
import com.smartparttime.parttimebackend.modules.Job.dto.JobResponseDto;
import com.smartparttime.parttimebackend.modules.Job.dto.NearJobResponse;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobCategory;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface JobService {


    JobResponseDto createJob(JobRequestDto request, UUID employerId);

    List<JobResponseDto> getAllJobs();

    JobResponseDto getJobById(UUID jobId);

    List<JobResponseDto> getJobsByEmployer(UUID employerId,int page,int size);

    Page<JobResponseDto> filterJobsBySpecification(String location, String jobType, String title, String skills , String category, String description, LocalDate date, BigDecimal minSalary, BigDecimal maxSalary,String requiredGender, int page, int size);

    JobResponseDto updateJob(UUID jobId, JobRequestDto dto);

    void deleteJob(UUID jobId);

    Page<JobResponseDto> getByLocation(int page, int size, String location);

    List<NearJobResponse> getNearByJobs(double userLat, double userLng, double radius);

    void markUrgent(UUID jobId, boolean urgent);

    List<JobCategoryDto> getCategories();


}
