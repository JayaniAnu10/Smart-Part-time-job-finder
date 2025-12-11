package com.smartparttime.parttimebackend.modules.Admin.controller;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminPaymentDto;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin/payments")
public class AdminPaymentController {

    @Autowired
    private AdminPaymentService paymentService;



    @GetMapping
    public List<AdminPaymentDto> getAllPayments() {
        return paymentService.getAllPayments();
    }



    @GetMapping("/{id}")
    public AdminPaymentDto getPayment(@PathVariable UUID id) {
        return paymentService.getPaymentById(id);
    }



    @GetMapping("/search")
    public List<AdminPaymentDto> searchPayments(@RequestParam String keyword) {
        return paymentService.searchPayments(keyword);
    }



    @GetMapping("/status/{status}")
    public List<AdminPaymentDto> filterByStatus(@PathVariable String status) {
        return paymentService.getPaymentsByStatus(status);
    }


    
    @GetMapping("/filter")
    public List<AdminPaymentDto> filterByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        return paymentService.getPaymentsByDateRange(startDate, endDate);
    }
}
