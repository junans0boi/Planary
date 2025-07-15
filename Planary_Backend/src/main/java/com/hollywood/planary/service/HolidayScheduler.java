package com.hollywood.planary.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.hollywood.planary.entity.Holiday;
import com.hollywood.planary.repository.HolidayRepository;

import java.time.Year;
import java.util.List;

@Component
public class HolidayScheduler {
    private final HolidayService service;
    private final HolidayRepository repo;

    public HolidayScheduler(HolidayService svc, HolidayRepository repo) {
        this.service = svc;
        this.repo = repo;
    }

    // 매월 1일 자정에 실행
    @Scheduled(cron = "0 0 0 1 * *")
    public void updateMonthlyHolidays() {
        int year = Year.now().getValue();
        List<Holiday> holidays = service.fetchHolidays(year);
        repo.saveAll(holidays);
    }
}
