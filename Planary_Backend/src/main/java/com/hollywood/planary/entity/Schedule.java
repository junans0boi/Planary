package com.hollywood.planary.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "events")
@Getter @Setter @NoArgsConstructor
public class Schedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    private boolean isAllDay;
    private boolean hasTime;
    private LocalDateTime startDt;
    private LocalDateTime endDt;
    private boolean isRecurring;
    private String recurRule;

    @Enumerated(EnumType.STRING)
    private Visibility visibility;

    private boolean isDone;

    private String externalSource;
    private String externalScheduleId;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(name = "event_tags",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags;
}