package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.User.UserDtos.ChangePasswordRequest;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserDto;
import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.Map;


@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    /*private final UserRepository userRepository;
    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping
    public ResponseEntity<?> addUser(
             @Valid @RequestBody UserRegisterRequest request,
            UriComponentsBuilder uriBuilder
            ) {

        var userDto = userService.registerUser(request);
        var uri = uriBuilder.path("/users/{id}").buildAndExpand(userDto.getId()).toUri();
        return ResponseEntity.created(uri).body(userDto);

    }

    @GetMapping
    public Iterable<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toDto)
                .toList();
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        var user= userService.getUserById(id);
        return ResponseEntity.ok(userMapper.toDto(user));
    }


    @PostMapping("/{id}/change-password")
    public ResponseEntity<Void> changeUserPassword(
            @PathVariable Long id,
            @Valid @RequestBody ChangePasswordRequest request
    ){
        userService.changePassword(id,request);
        return ResponseEntity.noContent().build();
    }*/

}
