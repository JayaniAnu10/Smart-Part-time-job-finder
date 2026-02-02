package com.smartparttime.parttimebackend.modules.Admin.repo;

import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AdminJobRepo extends JpaRepository<Job, UUID> {


    @Query("""
            SELECT j FROM Job j
            LEFT JOIN FETCH j.employer e
            LEFT JOIN FETCH j.category c
            ORDER BY j.postedDate DESC
            """)
    List<Job> findAllJobsWithDetails();


    List<Job> findByStatus(JobStatus status);


    @Query("""
            SELECT j FROM Job j
            LEFT JOIN j.employer e
            LEFT JOIN j.category c
            WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(e.companyName) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(c.category) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    List<Job> searchJobs(String keyword);

    List<Job> findTop5ByOrderByCreatedAtDesc();

}
