import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourseData } from "../api.js";

const V = {
  bg: "#f8f7f4", surface: "#ffffff", dark: "#0d0d0d", mid: "#1a1a1a",
  muted: "#6b6b6b", subtle: "#c8c8c8", rule: "#e8e6e1", gold: "#a07840",
  text: "#1a1a1a", light: "#f2f0ec",
};
const T = {
  display: { fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.02em" },
  sans: { fontFamily: "'Inter', -apple-system, sans-serif" },
};

const outcomes = [
  "Build AI workflows that replace 10+ hours of manual work every week",
  "Write prompts that produce publication-ready output on the first attempt",
  "Design and run a multi-agent operation from a single laptop",
  "Generate 30 days of high-converting content in under two hours",
  "Deploy automated sales funnels and email sequences that close without you",
  "Conduct competitive intelligence in 20 minutes that rivals a full research team",
];

const forWhom = [
  { title: "Business Owners", desc: "Who want to operate faster, leaner, and at a higher level than their competition." },
  { title: "Marketers and Creators", desc: "Who need to produce more output without sacrificing quality or burning out." },
  { title: "Consultants and Operators", desc: "Who want to deliver better results for clients using AI as their execution layer." },
  { title: "Ambitious Professionals", desc: "Who recognise that AI literacy is the defining career skill of the next decade." },
];

export default function CourseHome() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCourseData().then(d => {
      const mods = (d.modules || []).sort((a, b) => a.module_number - b.module_number);
      setModules(mods);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const totalLessons = modules.reduce((a, m) => a + (m.total_lessons || 0), 0);

  return (
    <div style={{ background: V.bg, minHeight: "100vh", ...T.sans, color: V.text }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } ::selection { background: #a07840; color: #fff; }`}</style>

      {/* NAV */}
      <nav style={{ background: V.surface, borderBottom: `1px solid ${V.rule}`, padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ ...T.display, fontSize: 17, fontWeight: 700, color: V.dark }}>Skillformed: The AI Operator System</div>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => navigate("/login")} style={{ background: "none", border: `1px solid ${V.rule}`, color: V.muted, padding: "8px 18px", borderRadius: 4, fontSize: 13, cursor: "pointer" }}>Sign In</button>
          <button onClick={() => navigate("/login")} style={{ background: V.dark, color: "#fff", border: "none", padding: "9px 20px", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Enrol Now</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "96px 48px 80px", textAlign: "center" }}>
        <div style={{ display: "inline-block", borderBottom: `1px solid ${V.gold}`, paddingBottom: 8, marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: V.gold }}>The Complete AI Mastery System</span>
        </div>
        <h1 style={{ ...T.display, fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1.08, color: V.dark, marginBottom: 28 }}>
          From Casual User<br />to Elite AI Operator
        </h1>
        <p style={{ fontSize: 19, color: V.muted, lineHeight: 1.75, maxWidth: 620, margin: "0 auto 48px" }}>
          A structured, professional system for business owners and operators who want to command AI at an advanced level and build measurable competitive advantage.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
          {[`${modules.length || 10} Modules`, `${totalLessons || 31} Lessons`, "CRAFT Framework", "Agentic AI", "Lifetime Access"].map(f => (
            <div key={f} style={{ padding: "7px 16px", background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 3, fontSize: 12, fontWeight: 500, color: V.muted }}>{f}</div>
          ))}
        </div>
        <button onClick={() => navigate("/login")} style={{ background: V.dark, color: "#fff", border: "none", padding: "17px 44px", borderRadius: 4, fontSize: 16, fontWeight: 600, cursor: "pointer", marginBottom: 14 }}>
          Begin the Programme
        </button>
        <div style={{ fontSize: 12, color: V.subtle }}>One-time enrolment. Immediate access. No subscription.</div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><div style={{ borderTop: `1px solid ${V.rule}` }} /></div>

      {/* OUTCOMES */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: V.gold, display: "block", marginBottom: 20 }}>What You Will Achieve</span>
            <h2 style={{ ...T.display, fontSize: 34, fontWeight: 700, lineHeight: 1.2, color: V.dark, marginBottom: 24 }}>A measurable transformation in how you work</h2>
            <p style={{ fontSize: 15, color: V.muted, lineHeight: 1.8 }}>
              Skillformed is not a collection of tips. It is a complete operating system built on a proven framework, designed to produce elite AI operators who generate real, compounding business results.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {outcomes.map((o, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: V.dark, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ fontSize: 14, color: V.mid, lineHeight: 1.65 }}>{o}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><div style={{ borderTop: `1px solid ${V.rule}` }} /></div>

      {/* CURRICULUM */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: V.gold, display: "block", marginBottom: 16 }}>The Curriculum</span>
          <h2 style={{ ...T.display, fontSize: 36, fontWeight: 700, color: V.dark }}>
            {modules.length || 10} modules. {totalLessons || 31} lessons. One complete system.
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {modules.map(m => (
            <div key={m.id} style={{ borderTop: `1px solid ${V.rule}`, padding: "24px 0", display: "flex", gap: 40, alignItems: "flex-start" }}>
              <div style={{ width: 40, flexShrink: 0, paddingTop: 2 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: V.subtle, letterSpacing: "0.08em" }}>{String(m.module_number).padStart(2, "0")}</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: V.dark, marginBottom: 6 }}>{m.title}</h3>
                <p style={{ fontSize: 13, color: V.muted, lineHeight: 1.65, marginBottom: 10 }}>{m.description}</p>
                <span style={{ fontSize: 12, color: V.subtle }}>{m.total_lessons} lessons &middot; {m.estimated_duration}</span>
              </div>
              {m.is_free_preview && (
                <div style={{ padding: "4px 10px", border: `1px solid ${V.gold}`, borderRadius: 3, fontSize: 11, color: V.gold, fontWeight: 600 }}>Preview</div>
              )}
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${V.rule}` }} />
        </div>
        <div style={{ textAlign: "center", marginTop: 52 }}>
          <button onClick={() => navigate("/login")} style={{ background: V.dark, color: "#fff", border: "none", padding: "15px 40px", borderRadius: 4, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            Access the Full Programme
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 48px" }}><div style={{ borderTop: `1px solid ${V.rule}` }} /></div>

      {/* FOR WHOM */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: V.gold, display: "block", marginBottom: 16 }}>Who This Is For</span>
          <h2 style={{ ...T.display, fontSize: 36, fontWeight: 700, color: V.dark }}>Built for operators. Not beginners looking for shortcuts.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {forWhom.map(({ title, desc }) => (
            <div key={title} style={{ padding: "32px", background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 4 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: V.dark, marginBottom: 12 }}>{title}</h3>
              <p style={{ fontSize: 14, color: V.muted, lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: V.dark, padding: "80px 48px", textAlign: "center" }}>
        <h2 style={{ ...T.display, fontSize: 40, fontWeight: 700, color: "#fff", marginBottom: 20 }}>Ready to operate at an elite level?</h2>
        <p style={{ fontSize: 16, color: "#888", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>One enrolment. Lifetime access. Everything you need to become an elite AI operator.</p>
        <button onClick={() => navigate("/login")} style={{ background: V.gold, color: "#fff", border: "none", padding: "18px 48px", borderRadius: 4, fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 16 }}>
          Enrol Now — $149
        </button>
        <div style={{ fontSize: 12, color: "#555" }}>30-day satisfaction guarantee. No subscription. Immediate access.</div>
      </div>

      {/* FOOTER */}
      <div style={{ background: V.surface, borderTop: `1px solid ${V.rule}`, padding: "32px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ ...T.display, fontSize: 14, color: V.muted }}>Skillformed: The AI Operator System</div>
        <div style={{ fontSize: 12, color: V.subtle }}>
          <a href="mailto:support@skillformed.com" style={{ color: V.muted, textDecoration: "none" }}>support@skillformed.com</a>
        </div>
      </div>
    </div>
  );
}
