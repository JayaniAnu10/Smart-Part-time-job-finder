package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.Job.Attendance;
import com.smartparttime.parttimebackend.modules.Job.Job;
import com.smartparttime.parttimebackend.modules.Application.JobApplication;
import com.smartparttime.parttimebackend.modules.Notification.Notification;
import com.smartparttime.parttimebackend.modules.Payment.Payment;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private String role;

    @Column(name = "address")
    private String address;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "nic")
    private String nic;

    @Column(name = "is_verified")
    private Boolean isVerified = false;

    @ColumnDefault("0")
    @Column(name = "trust_score")
    private Integer trustScore;

    @Column(name = "skills")
    private String skills;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "contact")
    private String contact;

    @ManyToOne
    @JoinColumn(name = "language_id")
    private Language language;

    @OneToMany(mappedBy = "user")
    private Set<Attendance> attendances = new HashSet<>();

    @OneToMany(mappedBy = "reporter")
    private Set<Complaint> reporter = new HashSet<>();

    @OneToMany(mappedBy = "target")
    private Set<Complaint> target = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    private Set<Job> jobs = new HashSet<>();

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

    @OneToMany(mappedBy = "user")
    private Set<Rate> ratedUser = new HashSet<>();

}