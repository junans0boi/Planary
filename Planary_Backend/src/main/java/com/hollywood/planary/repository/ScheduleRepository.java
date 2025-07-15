// src/main/java/com/hollywood/planary/repository/ScheduleRepository.java
package com.hollywood.planary.repository;

import com.hollywood.planary.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // 전체 스케줄
    List<Schedule> findByUserUserId(Long userId);

    // 특정 날짜 범위(하루) 스케줄 ← 새로 추가
    List<Schedule> findByUserUserIdAndStartDtBetween(Long userId,
            LocalDateTime from,
            LocalDateTime to);
}