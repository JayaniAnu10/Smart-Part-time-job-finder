package com.smartparttime.parttimebackend.modules.JobSeeker;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, UUID> {
    boolean existsByNic(String nic);
    @Query("""
    SELECT js
    FROM JobSeeker js
    WHERE 
        LOWER(js.skills) LIKE LOWER(CONCAT('%', :skills, '%'))
        AND LOWER(js.address) LIKE LOWER(CONCAT('%', :location, '%'))
        """)
    List<JobSeeker> findMatchingJobSeekers(
            @Param("skills") String skills,
            @Param("location") String location
    );

}