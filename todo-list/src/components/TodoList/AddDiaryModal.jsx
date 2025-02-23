import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ModalWithCloseButton from "./ModalWithCloseButton";
import "./AddDiaryModal.css";

const AddDiaryModal = ({ onClose, onSave, selectedDate, initialDiary }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialDiary) {
      setTitle(initialDiary.title);
      setContent(initialDiary.content);
      setEmotion(initialDiary.emotion);
      setIsEditing(false);
    } else {
      setTitle("");
      setContent("");
      setEmotion(1);
      setIsEditing(true);
    }
  }, [initialDiary, selectedDate]);

  const handleSave = async () => {
    const diary = {
      title,
      content,
      emotion,
      date: selectedDate,
    };

    try {
      await onSave(diary);
      setIsEditing(false);
    } catch (error) {
      console.error("❌ 저장 중 오류 발생:", error);
    }
  };

  return (
    <ModalWithCloseButton onClose={onClose}>
      <h2>오늘의 감정</h2>
      <div className="emotion-container">
        {[1, 2, 3, 4, 5].map((num) => (
          <img
            key={num}
            src={`/img/emotion/emotion${num}.png`}
            alt={`감정 ${num}`}
            className={emotion === num ? "selected" : ""}
            onClick={() => isEditing && setEmotion(num)}
            style={{ width: "40px", height: "40px", margin: "5px" }} // ✅ 감정 크기 조절
          />
        ))}
      </div>

      <div className="form-group">
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="일기 제목"
          disabled={!isEditing}
        />
      </div>

      <div className="form-group">
        <label>일기 내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="오늘의 하루를 기록하세요..."
          disabled={!isEditing}
        />
      </div>

      {/* ✅ 버튼 컨테이너: 완료, 수정, 취소 버튼 정렬 */}
      <div className="button-container">
        <button onClick={handleSave} className="complete-btn">완료</button>
        {!isEditing && <button onClick={() => setIsEditing(true)} className="edit-btn">수정</button>}
        <button onClick={onClose} className="cancel-btn">취소</button>
      </div>
    </ModalWithCloseButton>
  );
};

AddDiaryModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  initialDiary: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    emotion: PropTypes.number,
  }),
};

export default AddDiaryModal;