package com.smartparttime.parttimebackend.modules.Auth;

import com.smartparttime.parttimebackend.modules.Auth.Dtos.UserLoginRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
@AllArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public void login(@Valid @RequestBody UserLoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
    }
}
