import React from "react";

export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 4px 32px 0 rgba(60,72,100,0.18)",
        padding: "2.2rem 2.2rem 1.5rem 2.2rem",
        minWidth: 340,
        maxWidth: 480,
        width: "90%",
        position: "relative",
        textAlign: "left"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "#f3f4f6",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            fontSize: 20,
            fontWeight: 700,
            color: "#23283a",
            cursor: "pointer"
          }}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
} 