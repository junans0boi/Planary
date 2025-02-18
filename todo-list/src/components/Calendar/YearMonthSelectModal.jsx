import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/free-mode';
import "./YearMonthSelectModal.css";

function YearMonthSelectModal({ currentYear, currentMonth, onClose, onSelect }) {
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const currentYearValue = new Date().getFullYear();
  const years = [];
  for (let y = currentYearValue - 10; y <= currentYearValue + 10; y++) {
    years.push(y);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelect(selectedYear, selectedMonth);
    onClose();
  };

  return (
    <div className="modal-overlay year-month-modal">
      <div className="modal-content">
        <h2>년/월 선택</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* 년도 선택 Swiper */}
          <div>
            <h3>년도 선택</h3>
            <Swiper className="year-month-swiper"
              modules={[Mousewheel, FreeMode]}
              direction="vertical"
              freeMode={true}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 1.5,
              }}
              slidesPerView={5}
              centeredSlides={true}
              initialSlide={years.indexOf(currentYear)}
              onSlideChange={(swiper) => {
                setSelectedYear(years[swiper.activeIndex]);
              }}
              style={{ height: 200 }}
            >
              {years.map((y) => (
                <SwiperSlide key={y}>{y}년</SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 월 선택 Swiper */}
          <div>
            <h3>월 선택</h3>
            <Swiper className="year-month-swiper"
              modules={[Mousewheel, FreeMode]}
              direction="vertical"
              freeMode={true}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 1.5,
              }}
              slidesPerView={5}
              centeredSlides={true}
              initialSlide={currentMonth - 1}
              onSlideChange={(swiper) => {
                setSelectedMonth(swiper.activeIndex + 1);
              }}
              style={{ height: 200 }}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <SwiperSlide key={m}>{m}월</SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="modal-buttons">
          <button type="button" onClick={handleSubmit}>
            선택
          </button>
          <button type="button" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default YearMonthSelectModal;