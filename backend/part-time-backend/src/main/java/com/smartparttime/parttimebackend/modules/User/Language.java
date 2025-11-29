package com.smartparttime.parttimebackend.modules.User;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "language")
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "language")
    private String language;

    @OneToMany(mappedBy = "language")
    private Set<User> users = new HashSet<>();

}