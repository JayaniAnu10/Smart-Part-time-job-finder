package com.smartparttime.parttimebackend.modules.Admin.repo;

import com.smartparttime.parttimebackend.modules.User.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AdminComplaintRepo extends JpaRepository<Complaint, UUID> {

    // Get all complaints sorted newest first
    List<Complaint> findAllByOrderByCreatedAtDesc();

    // Filter by status (PENDING, RESOLVED, REJECTED)
    List<Complaint> findByStatus(String status);

    // Search by reporter or target (email)
    @Query("SELECT c FROM Complaint c WHERE " +
            "c.reporter.email LIKE %?1% OR " +
            "c.target.email LIKE %?1%")
    List<Complaint> searchComplaints(String keyword);
}
