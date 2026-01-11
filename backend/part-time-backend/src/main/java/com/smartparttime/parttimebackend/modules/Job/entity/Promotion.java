package com.smartparttime.parttimebackend.modules.Job.entity;

import com.smartparttime.parttimebackend.modules.Job.PromoStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "promotion")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

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

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PromoStatus status;

}