package com.smartparttime.parttimebackend.modules.Payment.Dto;

import com.smartparttime.parttimebackend.modules.Job.PromoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class PaymentResult {
    private UUID promotionId;
    private PromoStatus paymentStatus;
}