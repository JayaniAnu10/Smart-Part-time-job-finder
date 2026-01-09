package com.smartparttime.parttimebackend.modules.Application.repo;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Application.dtos.ApplicantsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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
        CAST((SELECT COUNT(a.id) FROM Attendance a WHERE a.user = u AND a.status = 'CHECKED_OUT') AS int),
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

    Long countByJobseeker_IdAndStatusNotAndSchedule_StartDatetimeAfter(UUID jobseekerId, ApplicationStatus status, LocalDateTime scheduleStartDatetimeAfter);

    Long countByJobseeker_IdAndStatusAndSchedule_StartDatetimeAfter(UUID id, ApplicationStatus applicationStatus, LocalDateTime now);
}