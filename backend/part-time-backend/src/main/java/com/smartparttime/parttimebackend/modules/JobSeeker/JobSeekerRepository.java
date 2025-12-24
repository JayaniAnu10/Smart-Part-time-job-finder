package com.smartparttime.parttimebackend.modules.JobSeeker;

import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerCompletedJobDto;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerProfileDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, UUID> {
    boolean existsByNic(String nic);

    @Query("""
    SELECT new com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerProfileDetails(
        js.id ,
        CONCAT(js.firstName,' ',js.lastName),
        u.email,
        u.averageRate,
        u.contact,
        js.address ,
        js.bio ,
        js.skills ,
        u.isVerified,
        js.gender,
        js.profilePicture
 )
    FROM User u
    JOIN u.jobSeeker js
    WHERE u.id = :jobSeekerId
""")
    JobSeekerProfileDetails getJobSeekerProfile(UUID jobSeekerId);


    @Query("""
    SELECT new com.smartparttime.parttimebackend.modules.JobSeeker.JobseekerDtos.JobSeekerCompletedJobDto(
        j.title,
        e.companyName,
        a.checkOutTime,
        r.rating
    )
    FROM JobApplication ja
    JOIN ja.job j
    JOIN j.employer e
    LEFT JOIN ja.jobseeker u
    LEFT JOIN u.attendances a
    LEFT JOIN Rate r ON r.rateReceiver.id = u.id AND r.job.id = j.id
    WHERE u.id = :jobSeekerId
""")
    List<JobSeekerCompletedJobDto> getJobSeekerJobs(UUID jobSeekerId);


}