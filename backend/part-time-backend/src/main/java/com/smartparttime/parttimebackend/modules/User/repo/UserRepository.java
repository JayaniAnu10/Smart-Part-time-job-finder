package com.smartparttime.parttimebackend.modules.User.repo;

import com.smartparttime.parttimebackend.modules.User.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;


public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsUserByEmail(String email);

}