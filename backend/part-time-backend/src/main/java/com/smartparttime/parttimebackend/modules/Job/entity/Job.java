package com.smartparttime.parttimebackend.modules.Job.entity;

import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Attendance.Attendance;
import com.smartparttime.parttimebackend.modules.Employer.Employer;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Rating.Rate;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "job")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @Column(name = "description")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private JobCategory category;

    @Column(name = "location")
    private String location;

    @Column(name = "job_type")
    private String jobType;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "posted_date")
    private LocalDateTime postedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private JobStatus status;

    @Column(name = "total_vacancies")
    private Long totalVacancies;

    @Column(name = "available_vacancies")
    private Long availableVacancies;

    @Lob
    private String embedding;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "is_urgent")
    private Boolean isUrgent = false;

    @Column(name = "min_salary")
    private BigDecimal minSalary;

    @Column(name = "max_salary")
    private BigDecimal maxSalary;

    @Column(name = "requirements")
    private String requirements;

    @Column(name = "accommodation")
    private String accommodation;

    @OneToMany(mappedBy = "job")
    private Set<Attendance> attendances = new HashSet<>();

    @OneToMany(mappedBy = "job")
    private Set<JobApplication> jobApplications = new HashSet<>();

    @OneToMany(mappedBy = "job")
    private Set<Promotion> promotions = new HashSet<>();

    @OneToMany(mappedBy = "job")
    private Set<Rate> rates = new HashSet<>();

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<JobSchedule> jobSchedules = new HashSet<>();

    @Column(name = "required_gender")
    private String requiredGender;

}