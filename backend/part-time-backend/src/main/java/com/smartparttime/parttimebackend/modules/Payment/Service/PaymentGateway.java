package com.smartparttime.parttimebackend.modules.Payment.Service;

import com.smartparttime.parttimebackend.modules.Job.entity.Promotion;
import com.smartparttime.parttimebackend.modules.Payment.Dto.CheckoutResponse;

public interface PaymentGateway {
    CheckoutResponse createCheckoutSession(Promotion promotion);
}
