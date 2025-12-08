package com.smartparttime.parttimebackend.modules.Admin.mapper;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminUserDto;
import com.smartparttime.parttimebackend.modules.User.User;
import org.springframework.stereotype.Component;


@Component
public class AdminUserMapper {



    public AdminUserDto mapToDto(User user) {

        AdminUserDto dto = new AdminUserDto();

        dto.setId(user.getId());

        dto.setEmail(user.getEmail());

        dto.setRole(user.getRole().name());

        if (user.getEmployer() != null) {
            dto.setName(user.getEmployer().getCompanyName());
        } else if (user.getJobSeeker() != null) {
            dto.setName(user.getJobSeeker().getFirstName() + " " + user.getJobSeeker().getLastName());
        } else {
            dto.setName("ADMIN");
        }

        dto.setStatus(user.getIsVerified() ? "VERIFIED" : "NOT_VERIFIED");

        dto.setCreatedAt(user.getCreatedAt().toString());


        return dto;

    }



}
