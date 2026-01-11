package com.smartparttime.parttimebackend.modules.Payment.Service;

import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutResponse;
import com.smartparttime.parttimebackend.modules.Payment.Dto.PaymentResult;
import com.smartparttime.parttimebackend.modules.Payment.Dto.WebhookRequest;

import java.util.Optional;

public interface PaymentGateway {
    CheckoutResponse createCheckoutSession(Promotion promotion);
    Optional<PaymentResult> parseWebhookRequest(WebhookRequest webhookRequest);
}
