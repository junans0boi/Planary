package com.hollywood.planary.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.hollywood.planary.entity.Holiday;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class HolidayService {
    private final RestTemplate rest;
    private final DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyyMMdd");

    @Value("${holiday.api.key}")
    private String serviceKey;

    public HolidayService(RestTemplateBuilder b) {
        this.rest = b.build();
    }

    public List<Holiday> fetchHolidays(int year) {
        String url = "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo";
        String uri = String.format(
            "%s?serviceKey=%s&solYear=%d&pageNo=1&numOfRows=100&_type=json",
            url, serviceKey, year
        );

        JsonNode root = rest.getForObject(uri, JsonNode.class);
        JsonNode items = root.path("response").path("body").path("items").path("item");
        List<Holiday> list = new ArrayList<>();
        if (items.isArray()) {
            for (JsonNode it : items) {
                LocalDate d = LocalDate.parse(it.get("locdate").asText(), fmt);
                String name = it.get("dateName").asText();
                list.add(new Holiday(d, name));
            }
        }
        return list;
    }
}