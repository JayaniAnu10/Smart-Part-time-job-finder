package com.smartparttime.parttimebackend.modules.Notification.controller;

import com.smartparttime.parttimebackend.modules.Notification.dto.NotificationResponse;
import com.smartparttime.parttimebackend.modules.Notification.entity.Notification;
import com.smartparttime.parttimebackend.modules.Notification.repo.NotificationRepo;
import com.smartparttime.parttimebackend.modules.Notification.service.NotificationService;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final NotificationRepo notificationRepo;
    private final UserRepository userRepository;


    @GetMapping("/user/{userId}")
    public List<NotificationResponse> getUserNotifications(@PathVariable UUID userId) {
        return notificationService.getUserNotifications(userId);
    }



    @PutMapping("/read-all")
    public void markAllAsRead(Authentication authentication) {
        UUID userId = UUID.fromString(authentication.getName());
        notificationService.markAllAsRead(userId);
    }



    @GetMapping("/unread-count")
    public ResponseEntity<Long> getUnreadCount(Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UUID userId = UUID.fromString(authentication.getName());

        long count = notificationRepo.countByUserIdAndIsReadFalse(userId);

        return ResponseEntity.ok(count);
    }






}
