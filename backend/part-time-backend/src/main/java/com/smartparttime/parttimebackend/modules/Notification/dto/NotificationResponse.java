package com.smartparttime.parttimebackend.modules.Notification.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class NotificationResponse {

    private UUID id;
    private String message;
    private LocalDateTime createdAt;
    private boolean isRead;

}
