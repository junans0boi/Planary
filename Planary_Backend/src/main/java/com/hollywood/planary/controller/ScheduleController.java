package com.hollywood.planary.controller;

import com.hollywood.planary.entity.Schedule;
import com.hollywood.planary.entity.User;
import com.hollywood.planary.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class ScheduleController {
    private final ScheduleService svc;

    public ScheduleController(ScheduleService svc) {
        this.svc = svc;
    }

    @GetMapping
    public List<Schedule> list(@AuthenticationPrincipal User me) {
        return svc.findByUser(me.getUserId());
    }

    @PostMapping
    public Schedule create(@AuthenticationPrincipal User me,
                           @RequestBody Schedule ev) {
        ev.setUser(me);
        return svc.create(ev);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> update(@AuthenticationPrincipal User me,
                                           @PathVariable Long id,
                                           @RequestBody Schedule dto) {
        dto.setUser(me);
        return ResponseEntity.ok(svc.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        svc.delete(id);
        return ResponseEntity.noContent().build();
    }
}