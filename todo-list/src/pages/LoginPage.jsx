import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/LoginPage/LoginPage.css";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("loggedInUser", JSON.stringify({ email })); // ✅ 로그인 정보 저장
      setIsLoggedIn(true); // ✅ 상태 업데이트
      navigate("/"); // ✅ 로그인 후 캘린더 페이지로 이동
    } else {
      alert("로그인 실패! 이메일과 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="이메일" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="비밀번호" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
        <button type="submit">로그인</button>
      </form>
      <p>계정이 없나요? <Link to="/signup">회원가입</Link></p>
    </div>
  );
};

export default LoginPage;