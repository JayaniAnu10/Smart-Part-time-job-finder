package com.smartparttime.parttimebackend.modules.Admin.service.impl;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminPaymentDto;
import com.smartparttime.parttimebackend.modules.Admin.mapper.AdminPaymentMapper;
import com.smartparttime.parttimebackend.modules.Admin.repo.AdminPaymentRepo;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminPaymentService;
import com.smartparttime.parttimebackend.modules.Payment.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdminPaymentServiceImpl implements AdminPaymentService {

    @Autowired
    private AdminPaymentRepo paymentRepo;

    @Autowired
    private AdminPaymentMapper mapper;



    @Override
    public List<AdminPaymentDto> getAllPayments() {
        return paymentRepo.findAllPaymentsWithDetails()
                .stream()
                .map(mapper::mapToDto)
                .collect(Collectors.toList());
    }



    @Override
    public AdminPaymentDto getPaymentById(UUID id) {
        Payment payment = paymentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        return mapper.mapToDto(payment);
    }



    @Override
    public List<AdminPaymentDto> searchPayments(String keyword) {
        return paymentRepo.searchPayments(keyword)
                .stream()
                .map(mapper::mapToDto)
                .collect(Collectors.toList());
    }



    @Override
    public List<AdminPaymentDto> getPaymentsByStatus(String status) {
        return paymentRepo.findByStatus(status.toUpperCase())
                .stream()
                .map(mapper::mapToDto)
                .collect(Collectors.toList());
    }



    @Override
    public List<AdminPaymentDto> getPaymentsByDateRange(String startDate, String endDate) {

        LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
        LocalDateTime end = LocalDate.parse(endDate).atTime(23, 59, 59);

        return paymentRepo.findByDateRange(start, end)
                .stream()
                .map(mapper::mapToDto)
                .collect(Collectors.toList());
    }
}
