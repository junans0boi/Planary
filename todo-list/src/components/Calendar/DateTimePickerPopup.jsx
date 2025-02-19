// AddScheduleModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddScheduleModal.css";
import DateTimePickerPopup from "./DateTimePickerPopup";
// 새로 추가할 모달
import TagSelectModal from "./CategoryEditModal";

const AddScheduleModal = ({ onClose, onSave, selectedDate, isDayClick }) => {
  const [title, setTitle] = useState("");
  const [repeat, setRepeat] = useState("없음");
  const [alarm, setAlarm] = useState("없음");
  const [location, setLocation] = useState("");
  const [memo, setMemo] = useState("");

  // ✅ 선택된 태그(카테고리)를 저장할 상태
  const [selectedTag, setSelectedTag] = useState(null);

  // 전달받은 selectedDate를 기준으로 기본 시작/종료시간 설정
  const baseDate = selectedDate || new Date();
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const day = baseDate.getDate();

  const [startDateTime, setStartDateTime] = useState(new Date(year, month, day, 0, 0));
  const [endDateTime, setEndDateTime] = useState(new Date(year, month, day, 23, 59));

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // ✅ 태그 선택 모달 열림 상태
  const [isTagSelectModalOpen, setIsTagSelectModalOpen] = useState(false);

  // 스케줄 저장 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    const schedule = {
      title,
      startTime: startDateTime,
      endTime: endDateTime,
      repeat,
      alarm,
      location,
      memo,
      // ✅ 선택된 태그 정보
      tag: selectedTag?.title || "",
      tagColor: selectedTag?.color || "#ffcc00", // 디폴트 색상
      isPrivateTag: selectedTag?.isPrivate || false,
    };
    onSave(schedule);
    onClose();
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

          {/* 시작/종료 시간 */}
          <div className="form-group">
            <label>시작 시간</label>
            <div className="datetime-display">
              <span>{startDateTime.toLocaleString()}</span>
              <button type="button" onClick={() => setShowStartPicker(true)}>
                날짜 선택
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>종료 시간</label>
            <div className="datetime-display">
              <span>{endDateTime.toLocaleString()}</span>
              <button type="button" onClick={() => setShowEndPicker(true)}>
                날짜 선택
              </button>
            </div>
          </div>

          {/* 반복 */}
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

          {/* === 태그 선택 === */}
          <div className="form-group">
            <label>태그 (카테고리)</label>
            <button 
              type="button" 
              onClick={() => setIsTagSelectModalOpen(true)}
              style={{ 
                padding: "10px", 
                border: "1px solid #ccc", 
                borderRadius: "6px",
                backgroundColor: "#fff", 
                cursor: "pointer",
                textAlign: "left"
              }}
            >
              {selectedTag 
                ? `#${selectedTag.title} (색상: ${selectedTag.color})`
                : "태그를 선택하세요"}
            </button>
          </div>

          {/* 알람, 위치, 메모 */}
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
            <button type="button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>

      {/* DateTimePickerPopup (시작/종료) */}
      {showStartPicker && (
        <DateTimePickerPopup
          initialDate={startDateTime}
          onSave={(newDate) => {
            setStartDateTime(newDate);
            setShowStartPicker(false);
          }}
          onCancel={() => setShowStartPicker(false)}
        />
      )}
      {showEndPicker && (
        <DateTimePickerPopup
          initialDate={endDateTime}
          onSave={(newDate) => {
            setEndDateTime(newDate);
            setShowEndPicker(false);
          }}
          onCancel={() => setShowEndPicker(false)}
        />
      )}

      {/* 태그 선택 모달 */}
      {isTagSelectModalOpen && (
        <TagSelectModal 
          onClose={() => setIsTagSelectModalOpen(false)}
          onSelectTag={(tag) => {
            setSelectedTag(tag);
            setIsTagSelectModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

AddScheduleModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  isDayClick: PropTypes.bool,
};

export default AddScheduleModal;
