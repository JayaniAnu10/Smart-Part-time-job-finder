package com.smartparttime.parttimebackend.modules.Notification.service;

import com.smartparttime.parttimebackend.common.Services.EmailService;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeeker;
import com.smartparttime.parttimebackend.modules.JobSeeker.JobSeekerRepository;
import com.smartparttime.parttimebackend.modules.Notification.dto.NotificationResponse;
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
    private final JobSeekerRepository jobSeekerRepository;


    private void saveNotification(UUID userId, String messageText) {

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
    }


    public void notifyJobApplied(UUID employerUserId, String jobTitle) {
        String message = "A new candidate has applied for your job: " + jobTitle;
        saveNotification(employerUserId, message);
    }


    public void notifyStatusChanged(UUID jobSeekerUserId, String jobTitle, String status) {


        JobSeeker jobSeeker = jobSeekerRepository.findById(jobSeekerUserId)
                .orElseThrow(() -> new RuntimeException("JobSeeker not found"));


        Message template = messageRepo.findById(17L)
                .orElseThrow(() -> new RuntimeException("Template not found"));


        String finalMessage = template.getDescription()
                .replace("{{firstName}}", jobSeeker.getFirstName())
                .replace("{{jobTitle}}", jobTitle)
                .replace("{{status}}", status);


        saveNotification(jobSeekerUserId, finalMessage);
    }





    public List<NotificationResponse> getUserNotifications(UUID userId) {

        var notifications = notificationRepo.findByUser_IdOrderByCreatedAtDesc(userId);

        return notifications.stream()
                .map(notification -> {
                    NotificationResponse response = new NotificationResponse();
                    response.setId(notification.getId());
                    response.setMessage(notification.getMessage().getDescription());
                    response.setCreatedAt(notification.getCreatedAt());
                    response.setRead(notification.isRead());
                    return response;
                })
                .toList();
    }



    public void markAsRead(UUID notificationId) {
        Notification notification = notificationRepo.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setRead(true);
        notificationRepo.save(notification);
    }

    public void notifyUrgentJobToSeekers(
            List<UUID> jobSeekerUserIds,
            String jobTitle,
            String location
    ) {
        String message = "🚨 Urgent Job Alert!\n\n"
                + "Job: " + jobTitle + "\n"
                + "Location: " + location;

        for (UUID userId : jobSeekerUserIds) {
            saveNotification(userId, message);
        }
    }






}
