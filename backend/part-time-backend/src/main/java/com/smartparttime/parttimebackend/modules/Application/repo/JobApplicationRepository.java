package com.smartparttime.parttimebackend.modules.Application.repo;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Job.dto.JobStatDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {

    List<JobApplication> findByJobseeker_Id(UUID jobseekerId, Pageable pageable);

    List<JobApplication> findByStatus(ApplicationStatus status, Pageable pageable);

    List<JobApplication> findByJob_Id(UUID jobId, Pageable pageable);

    boolean existsByJob_IdAndJobseeker_IdAndStatus(UUID jobId, UUID jobseekerId, ApplicationStatus status);

    boolean existsByJob_Id(UUID jobId);

    List<JobApplication> findByJobseeker_IdAndSchedule_Id(UUID jobseekerId, UUID scheduleId);

    boolean existsByJobseeker_IdAndSchedule_Id(UUID jobseekerId, UUID scheduleId);

    Long countByJob_Employer_Id(UUID jobEmployerId);

    Long countByJob_Employer_IdAndStatus(UUID jobEmployerId, ApplicationStatus status);




}