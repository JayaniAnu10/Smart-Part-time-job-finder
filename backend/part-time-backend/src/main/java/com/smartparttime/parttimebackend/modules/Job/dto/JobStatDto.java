package com.smartparttime.parttimebackend.modules.Job.dto;

import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class JobStatDto {
    private Long applicants;
    private UUID id;
    private LocalDate postedDate;
    private JobStatus status;
    private String title;
    private LocalDateTime deadline;

}
