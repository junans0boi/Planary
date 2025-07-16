package com.hollywood.planary.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DiaryDto {
    private Long id;
    private Long userId;
    private LocalDate date;
    private String title;
    private String content;
    private Integer emotion;
}
