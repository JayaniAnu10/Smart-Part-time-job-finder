package com.smartparttime.parttimebackend.modules.User.repo;

import com.smartparttime.parttimebackend.modules.User.entities.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ComplaintRepository extends JpaRepository<Complaint, UUID> {
}