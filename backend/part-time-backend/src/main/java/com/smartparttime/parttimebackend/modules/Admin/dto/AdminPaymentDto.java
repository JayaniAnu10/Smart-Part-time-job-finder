package com.smartparttime.parttimebackend.modules.Admin.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class AdminPaymentDto {
    private UUID id;
    private UUID payerId;
    private UUID jobId;
    private Double amount;
    private String status;
    private String paymentDate;
}
