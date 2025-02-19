// React Hooks
import { useState, useEffect } from "react";
// React-Calendar 라이브러리
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// 사용자 정의 컴포넌트
// 연/월 선택을 위한 모달 컴포넌트..
import YearMonthModal from "../components/Calendar/YearMonthSelectModal"; 
// 일정 추가 모달 컴포넌트.
import AddScheduleModal from "../components/Calendar/AddScheduleModal"; 
// 해당 페이지의 css
import "../components/Calendar/CalendarPage.css";

function CalendarPage() {
  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState(new Date());
  // 공휴일 데이터
  const [holidays, setHolidays] = useState({});
  // 현재 표시되는 연/월
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear());
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth());
  // 캘린더 시작 날짜
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  // 모달 열림 상태
  const [isYearMonthModalOpen, setIsYearMonthModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // **추가**: "어떻게 모달을 열었는지"를 구분하기 위한 상태
  //   - true면 "달력 날짜 클릭"
  //   - false면 "플로팅 버튼 클릭"
  const [isDayClick, setIsDayClick] = useState(false);

  // 일정 목록 (날짜별)
  const [schedules, setSchedules] = useState({});

  // displayYear, displayMonth 변경 시 달력 표시
  useEffect(() => {
    setActiveStartDate(new Date(displayYear, displayMonth, 1));
  }, [displayYear, displayMonth]);

  // 공휴일 가져오기
  useEffect(() => {
    const fetchHolidays = async () => {
      const year = new Date().getFullYear();
      let fetchedHolidays = {};

      for (let month = 1; month <= 12; month++) {
        try {
          const response = await fetch(
            `http://localhost:5006/api/holidays?year=${year}&month=${month}`
          );
          const data = await response.json();
          const holidaysArray = Array.isArray(data) ? data : data ? [data] : [];
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

  // 년/월 선택 모달
  const openYearMonthModal = () => setIsYearMonthModalOpen(true);
  const closeYearMonthModal = () => setIsYearMonthModalOpen(false);
  const handleYearMonthSelect = (year, month) => {
    setDisplayYear(year);
    setDisplayMonth(month-1);
  };

  // 일정 추가 모달 열기
  // (1) 달력 날짜 클릭 → 해당 날짜 00:00~23:59
  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsDayClick(true);   // 달력 날짜 클릭
    setIsScheduleModalOpen(true);
  };

  // (2) 플로팅 버튼 클릭 → 오늘 날짜 00:00~23:59
  const openScheduleModal = () => {
    setSelectedDate(new Date());
    setIsDayClick(false);  // 플로팅 버튼 클릭
    setIsScheduleModalOpen(true);
  };

  // 일정 모달 닫기
  const closeScheduleModal = () => setIsScheduleModalOpen(false);

  /**
   * (중요) 일정 저장 로직
   * => startTime ~ endTime 범위의 모든 날짜에 스케줄을 등록
   */
  const handleScheduleSave = (schedule) => {
    console.log("저장된 일정:", schedule);

    // 새 schedules 객체를 만들고,
    const newSchedules = { ...schedules };

    const start = new Date(schedule.startTime);
    const end = new Date(schedule.endTime);

    // 날짜 반복문 (start <= end)
    let current = new Date(start);
    while (current <= end) {
      const dateKey = current.toISOString().split("T")[0];
      // 해당 날짜에 이미 일정이 있으면 배열에 추가, 없으면 새로 생성
      if (!newSchedules[dateKey]) {
        newSchedules[dateKey] = [schedule];
      } else {
        newSchedules[dateKey].push(schedule);
      }
      // 하루씩 증가
      current.setDate(current.getDate() + 1);
    }

    setSchedules(newSchedules);
  };

  return (
    <div className="calendar-container">
      {/* 상단 헤더 */}
      <div
        className="calendar-header"
        onClick={openYearMonthModal}
        style={{ cursor: "pointer", textAlign: "left" }}
      >
        <h2>
          {displayYear}년 {displayMonth + 1}월
        </h2>
      </div>

      {/* 연/월 선택 모달 */}
      {isYearMonthModalOpen && (
        <YearMonthModal
          currentYear={displayYear}
          currentMonth={displayMonth}
          onClose={closeYearMonthModal}
          onSelect={handleYearMonthSelect}
        />
      )}

      {/* 일정 추가 모달 */}
      {isScheduleModalOpen && (
        <AddScheduleModal
          onClose={closeScheduleModal}
          onSave={handleScheduleSave}
          selectedDate={selectedDate}
          isDayClick={isDayClick} // 달력 클릭 or 플로팅 버튼 클릭 여부
        />
      )}

      {/* 달력 */}
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        calendarType="gregory"
        view="month"
        navigationLabel={null}
        prevLabel={null}
        nextLabel={null}
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={true}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
        formatDay={(locale, date) => date.getDate().toString()}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const dateString = date.toISOString().split("T")[0];
            const day = date.getDay();

            // 이웃 월
            if (date.getMonth() !== activeStartDate.getMonth()) {
              return "neighboring-month";
            }
            // 일요일
            if (day === 0) return "sunday";
            // 토요일
            if (day === 6) return "saturday";
            // 공휴일
            if (holidays[dateString]) return "holiday";
          }
          return null;
        }}
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dateString = date.toISOString().split("T")[0];
            const daySchedules = schedules[dateString] || [];
        
            return (
              <>
                {/* 공휴일 라벨 */}
                {holidays[dateString] && (
                  <span className="holiday-tooltip">{holidays[dateString]}</span>
                )}
        
                {/* 일정 라벨 (태그 색상 적용) */}
                {daySchedules.map((sch, idx) => (
                  <div 
                    key={idx} 
                    className="schedule-label"
                    style={{ backgroundColor: sch.tagColor || "#ffe3ea", color: "#fff" }} // 태그 색상 적용
                  >
                    {sch.title}
                  </div>
                ))}
              </>
            );
          }
          return null;
        }}
        
        onClickDay={handleDayClick}
      />

      {/* 선택된 날짜 표시 (테스트용) */}
      <p className="selected-date">선택한 날짜: {selectedDate.toDateString()}</p>

      {/* 우측 하단 플로팅 버튼 */}
      <button className="floating-btn" onClick={openScheduleModal}>
        +
      </button>
    </div>
  );
}

export default CalendarPage;