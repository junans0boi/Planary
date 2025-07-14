// src/main/java/com/hollywood/planary/repository/TodoRepository.java
package com.hollywood.planary.repository;

import com.hollywood.planary.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
// TodoRepository.java
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserUserIdAndStartDtBetween(Long userId, LocalDateTime from, LocalDateTime to);
    // 컨트롤러 list()에서 쓰는 findByUser
    List<Todo> findByUserUserId(Long userId);
}