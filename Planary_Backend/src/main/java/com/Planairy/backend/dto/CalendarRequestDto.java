package main.java.com.Planairy.backend.dto;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class CalendarRequestDto {
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
