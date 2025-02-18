// todo-list/src/App.jsx
import { Routes, Route } from "react-router-dom";
import BottomNav from "./components/Footer/BottomNav";
import TopBar from "./components/TopBar/TopBar";
import CalendarPage from "./pages/CalendarPage";
import TodoListPage from "./pages/TodoListPage";
import DiaryPage from "./pages/DiaryPage";
import ProfilePage from "./pages/ProfilePage";
import DirectMessagePage from "./components/DirectMessage/DirectMessagePage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* 고정 상단바 */}
      <TopBar />

      {/* 가운데 메인 영역: 라우트에 따라 페이지 교체 */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<CalendarPage />} />
          <Route path="/todolist" element={<TodoListPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/directmessage" element={<DirectMessagePage />} />
        </Routes>
      </div>

      {/* 고정 하단바 */}
      <BottomNav />
    </div>
  );
}

export default App;