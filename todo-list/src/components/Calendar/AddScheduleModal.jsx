// src/components/Calendar/AddScheduleModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddScheduleModal.css";

// Swiper 기본 컴포넌트와 Mousewheel, FreeMode 모듈 임포트
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from "swiper/modules";

// Swiper 관련 CSS
import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/free-mode";

const AddScheduleModal = ({ onClose, onSave, selectedDate }) => {
  // 일정 기본 정보
  const [title, setTitle] = useState("");
  const [repeat, setRepeat] = useState("없음");
  const [tag, setTag] = useState("");
  const [alarm, setAlarm] = useState("없음");
  const [location, setLocation] = useState("");
  const [memo, setMemo] = useState("");

  // Swiper로 선택할 날짜/시간용 배열
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1 ~ 12
  const days = Array.from({ length: 31 }, (_, i) => i + 1);   // 1 ~ 31
  const hours = Array.from({ length: 24 }, (_, i) => i);      // 0 ~ 23
  const minutes = Array.from({ length: 60 }, (_, i) => i);    // 0 ~ 59

  // 시작 시간용 상태
  const [startYear, setStartYear] = useState(2023);
  const [startMonth, setStartMonth] = useState(7);
  const [startDay, setStartDay] = useState(15);
  const [startHour, setStartHour] = useState(10);
  const [startMinute, setStartMinute] = useState(30);

  // 종료 시간용 상태
  const [endYear, setEndYear] = useState(2023);
  const [endMonth, setEndMonth] = useState(7);
  const [endDay, setEndDay] = useState(15);
  const [endHour, setEndHour] = useState(12);
  const [endMinute, setEndMinute] = useState(0);

  // form 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    // 시작 날짜/시간
    const startTime = new Date(
      startYear,
      startMonth - 1, // JS에서는 월이 0부터 시작
      startDay,
      startHour,
      startMinute
    );
    // 종료 날짜/시간
    const endTime = new Date(
      endYear,
      endMonth - 1,
      endDay,
      endHour,
      endMinute
    );

    const schedule = {
      title,
      startTime,
      endTime,
      repeat,
      tag,
      alarm,
      location,
      memo,
    };

    onSave(schedule);
    onClose();
  };

  // Swiper 공통 옵션 (FreeMode 적용)
  // => 아래처럼 inline으로 넣어도 되고, 객체로 만들어 스프레드 해도 됨
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

  return (
    <div className="modal-overlay add-schedule-modal-overlay">
      <div className="modal-content add-schedule-modal-content">
        <h2>일정 추가</h2>

        <form onSubmit={handleSubmit} className="add-schedule-form">
          {/* 일정 제목 */}
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="일정 제목"
            />
          </div>

          {/* 시작 시간 (년/월/일/시/분) */}
          <div className="form-group">
            <label>시작 시간</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* 년도 */}
              <Swiper
                {...swiperProps}
                initialSlide={years.indexOf(startYear)}
                onSlideChange={(swiper) => {
                  setStartYear(years[swiper.activeIndex]);
                }}
              >
                {years.map((y) => (
                  <SwiperSlide key={y}>{y}년</SwiperSlide>
                ))}
              </Swiper>

              {/* 월 */}
              <Swiper
                {...swiperProps}
                initialSlide={startMonth - 1}
                onSlideChange={(swiper) => {
                  setStartMonth(swiper.activeIndex + 1);
                }}
              >
                {months.map((m) => (
                  <SwiperSlide key={m}>{m}월</SwiperSlide>
                ))}
              </Swiper>

              {/* 일 */}
              <Swiper
                {...swiperProps}
                initialSlide={startDay - 1}
                onSlideChange={(swiper) => {
                  setStartDay(swiper.activeIndex + 1);
                }}
              >
                {days.map((d) => (
                  <SwiperSlide key={d}>{d}일</SwiperSlide>
                ))}
              </Swiper>

              {/* 시 */}
              <Swiper
                {...swiperProps}
                initialSlide={startHour}
                onSlideChange={(swiper) => {
                  setStartHour(swiper.activeIndex);
                }}
              >
                {hours.map((h) => (
                  <SwiperSlide key={h}>{h}시</SwiperSlide>
                ))}
              </Swiper>

              {/* 분 */}
              <Swiper
                {...swiperProps}
                initialSlide={startMinute}
                onSlideChange={(swiper) => {
                  setStartMinute(swiper.activeIndex);
                }}
              >
                {minutes.map((min) => (
                  <SwiperSlide key={min}>{min}분</SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* 종료 시간 (년/월/일/시/분) */}
          <div className="form-group">
            <label>종료 시간</label>
            <div style={{ display: "flex", gap: "10px" }}>
              {/* 년도 */}
              <Swiper
                {...swiperProps}
                initialSlide={years.indexOf(endYear)}
                onSlideChange={(swiper) => {
                  setEndYear(years[swiper.activeIndex]);
                }}
              >
                {years.map((y) => (
                  <SwiperSlide key={y}>{y}년</SwiperSlide>
                ))}
              </Swiper>

              {/* 월 */}
              <Swiper
                {...swiperProps}
                initialSlide={endMonth - 1}
                onSlideChange={(swiper) => {
                  setEndMonth(swiper.activeIndex + 1);
                }}
              >
                {months.map((m) => (
                  <SwiperSlide key={m}>{m}월</SwiperSlide>
                ))}
              </Swiper>

              {/* 일 */}
              <Swiper
                {...swiperProps}
                initialSlide={endDay - 1}
                onSlideChange={(swiper) => {
                  setEndDay(swiper.activeIndex + 1);
                }}
              >
                {days.map((d) => (
                  <SwiperSlide key={d}>{d}일</SwiperSlide>
                ))}
              </Swiper>

              {/* 시 */}
              <Swiper
                {...swiperProps}
                initialSlide={endHour}
                onSlideChange={(swiper) => {
                  setEndHour(swiper.activeIndex);
                }}
              >
                {hours.map((h) => (
                  <SwiperSlide key={h}>{h}시</SwiperSlide>
                ))}
              </Swiper>

              {/* 분 */}
              <Swiper
                {...swiperProps}
                initialSlide={endMinute}
                onSlideChange={(swiper) => {
                  setEndMinute(swiper.activeIndex);
                }}
              >
                {minutes.map((min) => (
                  <SwiperSlide key={min}>{min}분</SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* 반복, 태그, 알람, 위치, 메모 */}
          <div className="form-group">
            <label>반복</label>
            <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
              <option value="없음">없음</option>
              <option value="매일">매일</option>
              <option value="매주">매주</option>
              <option value="매월">매월</option>
              <option value="매년">매년</option>
            </select>
          </div>
          <div className="form-group">
            <label>태그</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="예: 가족, 친구, 학교, 직장"
            />
          </div>
          <div className="form-group">
            <label>알람</label>
            <select value={alarm} onChange={(e) => setAlarm(e.target.value)}>
              <option value="없음">없음</option>
              <option value="5분 전">5분 전</option>
              <option value="10분 전">10분 전</option>
              <option value="15분 전">15분 전</option>
              <option value="30분 전">30분 전</option>
              <option value="1시간 전">1시간 전</option>
            </select>
          </div>
          <div className="form-group">
            <label>위치</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="장소 이름"
            />
          </div>
          <div className="form-group">
            <label>메모</label>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요..."
            />
          </div>

          {/* 버튼 영역 */}
          <div className="modal-buttons">
            <button type="submit">저장</button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddScheduleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
};

export default AddScheduleModal;