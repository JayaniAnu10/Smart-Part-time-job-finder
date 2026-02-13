package com.smartparttime.parttimebackend.modules.Notification.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class NotificationResponse {

    private UUID id;
    private String message;
    private LocalDateTime createdAt;
    private boolean read;   // ← renamed from isRead

}
