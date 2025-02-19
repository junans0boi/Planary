// todo-list/src/components/Calendar/AddScheduleModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AddScheduleModal.css";
import DateTimePickerPopup from "./DateTimePickerPopup";

// 새로 추가할 모달
import CategorySelectModal from "./CategorySelectModal";

const AddScheduleModal = ({ onClose, onSave, selectedDate, isDayClick }) => {
  const [title, setTitle] = useState("");
  const [repeat, setRepeat] = useState("없음");

  // ✔ 기존 tag, tagColor 대신 "selectedCategory"로 관리
  //   category 예: { id, name, color, isPrivate }
  const [selectedCategory, setSelectedCategory] = useState(null);

  // (예시) 카테고리 목록을 로컬 state로 관리
  // 실제로는 서버나 상위 컴포넌트에서 받아오도록 구현 가능
  const [categories, setCategories] = useState([
    { id: 1, name: "일상", color: "#ffb6c1", isPrivate: false },
    { id: 2, name: "중요", color: "#ffa07a", isPrivate: false },
    { id: 3, name: "공부", color: "#87cefa", isPrivate: false },
  ]);

  const [alarm, setAlarm] = useState("없음");
  const [location, setLocation] = useState("");
  const [memo, setMemo] = useState("");

  // 날짜 기본 설정
  const baseDate = selectedDate || new Date();
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const day = baseDate.getDate();

  const [startDateTime, setStartDateTime] = useState(
    new Date(year, month, day, 0, 0)
  );
  const [endDateTime, setEndDateTime] = useState(
    new Date(year, month, day, 23, 59)
  );

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // ✔ "카테고리(태그) 선택 모달" 열림 상태
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 최종 일정에 선택된 카테고리 정보(이름, 색상 등)를 넣음
    const schedule = {
      title,
      startTime: startDateTime,
      endTime: endDateTime,
      repeat,
      tag: selectedCategory?.name || "",
      tagColor: selectedCategory?.color || "",
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

          {/* 시작 시간 */}
          <div className="form-group">
            <label>시작 시간</label>
            <div className="datetime-display">
              <span>{startDateTime.toLocaleString()}</span>
              <button type="button" onClick={() => setShowStartPicker(true)}>
                날짜 선택
              </button>
            </div>
          </div>

          {/* 종료 시간 */}
          <div className="form-group">
            <label>종료 시간</label>
            <div className="datetime-display">
              <span>{endDateTime.toLocaleString()}</span>
              <button type="button" onClick={() => setShowEndPicker(true)}>
                날짜 선택
              </button>
            </div>
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

          {/* ✔ 태그(카테고리) 선택 영역 */}
          <div className="form-group">
            <label>태그</label>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* 선택된 카테고리가 있으면 색상원 + 이름 표시 */}
              {selectedCategory ? (
                <>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: selectedCategory.color,
                    }}
                  />
                  <span>{selectedCategory.name}</span>
                </>
              ) : (
                <span style={{ color: "#888" }}>선택된 태그 없음</span>
              )}

              {/* 태그 선택 버튼 */}
              <button
                type="button"
                style={{ marginLeft: "auto" }}
                onClick={() => setShowCategoryModal(true)}
              >
                태그 선택
              </button>
            </div>
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
            />
          </div>

          <div className="modal-buttons">
            <button type="submit">저장</button>
            <button type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </form>
      </div>

      {/* 시작시간/종료시간 설정 모달 */}
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

      {/* ✔ 카테고리(태그) 선택 모달 */}
      {showCategoryModal && (
        <CategorySelectModal
          categories={categories}
          onClose={() => setShowCategoryModal(false)}
          onSelect={(cat) => {
            setSelectedCategory(cat); // 선택된 카테고리 저장
            setShowCategoryModal(false);
          }}
          // 카테고리 추가/수정 시 state 업데이트
          onAddCategory={(newCat) => setCategories([...categories, newCat])}
          onEditCategory={(updatedCat) => {
            setCategories(
              categories.map((c) => (c.id === updatedCat.id ? updatedCat : c))
            );
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
