package com.smartparttime.parttimebackend.modules.Job.repo;

import com.smartparttime.parttimebackend.modules.Job.entity.JobSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JobScheduleRepository extends JpaRepository<JobSchedule, UUID> {
}