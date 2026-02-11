package com.smartparttime.parttimebackend.modules.Notification.repo;

import com.smartparttime.parttimebackend.modules.Notification.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageRepo extends JpaRepository<Message, Long> {
    Optional<Message> findByTemplateKey(String templateKey);

}
