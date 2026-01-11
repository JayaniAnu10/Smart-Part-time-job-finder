package com.smartparttime.parttimebackend.modules.Job.entity;

import com.smartparttime.parttimebackend.modules.PromotionCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @Column(name = "started_date")
    private LocalDateTime startedDate;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private PromotionCategory category;

}