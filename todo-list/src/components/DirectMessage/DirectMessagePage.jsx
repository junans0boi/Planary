// src/components/DirectMessage/DirectMessagePage.jsx
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUserPlus, faCommentMedical } from "@fortawesome/free-solid-svg-icons";
import "./DirectMessagePage.css";

function DirectMessagePage({ onClose }) {
  return (
    // dm-layer는 페이지 전체를 덮는 레이어 역할을 합니다.
    <div className="dm-layer">
      <div className="dm-container">
        <nav className="dm-nav">
          <div className="dm-nav-left">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={onClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="dm-title">
            <h3>Direct Message</h3>
          </div>
          <div className="dm-nav-right">
            <FontAwesomeIcon icon={faUserPlus} className="nav-icon"/>
            <FontAwesomeIcon icon={faCommentMedical} className="nav-icon"/>
          </div>
        </nav>
        <div className="dm-feed">

        </div>
        <div className="dm-content">
          <p>친구와 대화를 시작해보세요.</p>
          <p>좋은 대화의 시작이 되었으면 좋겠습니다.</p>
          <button className="dm-button">대화하기</button>
        </div>
      </div>
    </div>
  );
}

DirectMessagePage.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DirectMessagePage;
