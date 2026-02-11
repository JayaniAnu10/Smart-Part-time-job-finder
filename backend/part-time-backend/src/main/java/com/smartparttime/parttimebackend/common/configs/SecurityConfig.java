package com.smartparttime.parttimebackend.common.configs;

import com.smartparttime.parttimebackend.modules.Auth.filters.JwtAuthenticationFilter;
import com.smartparttime.parttimebackend.modules.User.Role;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {
    private final UserDetailsService userDetailsService;
    private final JwtAuthenticationFilter  jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
       return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        var provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public  AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .sessionManagement(c->
                        c.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(c->c
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/swagger-ui.html").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")

                        .requestMatchers("/complaints/**").permitAll()
                        .requestMatchers("/complaint-types/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST,"/auth/refresh").permitAll()
                        .requestMatchers(HttpMethod.POST,"/auth/logout").permitAll()
                        .requestMatchers(HttpMethod.POST,"/user/*").permitAll()
                        .requestMatchers(HttpMethod.POST,"/user").permitAll()
                        .requestMatchers("/checkout").permitAll()
                        .requestMatchers("/promotions").permitAll()
                        .requestMatchers("/promotions/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/checkout/webhook").permitAll()
                        .requestMatchers("/recommendations/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/ratings").permitAll()
                        .requestMatchers(HttpMethod.GET,"/ratings/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/ratings/**").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/ratings").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/ratings/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/user/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/user").permitAll()
                        .requestMatchers(HttpMethod.POST,"/employer/register").permitAll()
                        .requestMatchers(HttpMethod.GET,"/employer/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/employer/**").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/employer/*").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/employer/*").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/jobseeker/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/employer").permitAll()
                        .requestMatchers(HttpMethod.POST,"/jobseeker/register").permitAll()
                        .requestMatchers(HttpMethod.GET,"/jobseeker/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/jobseeker/**").permitAll()
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
                        .requestMatchers(HttpMethod.POST,"/applications").permitAll()
                        .requestMatchers(HttpMethod.GET,"/applications/*").permitAll()
                        .requestMatchers(HttpMethod.GET,"/attendance/scan").permitAll()
                        .requestMatchers(HttpMethod.GET,"/applications/**").permitAll()
                        .requestMatchers(HttpMethod.DELETE,"/applications/*").permitAll()
                        .requestMatchers(HttpMethod.PATCH,"/applications/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/chat").permitAll()
                        .requestMatchers(HttpMethod.POST,"/user/*").permitAll()
                        .anyRequest().authenticated())
                .cors(cors -> cors.configurationSource(request -> {
                    var config = new org.springframework.web.cors.CorsConfiguration();
                    config.setAllowedOrigins(java.util.List.of("http://localhost:5173"));
                    config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "PATCH"));
                    config.setAllowedHeaders(java.util.List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(c -> {
                    c.authenticationEntryPoint(
                            new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
                    c.accessDeniedHandler(((request, response, accessDeniedException) ->
                            response.setStatus(HttpStatus.FORBIDDEN.value())));
                });
        return http.build();
    }


}
