package main.java.com.Planairy.backend.dto;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalendarResponseDto {
    private Long id;
    private String title;
    private String tag;
    private String tagColor;
    private String repeat;
    private String alarm;
    private String location;
    private String memo;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String userEmail;
}