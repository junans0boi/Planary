// src/main/java/com/hollywood/planary/controller/DiaryController.java
package com.hollywood.planary.controller;

import com.hollywood.planary.entity.Diary;
import com.hollywood.planary.service.DiaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/diaries")
public class DiaryController {
    private final DiaryService diaryService;

    public DiaryController(DiaryService diaryService) {
        this.diaryService = diaryService;
    }

    @PostMapping
    public ResponseEntity<Diary> create(@RequestBody Diary diary) {
        Diary created = diaryService.createDiary(diary);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Diary> update(@PathVariable Long id, @RequestBody Diary diary) {
        Diary updated = diaryService.updateDiary(id, diary);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        diaryService.deleteDiary(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Diary>> listByUser(@RequestParam Long userId) {
        List<Diary> list = diaryService.listDiaries(userId);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<Diary>> listByDate(@RequestParam Long userId, @RequestParam String date) {
        LocalDate d = LocalDate.parse(date);
        List<Diary> list = diaryService.listDiariesByDate(userId, d);
        return ResponseEntity.ok(list);
    }
}