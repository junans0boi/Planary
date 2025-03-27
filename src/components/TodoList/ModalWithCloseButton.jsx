import React from "react";
import PropTypes from "prop-types";
import "./ModalWithCloseButton.css"; 

const ModalWithCloseButton = ({ 
  onClose, 
  onSubmit = () => {}, 
  children, 
  isEditing = false, 
  setIsEditing = () => {} 
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSubmit();
      console.log("✅ onSubmit 실행 완료");
    } catch (error) {
      console.error("❌ onSubmit 실행 중 오류:", error);
    }

    console.log("✅ 모달 닫기 시도");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="modal-form">
          {children}
        </form>
      </div>
    </div>
  );
};

ModalWithCloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
};

export default ModalWithCloseButton;