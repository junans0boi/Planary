package com.hollywood.planary.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
          .csrf().disable()   // REST API 테스트 용도로 CSRF 비활성화
          .authorizeHttpRequests(auth -> auth
            // 회원가입 엔드포인트는 모두 허용
            .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
            // 그 외 모든 요청은 인증 필요
            .anyRequest().authenticated()
          )
          .httpBasic();       // 간단히 HTTP Basic 인증 사용

        return http.build();
    }

    /**  
     * 테스트용으로 비밀번호를 평문 그대로 쓰려면 NoOpPasswordEncoder 등록  
     * 운영 시에는 BCrypt 같은 강력한 인코더를 사용하세요.  
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}