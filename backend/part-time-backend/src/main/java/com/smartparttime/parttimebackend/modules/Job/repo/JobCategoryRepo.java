package com.smartparttime.parttimebackend.modules.Job.repo;

import com.smartparttime.parttimebackend.modules.Job.entity.JobCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobCategoryRepo extends JpaRepository<JobCategory, Integer> {
}
