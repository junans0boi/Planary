import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../components/Calendar/Calendar.css";
import AddScheduleModal from "../components/Calendar/AddScheduleModal"; // 일정 추가 모달 컴포넌트
import { Swiper, SwiperSlide } from 'swiper/react';
// Mousewheel + FreeMode 모듈 동시 임포트
import { Mousewheel, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/free-mode';

function YearMonthModal({ currentYear, currentMonth, onClose, onSelect }) {
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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>년/월 선택</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* 년도 선택 Swiper */}
          <div>
            <h3>년도 선택</h3>
            <Swiper
              modules={[Mousewheel, FreeMode]}  // 모듈 등록
              direction="vertical"
              // 자유 스크롤 모드 활성화
              freeMode={true}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 1.5,
              }}
              slidesPerView={5}
              centeredSlides={true}     // 현재 슬라이드를 중앙에 위치
              initialSlide={years.indexOf(currentYear)}
              // onSlideChange 이벤트는 freeMode에서 정확히 한 "슬라이드" 선택 시점이 모호
              // => activeIndex 변화는 드래그/휠에 따라 실시간으로 변할 수 있으므로, 
              //    적절히 선택할 로직 구성. (예시로는 마우스 업 이벤트 등 추가도 가능)
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
            <Swiper
              modules={[Mousewheel, FreeMode]}
              direction="vertical"
              freeMode={true}
              mousewheel={{
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 1.5,
              }}
              slidesPerView={5}
              centeredSlides={true}     // 현재 슬라이드를 중앙에 위치
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

