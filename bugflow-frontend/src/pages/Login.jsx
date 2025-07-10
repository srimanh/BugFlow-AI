import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await loginUser({ email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      if (res.userId) {
        localStorage.setItem("userId", res.userId);
      }
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <>
    <div className="auth-bg"></div>
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your BugFlow AI account</p>
        </div>
        <div className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button onClick={handleLogin}>Login</button>
        </div>
        <div className="auth-footer">
          <span>Don't have an account? <a href="/">Register</a></span>
        </div>
      </div>
    </>
  );
}

export default Login;