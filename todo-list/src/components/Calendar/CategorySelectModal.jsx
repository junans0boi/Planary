// todo-list/src/components/Calendar/CategorySelectModal.jsx
import { FontAwesomeIcon } from "../../FontAwesome";
import React, { useState } from "react";
import PropTypes from "prop-types";

import "./CategorySelectModal.css";
import CategoryEditModal from "./CategoryEditModal";

function CategorySelectModal({
  categories,
  onClose,
  onSelect,
  onAddCategory,
  onEditCategory,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // 수정할 카테고리 (null이면 새로 추가)

  // 카테고리 클릭 시 → onSelect(cat)
  const handleCategoryClick = (cat) => {
    onSelect(cat); // 부모(AddScheduleModal)로 선택된 cat 전달
  };

  // + 버튼 클릭 시 → 새 카테고리 추가 모달 열기
  const handleAddClick = () => {
    setEditTarget(null);
    setShowEditModal(true);
  };

  // 수정 버튼 클릭 시 → 카테고리 편집 모달 열기
  const handleEditClick = (cat, e) => {
    e.stopPropagation(); // 부모 onClick 방지 (선택 대신 수정)
    setEditTarget(cat);
    setShowEditModal(true);
  };

  return (
    <div className="modal-overlay ">
      <div className="modal-content">
        <nav className="modal-navbar">
          <div className="modal-nav-left">
            <FontAwesomeIcon
              icon="chevron-left"
              onClick={onClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="modal-nav-title">
            <h2>일정 추가</h2>
          </div>
          <div className="modal-nav-right">
            <button onClick={handleAddClick}>추가</button>
          </div>
        </nav>

        <div className="category-list">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-item"
              onClick={() => handleCategoryClick(cat)}
            >
              <div
                className="category-color"
                style={{ backgroundColor: cat.color }}
              />
              <span className="category-name">{cat.name}</span>

              {/* 수정 버튼(또는 연필 아이콘 등) */}
              <button
                className="edit-button"
                onClick={(e) => handleEditClick(cat, e)}
              >
                수정
              </button>
            </div>
          ))}
        </div>

        
      </div>

      {/* 카테고리 편집 모달 (추가/수정 겸용) */}
      {showEditModal && (
        <CategoryEditModal
          category={editTarget} // null이면 추가
          onClose={() => setShowEditModal(false)}
          onSave={(savedCat) => {
            if (editTarget) {
              // 기존 카테고리 수정
              onEditCategory(savedCat);
            } else {
              // 새 카테고리 추가
              onAddCategory(savedCat);
            }
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
}

CategorySelectModal.propTypes = {
  categories: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onAddCategory: PropTypes.func.isRequired,
  onEditCategory: PropTypes.func.isRequired,
};

export default CategorySelectModal;
