import { Routes, Route } from "react-router-dom"; // ✅ BrowserRouter 제거
import "./App.css";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import TodoList from "./pages/TodoList";
import Diary from "./pages/Diary";
import More from "./pages/More";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </div>
  );
}

export default App;