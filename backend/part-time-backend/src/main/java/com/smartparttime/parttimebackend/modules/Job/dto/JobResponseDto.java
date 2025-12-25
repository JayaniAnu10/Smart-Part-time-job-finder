package com.smartparttime.parttimebackend.modules.Job.dto;

import com.smartparttime.parttimebackend.modules.Employer.Employer;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Job.entity.JobCategory;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class JobResponseDto {

    private UUID id;

    private String title;

    private String description;

    private Integer category;

    private String location;

    private String jobType;

    private LocalDateTime deadline;

    private LocalDate postedDate;

    private JobStatus status;

    private BigDecimal minSalary;

    private BigDecimal maxSalary;

    private List<JobScheduleDto> jobSchedules;

    private Integer workingHours;

    private String requirements;

    private String accommodation;

    private Long availableVacancies;

    private Long totalVacancies;

    private UUID employer;

    private Double latitude;

    private Double longitude;
}
