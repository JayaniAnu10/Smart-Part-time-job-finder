package com.smartparttime.parttimebackend.modules.Admin.repo;

import com.smartparttime.parttimebackend.modules.Payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AdminPaymentRepo extends JpaRepository<Payment, UUID> {

    // All payments, newest first
    List<Payment> findAllByOrderByPaymentDateDesc();

    // Filter by payer (User)
    List<Payment> findByPayer_Id(UUID payerId);

    // Filter by receiver (User)
    List<Payment> findByReceiver_Id(UUID receiverId);

    // Search payments by user email or status
    @Query("""
            SELECT p FROM Payment p
            WHERE p.payer.email LIKE %?1%
               OR p.receiver.email LIKE %?1%
               OR p.status LIKE %?1%
            """)
    List<Payment> searchPayments(String keyword);
}
