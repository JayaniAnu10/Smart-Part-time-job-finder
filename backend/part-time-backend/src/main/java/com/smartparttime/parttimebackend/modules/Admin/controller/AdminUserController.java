package com.smartparttime.parttimebackend.modules.Admin.controller;

import com.smartparttime.parttimebackend.modules.Admin.dto.AdminUserDto;
import com.smartparttime.parttimebackend.modules.Admin.service.AdminUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;


    @GetMapping
    public List<AdminUserDto> getAllUsers() {
        return adminUserService.getAllUsers();
    }


    @GetMapping("/{id}")
    public AdminUserDto getUserById(@PathVariable UUID id) {
        return adminUserService.getUserById(id);
    }


    @PutMapping("/{id}/status")
    public AdminUserDto updateUserStatus(
            @PathVariable UUID id,
            @RequestParam boolean isActive
    ) {
        return adminUserService.updateUserStatus(id, isActive);
    }


    @GetMapping("/search")
    public List<AdminUserDto> searchUsers(@RequestParam String keyword) {
        return adminUserService.searchUsers(keyword);
    }
}
