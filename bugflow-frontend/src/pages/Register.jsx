import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "../App.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DEVELOPER");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await registerUser({ name, email, password, role });
    if (res.id) {
      alert("Registration successful!");
      navigate("/login");
    } else {
      alert("Registration failed. Try again.");
    }
  };

  return (
    <>
      <div className="auth-bg"></div>
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Register to start using BugFlow AI</p>
        </div>
        <div className="auth-form">
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            autoComplete="username"
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="new-password"
          />
          <select onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="DEVELOPER">Developer</option>
            <option value="MANAGER">Manager</option>
            <option value="TESTER">Tester</option>
          </select>
          <button onClick={handleRegister}>Register</button>
        </div>
        <div className="auth-footer">
          <span>
            Already have an account? <a href="/login">Login</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;