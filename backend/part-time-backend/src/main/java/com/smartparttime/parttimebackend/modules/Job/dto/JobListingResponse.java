package com.smartparttime.parttimebackend.modules.Job.dto;

import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class JobListingResponse {

    private UUID id;

    private String title;

    private String category;

    private String location;

    private String jobType;

    private LocalDateTime deadline;

    private LocalDate postedDate;

    private BigDecimal minSalary;

    private List<JobScheduleDto> jobSchedules;

    private String accommodation;

    private Long availableVacancies;

    private String employer;

    private Boolean isUrgent;
}
