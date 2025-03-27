package com.planairy.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 허용
public class UserController {

    // ❗ 임시 사용자 저장소 (DB 대신, 테스트용)
    private final Map<String, String> userStore = new HashMap<>();

    // ✅ 회원가입 API
    @PostMapping("/signup")
    public String signup(@RequestBody UserDto user) {
        if (userStore.containsKey(user.getEmail())) {
            return "이미 존재하는 이메일입니다.";
        }
        userStore.put(user.getEmail(), user.getPassword());
        return "회원가입 성공!";
    }

    // ✅ 로그인 API
    @PostMapping("/login")
    public LoginResponse login(@RequestBody UserDto user) {
        String storedPw = userStore.get(user.getEmail());
        if (storedPw != null && storedPw.equals(user.getPassword())) {
            return new LoginResponse(true, "로그인 성공!");
        } else {
            return new LoginResponse(false, "이메일 또는 비밀번호가 틀렸습니다.");
        }
    }

    // ✅ 공통 User DTO
    static class UserDto {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    static class LoginResponse {
        private boolean success;
        private String message;

        public LoginResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }

        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
    }
}