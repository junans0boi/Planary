// src/components/TopBar/TopBar.jsx
import { useState } from "react";
import "./TopBar.css";

// FontAwesome 아이콘 및 컴포넌트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// 검색 모달 컴포넌트
import SearchModal from "./SearchModal";

const NavBar = () => {
  // 모달 표시 여부 관리 state
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const handleSearchClick = () => {
    setSearchModalOpen(true);
  };

  const closeModal = () => {
    setSearchModalOpen(false);
  };

  return (
    <>
      <nav className="nav-bar">
        <div className="nav-left">
          <img
            src="https://play-lh.googleusercontent.com/yG-z48QkkD4jOrp16EpXR_FomCchsYopjbUN6BHTHeFfkHXpWhqMeHacYG5XIsmcV6tL"
            alt="User"
            className="profile-icon"
          />
        </div>

        <div className="nav-right">
          {/* 돋보기 아이콘에 onClick 핸들러 추가 */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="nav-icon"
            onClick={handleSearchClick}
            style={{ cursor: "pointer" }}
          />
          <FontAwesomeIcon icon={faPaperPlane} className="nav-icon" />
        </div>
      </nav>
      {/* 모달 표시 조건부 렌더링 */}
      {isSearchModalOpen && <SearchModal onClose={closeModal} />}
    </>
  );
};

export default NavBar;