import { FontAwesomeIcon } from "../../FontAwesome"; 
import { useState } from "react";
import "./TopBar.css";

import SearchModal from "./SearchModal";
import DirectMessagePage from "../DirectMessage/DirectMessagePage";
import YearMonthModal from "../Calendar/YearMonthSelectModal"; // 연/월 선택 모달 추가

const TopBar = ({ displayYear, displayMonth, onYearMonthChange }) => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isDirectMessageOpen, setDirectMessageOpen] = useState(false);
  const [isYearMonthModalOpen, setIsYearMonthModalOpen] = useState(false); // 연/월 선택 모달 상태

  const handleSearchClick = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);
  const handleDirectMessageClick = () => setDirectMessageOpen(true);
  const closeDirectMessageModal = () => setDirectMessageOpen(false);

  // 연/월 선택 모달 열기 & 닫기
  const openYearMonthModal = () => setIsYearMonthModalOpen(true);
  const closeYearMonthModal = () => setIsYearMonthModalOpen(false);

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-left">
          {/* ✅ 연/월 선택 버튼 추가 */}
          <button className="year-month-btn" onClick={openYearMonthModal}>
            {displayYear}년 {displayMonth + 1}월 ▼
          </button>
        </div>

        <div className="nav-right">
          <FontAwesomeIcon
            icon="magnifying-glass"
            className="nav-icon"
            onClick={handleSearchClick}
            style={{ cursor: "pointer" }}
          />

          <FontAwesomeIcon
            icon="paper-plane"
            className="nav-icon"
            onClick={handleDirectMessageClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      </nav>

      {/* ✅ 연/월 선택 모달 */}
      {isYearMonthModalOpen && (
        <YearMonthModal
          currentYear={displayYear}
          currentMonth={displayMonth}
          onClose={closeYearMonthModal}
          onSelect={onYearMonthChange} // 선택한 연/월을 부모로 전달
        />
      )}

      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
      {isDirectMessageOpen && <DirectMessagePage onClose={closeDirectMessageModal} />}
    </>
  );
};

export default TopBar;