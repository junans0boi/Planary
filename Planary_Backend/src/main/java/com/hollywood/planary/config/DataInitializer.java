// src/main/java/com/hollywood/planary/config/DataInitializer.java
package com.hollywood.planary.config;

import com.hollywood.planary.entity.User;
import com.hollywood.planary.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner init(UserRepository userRepo, PasswordEncoder pwEncoder) {
        return args -> {
            if (userRepo.count() == 0) {
                User u = new User();
                u.setEmail("test@planary.com");
                u.setDisplayName("테스트유저");
                u.setPassword(pwEncoder.encode("test1234"));
                userRepo.save(u);
            }
        };
    }
}