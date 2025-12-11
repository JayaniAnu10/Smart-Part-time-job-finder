package com.smartparttime.parttimebackend.modules.Admin.service;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminComplaintDto;

import java.util.List;
import java.util.UUID;

public interface AdminComplaintService {

    List<AdminComplaintDto> getAllComplaints();

    AdminComplaintDto getComplaintById(UUID id);

    List<AdminComplaintDto> getComplaintsByStatus(String status);

    List<AdminComplaintDto> searchComplaints(String keyword);

    AdminComplaintDto updateComplaintStatus(UUID id, String status);
}
