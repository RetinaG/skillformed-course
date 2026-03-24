import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEnrollment } from "../api.js";

const V = {
  bg: "#f8f7f4", surface: "#ffffff", dark: "#0d0d0d", muted: "#6b6b6b",
  subtle: "#c8c8c8", rule: "#e8e6e1", gold: "#a07840", text: "#1a1a1a",
  error: "#8b1a1a", success: "#1a5c35",
};

const MANUAL_ACCESS = ["aniemi@rockingcube.com", "retinawhite23@gmail.com"];

export default function CourseLogin() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const inputStyle = {
    width: "100%", background: V.bg, border: `1px solid ${V.rule}`,
    borderRadius: 4, padding: "12px 16px", color: V.text, fontSize: 14,
    fontFamily: "'Inter', sans-serif", outline: "none",
  };

  const grantAccess = (emailVal, nameVal) => {
    localStorage.setItem("student_email", emailVal);
    localStorage.setItem("student_name", nameVal || "");
    localStorage.setItem("pmp_purchased", "true");
    setMsg({ type: "success", text: "Access confirmed. Redirecting to your course." });
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  const handleLogin = async () => {
    if (!email) return setMsg({ type: "error", text: "Please enter your email address." });
    setLoading(true);
    const e = email.toLowerCase().trim();
    if (MANUAL_ACCESS.includes(e)) { grantAccess(e, ""); setLoading(false); return; }
    try {
      const data = await checkEnrollment(e);
      if (data.access === true) { grantAccess(e, data.student_name || ""); setLoading(false); return; }
    } catch (_) {}
    setMsg({ type: "error", text: "No active enrolment found. Check your email or contact support@skillformed.com." });
    setLoading(false);
  };

  return (
    <div style={{ background: V.bg, minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: V.text, display: "flex", flexDirection: "column" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } input:focus { border-color: #0d0d0d !important; outline: none; }`}</style>
      <nav style={{ background: V.surface, borderBottom: `1px solid ${V.rule}`, padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div onClick={() => navigate("/")} style={{ fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 700, color: V.dark, cursor: "pointer" }}>
          Skillformed: The AI Operator System
        </div>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: V.muted, fontSize: 13, cursor: "pointer" }}>
          Back to overview
        </button>
      </nav>
      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ flex: 1, background: V.dark, padding: "80px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ maxWidth: 420 }}>
            <div style={{ width: 32, height: 1, background: V.gold, marginBottom: 32 }} />
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 36, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>
              The operating system for elite AI operators.
            </h2>
            <p style={{ fontSize: 14, color: "#888", lineHeight: 1.8, marginBottom: 48 }}>
              A structured mastery programme built for professionals who demand measurable results from AI.
            </p>
            {[["10 Modules", "Complete progression from foundations to mastery"],
              ["31 Lessons", "Practical, implementation-focused content"],
              ["CRAFT System", "The five-part framework behind every elite prompt"],
              ["Agentic AI", "Design and operate multi-agent workflows"],
              ["Lifetime Access", "Including all future updates"]].map(([t, d]) => (
              <div key={t} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: `1px solid ${V.gold}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <svg width="7" height="5" viewBox="0 0 7 5" fill="none"><path d="M1 2.5L2.8 4.3L6.3 1" stroke={V.gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0e0", marginBottom: 2 }}>{t}</div>
                  <div style={{ fontSize: 12, color: "#666" }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: 480, background: V.surface, borderLeft: `1px solid ${V.rule}`, padding: "80px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 700, color: V.dark, marginBottom: 8 }}>
            {mode === "login" ? "Access your course" : "Enrol now"}
          </h1>
          <p style={{ fontSize: 13, color: V.muted, marginBottom: 36, lineHeight: 1.6 }}>
            {mode === "login" ? "Enter the email address you used at purchase." : "Complete your purchase to get immediate access."}
          </p>
          <div style={{ display: "flex", background: V.bg, border: `1px solid ${V.rule}`, borderRadius: 4, padding: 3, marginBottom: 32 }}>
            {[{ id: "login", label: "Sign In" }, { id: "signup", label: "Enrol" }].map(t => (
              <button key={t.id} onClick={() => { setMode(t.id); setMsg({ type: "", text: "" }); }}
                style={{ flex: 1, padding: "9px 0", background: mode === t.id ? V.dark : "transparent", border: "none", color: mode === t.id ? "#fff" : V.muted, borderRadius: 3, fontSize: 13, fontWeight: mode === t.id ? 600 : 400, cursor: "pointer" }}>
                {t.label}
              </button>
            ))}
          </div>
          {mode === "login" ? (
            <>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: V.muted, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email Address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" style={inputStyle} onKeyDown={e => e.key === "Enter" && handleLogin()} />
              </div>
              {msg.text && (
                <div style={{ background: msg.type === "success" ? "#f0faf5" : "#fdf5f5", border: `1px solid ${msg.type === "success" ? "#a3d4b8" : "#e0b4b4"}`, borderRadius: 4, padding: "12px 16px", fontSize: 13, color: msg.type === "success" ? V.success : V.error, marginBottom: 20, lineHeight: 1.5 }}>
                  {msg.text}
                </div>
              )}
              <button onClick={handleLogin} disabled={loading} style={{ width: "100%", background: V.dark, color: "#fff", border: "none", padding: "13px", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: loading ? "wait" : "pointer", marginBottom: 16 }}>
                {loading ? "Checking..." : "Access My Course"}
              </button>
              <p style={{ fontSize: 12, color: V.muted, textAlign: "center" }}>
                Need help? <a href="mailto:support@skillformed.com" style={{ color: V.dark, textDecoration: "underline" }}>support@skillformed.com</a>
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 14, color: V.muted, lineHeight: 1.7, marginBottom: 32 }}>
                You will be taken to secure checkout. Immediate access granted upon payment.
              </p>
              <button onClick={() => navigate("/")} style={{ width: "100%", background: V.dark, color: "#fff", border: "none", padding: "13px", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 16 }}>
                Proceed to Enrolment
              </button>
              <p style={{ fontSize: 11, color: V.subtle, textAlign: "center" }}>$149 one-time. Secure checkout. 30-day guarantee.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
