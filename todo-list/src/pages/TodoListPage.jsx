import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import YearMonthModal from "../components/TodoList/YearTwoMonthSelectModal";
import AddDiaryModal from "../components/TodoList/AddDiaryModal"; // ✅ 오타 수정
import "../components/TodoList/TodoListpage.css"; // ✅ CSS 추가

function TodoListPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidays, setHolidays] = useState({});
  const [displayYear, setDisplayYear] = useState(new Date().getFullYear());
  const [displayMonth, setDisplayMonth] = useState(new Date().getMonth());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [isYearMonthModalOpen, setIsYearMonthModalOpen] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [diaries, setDiaries] = useState({});

  useEffect(() => {
    setActiveStartDate(new Date(displayYear, displayMonth, 1));
  }, [displayYear, displayMonth]);

  // ✅ 날짜 클릭 시 일기 작성 모달 열기
  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsDiaryModalOpen(true);
  };

  // ✅ 일기 저장 및 업데이트
  const handleSaveDiary = (diary) => {
    const dateKey = diary.date.toISOString().split("T")[0];

    setDiaries((prevDiaries) => ({
      ...prevDiaries,
      [dateKey]: diary,
    }));

    setIsDiaryModalOpen(false);
  };

  return (
    <div className="calendar-container">
      <div 
        className="calendar-header" 
        onClick={() => setIsYearMonthModalOpen(true)} 
        style={{ cursor: "pointer", textAlign: "left" }}
      >
        <h2>{displayYear}년 {displayMonth + 1}월</h2>
      </div>

      {/* ✅ 연도/월 선택 모달 */}
      {isYearMonthModalOpen && (
        <YearMonthModal
          currentYear={displayYear}
          currentMonth={displayMonth}
          onClose={() => setIsYearMonthModalOpen(false)}
          onSelect={(year, month) => {
            setDisplayYear(year);
            setDisplayMonth(month - 1);
          }}
        />
      )}

      {/* ✅ 일기 작성/수정 모달 */}
      {isDiaryModalOpen && (
        <AddDiaryModal 
          onClose={() => setIsDiaryModalOpen(false)} 
          onSave={handleSaveDiary} 
          selectedDate={selectedDate} 
          initialDiary={diaries[selectedDate.toISOString().split("T")[0]] || null} 
        />
      )}

      {/* ✅ 캘린더 - 공휴일 & 감정 데이터 적용 */}
      <Calendar
        onClickDay={handleDayClick}
        value={selectedDate}
        calendarType="gregory"
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
        tileContent={({ date }) => {
          const dateKey = date.toISOString().split("T")[0];
          const diary = diaries[dateKey];

          return diary ? (
            <div className="emotion-icon">
              <img className="calendar-emotion-icon" src={`/img/emotion/emotion${diary.emotion}.png`} alt={`감정 ${diary.emotion}`} />
            </div>
          ) : null;
        }}
      />
    </div>
  );
}

export default TodoListPage;