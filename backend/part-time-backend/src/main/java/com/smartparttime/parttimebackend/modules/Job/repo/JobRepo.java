package com.smartparttime.parttimebackend.modules.Job.repo;

import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.UUID;

public interface JobRepo extends JpaRepository<Job, UUID> , JpaSpecificationExecutor<Job> {

    Page<Job> findByCategory_Id(Integer categoryId, Pageable pageable);

    Page<Job> findByLocationContainingIgnoreCase(String location, Pageable pageable);

    Page<Job> findByJobType(String jobType, Pageable pageable);

    Page<Job> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);


    List<Job> findByEmployee_Id(UUID employerId);

    Page<Job> findByDescriptionContainingIgnoreCase(String description, Pageable pageable);

    Page<Job> findBySkillsContainingIgnoreCase(String skills, Pageable pageable);
}
