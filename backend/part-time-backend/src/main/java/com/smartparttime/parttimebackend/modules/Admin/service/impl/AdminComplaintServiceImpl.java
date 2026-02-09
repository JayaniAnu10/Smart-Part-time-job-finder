package com.smartparttime.parttimebackend.modules.Admin.service.impl;

import com.smartparttime.parttimebackend.common.Services.EmailService;
import com.smartparttime.parttimebackend.modules.Admin.dto.AdminComplaintDto;
import com.smartparttime.parttimebackend.modules.Admin.mapper.AdminComplaintMapper;
import com.smartparttime.parttimebackend.modules.Admin.repo.AdminComplaintRepo;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminComplaintService;
import com.smartparttime.parttimebackend.modules.User.entities.Complaint;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import jakarta.transaction.Transactional;
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

    @Autowired
    private EmailService emailService;



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
    @Transactional

    public AdminComplaintDto updateComplaintStatus(UUID id, String status) {

        Complaint complaint = complaintRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        String newStatus = status.toUpperCase();

        if (!newStatus.equals("PENDING")
                && !newStatus.equals("RESOLVED")
                && !newStatus.equals("REJECTED")) {
            throw new IllegalArgumentException("Invalid complaint status");
        }

        complaint.setStatus(newStatus);
        complaintRepo.save(complaint);

        /* ================= EMAIL NOTIFICATIONS ================= */
        if (!newStatus.equals("PENDING")) {

            User reporter = complaint.getReporter();
            User target = complaint.getTarget();


            String complaintType = complaint.getType().getType();

            String createdDate = complaint.getCreatedAt()
                    .toLocalDate()
                    .toString();


            String reporterName;
            if (reporter.getJobSeeker() != null) {
                reporterName =
                        reporter.getJobSeeker().getFirstName() + " " +
                                reporter.getJobSeeker().getLastName();
            } else if (reporter.getEmployer() != null) {
                reporterName = reporter.getEmployer().getCompanyName();
            } else {
                reporterName = "User";
            }


            String targetName;
            if (target.getJobSeeker() != null) {
                targetName =
                        target.getJobSeeker().getFirstName() + " " +
                                target.getJobSeeker().getLastName();
            } else if (target.getEmployer() != null) {
                targetName = target.getEmployer().getCompanyName();
            } else {
                targetName = "User";
            }


            if (newStatus.equals("RESOLVED")) {

                emailService.sendComplaintResolvedReporterEmail(
                        reporter.getEmail(),
                        reporterName,
                        complaintType,
                        createdDate
                );

                emailService.sendComplaintResolvedTargetEmail(
                        target.getEmail(),
                        targetName,
                        complaintType
                );

            }

            if (newStatus.equals("REJECTED")) {

                emailService.sendComplaintRejectedReporterEmail(
                        reporter.getEmail(),
                        reporterName,
                        complaintType,
                        createdDate
                );
            }
        }

        return mapper.mapToDto(complaint);
    }




}
