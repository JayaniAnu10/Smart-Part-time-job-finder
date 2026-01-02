package com.smartparttime.parttimebackend.modules.User.entities;

import com.smartparttime.parttimebackend.modules.Employer.Employer;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Attendance.Attendance;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeeker;
import com.smartparttime.parttimebackend.modules.Notification.entity.Notification;
import com.smartparttime.parttimebackend.modules.Payment.Payment;
import com.smartparttime.parttimebackend.modules.Rating.Rate;
import com.smartparttime.parttimebackend.modules.User.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @Column(name = "trust_score")
    private Integer trustScore=0;


    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "contact")
    private String contact;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private Set<Attendance> attendances = new HashSet<>();

    @OneToMany(mappedBy = "reporter")
    private Set<Complaint> reporter = new HashSet<>();

    @OneToMany(mappedBy = "target")
    private Set<Complaint> target = new HashSet<>();

    @OneToMany(mappedBy = "jobseeker")
    private Set<JobApplication> jobApplications = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Notification> notifications = new HashSet<>();

    @OneToMany(mappedBy = "payer")
    private Set<Payment> payer = new HashSet<>();

    @OneToMany(mappedBy = "receiver")
    private Set<Payment> receiver = new HashSet<>();

    @OneToMany(mappedBy = "rater")
    private Set<Rate> rater = new HashSet<>();

    @OneToMany(mappedBy = "rateReceiver")
    private Set<Rate> rateReceiver = new HashSet<>();

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    private Employer employer;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private JobSeeker jobSeeker;

    @Column(name = "average_rate")
    private BigDecimal averageRate;

    @Column(name = "total_ratings")
    private Integer totalRatings;

    @Column(name = "is_employer")
    private Boolean isEmployer = false;

    @Column(name = "is_jobseeker")
    private Boolean isJobseeker = false;

}