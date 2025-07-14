// src/main/java/com/hollywood/planary/service/TodoService.java
package com.hollywood.planary.service;

import com.hollywood.planary.entity.Todo;
import com.hollywood.planary.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TodoService {
    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    public List<Todo> findTodosByUserAndDate(Long userId, LocalDateTime dayStart, LocalDateTime dayEnd) {
        return repo.findByUserUserIdAndStartDtBetween(userId, dayStart, dayEnd);
    }

    @Transactional
    public Todo createTodo(Todo todo) {
        return repo.save(todo);
    }

    @Transactional
    public Todo updateTodo(Long id, Todo dto) {
        Todo t = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Todo not found"));
        t.setTitle(dto.getTitle());
        t.setRecurring(dto.isRecurring());
        t.setStartDt(dto.getStartDt());
        t.setEndDt(dto.getEndDt());
        t.setDone(dto.isDone());
        return repo.save(t);
    }

    @Transactional
    public void deleteTodo(Long id) {
        repo.deleteById(id);
    }

    public List<Todo> findByUser(Long userId) {
        return repo.findByUserUserId(userId);
    }

    public List<Todo> findByUserAndDay(Long userId, LocalDateTime start, LocalDateTime end) {
        return findTodosByUserAndDate(userId, start, end);
    }

    public Todo create(Todo td) {
        return createTodo(td);
    }

    public Todo update(Long id, Todo dto) {
        return updateTodo(id, dto);
    }

    public void delete(Long id) {
        deleteTodo(id);
    }
}