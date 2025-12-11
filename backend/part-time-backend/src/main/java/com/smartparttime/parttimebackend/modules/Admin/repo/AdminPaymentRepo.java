package com.smartparttime.parttimebackend.modules.Admin.repo;

import com.smartparttime.parttimebackend.modules.Payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface AdminPaymentRepo extends JpaRepository<Payment, UUID> {


    @Query("""
            SELECT p FROM Payment p
            LEFT JOIN FETCH p.payer
            LEFT JOIN FETCH p.receiver
            ORDER BY p.paymentDate DESC
           """)
    List<Payment> findAllPaymentsWithDetails();



    @Query("""
            SELECT p FROM Payment p
            LEFT JOIN p.payer pay
            LEFT JOIN p.receiver rec
            WHERE LOWER(pay.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(rec.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(p.status) LIKE LOWER(CONCAT('%', :keyword, '%'))
           """)
    List<Payment> searchPayments(String keyword);



    List<Payment> findByStatus(String status);



    @Query("""
            SELECT p FROM Payment p
            WHERE p.paymentDate BETWEEN :start AND :end
            ORDER BY p.paymentDate DESC
           """)
    List<Payment> findByDateRange(LocalDateTime start, LocalDateTime end);
}
