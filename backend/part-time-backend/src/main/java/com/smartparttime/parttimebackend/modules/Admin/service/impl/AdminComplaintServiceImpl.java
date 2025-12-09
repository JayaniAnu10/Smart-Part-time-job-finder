package com.smartparttime.parttimebackend.modules.Admin.service.impl;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminComplaintDto;
import com.smartparttime.parttimebackend.modules.Admin.mapper.AdminComplaintMapper;
import com.smartparttime.parttimebackend.modules.Admin.repo.AdminComplaintRepo;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminComplaintService;
import com.smartparttime.parttimebackend.modules.User.Complaint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdminComplaintServiceImpl implements AdminComplaintService {

    @Autowired
    private AdminComplaintRepo complaintRepo;

    @Autowired
    private AdminComplaintMapper mapper;



    @Override
    public List<AdminComplaintDto> getAllComplaints() {
        return complaintRepo.findAllComplaints()
                .stream()
                .map(mapper::mapToDto)
                .collect(Collectors.toList());
    }


    @Override
    public AdminComplaintDto getComplaintById(UUID id) {
        Complaint complaint = complaintRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        return mapper.mapToDto(complaint);
    }



    @Override
    public List<AdminComplaintDto> getComplaintsByStatus(String status) {
        return complaintRepo.findByStatusOrderByCreatedAtDesc(status)
                .stream()
                .map(mapper::mapToDto)
                .collect(Collectors.toList());
    }



    @Override
    public List<AdminComplaintDto> searchComplaints(String keyword) {
        return complaintRepo.searchComplaints(keyword)
                .stream()
                .map(mapper::mapToDto)
                .collect(Collectors.toList());
    }



    @Override
    public AdminComplaintDto updateComplaintStatus(UUID id, String status) {

        Complaint complaint = complaintRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(status.toUpperCase());

        complaintRepo.save(complaint);

        return mapper.mapToDto(complaint);
    }
}
