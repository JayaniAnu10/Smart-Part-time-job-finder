package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterResponse;
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
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public  UserRegisterResponse registerUser(@Valid UserRegisterRequest request){
        Language language = languageRepository.findByLanguageIgnoreCase(request.getLanguage()).orElseThrow();
        var user = userMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setLanguage(language);
        user.setCreatedAt(LocalDateTime.now());
        user.setIsVerified(false);
        user.setTrustScore(0);
        var savedUser = userRepository.save(user);

        return userMapper.toDto(savedUser);

    }
}
