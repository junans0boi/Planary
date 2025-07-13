package com.hollywood.planary.service;

import com.hollywood.planary.entity.User;
import com.hollywood.planary.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepo;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    public Optional<User> findUserById(Long id) {
        return userRepo.findById(id);
    }

    @Transactional
    public User createUser(User user) {
        // 비즈니스 로직(예: 이메일 중복 체크) 추가 가능
        return userRepo.save(user);
    }

    @Transactional
    public User updateUser(Long id, User dto) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setDisplayName(dto.getDisplayName());
        user.setPassword(dto.getPassword());
        // 기타 필드 업데이트...
        return userRepo.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
}