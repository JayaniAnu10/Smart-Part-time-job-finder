package com.smartparttime.parttimebackend.modules.Job.repo;

import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import com.smartparttime.parttimebackend.modules.Job.entity.JobSchedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.UUID;

public interface JobRepo extends JpaRepository<Job, UUID> , JpaSpecificationExecutor<Job> {

    Page<Job> findByEmployer_Id(UUID employerId, Pageable pageable);

    Page<Job> findByLocationContainingIgnoreCase(String location, Pageable pageable);


}
