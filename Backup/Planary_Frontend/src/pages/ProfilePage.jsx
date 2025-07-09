import React from 'react';
import '../components/Profile/ProfilePage.css';

// Font Awesome 사용 예시
// 1) index.html 등에 CDN 추가
//    <link
//      rel="stylesheet"
//      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
//      integrity="sha512-Fo3rlrZj/k7ujTnH1zY/2U9efm7h0Wl3Wq6VfWeV5FAyblfjU3EN5bA4SgCzU+WJk8z7FK2i6CL1Zr8ZfjWpsA=="
//      crossorigin="anonymous"
//      referrerpolicy="no-referrer"
//    />
// 2) 혹은 npm 설치 후 import '@fortawesome/fontawesome-free/css/all.min.css'; 형태로 사용

function ProfilePage() {
  return (
    <div className="profile-page">
      {/* 상단 프로필 영역 */}
      <div className="profile-header">
        <div className="profile-left">
          {/* 프로필 이미지 */}
          <img
            className="profile-image"
            src="https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png"
            alt="Profile"
          />
          {/* 이름, 이메일, 팔로잉/팔로워 */}
          <div className="profile-info">
            <div className="profile-name">주난</div>
            <div className="profile-email">junans0boi@gmail.com</div>
            <div className="follow-info">
              팔로잉 <span>2</span>  팔로워 <span>2</span>
            </div>
          </div>
        </div>
        {/* 프로필 보기 버튼 */}
        <button className="profile-button">프로필 보기</button>
      </div>

      {/* 메뉴 리스트 */}
      <ul className="menu-list">
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-user"></i>
            <span>계정</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-lock"></i>
            <span>개인정보 보호</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-tv"></i>
            <span>화면</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-bell"></i>
            <span>알림</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-bullhorn"></i>
            <span>공지사항</span>
          </div>
          <div className="menu-right">
            <span className="badge">N</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-sticky-note"></i>
            <span>내 스티커</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-gem"></i>
            <span>Premium</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-info-circle"></i>
            <span>정보</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-question-circle"></i>
            <span>문의하기</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-heart"></i>
            <span>개발자 응원하기</span>
          </div>
        </li>
        <li className="menu-item">
          <div className="menu-left">
            <i className="fas fa-flask"></i>
            <span>실험실</span>
          </div>
        </li>
      </ul>

      {/* 로그아웃 버튼 영역 */}
      <div className="logout-section">
        <button className="logout-button">로그아웃 하기</button>
      </div>

      {/* 앱 버전 정보 */}
      <div className="version-info">
        앱 버전 2.10.14(25021401)
      </div>
    </div>
  );
}

export default ProfilePage;
