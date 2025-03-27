package main.java.com.Planairy.backend.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendars")
@CrossOrigin(origins = "http://localhost:3000")
public class CalendarController {

    private final CalendarService calendarService;

    @PostMapping
    public Long createCalendar(@RequestBody CalendarRequestDto dto) {
        // 실제 서비스에선 인증된 사용자 이메일을 SecurityContext에서 가져옴
        return calendarService.save(dto);
    }

    @GetMapping
    public List<Calendar> getCalendars(
        @RequestParam String email,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end
    ) {
        return calendarService.getUserCalendars(email, start, end);
    }
}