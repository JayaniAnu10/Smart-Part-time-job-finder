package com.smartparttime.parttimebackend.modules.User.seed;

import com.smartparttime.parttimebackend.modules.User.Role;
import com.smartparttime.parttimebackend.modules.User.entities.User;
import com.smartparttime.parttimebackend.modules.User.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        boolean adminExists = userRepository.existsByRole(Role.ADMIN);

        if (!adminExists) {

            System.out.println("Creating default admin...");

            User admin = new User();
            admin.setEmail("admin@smartparttime.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setIsVerified(true);

            admin.setContact("0000000000");

            admin.setCreatedAt(LocalDateTime.now());
            admin.setUpdatedAt(LocalDateTime.now());

            admin.setAverageRate(BigDecimal.ZERO);
            admin.setTotalRatings(0);
            admin.setTrustScore(0);

            admin.setIsEmployer(false);
            admin.setIsJobseeker(false);


            userRepository.save(admin);

            System.out.println(" Default ADMIN user created.");
        }
    }


}
