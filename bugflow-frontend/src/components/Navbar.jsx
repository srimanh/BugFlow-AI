import React from "react";

function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <nav style={{
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 100,
      background: "#fff",
      boxShadow: "0 2px 8px 0 rgba(60, 72, 100, 0.10)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.8rem 2.5rem",
      boxSizing: "border-box"
    }}>
      <span style={{ fontWeight: 700, fontSize: "1.3rem", letterSpacing: 1  , color: "#23283a"}}>BugFlow AI</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "auto" }}>
        <button
          onClick={logout}
          style={{
            background: "#23283a",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.6rem 1.5rem",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(60, 72, 100, 0.10)",
            transition: "background 0.2s"
          }}
          onMouseOver={e => e.target.style.background = '#3b82f6'}
          onMouseOut={e => e.target.style.background = '#23283a'}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
