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

    private String category;

    private Integer categoryId;

    private String location;

    private String jobType;

    private LocalDateTime deadline;

    private LocalDateTime postedDate;

    private JobStatus status;

    private BigDecimal minSalary;

    private BigDecimal maxSalary;

    private List<JobScheduleResponse> jobSchedules;

    private String requirements;

    private String accommodation;

    private Long availableVacancies;

    private Long totalVacancies;

    private String employer;

    private String employerId;

    private Double latitude;

    private Double longitude;

    private Boolean isUrgent;

    private String requiredGender;

}