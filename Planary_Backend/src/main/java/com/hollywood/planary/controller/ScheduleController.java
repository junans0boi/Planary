package com.hollywood.planary.controller;

import com.hollywood.planary.entity.Schedule;

import com.hollywood.planary.service.ScheduleService;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class ScheduleController {
    private final ScheduleService svc;

    public ScheduleController(ScheduleService svc) { this.svc = svc; }

    // ① 리스트
    @GetMapping
    public List<Schedule> list(@RequestParam Long userId,
                               @RequestParam(required = false) String date) {
        if (date == null) {                 // 전체 조회
            return svc.findByUser(userId);
        }
        LocalDate d   = LocalDate.parse(date);
        LocalDateTime start = d.atStartOfDay();
        LocalDateTime end   = d.atTime(LocalTime.MAX);
        return svc.findByUserAndDay(userId, start, end);
    }

    // ② 생성
    @PostMapping
    public Schedule create(@RequestBody Schedule ev) {
        return svc.create(ev);              // JSON 안의 ev.user.userId 사용
    }

    // ③ 수정
    @PutMapping("/{id}")
    public ResponseEntity<Schedule> update(@PathVariable Long id,
                                           @RequestBody Schedule dto) {
        return ResponseEntity.ok(svc.update(id, dto));
    }

    // ④ 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.noContent().build();
    }
}