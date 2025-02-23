// src/components/DirectMessage/DirectMessagePage.jsx
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "../../FontAwesome";
import "./DirectMessagePage.css";

function DirectMessagePage({ onClose }) {
  return (
    // dm-layer는 페이지 전체를 덮는 레이어 역할을 합니다.
    <div className="modal-overlay">
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
            <h2>Direct Message</h2>
          </div>
          <div className="modal-nav-right">
            <FontAwesomeIcon icon="user-plus" className="nav-icon"/>
            <FontAwesomeIcon icon="comment-medical" className="nav-icon"/>
          </div>
        </nav>
        <div className="form-group">
          <p>친구와 대화를 시작해보세요.</p>
          <p>좋은 대화의 시작이 되었으면 좋겠습니다.</p>
          <button className="dm-button">대화하기</button>
        </div>
      </div>
    </div>
  );
}

DirectMessagePage.propTypes = {
  onClose: PropTypes.func,
};

export default DirectMessagePage;
