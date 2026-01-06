package com.smartparttime.parttimebackend.modules.Job.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class JobListingDetailsDto {

    private UUID id;

    private String title;

    private String category;

    private String location;

    private String jobType;

    private LocalDateTime deadline;

    private LocalDateTime postedDate;

    private BigDecimal minSalary;

    private List<JobScheduleDto> jobSchedules;

    private String accommodation;

    private Long totalVacancies;

    private String employer;

    private Boolean isUrgent;
}
