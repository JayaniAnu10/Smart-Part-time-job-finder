package com.smartparttime.parttimebackend.common.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
       return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .sessionManagement(c->
                        c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(c->c
                        .requestMatchers(HttpMethod.POST,"/user/*").permitAll()
                        .requestMatchers(HttpMethod.POST,"/user").permitAll()
                        .requestMatchers(HttpMethod.POST,"/ratings").permitAll()
                        .requestMatchers(HttpMethod.GET,"/user/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/user").permitAll()
                        .requestMatchers(HttpMethod.POST,"/employer/register").permitAll()
                        .requestMatchers(HttpMethod.GET,"/employer/*").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/employer/*").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/employer/*").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/jobseeker/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/employer").permitAll()
                        .requestMatchers(HttpMethod.POST,"/jobseeker/register").permitAll()
                        .requestMatchers(HttpMethod.GET,"/jobseeker/*").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/jobseeker/**").permitAll()
                        .requestMatchers(HttpMethod.PUT,"/employer/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/jobseeker").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/jobseeker/*").permitAll()
                        .requestMatchers(HttpMethod.POST,"/user/*/change-password").permitAll()
                        .requestMatchers(HttpMethod.POST,"/jobs/create/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/jobs/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/jobs").permitAll()
                        .requestMatchers(HttpMethod.GET,"/jobs/**").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/jobs/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/jobs/*").permitAll()
                        .anyRequest().authenticated());
        return http.build();
    }
}
