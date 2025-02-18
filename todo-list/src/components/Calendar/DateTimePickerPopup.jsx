import React, { useState } from "react";
import PropTypes from "prop-types";

// Swiper 컴포넌트 및 모듈 임포트
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";

// Swiper 관련 CSS
import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/free-mode";

import "./AddScheduleModal.css";

const DateTimePickerPopup = ({ initialDate, onSave, onCancel }) => {
  // 초기 날짜 값 분해 (JS의 월은 0부터 시작하므로 +1)
  const initialYear = initialDate.getFullYear();
  const initialMonth = initialDate.getMonth() + 1;
  const initialDay = initialDate.getDate();
  const initialHour = initialDate.getHours();
  const initialMinute = initialDate.getMinutes();

  // 선택한 날짜/시간 상태
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [day, setDay] = useState(initialDay);
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);

  // 스크롤 피커용 배열
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Swiper 공통 옵션
  const swiperProps = {
    modules: [Mousewheel, FreeMode],
    direction: "vertical",
    freeMode: true,
    mousewheel: {
      forceToAxis: true,
      releaseOnEdges: true,
      sensitivity: 1.5,
    },
    slidesPerView: 5,
    centeredSlides: true,
    style: { height: 120, width: 60 },
  };

  const handleSave = () => {
    const selectedDate = new Date(year, month - 1, day, hour, minute);
    onSave(selectedDate);
  };

  return (
    <div className="modal-overlay datetime-picker-popup-overlay">
      <div className="modal-content datetime-picker-popup-content">
        <h3>날짜 및 시간 선택</h3>
        <div className="datetime-picker-container" style={{ display: "flex", gap: "10px" }}>
          {/* 연도 */}
          <Swiper className="datetime-picker-swiper"
            {...swiperProps}
            initialSlide={years.indexOf(year)}
            onSlideChange={(swiper) => setYear(years[swiper.activeIndex])}
          >
            {years.map((y) => (
              <SwiperSlide key={y}>{y}년</SwiperSlide>
            ))}
          </Swiper>
          {/* 월 */}
          <Swiper className="datetime-picker-swiper"
            {...swiperProps}
            initialSlide={month - 1}
            onSlideChange={(swiper) => setMonth(swiper.activeIndex + 1)}
          >
            {months.map((m) => (
              <SwiperSlide key={m}>{m}월</SwiperSlide>
            ))}
          </Swiper>
          {/* 일 */}
          <Swiper className="datetime-picker-swiper"
            {...swiperProps}
            initialSlide={day - 1}
            onSlideChange={(swiper) => setDay(swiper.activeIndex + 1)}
          >
            {days.map((d) => (
              <SwiperSlide key={d}>{d}일</SwiperSlide>
            ))}
          </Swiper>
          {/* 시 */}
          <Swiper className="datetime-picker-swiper"
            {...swiperProps}
            initialSlide={hour}
            onSlideChange={(swiper) => setHour(swiper.activeIndex)}
          >
            {hours.map((h) => (
              <SwiperSlide key={h}>{h}시</SwiperSlide>
            ))}
          </Swiper>
          {/* 분 */}
          <Swiper className="datetime-picker-swiper"
            {...swiperProps}
            initialSlide={minute}
            onSlideChange={(swiper) => setMinute(swiper.activeIndex)}
          >
            {minutes.map((min) => (
              <SwiperSlide key={min}>{min}분</SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="modal-buttons">
          <button onClick={handleSave}>저장</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

DateTimePickerPopup.propTypes = {
  initialDate: PropTypes.instanceOf(Date).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DateTimePickerPopup;