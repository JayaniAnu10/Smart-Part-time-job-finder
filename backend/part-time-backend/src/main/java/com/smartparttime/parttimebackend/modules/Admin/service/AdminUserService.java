package com.smartparttime.parttimebackend.modules.Admin.service;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminUserDto;

import java.util.List;
import java.util.UUID;

public interface AdminUserService {

        List<AdminUserDto> getAllUsers();

        AdminUserDto getuserById(UUID userId);

        AdminUserDto updateUserStatus(UUID userId, boolean isActive);

        List<AdminUserDto> searchUser(String keyword);




}
