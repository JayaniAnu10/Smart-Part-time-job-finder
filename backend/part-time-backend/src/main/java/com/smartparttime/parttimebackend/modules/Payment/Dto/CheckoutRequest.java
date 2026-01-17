package com.smartparttime.parttimebackend.modules.Payment.Dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

@Data
public class CheckoutRequest {
    @NotNull(message = "ID is required.")
    UUID userId;

    @NotNull(message = "Job id is required.")
    UUID jobId;

    @NotNull(message = "Promotion is required.")
    int promotionCategoryId;
}