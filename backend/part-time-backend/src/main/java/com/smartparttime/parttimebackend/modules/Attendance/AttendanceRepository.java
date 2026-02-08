package com.smartparttime.parttimebackend.modules.Attendance;

import com.smartparttime.parttimebackend.modules.Application.ApplicationStatus;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobStatsDto;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.UpcomingJobsDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findById(UUID id);

    Attendance findByQrCode(String qrCode);

    List<Attendance> findByJob_Id(UUID jobId);

    @Query("""
    SELECT new com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobStatsDto(
                                                                COUNT(a.job),
                                                                SUM(a.job.minSalary)
    )
    FROM Attendance a
    WHERE a.user.id = :jobseekerId
    AND a.status = :status
""")
    JobStatsDto totalEarning(
            @Param("jobseekerId") UUID jobseekerId,
            @Param("status") AttendanceStatus status
    );

    @Query("""
    SELECT new com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.UpcomingJobsDto(
        j.id,
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
    AND a.status != "REJECTED"
    AND s.startDatetime >= CURRENT_TIMESTAMP
""")
    List<UpcomingJobsDto> jobsTo(
            @Param("jobseekerId") UUID jobseekerId
    );

    List<Attendance> findByUser_IdAndStatus(UUID userId, AttendanceStatus status);


}