package com.smartparttime.parttimebackend.modules.Payment.Service;

import com.smartparttime.parttimebackend.common.exceptions.PaymentException;
import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutResponse;
import com.smartparttime.parttimebackend.modules.Payment.Dto.PaymentResult;
import com.smartparttime.parttimebackend.modules.Payment.Dto.WebhookRequest;
import com.smartparttime.parttimebackend.modules.Payment.Payment;

import java.util.Optional;

public interface PaymentGateway {
    CheckoutResponse createCheckoutSession(Promotion promotion, Payment payment);
    Optional<PaymentResult> parseWebhookRequest(WebhookRequest webhookRequest);
}
