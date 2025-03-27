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
      setTitle(initialDiary.title || "");
      setContent(initialDiary.content || "");
      setEmotion(initialDiary.emotion || 1);
      setIsEditing(false); // 처음에는 수정 모드 X
    } else {
      setTitle("");
      setContent("");
      setEmotion(1);
      setIsEditing(true); // 새 일기 작성 시에는 수정 모드 O
    }
  }, [initialDiary, selectedDate]);

  const handleSave = async () => {
    const diary = {
      title,
      content,
      emotion, // ✅ 감정도 함께 저장
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
      
      {/* ✅ 감정 표시 */}
      <div className="emotion-container">
        {!isEditing ? (
          // ✅ 수정 모드가 아닐 때: 선택한 감정 하나만 보여줌
          <img
            src={`/img/emotion/emotion${emotion}.png`}
            alt={`감정 ${emotion}`}
            className="selected"
            style={{ width: "50px", height: "50px", margin: "5px" }}
          />
        ) : (
          // ✅ 수정 모드일 때: 모든 감정 선택 가능
          [1, 2, 3, 4, 5].map((num) => (
            <img
              key={num}
              src={`/img/emotion/emotion${num}.png`}
              alt={`감정 ${num}`}
              className={emotion === num ? "selected" : ""}
              onClick={() => setEmotion(num)}
              style={{ width: "40px", height: "40px", margin: "5px", cursor: "pointer" }}
            />
          ))
        )}
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