import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../components/Calendar/Calendar.css";

function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택한 날짜
  const [events, setEvents] = useState({}); // 날짜별 일정 저장 객체
  const [newEvent, setNewEvent] = useState(""); // 새 일정 입력 상태

  // 선택한 날짜에 일정 추가
  const addEvent = () => {
    if (!newEvent.trim()) return; // 빈 입력 방지
    const dateKey = selectedDate.toDateString();
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), newEvent],
    }));
    setNewEvent(""); // 입력 필드 초기화
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">📅</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        calendarType="gregory"
        view="month"
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
        formatDay={(locale, date) => date.getDate().toString()} // 숫자만 출력
      />
      <p className="selected-date">선택한 날짜: {selectedDate.toDateString()}</p>

      <div className="add-event-section">
        <h3>일정 추가</h3>
        <input
          type="text"
          placeholder="일정을 입력하세요"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
        />
        <button onClick={addEvent}>추가</button>
      </div>

      <div className="event-list">
        <h3>📌 {selectedDate.toDateString()} 일정</h3>
        {events[selectedDate.toDateString()]?.length > 0 ? (
          <ul>
            {events[selectedDate.toDateString()].map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        ) : (
          <p>추가된 일정이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default CustomCalendar;