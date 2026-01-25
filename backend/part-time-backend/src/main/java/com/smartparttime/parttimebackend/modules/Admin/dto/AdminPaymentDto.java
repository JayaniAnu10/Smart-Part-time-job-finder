package com.smartparttime.parttimebackend.modules.Admin.dto;

import com.smartparttime.parttimebackend.modules.Payment.PaymentStatus;
import lombok.Data;
import java.util.UUID;

@Data
public class AdminPaymentDto {

    private UUID id;

    private UUID payerId;
    private String payerEmail;

    private UUID receiverId;
    private String receiverEmail;

    private double amount;
    private PaymentStatus status;

    private String paymentDate;
}
