// todo-list/src/components/Calendar/CategoryEditModal.jsx
import { FontAwesomeIcon } from "../../FontAwesome";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./CategoryEditModal.css";


function CategoryEditModal({ category, onClose, onSave }) {
  // category가 있으면 편집, 없으면 새로 추가
  const isEdit = !!category;

  // 초기값 설정
  const [name, setName] = useState(category ? category.name : "");
  const [color, setColor] = useState(category ? category.color : "#ffb6c1");
  const [isPrivate, setIsPrivate] = useState(category ? category.isPrivate : false);

  // 원하는 색상 팔레트 (샘플)
  const colorOptions = [
    "#ffb6c1",
    "#ffa07a",
    "#87cefa",
    "#ffd700",
    "#c0c0c0",
    "#90ee90",
    "#cccccc",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCat = {
      // 편집이면 기존 id 그대로, 없으면 임의로 생성
      id: isEdit ? category.id : Date.now(),
      name,
      color,
      isPrivate,
    };
    onSave(newCat);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="modal-form" onSubmit={handleSubmit}>
          <nav className="modal-navbar">
            <div className="modal-nav-left">
              <FontAwesomeIcon
                icon="chevron-left"
                onClick={onClose}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="modal-nav-title">
              <h2>{isEdit ? "카테고리 수정" : "카테고리 추가"}</h2>
            </div>
            <div className="modal-nav-right">
              <button type="submit">저장</button>
            </div>
          </nav>
          <div className="form-group">
            <label>카테고리 이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 일상, 업무, 공부 등"
              required
            />
          </div>

          <div className="form-group">
            <label>색상 선택</label>
            <div className="color-options">
              {colorOptions.map((c) => (
                <div
                  key={c}
                  className="color-circle"
                  style={{
                    backgroundColor: c,
                    border: c === color ? "3px solid black" : "2px solid #ddd",
                  }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          {/* 비공개 옵션 (원하면 제거 가능) */}
          <div className="form-group">
            <label>비공개 카테고리</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

CategoryEditModal.propTypes = {
  category: PropTypes.object, // 없으면 추가, 있으면 수정
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CategoryEditModal;
