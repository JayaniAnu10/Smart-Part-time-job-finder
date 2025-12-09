package com.smartparttime.parttimebackend.modules.Admin.controller;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminComplaintDto;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin/complaints")
public class AdminComplaintController {

    @Autowired
    private AdminComplaintService complaintService;


    @GetMapping
    public List<AdminComplaintDto> getAllComplaints() {
        return complaintService.getAllComplaints();
    }


    @GetMapping("/{id}")
    public AdminComplaintDto getComplaintById(@PathVariable UUID id) {
        return complaintService.getComplaintById(id);
    }


    @PutMapping("/{id}/status")
    public AdminComplaintDto updateComplaintStatus(
            @PathVariable UUID id,
            @RequestParam String status
    ) {
        return complaintService.updateComplaintStatus(id, status);
    }


    @GetMapping("/search")
    public List<AdminComplaintDto> searchComplaints(@RequestParam String keyword) {
        return complaintService.searchComplaints(keyword);
    }


    @GetMapping("/filter")
    public List<AdminComplaintDto> getComplaintsByStatus(@RequestParam String status) {
        return complaintService.getComplaintsByStatus(status);
    }
}
