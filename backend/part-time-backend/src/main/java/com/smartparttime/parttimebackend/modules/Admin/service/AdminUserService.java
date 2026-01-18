package com.smartparttime.parttimebackend.modules.Admin.service;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminUserDto;

import java.util.List;
import java.util.UUID;

public interface AdminUserService {

        List<AdminUserDto> getAllUsers();

        AdminUserDto getUserById(UUID userId);

        AdminUserDto updateUserStatus(UUID userId, boolean isActive);

        List<AdminUserDto> searchUsers(String keyword);


        void deleteUser(UUID id);

        String getUserEmailById(UUID userId);
}
