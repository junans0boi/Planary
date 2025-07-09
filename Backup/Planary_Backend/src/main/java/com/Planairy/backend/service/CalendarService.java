package main.java.com.Planairy.backend.service;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final CalendarRepository calendarRepository;

    public Long save(CalendarRequestDto dto) {
        Calendar cal = Calendar.builder()
                .title(dto.getTitle())
                .tag(dto.getTag())
                .tagColor(dto.getTagColor())
                .repeat(dto.getRepeat())
                .alarm(dto.getAlarm())
                .location(dto.getLocation())
                .memo(dto.getMemo())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .userEmail(dto.getUserEmail())
                .build();

        return calendarRepository.save(cal).getId();
    }

    public List<Calendar> getUserCalendars(String email, LocalDateTime start, LocalDateTime end) {
        return calendarRepository.findByUserEmailAndStartTimeBetween(email, start, end);
    }
}