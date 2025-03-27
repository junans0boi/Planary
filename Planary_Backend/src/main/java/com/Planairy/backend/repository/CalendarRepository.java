package main.java.com.Planairy.backend.repository;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    List<Calendar> findByUserEmailAndStartTimeBetween(String email, LocalDateTime start, LocalDateTime end);
}