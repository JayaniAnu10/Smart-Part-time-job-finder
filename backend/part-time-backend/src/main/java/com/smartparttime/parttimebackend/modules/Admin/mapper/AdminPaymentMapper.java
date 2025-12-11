package com.smartparttime.parttimebackend.modules.Admin.mapper;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminPaymentDto;
import com.smartparttime.parttimebackend.modules.Payment.Payment;
import org.springframework.stereotype.Component;

@Component
public class AdminPaymentMapper {

    public AdminPaymentDto mapToDto(Payment payment) {

        AdminPaymentDto dto = new AdminPaymentDto();

        dto.setId(payment.getId());


        if (payment.getPayer() != null) {
            dto.setPayerId(payment.getPayer().getId());
            dto.setPayerEmail(payment.getPayer().getEmail());
        }


        if (payment.getReceiver() != null) {
            dto.setReceiverId(payment.getReceiver().getId());
            dto.setReceiverEmail(payment.getReceiver().getEmail());
        }


        dto.setAmount(payment.getAmount() != null ? payment.getAmount().doubleValue() : 0.0);


        dto.setStatus(payment.getStatus());


        dto.setPaymentDate(payment.getPaymentDate() != null ?
                payment.getPaymentDate().toString() :
                "N/A");

        return dto;
    }
}
