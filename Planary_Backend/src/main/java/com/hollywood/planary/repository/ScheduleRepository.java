package com.hollywood.planary.repository;

import com.hollywood.planary.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    // userId로 스케줄 조회할 메서드 선언
    List<Schedule> findByUserUserId(Long userId);
}