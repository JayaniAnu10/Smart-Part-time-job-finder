package com.smartparttime.parttimebackend.modules.Employer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EmployerRepository extends JpaRepository<Employer, UUID> {
    boolean existsByRegistrationId(String registrationId);
}