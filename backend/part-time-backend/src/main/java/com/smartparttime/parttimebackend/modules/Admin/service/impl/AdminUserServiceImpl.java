package com.smartparttime.parttimebackend.modules.Admin.service.impl;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminUserDto;
import com.smartparttime.parttimebackend.modules.Admin.mapper.AdminUserMapper;
import com.smartparttime.parttimebackend.modules.Admin.repo.AdminUserRepo;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminUserService;
import com.smartparttime.parttimebackend.modules.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private AdminUserRepo adminUserRepo;

    @Autowired
    private AdminUserMapper adminUserMapper;




    @Override
    public List<AdminUserDto> getAllUsers() {

            return adminUserRepo.findAllUsers()
                    .stream()
                    .map(adminUserMapper::mapToDto)
                    .collect(Collectors.toList());

    }

    @Override
    public AdminUserDto getUserById(UUID userId) {

        User user = adminUserRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return adminUserMapper.mapToDto(user);

    }

    @Override
    public AdminUserDto updateUserStatus(UUID userId, boolean isActive) {

        User user =  adminUserRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsVerified(isActive);
        adminUserRepo.save(user);
        return adminUserMapper.mapToDto(user);




    }

    @Override
    public List<AdminUserDto> searchUsers(String keyword) {

       return adminUserRepo.searchUsers(keyword)
               .stream()
               .map(adminUserMapper::mapToDto)
               .collect(Collectors.toList());
    }
}
