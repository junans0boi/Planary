// src/components/Calendar/AddScheduleModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddScheduleModal.css";

const AddScheduleModal = ({ onClose, onSave, selectedDate }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [repeat, setRepeat] = useState("없음");
  const [tag, setTag] = useState("");
  const [alarm, setAlarm] = useState("없음");
  const [location, setLocation] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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

  return (
    <div className="modal-overlay add-schedule-modal-overlay">
      <div className="modal-content add-schedule-modal-content">
        <h2>일정 추가</h2>
        <form onSubmit={handleSubmit} className="add-schedule-form">
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
          <div className="form-group">
            <label>시작 시간</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>종료 시간</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
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
            ></textarea>
          </div>
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