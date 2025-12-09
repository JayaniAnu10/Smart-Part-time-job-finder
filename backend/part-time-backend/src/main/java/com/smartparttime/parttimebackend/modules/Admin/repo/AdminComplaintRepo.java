package com.smartparttime.parttimebackend.modules.Admin.repo;

import com.smartparttime.parttimebackend.modules.User.entities.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AdminComplaintRepo extends JpaRepository<Complaint, UUID> {


    @Query("""
            SELECT c FROM Complaint c
            LEFT JOIN FETCH c.reporter r
            LEFT JOIN FETCH c.target t
            LEFT JOIN FETCH c.type ct
            ORDER BY c.createdAt DESC
           """)
    List<Complaint> findAllComplaints();


    List<Complaint> findByStatusOrderByCreatedAtDesc(String status);


    @Query("""
            SELECT c FROM Complaint c
            LEFT JOIN c.reporter r
            LEFT JOIN c.target t
            WHERE LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(r.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(t.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
           """)
    List<Complaint> searchComplaints(String keyword);
}
