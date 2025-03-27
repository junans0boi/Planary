import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../components/SignupPage/SignupPage.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    const newUser = { email, password };
  
    try {
      const res = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      // 서버가 응답을 주긴 했지만 실패한 경우
      if (!res.ok) {
        const errorText = await res.text();
        alert(`회원가입 실패: ${errorText}`);
        return;
      }
  
      const message = await res.text();
  
      if (message === "회원가입 성공!") {
        alert("회원가입 완료!");
        navigate("/login");
      } else {
        alert(message); // 예: "이미 존재하는 이메일입니다."
      }
  
    } catch (error) {
      // fetch 자체가 실패한 경우 (서버 꺼짐, 주소 오타 등)
      console.error("회원가입 중 오류 발생:", error);
      alert("🚫 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.");
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">회원가입</h2>
        <form onSubmit={handleSignup} className="auth-form">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            회원가입
          </button>
        </form>
        <p className="auth-footer">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage; // ✅ 꼭 있어야 함