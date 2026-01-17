package com.smartparttime.parttimebackend.modules.Payment.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class CheckoutResponse {
    private UUID promotionId;
    private String checkoutUrl;
}