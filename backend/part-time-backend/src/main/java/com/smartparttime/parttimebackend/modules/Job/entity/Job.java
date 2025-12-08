package com.smartparttime.parttimebackend.modules.Job.entity;

import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Employer.Employer;
import com.smartparttime.parttimebackend.modules.Job.JobStatus;
import com.smartparttime.parttimebackend.modules.Rating.Rate;
import com.smartparttime.parttimebackend.modules.User.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.LinkedHashSet;
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

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private JobCategory category;

    @Column(name = "location")
    private String location;

    @Column(name = "job_type")
    private String jobType;

    @Column(name = "deadline")
    private LocalDateTime deadline;

    @Column(name = "posted_date")
    private LocalDate postedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private JobStatus status;

    @Column(name = "salary")
    private BigDecimal salary;

    @Column(name = "working_hours")
    private Integer workingHours;

    @Column(name = "skills")
    private String skills;

    @Column(name = "total_vacancies")
    private Long totalVacancies;

    @Column(name = "available_vacancies")
    private Long availableVacancies;

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

}