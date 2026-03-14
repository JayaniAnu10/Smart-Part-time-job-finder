package com.smartparttime.parttimebackend.modules.Job.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.smartparttime.parttimebackend.modules.Application.JobApplication;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "job_schedule")
public class JobSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @Column(name = "start_datetime")
    private LocalDateTime startDatetime;

    @Column(name = "end_datetime")
    private LocalDateTime endDatetime;

    @NotNull
    @Column(name = "required_workers")
    private Integer requiredWorkers;

    @OneToMany
    @JoinColumn(name = "schedule_id")
    private Set<JobApplication> jobApplications = new HashSet<>();

    @Column(name = "working_hours")
    private Integer workingHours;

}