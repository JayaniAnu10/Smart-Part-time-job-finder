package com.smartparttime.parttimebackend.modules.Job.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class JobRequestDto {

    @NotBlank(message = "Required field")
    private String title;

    @NotBlank(message = "Required field")
    private String description;

    @NotNull(message = "Required field")
    private Integer categoryId;

    @NotBlank(message = "Required field")
    private String location;

    @NotBlank(message = "Required field")
    private String jobType;

    @NotNull(message = "Required field")
    private LocalDateTime deadline;

    @NotNull(message = "Required field")
    private BigDecimal salary;

    @NotNull(message = "Required field")
    private Integer workingHours;

    @NotBlank(message = "Required field")
    private String skills;

    @NotNull(message = "Required field")
    private Long totalVacancies;

    @NotNull(message = "Required field")
    private Long availableVacancies;

}