function CalendarPage() {
  // 선택된 날짜를 상태로 관리 (캘린더에서 클릭한 날짜)
  const [selectedDate, setSelectedDate] = useState(new Date());
  // 공휴일 데이터를 객체 형태로 저장 (키: "YYYY-MM-DD", 값: 공휴일 이름)
  const [holidays, setHolidays] = useState({});
  // 현재 캘린더에 표시될 월의 시작 날짜 (예: 선택한 연/월의 1일)
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  // 상단에 표시되는 연도와 월 (월은 0부터 시작)
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear());
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth());
  // 년/월 선택 모달 열림 상태
  const [isYearMonthModalOpen, setIsYearMonthModalOpen] = useState(false);
  // 일정 추가 모달 열림 상태
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // displayYear 또는 displayMonth가 변경되면 activeStartDate를 해당 연/월의 1일로 업데이트
  useEffect(() => {
    setActiveStartDate(new Date(displayYear, displayMonth, 1));
  }, [displayYear, displayMonth]);

  // 공휴일 데이터를 API로부터 불러와서 상태에 저장 (연간 12회 fetch)
  useEffect(() => {
    const fetchHolidays = async () => {
      const year = new Date().getFullYear();
      let fetchedHolidays = {};
      // 1월부터 12월까지 반복
      for (let month = 1; month <= 12; month++) {
        try {
          const response = await fetch(
            `http://localhost:5006/api/holidays?year=${year}&month=${month}`
          );
          const data = await response.json();
          // API에서 반환된 데이터가 단일 객체일 수도 있고 배열일 수도 있으므로 배열 형태로 변환
          const holidaysArray = Array.isArray(data) ? data : data ? [data] : [];
          // 각 공휴일에 대해 키("YYYY-MM-DD")를 생성하여 객체에 저장
          holidaysArray.forEach((holiday) => {
            const dateStr = holiday.locdate.toString();
            const dateKey = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
            fetchedHolidays[dateKey] = holiday.dateName;
          });
        } catch (error) {
          console.error("Error fetching holidays:", error);
        }
      }
      setHolidays(fetchedHolidays);
    };
    fetchHolidays();
  }, []);

  // 년/월 선택 모달 열기
  const openYearMonthModal = () => setIsYearMonthModalOpen(true);
  // 년/월 선택 모달 닫기
  const closeYearMonthModal = () => setIsYearMonthModalOpen(false);
  // 년/월 선택 모달에서 선택된 연도와 월을 받아 displayYear, displayMonth 업데이트
  const handleYearMonthSelect = (year, month) => {
    setDisplayYear(year);
    setDisplayMonth(month);
  };

  // 일정 추가 모달 열기
  const openScheduleModal = () => setIsScheduleModalOpen(true);
  // 일정 추가 모달 닫기
  const closeScheduleModal = () => setIsScheduleModalOpen(false);
  // 일정 저장 시 호출 (현재는 콘솔에 출력; 추후 실제 저장 로직 추가 가능)
  const handleScheduleSave = (schedule) => {
    console.log("저장된 일정:", schedule);
    // 여기에서 상태 업데이트나 서버 전송 등의 로직을 추가할 수 있음
  };

  // 캘린더의 특정 날짜를 클릭하면 해당 날짜를 선택하고 일정 추가 모달을 엶
  const handleDayClick = (date) => {
    setSelectedDate(date);
    openScheduleModal();
  };

  return (
    <div className="calendar-container">
      {/* 상단 헤더: 현재 표시되는 연도/월 텍스트, 클릭 시 년/월 선택 모달 오픈 */}
      <div
        className="calendar-header"
        onClick={openYearMonthModal}
        style={{ cursor: "pointer", textAlign: "left" }}
      >
        <h2>
          {displayYear}년 {displayMonth + 1}월
        </h2>
      </div>

      {/* 연/월 선택 모달 렌더링 (모달 열림 상태가 true인 경우) */}
      {isYearMonthModalOpen && (
        <YearMonthModal
          currentYear={displayYear}
          currentMonth={displayMonth}
          onClose={closeYearMonthModal}
          onSelect={handleYearMonthSelect}
        />
      )}

      {/* 일정 추가 모달 렌더링 (모달 열림 상태가 true인 경우) */}
      {isScheduleModalOpen && (
        <AddScheduleModal
          onClose={closeScheduleModal}
          onSave={handleScheduleSave}
          selectedDate={selectedDate}
        />
      )}

      {/* 캘린더 컴포넌트 */}
      <Calendar
        onChange={setSelectedDate}          // 날짜 선택 시 selectedDate 업데이트
        value={selectedDate}                // 현재 선택된 날짜를 표시
        calendarType="gregory"              // 그레고리력 사용
        view="month"                        // 월별 보기
        navigationLabel={null}              // 기본 내비게이션(화살표 등) 숨김
        prevLabel={null}
        nextLabel={null}
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={true}         // 인접 월의 날짜도 흐리게 표시
        activeStartDate={activeStartDate}     // 캘린더에 표시할 시작 날짜 (선택한 연/월의 1일)
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate) // 캘린더가 이동될 때 시작 날짜 업데이트
        }
        formatDay={(locale, date) => date.getDate().toString()}  // 각 날짜 타일에 날짜 숫자 표시
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const dateString = date.toISOString().split("T")[0];
            const day = date.getDay();
            // 현재 활성화된 월과 다른 날짜는 흐리게 표시
            if (date.getMonth() !== activeStartDate.getMonth()) return "neighboring-month";
            if (day === 0) return "sunday";   // 일요일: 빨간색
            if (day === 6) return "saturday"; // 토요일: 파란색
            if (holidays[dateString]) return "holiday"; // 공휴일: 특별한 스타일
          }
          return null;
        }}
        tileContent={({ date, view }) => {
          // 공휴일인 경우, 타일에 공휴일 이름을 툴팁으로 표시
          if (view === "month") {
            const dateString = date.toISOString().split("T")[0];
            if (holidays[dateString]) {
              return (
                <span className="holiday-tooltip">
                  {holidays[dateString]}
                </span>
              );
            }
          }
          return null;
        }}
        onClickDay={handleDayClick}  // 날짜 클릭 시 일정 추가 모달 오픈
      />

      {/* 선택된 날짜 텍스트 표시 */}
      <p className="selected-date">
        선택한 날짜: {selectedDate.toDateString()}
      </p>

      {/* 우측 하단 플로팅 버튼: 클릭 시 일정 추가 모달 오픈 */}
      <button className="floating-btn" onClick={openScheduleModal}>
        +
      </button>
    </div>
  );
}

export default CalendarPage;