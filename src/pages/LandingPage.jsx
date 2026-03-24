import { useState } from "react";

const V = {
  bg: "#04070F",
  surface: "#080D1A",
  card: "#0D1424",
  border: "#1A2540",
  cyan: "#00D4FF",
  white: "#FFFFFF",
  offWhite: "#E8EDF5",
  muted: "#6B7A9A",
  subtle: "#3A4560",
  text: "#C8D4E8",
};

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const outcomes = [
    { title: "Save 10+ hours weekly", desc: "Structured AI workflows eliminate repetitive work permanently." },
    { title: "First-draft precision", desc: "Prompts that produce publication-ready output on the first attempt." },
    { title: "Run a full AI operation", desc: "Design and deploy a multi-agent system from a single laptop." },
    { title: "30 days of content in 2 hours", desc: "Scripts, captions, and emails produced in your authentic voice." },
    { title: "AI-powered revenue systems", desc: "Sales copy, ad scripts, outreach sequences that convert." },
    { title: "Competitive intelligence", desc: "Market research and trend detection running on autopilot." },
  ];

  const modules = [
    { n: "01", t: "AI Foundations That Actually Work", d: "Why 95% use AI at 10% capacity — and the mental model shift that changes everything from Day 1." },
    { n: "02", t: "The CRAFT Prompting System", d: "The five-part framework behind every elite AI output. Works on GPT-4o, Claude, Gemini, and every model that follows." },
    { n: "03", t: "Agentic AI Workflows", d: "Build AI that runs autonomously, makes decisions, executes multi-step tasks, and reports back." },
    { n: "04", t: "Business Automation Engine", d: "Automate your five most time-consuming tasks this week. SOPs, reports, research, scheduling — fully delegated." },
    { n: "05", t: "Content Creation at Scale", d: "30 days of high-converting content in two hours. Produced in your authentic voice." },
    { n: "06", t: "AI for Revenue Generation", d: "Sales copy, ad scripts, outreach sequences. The exact prompts that convert cold audiences into paying customers." },
    { n: "07", t: "Advanced Research and Intelligence", d: "Competitive analysis, market research, and trend detection on continuous autopilot." },
    { n: "08", t: "Prompt Engineering Mastery", d: "Chain-of-thought reasoning, few-shot learning, role priming. The technical edge that separates advanced operators." },
    { n: "09", t: "AI Team Building", d: "Design and run a coordinated AI operation. Strategy, content, finance, legal — all covered." },
    { n: "10", t: "Your 90-Day AI Execution Plan", d: "Leave with a working system. A personalised roadmap that begins the moment you finish Module 1." },
  ];

  const testimonials = [
    { name: "James R.", role: "Marketing Consultant, Sydney", text: "I saved 12 hours in my first week. The CRAFT framework alone was worth 10 times the price. I use it every single day for client work." },
    { name: "Priya M.", role: "Startup Founder, Singapore", text: "I used to spend three hours writing proposals. Now it takes 20 minutes. Module 4 automated half my business admin overnight." },
    { name: "Daniel K.", role: "Content Creator, Brisbane", text: "30 days of content in one afternoon. I thought that was an exaggeration. It is not. Module 5 completely changed how I operate." },
    { name: "Sarah T.", role: "Executive Coach, Melbourne", text: "The agentic workflows in Module 3 are extraordinary. AI running research, drafting reports, and summarising meetings while I sleep." },
  ];

  const faqs = [
    { q: "I am not technical. Will I be able to follow this?", a: "Completely. Zero coding required. Zero jargon. If you can type, you can complete this programme. Most students say Module 1 alone changes how they work within the first hour." },
    { q: "How is this different from free YouTube content?", a: "YouTube gives scattered tactics. Skillformed gives you a complete structured system — the CRAFT framework, agentic workflows, and a 90-day execution plan. You are building a permanent AI operation, not collecting tips." },
    { q: "What makes this worth $149?", a: "One optimised AI workflow saves most professionals 5 to 8 hours per week. At $40 per hour that is $200 to $320 weekly recovered. Skillformed pays for itself within four days. Every week after that compounds." },
    { q: "Will this become outdated when AI updates?", a: "The CRAFT framework is model-agnostic. It works on GPT-4o, Claude, Gemini, and every model that follows. You are learning principles and systems, not button sequences for one specific tool." },
    { q: "How long does it take to complete?", a: "Most students complete the core programme in 6 to 8 hours over a weekend. Module 10 then provides your personalised 90-day execution plan so implementation continues long after." },
    { q: "Is there a money-back guarantee?", a: "Yes. 30 days, no questions asked, full refund. If you complete the programme and it does not measurably change how you work, contact us and we will refund you immediately." },
  ];

  return (
    <div style={{ background: V.bg, color: V.text, minHeight: "100vh", overflowX: "hidden", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .btn-primary:hover { background: #00B8E0 !important; transform: translateY(-1px); box-shadow: 0 0 40px rgba(0,212,255,0.35) !important; }
        .btn-ghost:hover { background: rgba(0,212,255,0.08) !important; border-color: rgba(0,212,255,0.4) !important; }
        .card:hover { border-color: rgba(0,212,255,0.25) !important; background: #0F1A2E !important; transform: translateY(-2px); }
        .faq-row:hover { border-color: rgba(0,212,255,0.2) !important; }
        * { transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s; }
      `}</style>

      {/* TICKER */}
      <div style={{ background: "#020509", borderBottom: `1px solid ${V.border}`, height: 38, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ animation: "ticker 35s linear infinite", whiteSpace: "nowrap", display: "flex" }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} style={{ fontSize: 10, fontWeight: 700, color: V.cyan, padding: "0 52px", letterSpacing: "0.14em", opacity: 0.7 }}>
              SKILLFORMED &nbsp;&#183;&nbsp; AI OPERATOR SYSTEM &nbsp;&#183;&nbsp; 10 MODULES &nbsp;&#183;&nbsp; 31 LESSONS &nbsp;&#183;&nbsp; CRAFT FRAMEWORK &nbsp;&#183;&nbsp; 30-DAY GUARANTEE &nbsp;&#183;&nbsp; LIFETIME ACCESS &nbsp;&#183;
            </span>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav style={{ background: "rgba(4,7,15,0.97)", backdropFilter: "blur(24px)", borderBottom: `1px solid ${V.border}`, padding: "0 56px", height: 68, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: V.cyan, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 13, height: 13, border: "2.5px solid #04070F", borderRadius: 2, transform: "rotate(45deg)" }} />
          </div>
          <span style={{ fontSize: 17, fontWeight: 700, color: V.white, letterSpacing: "-0.02em" }}>Skillformed</span>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: V.muted, letterSpacing: "0.01em" }}>30-day guarantee</span>
          <button className="btn-primary"
            onClick={() => document.getElementById("checkout").scrollIntoView({ behavior: "smooth" })}
            style={{ background: V.cyan, color: "#04070F", border: "none", padding: "9px 22px", borderRadius: 5, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "-0.01em" }}>
            Enrol Now — $149
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "104px 56px 88px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: "radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 68%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.18)", borderRadius: 20, padding: "6px 18px", marginBottom: 44 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: V.cyan, animation: "pulse 2.5s infinite" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: V.cyan, letterSpacing: "0.12em" }}>THE AI OPERATOR SYSTEM</span>
        </div>

        <h1 style={{ fontSize: "clamp(40px, 5.8vw, 70px)", fontWeight: 800, lineHeight: 1.05, color: V.white, marginBottom: 30, letterSpacing: "-0.035em" }}>
          Stop Using AI.<br />
          <span style={{ color: V.cyan }}>Start Operating It.</span>
        </h1>

        <p style={{ fontSize: 19, color: V.muted, lineHeight: 1.8, maxWidth: 580, margin: "0 auto 20px", fontWeight: 400 }}>
          The complete system for business owners and professionals who want to deploy AI as a competitive weapon — not a glorified search engine.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 56, fontSize: 13, color: V.subtle }}>
          <span>2,400+ enrolled</span>
          <span>30-day guarantee</span>
          <span>Lifetime access</span>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <button className="btn-primary"
            onClick={() => document.getElementById("checkout").scrollIntoView({ behavior: "smooth" })}
            style={{ background: V.cyan, color: "#04070F", border: "none", padding: "17px 52px", borderRadius: 7, fontSize: 16, fontWeight: 800, cursor: "pointer", letterSpacing: "-0.02em", boxShadow: "0 0 32px rgba(0,212,255,0.2)" }}>
            Begin the System — $149
          </button>
          <button className="btn-ghost"
            onClick={() => document.getElementById("modules").scrollIntoView({ behavior: "smooth" })}
            style={{ background: "transparent", color: V.offWhite, border: `1px solid ${V.border}`, padding: "17px 36px", borderRadius: 7, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            See What Is Inside
          </button>
        </div>
        <p style={{ fontSize: 12, color: V.subtle, marginTop: 14, letterSpacing: "0.01em" }}>One-time payment. Immediate access. Lifetime updates.</p>
      </div>

      {/* STATS */}
      <div style={{ borderTop: `1px solid ${V.border}`, borderBottom: `1px solid ${V.border}`, background: V.surface }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 56px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, textAlign: "center" }}>
          {[
            { n: "10+", l: "Hours saved weekly" },
            { n: "10", l: "Production modules" },
            { n: "31", l: "Structured lessons" },
            { n: "30", l: "Day money-back guarantee" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 38, fontWeight: 800, color: V.white, letterSpacing: "-0.04em", marginBottom: 6 }}>{s.n}</div>
              <div style={{ fontSize: 12, color: V.muted, fontWeight: 500, letterSpacing: "0.02em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* OUTCOMES */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "96px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: V.cyan, textTransform: "uppercase", display: "block", marginBottom: 18 }}>What You Will Achieve</span>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: V.white, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            A measurable shift in how<br />your business operates
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {outcomes.map((o, i) => (
            <div key={i} className="card" style={{ background: V.card, border: `1px solid ${V.border}`, borderRadius: 10, padding: "28px 26px", cursor: "default" }}>
              <div style={{ width: 32, height: 2, background: V.cyan, marginBottom: 20, opacity: 0.6 }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: V.white, marginBottom: 10 }}>{o.title}</div>
              <div style={{ fontSize: 13, color: V.muted, lineHeight: 1.7 }}>{o.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MODULES */}
      <div id="modules" style={{ background: V.surface, borderTop: `1px solid ${V.border}`, borderBottom: `1px solid ${V.border}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "96px 56px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: V.cyan, textTransform: "uppercase", display: "block", marginBottom: 18 }}>The System</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: V.white, letterSpacing: "-0.03em" }}>
              10 modules. One complete operation.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {modules.map((m, i) => (
              <div key={i} className="card" style={{ background: V.card, border: `1px solid ${V.border}`, borderRadius: 9, padding: "22px 26px", display: "flex", gap: 20, cursor: "default" }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: V.cyan, letterSpacing: "0.1em", minWidth: 26, paddingTop: 4, opacity: 0.5 }}>{m.n}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: V.white, marginBottom: 6 }}>{m.t}</div>
                  <div style={{ fontSize: 13, color: V.muted, lineHeight: 1.65 }}>{m.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "96px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: V.cyan, textTransform: "uppercase", display: "block", marginBottom: 18 }}>Results</span>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: V.white, letterSpacing: "-0.03em" }}>
            Operators already running the system
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card" style={{ background: V.card, border: `1px solid ${V.border}`, borderRadius: 10, padding: "32px" }}>
              <div style={{ width: 24, height: 2, background: V.cyan, marginBottom: 20, opacity: 0.4 }} />
              <p style={{ fontSize: 15, color: V.offWhite, lineHeight: 1.8, marginBottom: 24 }}>{t.text}</p>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: V.white }}>{t.name}</div>
                <div style={{ fontSize: 12, color: V.muted, marginTop: 2 }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHECKOUT */}
      <div id="checkout" style={{ background: V.surface, borderTop: `1px solid ${V.border}`, borderBottom: `1px solid ${V.border}` }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "96px 56px", textAlign: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: V.cyan, textTransform: "uppercase", display: "block", marginBottom: 20 }}>Enrol Today</span>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: V.white, letterSpacing: "-0.03em", marginBottom: 16, lineHeight: 1.15 }}>
            One system. One payment.<br />Everything changes.
          </h2>
          <p style={{ fontSize: 15, color: V.muted, marginBottom: 52, lineHeight: 1.75 }}>
            Join 2,400+ operators who built a permanent AI advantage over their competitors.
          </p>

          <div style={{ background: V.card, border: "1px solid rgba(0,212,255,0.18)", borderRadius: 14, padding: "48px 44px", boxShadow: "0 0 80px rgba(0,212,255,0.04)" }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: V.white, letterSpacing: "-0.05em", marginBottom: 4 }}>$149</div>
            <div style={{ fontSize: 13, color: V.muted, marginBottom: 40, letterSpacing: "0.01em" }}>One-time payment. No subscriptions. Lifetime access.</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40, textAlign: "left" }}>
              {[
                "10 production-ready modules",
                "31 structured lessons",
                "The CRAFT Prompting Framework",
                "Agentic AI workflow systems",
                "90-day execution roadmap",
                "Lifetime updates included",
                "30-day money-back guarantee",
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: V.cyan }} />
                  </div>
                  <span style={{ fontSize: 14, color: V.offWhite }}>{f}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary"
              onClick={() => window.open("https://skillformed.com/CourseLogin", "_blank")}
              style={{ width: "100%", background: V.cyan, color: "#04070F", border: "none", padding: "17px", borderRadius: 7, fontSize: 16, fontWeight: 800, cursor: "pointer", letterSpacing: "-0.02em", boxShadow: "0 0 32px rgba(0,212,255,0.2)" }}>
              Begin the System — $149
            </button>
            <p style={{ fontSize: 11, color: V.subtle, marginTop: 12, letterSpacing: "0.01em" }}>Immediate access. Secure checkout. 30-day guarantee.</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "96px 56px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: V.cyan, textTransform: "uppercase", display: "block", marginBottom: 18 }}>Questions</span>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 800, color: V.white, letterSpacing: "-0.03em" }}>Everything you need to know</h2>
        </div>
        {faqs.map((f, i) => (
          <div key={i} className="faq-row"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            style={{ border: `1px solid ${openFaq === i ? "rgba(0,212,255,0.22)" : V.border}`, borderRadius: 9, marginBottom: 10, overflow: "hidden", cursor: "pointer", background: openFaq === i ? V.card : "transparent" }}>
            <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: V.white, lineHeight: 1.45 }}>{f.q}</span>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1px solid ${V.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: V.cyan, fontSize: 16, fontWeight: 300 }}>
                {openFaq === i ? "−" : "+"}
              </div>
            </div>
            {openFaq === i && (
              <div style={{ padding: "0 24px 22px", fontSize: 14, color: V.muted, lineHeight: 1.8 }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${V.border}`, background: V.surface }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "44px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 26, height: 26, background: V.cyan, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 11, height: 11, border: "2px solid #04070F", borderRadius: 2, transform: "rotate(45deg)" }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: V.white, letterSpacing: "-0.01em" }}>Skillformed</span>
          </div>
          <div style={{ fontSize: 12, color: V.subtle }}>The AI Operator System for business owners and professionals.</div>
          <div style={{ fontSize: 12, color: V.subtle }}>2026 Skillformed. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
}
