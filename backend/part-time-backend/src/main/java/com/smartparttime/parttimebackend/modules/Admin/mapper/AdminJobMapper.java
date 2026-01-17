package com.smartparttime.parttimebackend.modules.Admin.mapper;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminJobDto;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import org.springframework.stereotype.Component;

@Component
public class AdminJobMapper {

    public AdminJobDto mapToDto(Job job) {

        AdminJobDto dto = new AdminJobDto();

        dto.setId(job.getId());


        dto.setTitle(job.getTitle());


        if (job.getEmployer() != null) {
            dto.setCompany(job.getEmployer().getCompanyName());
        } else {
            dto.setCompany("UNKNOWN");
        }


        if (job.getLocation() != null) {
            dto.setLocation(job.getLocation());
        } else {
            dto.setLocation("N/A");
        }


        if (job.getStatus() != null) {
            dto.setStatus(job.getStatus().name());
        } else {
            dto.setStatus("UNKNOWN");
        }


        if (job.getPostedDate() != null) {
            dto.setPostedDate(job.getPostedDate().toString());
        } else {
            dto.setPostedDate("N/A");
        }

        return dto;
    }
}
