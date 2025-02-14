import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../components/Calendar/Calendar.css";
import AddScheduleModal from "../components/Calendar/AddScheduleModal"; // 추가한 모달 컴포넌트

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
        <div className="modal-section">
          <h3>년도 선택</h3>
          <div className="button-group">
            {years.map((y) => (
              <button
                key={y}
                className={y === selectedYear ? "selected" : ""}
                onClick={() => setSelectedYear(y)}
              >
                {y}년
              </button>
            ))}
          </div>
        </div>
        <div className="modal-section">
          <h3>월 선택</h3>
          <div className="button-group">
            {Array.from({ length: 12 }, (_, i) => (
              <button
                key={i}
                className={i === selectedMonth ? "selected" : ""}
                onClick={() => setSelectedMonth(i)}
              >
                {i + 1}월
              </button>
            ))}
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

function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidays, setHolidays] = useState({}); // 공휴일 데이터
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear());
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth());
  const [isYearMonthModalOpen, setIsYearMonthModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  useEffect(() => {
    setActiveStartDate(new Date(displayYear, displayMonth, 1));
  }, [displayYear, displayMonth]);

  // 예시: 공휴일 데이터 fetch
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
            const dateKey = `${dateStr.substring(0, 4)}-${dateStr.substring(
              4,
              6
            )}-${dateStr.substring(6, 8)}`;
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

  const openYearMonthModal = () => setIsYearMonthModalOpen(true);
  const closeYearMonthModal = () => setIsYearMonthModalOpen(false);
  const handleYearMonthSelect = (year, month) => {
    setDisplayYear(year);
    setDisplayMonth(month);
  };

  const openScheduleModal = () => setIsScheduleModalOpen(true);
  const closeScheduleModal = () => setIsScheduleModalOpen(false);
  const handleScheduleSave = (schedule) => {
    console.log("저장된 일정:", schedule);
    // 일정 저장 로직 추가 (예: 상태 업데이트, 서버 전송 등)
  };

  // 날짜 클릭 시 일정 추가 모달 오픈
  const handleDayClick = (date) => {
    setSelectedDate(date);
    openScheduleModal();
  };

  return (
    <div className="calendar-container">
      {/* 상단바: 년/월 선택 텍스트 (클릭 시 모달 오픈) */}
      <div
        className="calendar-header"
        onClick={openYearMonthModal}
        style={{ cursor: "pointer", textAlign: "left" }}
      >
        <h2>
          {displayYear}년 {displayMonth + 1}월
        </h2>
      </div>

      {isYearMonthModalOpen && (
        <YearMonthModal
          currentYear={displayYear}
          currentMonth={displayMonth}
          onClose={closeYearMonthModal}
          onSelect={handleYearMonthSelect}
        />
      )}

      {isScheduleModalOpen && (
        <AddScheduleModal
          onClose={closeScheduleModal}
          onSave={handleScheduleSave}
          selectedDate={selectedDate}
        />
      )}

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
            if (date.getMonth() !== activeStartDate.getMonth()) return "neighboring-month";
            if (day === 0) return "sunday";
            if (day === 6) return "saturday";
            if (holidays[dateString]) return "holiday";
          }
          return null;
        }}
        tileContent={({ date, view }) => {
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
        onClickDay={handleDayClick}
      />

      <p className="selected-date">
        선택한 날짜: {selectedDate.toDateString()}
      </p>

      {/* 플로팅 버튼: 우측 하단에서 일정 추가 모달 오픈 */}
      <button className="floating-btn" onClick={openScheduleModal}>
        +
      </button>
    </div>
  );
}

export default CustomCalendar;