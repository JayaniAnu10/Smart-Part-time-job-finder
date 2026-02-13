package com.smartparttime.parttimebackend.modules.Notification.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "template_key", unique = true, nullable = false)
    private String templateKey;


    @OneToMany(mappedBy = "message")
    private Set<Notification> notifications = new HashSet<>();

}