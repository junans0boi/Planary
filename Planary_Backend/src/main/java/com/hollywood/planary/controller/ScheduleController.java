package com.hollywood.planary.controller;

import com.hollywood.planary.entity.Schedule;
import com.hollywood.planary.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class ScheduleController {
    private final ScheduleService eventService;

    public ScheduleController(ScheduleService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/user/{userId}")
    public List<Schedule> getSchedulesByUser(@PathVariable Long userId) {
        return eventService.findSchedulesByUser(userId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getSchedule(@PathVariable Long id) {
        try {
            Schedule ev = eventService.findSchedule(id);
            return ResponseEntity.ok(ev);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Schedule createSchedule(@RequestBody Schedule event) {
        return eventService.createSchedule(event);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable Long id, @RequestBody Schedule event) {
        try {
            Schedule updated = eventService.updateSchedule(id, event);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        eventService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }
}
