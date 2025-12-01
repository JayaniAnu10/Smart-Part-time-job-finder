package com.smartparttime.parttimebackend.modules.Rating;

import com.smartparttime.parttimebackend.modules.Job.Job;
import com.smartparttime.parttimebackend.modules.User.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "rate")
public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rater_id")
    private User rater;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User rateReceiver;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "comment")
    private String comment;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

}