import { useState, useEffect } from "react";
import { assignBug, updateStatus, getAllNonManagers, getAISuggestion } from "../services/api";
import { toast } from "react-toastify";
import Modal from "./Modal";
import ReactMarkdown from "react-markdown";

export default function BugCard({ bug, role, refresh }) {
  const [devId, setDevId] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (role === "MANAGER") {
      setLoadingUsers(true);
      getAllNonManagers()
        .then((users) => {
          setUsers(Array.isArray(users) ? users : []);
          setLoadingUsers(false);
        })
        .catch(() => {
          setUsers([]);
          setLoadingUsers(false);
        });
    }
  }, [role]);

  // Manager → assign
  const handleAssign = async () => {
    if (!devId) {
      toast.error("❌ Please select a user");
      return;
    }
    try {
      await assignBug(bug.id, devId);
      toast.success("✅ Bug assigned");
      refresh();
    } catch (e) {
      toast.error("❌ Assignment failed");
    }
  };

  // Developer → update status
  const handleStatus = async (e) => {
    const status = e.target.value;
    try {
      await updateStatus(bug.id, status);
      toast.info("🔄 Status updated");
      refresh();
    } catch (e) {
      toast.error("❌ Could not update");
    }
  };

  // AI Suggestion logic
  const [aiLoading, setAiLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const handleAISuggestion = async () => {
    if (!bug.title || !bug.description) {
      // Optionally show a toast here
      return;
    }
    setAiLoading(true);
    try {
      const suggestion = await getAISuggestion(bug.title, bug.description);
      setAiSuggestion(suggestion);
      setModalOpen(true);
    } catch (e) {
      setAiSuggestion("Failed to get AI suggestion.");
      setModalOpen(true);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 12px 0 rgba(60, 72, 100, 0.10)",
      padding: "1rem 1.1rem 0.8rem 1.1rem",
      width: "100%",
      maxWidth: 270,
      minHeight: 90,
      color: "#18181b",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start"
    }}>
      <div style={{ width: "100%" }}>
        <div style={{ fontWeight: 700, fontSize: "1.08rem", marginBottom: 3, color: "#18181b" }}>{bug.title}</div>
        <div style={{ color: "#18181b", fontSize: "0.97rem", marginBottom: 6 }}>{bug.description}</div>
        {/* AI Suggestion button for Testers and Developers */}
        {role !== "MANAGER" && (
          <button
            className="ai-button"
            style={{
              background: aiLoading ? "#d1d5db" : "#3b82f6",
              color: aiLoading ? "#888" : "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.4rem 1rem",
              fontWeight: 700,
              fontSize: "0.97rem",
              marginTop: 6,
              cursor: aiLoading ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
            onClick={handleAISuggestion}
            disabled={aiLoading}
          >
            🤖 {aiLoading ? "Getting AI Suggestion..." : "Get AI Suggestion"}
          </button>
        )}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <h2 style={{marginTop:0,marginBottom:12,fontWeight:800,fontSize:"1.2rem",color:"#23283a"}}>💡 AI Suggestion</h2>
          <div style={{fontSize:"1.05rem",color:"#23283a",lineHeight:1.6}}>
            <ReactMarkdown>{aiSuggestion}</ReactMarkdown>
          </div>
        </Modal>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
        <span style={{
          padding: "0.3rem 1.1rem",
          borderRadius: 8,
          fontWeight: 700,
          fontSize: "0.93rem",
          background: bug.status === "OPEN" ? "#dcfce7" : bug.status === "CLOSED" ? "#fee2e2" : "#fef9c3",
          color: bug.status === "OPEN" ? "#15803d" : bug.status === "CLOSED" ? "#b91c1c" : "#b45309",
          border: "none",
          display: "inline-block",
          marginBottom: 0
        }}>{bug.status}</span>
        {role === "MANAGER" && (
          <div style={{ display: "flex", width: "100%", gap: 6, alignItems: "center", marginTop: 4 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <select
                value={devId}
                onChange={e => setDevId(e.target.value)}
                style={{
                  border: "1.5px solid #23283a",
                  borderRadius: 7,
                  padding: "0.45rem 0.7rem",
                  fontSize: "0.97rem",
                  background: devId ? "#23283a" : "#fff",
                  color: devId ? "#fff" : "#23283a",
                  width: "100%",
                  fontWeight: 600,
                  outline: "none",
                  transition: "background 0.2s, color 0.2s",
                  boxShadow: "0 1px 6px 0 rgba(60, 72, 100, 0.07)",
                  cursor: loadingUsers ? "not-allowed" : "pointer"
                }}
                disabled={loadingUsers}
                onFocus={e => e.target.style.background = '#23283a'}
                onBlur={e => e.target.style.background = devId ? '#23283a' : '#fff'}
              >
                <option value="" style={{ color: "#23283a", background: "#fff", fontWeight: 700 }}>
                  {loadingUsers ? "Loading..." : "Select User"}
                </option>
                {users.map(user => (
                  <option key={user.id} value={user.id} style={{ color: "#fff", background: "#23283a" }}>{user.name} ({user.email})</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAssign}
              style={{
                background: "#23283a",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.45rem 1.1rem",
                fontSize: "0.97rem",
                fontWeight: 700,
                cursor: loadingUsers || users.length === 0 ? "not-allowed" : "pointer",
                boxShadow: "0 2px 8px 0 rgba(60, 72, 100, 0.10)",
                marginLeft: 0,
                marginTop: 0,
                transition: "background 0.2s"
              }}
              onMouseOver={e => e.target.style.background = '#3b82f6'}
              onMouseOut={e => e.target.style.background = '#23283a'}
              disabled={loadingUsers || users.length === 0}
            >
              Assign
            </button>
          </div>
        )}
        {role === "DEVELOPER" && bug.status !== "FIXED" && (
          <select
            onChange={handleStatus}
            defaultValue={bug.status}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: 6,
              padding: "0.3rem 0.7rem",
              fontSize: "0.97rem",
              background: "#f4f7fe"
            }}
          >
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="FIXED">FIXED</option>
          </select>
        )}
      </div>
    </div>
  );
}
