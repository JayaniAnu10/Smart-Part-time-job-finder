package com.smartparttime.parttimebackend.modules.Application.repo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Application.dtos.ApplicantsResponse;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobStatsDto;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.UpcomingJobDetailsDto;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.UpcomingJobsDto;

public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {

    List<JobApplication> findByJobseeker_Id(UUID jobseekerId, Pageable pageable);

    List<JobApplication> findByStatus(ApplicationStatus status, Pageable pageable);

    boolean existsByJob_IdAndJobseeker_IdAndStatus(UUID jobId, UUID jobseekerId, ApplicationStatus status);

    boolean existsByJobseeker_IdAndSchedule_Id(UUID jobseekerId, UUID scheduleId);

    Long countByJob_Employer_Id(UUID jobEmployerId);

    Long countByJob_Employer_IdAndStatus(UUID jobEmployerId, ApplicationStatus status);


    @Query("""
        SELECT 
            COALESCE(SUM(CASE WHEN MONTH(ja.appliedDate) = MONTH(CURRENT_DATE) 
                     AND YEAR(ja.appliedDate) = YEAR(CURRENT_DATE) THEN 1 ELSE 0 END),0)  as thisMonthCount,
            coalesce(SUM(CASE WHEN MONTH(ja.appliedDate) = MONTH(CURRENT_DATE) - 1
                     AND YEAR(ja.appliedDate) = YEAR(CURRENT_DATE) THEN 1 ELSE 0 END),0)  as lastMonthCount
        FROM JobApplication ja
        WHERE ja.job.employer.id = :employerId
    """)
    Object countThisAndLastMonthApplications(@Param("employerId") UUID employerId);

    @Query("""
    SELECT new com.smartparttime.parttimebackend.modules.Application.dtos.ApplicantsResponse(
        ja.id,
        u.id,
        CONCAT(js.firstName, ' ', js.lastName),
        ja.status,
        u.averageRate,
        js.address,
        js.profilePicture,
        CAST((SELECT COUNT(a.id) FROM JobApplication a
              WHERE a.jobseeker = u
            AND a.status = 'APPROVED'
            AND a.schedule.startDatetime <= CURRENT_TIMESTAMP) AS int),
        ja.appliedDate
    )
    FROM JobApplication ja
    JOIN ja.job j
    JOIN ja.jobseeker u
    JOIN u.jobSeeker js
    WHERE j.id = :jobId
     ORDER BY
          CASE
            WHEN ja.status = 'PENDING' THEN 0
            WHEN ja.status = 'APPROVED' THEN 1
            WHEN ja.status = 'REJECTED' THEN 2
            ELSE 3
          END
""")
    Page<ApplicantsResponse> findApplicationsByJobId(@Param("jobId") UUID jobId, Pageable pageable);


    List<JobApplication> getJobApplicationsByJob_Id(UUID jobId);

    long countByJobseeker_IdAndStatus(UUID jobseekerId, ApplicationStatus status);

    @Query("""
        SELECT new com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.UpcomingJobDetailsDto(
            j.id,
            j.title,
            j.description,
            c.category,
            j.jobType,
            e.id,
            e.companyName,
            e.contactPersonPhone,
            u.averageRate,
            s.id,
            s.startDatetime,
            s.endDatetime,
            j.minSalary,
            j.maxSalary,
            j.location,
            j.latitude,
            j.longitude,
            j.requirements,
            j.accommodation,
            j.requiredGender,
            a.id,
            a.status,
            a.appliedDate
        )
        FROM JobApplication a
        JOIN a.job j
        JOIN j.category c
        JOIN j.employer e
        JOIN e.user u
        JOIN a.schedule s
        WHERE a.id = :applicationId
        AND a.jobseeker.id = :jobseekerId
    """)
    Optional<UpcomingJobDetailsDto> getUpcomingJobDetails(
            @Param("applicationId") UUID applicationId,
            @Param("jobseekerId") UUID jobseekerId
    );

    @Query("""
    SELECT new com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobStatsDto(
        COUNT(a.job),
        COALESCE(SUM(a.job.minSalary), 0)
    )
    FROM JobApplication a
    JOIN a.schedule s
    WHERE a.jobseeker.id = :jobseekerId
      AND a.status = :status
      AND s.startDatetime <= CURRENT_TIMESTAMP
""")
    JobStatsDto totalEarning(
            @Param("jobseekerId") UUID jobseekerId,
            @Param("status") ApplicationStatus status
    );

    @Query("""
    SELECT new com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.UpcomingJobsDto(
        a.id,
        j.title,
        j.employer.companyName,
        j.minSalary,
        s.startDatetime,
        s.endDatetime,
        a.status
    )
    FROM JobApplication a
    JOIN a.schedule s
    JOIN s.job j
    WHERE a.jobseeker.id = :jobseekerId
      AND a.status = :approvedStatus
      AND s.startDatetime >= CURRENT_TIMESTAMP
""")
    List<UpcomingJobsDto> jobsTo(
            @Param("jobseekerId") UUID jobseekerId,
            @Param("approvedStatus") ApplicationStatus approvedStatus
    );

        @Query("""
        SELECT a
        FROM JobApplication a
        JOIN FETCH a.job j
        LEFT JOIN FETCH j.employer
        JOIN FETCH a.schedule s
        WHERE a.jobseeker.id = :jobseekerId
            AND a.status = :status
            AND s.startDatetime <= :currentTime
        """)
        List<JobApplication> findCompletedApplicationsByStartedSchedule(
            @Param("jobseekerId") UUID jobseekerId,
            @Param("status") ApplicationStatus status,
            @Param("currentTime") LocalDateTime currentTime
        );

    Long countByJobseeker_IdAndStatusAndSchedule_StartDatetimeAfter(UUID id, ApplicationStatus applicationStatus, LocalDateTime now);
}