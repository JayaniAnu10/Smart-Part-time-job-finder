package com.smartparttime.parttimebackend.modules.Admin.mapper;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminJobDetailsViewDto;
import com.smartparttime.parttimebackend.modules.Job.entity.Job;
import org.springframework.stereotype.Component;

@Component
public class AdminJobDetailsMapper {

    public AdminJobDetailsViewDto toDto(Job job) {

        AdminJobDetailsViewDto dto = new AdminJobDetailsViewDto();

        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setLocation(job.getLocation());
        dto.setStatus(job.getStatus().name());


        if (job.getEmployer() != null) {
            dto.setCompanyName(job.getEmployer().getCompanyName());
        } else {
            dto.setCompanyName("Unknown Company");
        }


        if (job.getCategory() != null) {
            dto.setCategory(job.getCategory().getCategory());
        }

        dto.setPostedDate(
                job.getPostedDate() != null
                        ? job.getPostedDate().toLocalDate().toString()
                        : "N/A"
        );

        dto.setDescription(job.getDescription());
        dto.setRequirements(job.getRequirements());
        dto.setBenefits(job.getAccommodation()); 

        dto.setMinSalary(job.getMinSalary());
        dto.setMaxSalary(job.getMaxSalary());

        return dto;
    }
}
