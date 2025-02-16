// DiaryPage.jsx
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 컴포넌트 임포트
import "swiper/css"; // Swiper 기본 CSS
import "../components/Calendar/Calendar.css";
import clsx from "clsx"; // 조건부 클래스를 위해 clsx 사용

function DiaryPage() {
  // 시간(0~23)을 나타내는 배열 생성
  const TIME_HOURS = Array.from(Array(24).keys());
  // 분 단위 배열 (예: 5분 단위)
  const TIME_MINUTES = Array(12)
    .fill(0)
    .map((_, i) => i * 5);

  // 현재 선택된 시간(슬라이드 인덱스)를 상태로 관리 (초기값 0)
  const [hours, setHours] = useState(0);

  return (
    <div className="diary-page">
      <Swiper
        className="h-[16.8rem] px-[1.1rem]"
        direction="vertical"          // 세로 방향 슬라이드
        slidesPerView={3}             // 한 화면에 3개 슬라이드 표시
        mousewheel={true}             // 마우스 휠 지원
        loopAdditionalSlides={5}      // 루프 시 추가 슬라이드 표시
        slideToClickedSlide={true}    // 슬라이드를 클릭하면 중앙으로 이동
        centeredSlides={true}         // 중앙에 슬라이드를 고정
        onSlideChange={(swiper) => setHours(swiper.realIndex)}
      >
        {TIME_HOURS.map((hour) => (
          <SwiperSlide key={hour}>
            <div
              className={clsx(
                "flex h-[5.6rem] cursor-pointer items-center",
                hours === hour
                  ? "H2 text-primary-700" // 선택된 시간은 강조 스타일 적용
                  : "text-[2rem] font-medium text-primary-500"
              )}
            >
              {String(hour).padStart(2, "0")}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="selected-date">
        선택된 시간: {String(hours).padStart(2, "0")}
      </p>
    </div>
  );
}

export default DiaryPage;