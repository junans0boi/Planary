package com.hollywood.planary.service;

import com.hollywood.planary.entity.Schedule;
import com.hollywood.planary.repository.ScheduleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepo;

    public ScheduleService(ScheduleRepository repo) {
        this.scheduleRepo = repo;
    }

    public List<Schedule> findSchedulesByUser(Long userId) {
        return scheduleRepo.findByUserUserId(userId);
    }

    public Schedule findSchedule(Long id) {
        return scheduleRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found"));
    }

    @Transactional
    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepo.save(schedule);
    }

    @Transactional
    public Schedule updateSchedule(Long id, Schedule dto) {
        Schedule ev = scheduleRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found"));
        ev.setTitle(dto.getTitle());
        ev.setStartDt(dto.getStartDt());
        ev.setEndDt(dto.getEndDt());
        ev.setDone(dto.isDone()); // <— dto.isDone() 로 변경
        // ... 나머지 필드 업데이트
        return scheduleRepo.save(ev);
    }

    @Transactional
    public void deleteSchedule(Long id) {
        scheduleRepo.deleteById(id);
    }

    // → 컨트롤러가 호출하는 이름으로 위임 메서드 추가
    public List<Schedule> findByUser(Long userId) {
        return findSchedulesByUser(userId);
    }

    public Schedule create(Schedule ev) {
        return createSchedule(ev);
    }

    public Schedule update(Long id, Schedule dto) {
        return updateSchedule(id, dto);
    }

    public void delete(Long id) {
        deleteSchedule(id);
    }
}