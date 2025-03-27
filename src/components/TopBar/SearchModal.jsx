// src/components/TopBar/SearchModal.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import "./SearchModal.css";

const SearchModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // 검색 처리 로직 추가 가능
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>검색</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="검색어를 입력하세요..."
          className="search-input"
        />
        <button className="search-button" onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  );
};

SearchModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SearchModal;