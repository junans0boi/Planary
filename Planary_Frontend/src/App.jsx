import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BottomNav from "./components/Footer/BottomNav";
import TopBar from "./components/TopBar/TopBar";
import CalendarPage from "./pages/CalendarPage";
import TodoListPage from "./pages/TodoListPage";
import DiaryPage from "./pages/DiaryPage";
import ProfilePage from "./pages/ProfilePage";
import DirectMessagePage from "./components/DirectMessage/DirectMessagePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ 초기값을 `false`로 설정

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
      <div className="app-container">
        {isLoggedIn && <TopBar />}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 로그인한 사용자만 접근 가능 */}
            <Route path="/" element={isLoggedIn ? <CalendarPage /> : <Navigate to="/login" />} />
            <Route path="/todolist" element={<PrivateRoute><TodoListPage /></PrivateRoute>} />
            <Route path="/diary" element={<PrivateRoute><DiaryPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/directmessage" element={<PrivateRoute><DirectMessagePage /></PrivateRoute>} />

            {/* 모든 다른 경로는 로그인 페이지로 이동 */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        {isLoggedIn && <BottomNav />}
      </div>
  );
}

export default App;