package com.hollywood.planary.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hollywood.planary.entity.Holiday;

import java.time.LocalDate;

public interface HolidayRepository extends JpaRepository<Holiday, LocalDate> {}
