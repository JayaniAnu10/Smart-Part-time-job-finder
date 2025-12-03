package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterRequest;
import org.mapstruct.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsUserByEmail(String email);

}