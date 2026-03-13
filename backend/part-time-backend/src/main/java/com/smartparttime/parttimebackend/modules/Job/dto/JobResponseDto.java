package com.smartparttime.parttimebackend.modules.Job.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.smartparttime.parttimebackend.modules.Job.JobStatus;

import lombok.Data;

@Data
public class JobResponseDto implements Serializable {

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

    private String promotionCategoryName;

}