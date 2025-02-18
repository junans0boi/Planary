import { useState } from "react";
import "./TopBar.css";

// FontAwesome 아이콘 및 컴포넌트
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// 검색 모달 & DM 모달 컴포넌트
import SearchModal from "./SearchModal";
import DirectMessagePage from "../DirectMessage/DirectMessagePage";

const NavBar = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isDirectMessageOpen, setDirectMessageOpen] = useState(false);

  const handleSearchClick = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);

  const handleDirectMessageClick = () => setDirectMessageOpen(true);
  const closeDirectMessageModal = () => setDirectMessageOpen(false);

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
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="nav-icon"
            onClick={handleSearchClick}
            style={{ cursor: "pointer" }}
          />

          <FontAwesomeIcon
            icon={faPaperPlane}
            className="nav-icon"
            onClick={handleDirectMessageClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      </nav>

      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
      {isDirectMessageOpen && <DirectMessagePage onClose={closeDirectMessageModal} />}
    </>
  );
};

export default NavBar;
