package com.smartparttime.parttimebackend.modules.Notification.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class NotificationRequest {

    private UUID userId;
    private String message;
    private String subject;
}
