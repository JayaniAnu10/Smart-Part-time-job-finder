package com.smartparttime.parttimebackend.modules.Job.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "promotion")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "promotion_category")
    private String promotionCategory;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @Column(name = "started_date")
    private LocalDateTime startedDate;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

}