package com.smartparttime.parttimebackend.modules.Application;

import com.smartparttime.parttimebackend.modules.Job.Job;
import com.smartparttime.parttimebackend.modules.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "job_application")
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @ManyToOne
    @JoinColumn(name = "jobseeker_id")
    private User jobseeker;

    @Column(name = "applied_date")
    private LocalDateTime appliedDate;

    @Column(name = "status")
    private String status;

}