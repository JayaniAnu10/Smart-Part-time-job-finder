package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.Employer.Employer;
import com.smartparttime.parttimebackend.modules.Job.Attendance;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeeker;
import com.smartparttime.parttimebackend.modules.Notification.Notification;
import com.smartparttime.parttimebackend.modules.Payment.Payment;
import com.smartparttime.parttimebackend.modules.Rating.Rate;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

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

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "language_id")
    private Language language;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private Employer employer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private JobSeeker jobSeeker;

}