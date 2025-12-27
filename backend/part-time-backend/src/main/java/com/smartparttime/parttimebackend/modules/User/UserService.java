package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.User.UserDtos.ChangePasswordRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserLoginRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import com.smartparttime.parttimebackend.modules.User.UserExceptions.PasswordMismatchException;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;


@Service
@AllArgsConstructor
public class UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserRegisterResponse registerUser(UserRegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())){
            throw new BadRequestException("Email already exists");
        };

        if(!request.getPassword().equals(request.getConfirmPassword())){
            throw new PasswordMismatchException("Passwords do not match");
        }

        var user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setAverageRate(BigDecimal.valueOf(0.0));
        user.setTotalRatings(0);
        user.setCreatedAt(LocalDateTime.now());
        user.setIsVerified(false);
        userRepository.save(user);
        return userMapper.toResponse(user);
    }

    public User getUserById(UUID id){
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    public void changePassword(UUID id, ChangePasswordRequest request){
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new NotFoundException("User not found");
        }

        if(!passwordEncoder.matches(request.getOldPassword(),user.getPassword())){
            throw new PasswordMismatchException("Old Password Mismatch");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void login( UserLoginRequest request){
        var user= userRepository.findByEmail(request.getEmail());
        if(user == null){
            throw new NotFoundException("User not found");
        }
        if(!passwordEncoder.matches(request.getPassword(),user.getPassword())){
            throw new PasswordMismatchException("Passwords do not match");
        };

        ResponseEntity.ok();

    }

}
