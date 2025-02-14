import { Routes, Route } from "react-router-dom"; // ✅ BrowserRouter 제거
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
      <TopBar />
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/todolist" element={<TodoListPage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/directmessage" element={<DirectMessagePage />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;