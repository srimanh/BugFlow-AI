import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBugs, getReportedBugs, getAssignedBugs, getAISuggestion } from "../services/api";
import BugCard from "../components/BugCard";
import "../App.css";
import Modal from "../components/Modal";
import ReactMarkdown from "react-markdown";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", priority: "HIGH" });
  const navigate = useNavigate();

  // AI Suggestion modal state for create bug form
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  const fetchBugs = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const handleApi = (promise) => {
      promise
        .then((data) => {
          if (Array.isArray(data)) setBugs(data);
          else setBugs([]);
        })
        .catch(() => setBugs([]));
    };

    if (role === "TESTER" || role === "ROLE_TESTER") {
      Promise.all([
        getReportedBugs(userId, token),
        getAssignedBugs(userId, token)
      ]).then(([reported, assigned]) => {
        const all = [...(Array.isArray(reported) ? reported : []), ...(Array.isArray(assigned) ? assigned : [])];
        const unique = Array.from(new Map(all.map(bug => [bug.id, bug])).values());
        setBugs(unique);
      }).catch(() => setBugs([]));
    } else if (role === "DEVELOPER" || role === "ROLE_DEVELOPER") {
      handleApi(getAssignedBugs(userId, token));
    } else if (role === "MANAGER" || role === "ROLE_MANAGER") {
      handleApi(getAllBugs(token));
    } else {
      setBugs([]);
    }
  }, [navigate, role, userId]);

  useEffect(() => {
    fetchBugs();
  }, [fetchBugs]);

  // Create bug handler
  const handleCreateBug = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:8080/api/bugs/create?reporterId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setForm({ title: "", description: "", priority: "HIGH" });
      setShowForm(false);
      fetchBugs();
    } else {
      alert("Failed to create bug");
    }
  };

  // AI Suggestion logic for create bug form
  const [aiLoading, setAiLoading] = useState(false);
  const handleAISuggestion = async () => {
    if (!form.title || !form.description) {
      setAiSuggestion("Please enter a title and description first.");
      setAiModalOpen(true);
      return;
    }
    setAiLoading(true);
    try {
      const suggestion = await getAISuggestion(form.title, form.description);
      setAiSuggestion(suggestion);
      setAiModalOpen(true);
    } catch (e) {
      setAiSuggestion("Failed to get AI suggestion");
      setAiModalOpen(true);
    } finally {
      setAiLoading(false);
    }
  };

  // Show up to 9 bugs in a 3x3 grid
  const bugsToShow = bugs.slice(0, 9);

  return (
    <>
      <div className="dashboard-bg" style={{ position: "fixed", inset: 0, zIndex: -1, minHeight: "100vh" }}></div>
      {/* Heading and Create Bug button row */}
      <div className="dashboard-header-row" style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginTop: 12,
        marginBottom: 18,
        position: "relative"
      }}>
        <h2 style={{
          fontWeight: 900,
          fontSize: "2.2rem",
          letterSpacing: 1,
          color: "#18181b",
          margin: 0,
          alignSelf: "flex-start"
        }}>
          {role?.replace("ROLE_", "").toUpperCase()} Dashboard
        </h2>
        {(role === "TESTER" || role === "ROLE_TESTER") && !showForm && (
          <button
            style={{
              background: "#23283a",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.7rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              zIndex: 10,
              boxShadow: "0 2px 8px 0 rgba(60, 72, 100, 0.10)",
              marginTop: 0,
              marginRight: 0,
              marginLeft: 0,
              marginBottom: 0,
              position: "relative",
              top: 0
            }}
            onClick={() => setShowForm(true)}
          >
            + Create Bug
          </button>
        )}
      </div>
      {/* Create Bug Modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <form onSubmit={handleCreateBug} style={{
          background: "#f8fafc",
          borderRadius: 14,
          boxShadow: "0 2px 12px 0 rgba(60, 72, 100, 0.10)",
          padding: "1.2rem 1.2rem 1rem 1.2rem",
          width: 380,
          display: "flex",
          flexDirection: "column",
          gap: 14
        }}>
          <input
            required
            placeholder="Bug title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={{ padding: "0.7rem 1rem", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: "1rem", background: "#fff", marginBottom: 8 }}
          />
          <textarea
            required
            placeholder="Bug description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            style={{ padding: "0.7rem 1rem", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: "1rem", minHeight: 60, background: "#fff", marginBottom: 8 }}
          />
          <button
            type="button"
            style={{
              background: aiLoading ? "#d1d5db" : "#2563eb",
              color: aiLoading ? "#888" : "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.5rem 1.1rem",
              fontWeight: 700,
              fontSize: "1rem",
              marginBottom: 8,
              cursor: aiLoading ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
            onClick={handleAISuggestion}
            disabled={aiLoading}
          >
            🤖 {aiLoading ? "Getting AI Suggestion..." : "Get AI Suggestion"}
          </button>
          <select
            value={form.priority}
            onChange={e => setForm({ ...form, priority: e.target.value })}
            style={{ padding: "0.7rem 1rem", borderRadius: 8, border: "1.5px solid #d1d5db", fontSize: "1rem", background: "#fff", marginBottom: 8 }}
          >
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button type="submit" style={{
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.5rem 1.2rem",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.2s"
            }}>Submit</button>
            <button type="button" onClick={() => setShowForm(false)} style={{
              background: "#e5e7eb",
              color: "#23283a",
              border: "none",
              borderRadius: 8,
              padding: "0.5rem 1.2rem",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.2s"
            }}>Cancel</button>
          </div>
        </form>
      </Modal>
      {/* AI Suggestion Modal for create bug form */}
      <Modal open={aiModalOpen} onClose={() => setAiModalOpen(false)}>
        <h2 style={{marginTop:0,marginBottom:12,fontWeight:800,fontSize:"1.2rem",color:"#23283a"}}>💡 AI Suggestion</h2>
        <div style={{fontSize:"1.05rem",color:"#23283a",lineHeight:1.6}}>
          <ReactMarkdown>{aiSuggestion}</ReactMarkdown>
        </div>
      </Modal>
      {/* Bugs grid 3x3 responsive */}
      <div className="dashboard-bug-grid" style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 32,
        justifyItems: "center",
        alignItems: "flex-start",
        marginTop: 24
      }}>
        {bugsToShow.map((bug, idx) => (
          <div key={bug.id} className="dashboard-bug-card-wrap" style={{
            width: 340,
            animation: "fadeIn 0.7s",
            animationDelay: `${idx * 0.08}s`,
            animationFillMode: "backwards"
          }}>
            <BugCard bug={bug} role={role} refresh={fetchBugs} />
          </div>
        ))}
      </div>
      {/* Responsive and fade-in animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
        @media (max-width: 900px) {
          .dashboard-bug-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .dashboard-bug-card-wrap {
            width: 90vw !important;
            max-width: 420px;
          }
        }
        @media (max-width: 600px) {
          .dashboard-header-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 16px !important;
            text-align: center;
          }
          .dashboard-bug-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .dashboard-bug-card-wrap {
            width: 95vw !important;
            max-width: 99vw;
          }
        }
      `}</style>
    </>
  );
}
export default Dashboard;