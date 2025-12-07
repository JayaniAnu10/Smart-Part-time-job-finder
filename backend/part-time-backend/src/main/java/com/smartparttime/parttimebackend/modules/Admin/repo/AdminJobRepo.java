package com.smartparttime.parttimebackend.modules.Admin.repo;

import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AdminJobRepo extends JpaRepository<Job, UUID> {

    // Get all jobs (Admin might want sorted)
    List<Job> findAllByOrderByPostedDateDesc();

    // Get jobs by status (PENDING, APPROVED, REJECTED)
    List<Job> findByStatus(String status);

    // Search jobs by title or description
    @Query("SELECT j FROM Job j WHERE j.title LIKE %?1% OR j.description LIKE %?1%")
    List<Job> searchJobs(String keyword);
}
