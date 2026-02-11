package com.smartparttime.parttimebackend.modules.Notification.repo;

import com.smartparttime.parttimebackend.modules.Notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, UUID> {

    List<Notification> findByUser_IdOrderByCreatedAtDesc(UUID userId);

}
