package com.smartparttime.parttimebackend.modules.Employer;

import com.smartparttime.parttimebackend.modules.Job.Job;
import com.smartparttime.parttimebackend.modules.User.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "employee")
public class Employer {
    @Id
    private UUID id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private User user;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "company_address")
    private String companyAddress;

    @Column(name = "contact_person_name")
    private String contactPersonName;

    @Column(name = "contact_person_phone")
    private String contactPersonPhone;

    @Column(name = "logo")
    private String logo;

    @Column(name = "website")
    private String website;

    @Column(name = "description")
    private String description;

    @Column(name = "registration_id")
    private String registrationId;

    @Column(name = "industry")
    private String industry;

    @OneToMany
    @JoinColumn(name = "employee_id")
    private Set<Job> jobs = new HashSet<>();

}