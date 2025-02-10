// src/components/DirectMessage/DirectMessagePage.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCommentMedical } from "@fortawesome/free-solid-svg-icons";
import "./DirectMessagePage.css"; // CSS 파일을 임포트합니다.

function DirectMessagePage() {
  return (
    <>
      <nav className="nav-bar">
        <div className="nav-left">
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className="title">
          <h3>Direct Message</h3>
        </div>
        <div className="nav-right">
          {/* 댓글 관련 아이콘, 필요 시 onClick 핸들러를 추가하세요 */}
          <FontAwesomeIcon icon={faCommentMedical} />
        </div>
      </nav>
      
      <div className="content">
        <p>친구와 대화를 시작해보세요.</p>
        <p>좋은 대화와 시작이 되었으면 좋겠습니다.</p>
        <button className="search-button">대화하기</button>
      </div>
    </>
  );
}

export default DirectMessagePage;