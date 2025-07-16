package com.hollywood.planary.repository;

import com.hollywood.planary.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {
    // User.userId 프로퍼티를 사용하도록 변경
    List<Diary> findByUserUserId(Long userId);
    List<Diary> findByUserUserIdAndDate(Long userId, LocalDate date);
}