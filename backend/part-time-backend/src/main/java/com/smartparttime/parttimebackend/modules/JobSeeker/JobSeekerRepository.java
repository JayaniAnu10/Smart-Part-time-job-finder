package com.smartparttime.parttimebackend.modules.JobSeeker;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerCompletedJobDto;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerProfileDetails;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, UUID> {
    boolean existsByNic(String nic);

    @Query( """
                SELECT new com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerProfileDetails(
                    js.id,
                    CONCAT(js.firstName,' ',js.lastName),
                    u.email,
                    js.dateOfBirth,
                    u.averageRate,
                    u.contact,
                    js.address,
                    js.bio,
                    js.skills,
                    u.isVerified,
                    js.gender,
                    js.profilePicture,
                    COUNT(a)
                )
                FROM User u
                JOIN u.jobSeeker js
                LEFT JOIN JobApplication a
                    ON a.jobseeker.id = u.id
                    AND a.status = 'APPROVED'
                    AND a.schedule.startDatetime <= CURRENT_TIMESTAMP
                WHERE u.id = :jobSeekerId
                GROUP BY js.id, js.firstName, js.lastName, u.email, u.averageRate,
                         u.contact, js.address, js.bio, js.skills, u.isVerified,
                         js.gender, js.profilePicture
            """)
    JobSeekerProfileDetails getJobSeekerProfile(UUID jobSeekerId);

    @Query("""
    SELECT DISTINCT new com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerCompletedJobDto(
        j.title,
        e.companyName,
        COALESCE(ja.schedule.endDatetime, ja.schedule.startDatetime),
        COALESCE(r.rating, 0),
        ja.status
    )
    FROM JobApplication ja
    JOIN ja.job j
    JOIN j.employer e
    JOIN ja.jobseeker u
    LEFT JOIN Rate r ON r.rateReceiver.id = e.user.id AND r.rater.id = u.id AND r.job.id = j.id
    WHERE u.id = :jobSeekerId
    AND ja.status = 'APPROVED'
    AND ja.schedule.startDatetime <= CURRENT_TIMESTAMP
""")
    List<JobSeekerCompletedJobDto> getJobSeekerJobs(UUID jobSeekerId);

    @Query("""
    SELECT js
    FROM JobSeeker js
    WHERE LOWER(js.address) LIKE LOWER(CONCAT('%', :location, '%'))
""")
    List<JobSeeker> findByLocation(@Param("location") String location);



}