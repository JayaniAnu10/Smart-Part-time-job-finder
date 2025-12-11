package com.smartparttime.parttimebackend.modules.Admin.mapper;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminComplaintDto;
import com.smartparttime.parttimebackend.modules.User.entities.Complaint;
import org.springframework.stereotype.Component;

@Component
public class AdminComplaintMapper {

    public AdminComplaintDto mapToDto(Complaint complaint) {

        AdminComplaintDto dto = new AdminComplaintDto();

        dto.setId(complaint.getId());
        dto.setDescription(complaint.getDescription());
        dto.setStatus(complaint.getStatus());


        dto.setCreatedAt(
                complaint.getCreatedAt() != null
                        ? complaint.getCreatedAt().toString()
                        : "N/A"
        );


        if (complaint.getType() != null) {
            dto.setType(complaint.getType().getType());
        } else {
            dto.setType("Unknown");
        }


        if (complaint.getReporter() != null) {
            dto.setReporterId(complaint.getReporter().getId());
            dto.setReporterEmail(complaint.getReporter().getEmail());

            if (complaint.getReporter().getJobSeeker() != null) {
                dto.setReporterName(
                        complaint.getReporter().getJobSeeker().getFirstName() + " " +
                                complaint.getReporter().getJobSeeker().getLastName()
                );
            } else if (complaint.getReporter().getEmployer() != null) {
                dto.setReporterName(
                        complaint.getReporter().getEmployer().getCompanyName()
                );
            } else {
                dto.setReporterName("UNKNOWN USER");
            }
        }


        if (complaint.getTarget() != null) {
            dto.setTargetId(complaint.getTarget().getId());
            dto.setTargetEmail(complaint.getTarget().getEmail());

            if (complaint.getTarget().getJobSeeker() != null) {
                dto.setTargetName(
                        complaint.getTarget().getJobSeeker().getFirstName() + " " +
                                complaint.getTarget().getJobSeeker().getLastName()
                );
            } else if (complaint.getTarget().getEmployer() != null) {
                dto.setTargetName(
                        complaint.getTarget().getEmployer().getCompanyName()
                );
            } else {
                dto.setTargetName("UNKNOWN USER");
            }
        }

        return dto;
    }
}
