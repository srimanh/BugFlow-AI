import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBugs } from "../services/api";
import "../App.css";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    getAllBugs(token).then(setBugs);
  }, [navigate]);

  return (
    <>
      <div className="dashboard-bg"></div>
      <div className="dashboard-card">
        <h2>All Bugs</h2>
        <ul className="bug-list">
          {bugs.map((bug) => (
            <li key={bug.id}>
              <strong>{bug.title}</strong> - {bug.status}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default Dashboard;