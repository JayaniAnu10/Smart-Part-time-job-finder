package com.smartparttime.parttimebackend.modules.Payment.Dto;

import com.smartparttime.parttimebackend.modules.Job.PromoStatus;
import com.smartparttime.parttimebackend.modules.Payment.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class PaymentResult {
    private PaymentStatus paymentStatus;
    private UUID promotionId;
    private PromoStatus promoStatus;
}