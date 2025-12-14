package com.smartparttime.parttimebackend.modules.Admin.service;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminPaymentDto;

import java.util.List;
import java.util.UUID;

public interface AdminPaymentService {


    List<AdminPaymentDto> getAllPayments();


    AdminPaymentDto getPaymentById(UUID id);


    List<AdminPaymentDto> searchPayments(String keyword);


    List<AdminPaymentDto> getPaymentsByStatus(String status);


    List<AdminPaymentDto> getPaymentsByDateRange(String startDate, String endDate);
}
