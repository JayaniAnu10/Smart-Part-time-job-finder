package com.smartparttime.parttimebackend.modules.User;

import com.smartparttime.parttimebackend.modules.User.UserDtos.UserRegisterRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.Map;


@AllArgsConstructor
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> addUser(
             @Valid @RequestBody UserRegisterRequest request,
            UriComponentsBuilder uriBuilder
            ) {
        if(userRepository.existsUserByEmail(request.getEmail())){
            return ResponseEntity.badRequest().body(
                    Map.of("email","Email already exists")
            );
        }

        if(!request.getPassword().equals(request.getConfirmPassword())){
           return ResponseEntity.badRequest().body(
                   Map.of("confirmPassword","Passwords do not match")
           );
        }
        var userDto = userService.registerUser(request);
        var uri = uriBuilder.path("/users/{id}").buildAndExpand(userDto.getId()).toUri();
        return ResponseEntity.created(uri).body(userDto);

    }


}
