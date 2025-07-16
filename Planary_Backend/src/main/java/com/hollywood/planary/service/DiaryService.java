// src/main/java/com/hollywood/planary/service/DiaryService.java
package com.hollywood.planary.service;

import com.hollywood.planary.entity.Diary;
import com.hollywood.planary.repository.DiaryRepository;
import com.hollywood.planary.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DiaryService {
    private final DiaryRepository diaryRepo;
    private final UserRepository userRepo;

    public DiaryService(DiaryRepository diaryRepo, UserRepository userRepo) {
        this.diaryRepo = diaryRepo;
        this.userRepo = userRepo;
    }

    public List<Diary> listDiaries(Long userId) {
        return diaryRepo.findByUserUserId(userId);
    }

    public List<Diary> listDiariesByDate(Long userId, LocalDate date) {
        return diaryRepo.findByUserUserIdAndDate(userId, date);
    }

    @Transactional
    public Diary createDiary(Diary diary) {
        userRepo.findById(diary.getUser().getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user id"));
        return diaryRepo.save(diary);
    }

    @Transactional
    public Diary updateDiary(Long id, Diary dto) {
        Diary existing = diaryRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Diary not found"));
        existing.setDate(dto.getDate());
        existing.setTitle(dto.getTitle());
        existing.setContent(dto.getContent());
        existing.setEmotion(dto.getEmotion());
        return diaryRepo.save(existing);
    }

    @Transactional
    public void deleteDiary(Long id) {
        diaryRepo.deleteById(id);
    }
}
