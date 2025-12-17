package com.smartparttime.parttimebackend.modules.Job.entity;

import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Attendance.Attendance;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

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
    private Set<Attendance> attendances = new HashSet<>();

    @OneToMany
    @JoinColumn(name = "schedule_id")
    private Set<JobApplication> jobApplications = new HashSet<>();

}