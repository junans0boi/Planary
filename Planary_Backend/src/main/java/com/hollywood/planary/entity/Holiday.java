package com.hollywood.planary.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Holiday {
    @Id
    private LocalDate date;
    private String name;

    protected Holiday() {}
    public Holiday(LocalDate date, String name) {
        this.date = date;
        this.name = name;
    }

    public LocalDate getDate() { return date; }
    public String getName() { return name; }
}