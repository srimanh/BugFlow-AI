import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBugs, getReportedBugs, getAssignedBugs } from "../services/api";
import "../App.css";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    if (role === "TESTER" || role === "ROLE_TESTER") {
      getReportedBugs(userId, token).then(setBugs);
    } else if (role === "DEVELOPER" || role === "ROLE_DEVELOPER") {
      getAssignedBugs(userId, token).then(setBugs);
    } else if (role === "MANAGER" || role === "ROLE_MANAGER") {
      getAllBugs(token).then(setBugs);
    }
  }, [navigate, role, userId]);

  return (
    <>
      <div className="dashboard-bg"></div>
      <div className="dashboard-card">
        <h2>🐞 {role?.replace("ROLE_", "")} Dashboard</h2>
        <ul className="bug-list">
          {bugs && bugs.length > 0 ? (
            bugs.map((bug) => (
              <li key={bug.id}>
                <strong>{bug.title}</strong> - {bug.status} <br />
                <span style={{ fontSize: "0.95em", color: "#555" }}>{bug.description}</span>
              </li>
            ))
          ) : (
            <p>No bugs available.</p>
          )}
        </ul>
      </div>
    </>
  );
}
export default Dashboard;