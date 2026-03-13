package com.smartparttime.parttimebackend.modules.Job.repo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartparttime.parttimebackend.modules.Job.PromoStatus;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, UUID> {
    Optional<Promotion> findById(UUID id);

    List<Promotion> findByJob_Employer_IdAndStatus(UUID employerId, PromoStatus status);
}