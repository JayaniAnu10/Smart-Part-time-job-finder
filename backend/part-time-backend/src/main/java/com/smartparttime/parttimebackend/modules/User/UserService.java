package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.common.exceptions.BadRequestException;
import com.smartparttime.parttimebackend.common.exceptions.NotFoundException;
import com.smartparttime.parttimebackend.modules.User.UserDtos.ChangePasswordRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
import com.smartparttime.parttimebackend.modules.User.UserExceptions.PasswordMismatchException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


@Service
@AllArgsConstructor
public class UserService{
    private final LanguageRepository languageRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public  User registerUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Language defaultLang = languageRepository.findById(1).orElseThrow();
        user.setLanguage(defaultLang);
        user.setCreatedAt(LocalDateTime.now());
        user.setIsVerified(false);
        return userRepository.save(user);
    }

    /*public User getUserById(Long id){
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    public void changePassword(Long id, ChangePasswordRequest request){
        var user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new NotFoundException("User not found");
        }

        if(!passwordEncoder.matches(request.getOldPassword(),user.getPassword())){
            throw new PasswordMismatchException("Old Password Mismatch");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }*/
}
