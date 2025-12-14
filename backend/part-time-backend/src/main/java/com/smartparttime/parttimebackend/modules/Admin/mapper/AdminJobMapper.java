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


        if (job.getCategory() != null) {
            dto.setCategory(job.getCategory().getCategory());
        } else {
            dto.setCategory("UNKNOWN");
        }


        if (job.getEmployer() != null && job.getEmployer().getUser() != null) {
            dto.setEmployerEmail(job.getEmployer().getUser().getEmail());
        } else {
            dto.setEmployerEmail("UNKNOWN");
        }


        dto.setStatus(job.getStatus().name());


        if (job.getPostedDate() != null) {
            dto.setPostedDate(job.getPostedDate().toString());
        } else {
            dto.setPostedDate("N/A");
        }


        return dto;
    }
}
