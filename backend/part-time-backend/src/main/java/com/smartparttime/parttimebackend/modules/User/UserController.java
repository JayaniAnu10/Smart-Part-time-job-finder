package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.User.UserDtos.*;
import com.smartparttime.parttimebackend.modules.User.UserExceptions.PasswordMismatchException;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;


@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping
    public UserRegisterResponse registerUser(@Valid @RequestBody UserRegisterRequest request) {
        return userService.registerUser(request);
    }

    @GetMapping
    public Iterable<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDto)
                .toList();
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable UUID id) {
        var user= userService.getUserById(id);
        return ResponseEntity.ok(userMapper.toDto(user));
    }


    @PostMapping("/{id}/change-password")
    public ResponseEntity<Void> changeUserPassword(
            @PathVariable UUID id,
            @Valid @RequestBody ChangePasswordRequest request
    ){
        userService.changePassword(id,request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public void login(@Valid @RequestBody UserLoginRequest request) {
        userService.login(request);
    }

}
