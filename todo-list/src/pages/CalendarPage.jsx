import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddScheduleModal from "../components/Calendar/AddScheduleModal";
import { FontAwesomeIcon } from "../FontAwesome";
import TopBar from "../components/TopBar/TopBar";
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
  // 모달 열림 상태 (일정 추가)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  // 모달을 여는 방식 구분: 달력 클릭 or 플로팅 버튼 클릭
  const [isDayClick, setIsDayClick] = useState(false);
  // 일정 목록 (날짜별)
  const [schedules, setSchedules] = useState({});

  // displayYear, displayMonth 변경 시 캘린더 시작 날짜 업데이트
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

  // TopBar에서 전달 받은 연/월 변경 핸들러
  const handleYearMonthChange = (year, month) => {
    setDisplayYear(year);
    setDisplayMonth(month - 1);
  };

  // 일정 추가 모달 열기 (달력 날짜 클릭)
  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsDayClick(true);
    setIsScheduleModalOpen(true);
  };

  // 일정 추가 모달 열기 (플로팅 버튼 클릭)
  const openScheduleModal = () => {
    setSelectedDate(new Date());
    setIsDayClick(false);
    setIsScheduleModalOpen(true);
  };

  // 일정 모달 닫기
  const closeScheduleModal = () => setIsScheduleModalOpen(false);

  /**
   * 일정 저장 로직
   * startTime ~ endTime 범위의 모든 날짜에 스케줄을 등록
   */
  const handleScheduleSave = (schedule) => {
    console.log("저장된 일정:", schedule);
    const newSchedules = { ...schedules };
    const start = new Date(schedule.startTime);
    const end = new Date(schedule.endTime);
    let current = new Date(start);
    while (current <= end) {
      const dateKey = current.toISOString().split("T")[0];
      if (!newSchedules[dateKey]) {
        newSchedules[dateKey] = [schedule];
      } else {
        newSchedules[dateKey].push(schedule);
      }
      current.setDate(current.getDate() + 1);
    }
    setSchedules(newSchedules);
  };

  return (
    <div className="calendar-container">
      {/* TopBar로 연/월 선택 기능 이동 */}
      <TopBar
        displayYear={displayYear}
        displayMonth={displayMonth}
        onYearMonthChange={handleYearMonthChange}
      />

      {/* 일정 추가 모달 */}
      {isScheduleModalOpen && (
        <AddScheduleModal
          onClose={closeScheduleModal}
          onSave={handleScheduleSave}
          selectedDate={selectedDate}
          isDayClick={isDayClick}
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
            if (date.getMonth() !== activeStartDate.getMonth()) {
              return "neighboring-month";
            }
            if (day === 0) return "sunday";
            if (day === 6) return "saturday";
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
                {holidays[dateString] && (
                  <span className="holiday-tooltip">{holidays[dateString]}</span>
                )}
                {daySchedules.map((sch, idx) => (
                  <div
                    key={idx}
                    className="schedule-label"
                    style={{ backgroundColor: sch.tagColor || "#ffe3ea", color: "#fff" }}
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

      {/* 플로팅 버튼 */}
      <button className="floating-btn" onClick={openScheduleModal}>
        <FontAwesomeIcon icon="pencil" />
      </button>
    </div>
  );
}

export default CalendarPage;