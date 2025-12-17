package com.smartparttime.parttimebackend.modules.Notification.service;

import com.smartparttime.parttimebackend.common.Services.EmailService;
import com.smartparttime.parttimebackend.modules.Notification.entity.Message;
import com.smartparttime.parttimebackend.modules.Notification.entity.Notification;
import com.smartparttime.parttimebackend.modules.Notification.repo.MessageRepo;
import com.smartparttime.parttimebackend.modules.Notification.repo.NotificationRepo;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepo notificationRepo;
    private final MessageRepo messageRepo;
    private final UserRepository userRepo;
    private final EmailService emailService;


    public void sendNotification(UUID userId, String messageText, String emailSubject) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Message message = new Message();
        message.setDescription(messageText);
        Message savedMessage = messageRepo.save(message);

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setMessage(savedMessage);
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepo.save(notification);

        emailService.sendSimpleEmail(
                user.getEmail(),
                emailSubject,
                messageText
        );
    }


    public void notifyJobApplied(UUID employerUserId, String jobTitle) {
        String subject = "New Job Application";
        String message = "A new candidate has applied for your job: " + jobTitle;

        sendNotification(employerUserId, message, subject);
    }


    public void notifyStatusChanged(UUID jobSeekerUserId, String jobTitle, String status) {
        String subject = "Application Status Update";
        String message = "Your application for \"" + jobTitle + "\" is now " + status;

        sendNotification(jobSeekerUserId, message, subject);
    }


    public List<Notification> getUserNotifications(UUID userId) {
        return notificationRepo.findByUserId(userId);
    }



    public void markAsRead(UUID notificationId) {
        Notification notification = notificationRepo.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);
        notificationRepo.save(notification);
    }
}
