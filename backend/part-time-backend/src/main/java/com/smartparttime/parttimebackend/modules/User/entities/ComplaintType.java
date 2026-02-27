package com.smartparttime.parttimebackend.modules.User.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "complaint_type")
public class ComplaintType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "type")
    private String type;

    @JsonIgnore
    @OneToMany(mappedBy = "type")
    private Set<Complaint> complaints = new HashSet<>();

}