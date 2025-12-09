package com.smartparttime.parttimebackend.modules.JobSeeker;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JobSeekerRepository extends JpaRepository<JobSeeker, UUID> {
    boolean existsByNic(String nic);
}