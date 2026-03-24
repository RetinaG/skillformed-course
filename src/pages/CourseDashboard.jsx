import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const V = {
  bg: "#f8f7f4", surface: "#ffffff", sidebar: "#faf9f6", dark: "#0d0d0d",
  mid: "#1a1a1a", muted: "#6b6b6b", subtle: "#b0b0b0", rule: "#e8e6e1",
  gold: "#a07840", text: "#1a1a1a", light: "#f2f0ec", green: "#1a5c35", greenBg: "#f0faf5",
};

function renderMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/^# (.+)$/gm, `<h1 style="font-family:'Georgia',serif;font-size:30px;font-weight:700;color:#0d0d0d;margin:0 0 28px;letter-spacing:-0.02em;line-height:1.15">$1</h1>`)
    .replace(/^## (.+)$/gm, `<h2 style="font-family:'Georgia',serif;font-size:24px;font-weight:700;color:#0d0d0d;margin:28px 0 10px;letter-spacing:-0.02em;line-height:1.2">$1</h2>`)
    .replace(/^### (.+)$/gm, `<h3 style="font-family:'Georgia',serif;font-size:19px;font-weight:700;color:#0d0d0d;margin:20px 0 8px;letter-spacing:-0.01em;line-height:1.3">$1</h3>`)
    .replace(/^#### (.+)$/gm, `<h4 style="font-size:11px;font-weight:700;color:#6b6b6b;margin:28px 0 10px;text-transform:uppercase;letter-spacing:0.12em">$1</h4>`)
    .replace(/\*\*(.+?)\*\*/g, `<strong style="color:#0d0d0d;font-weight:600">$1</strong>`)
    .replace(/`(.+?)`/g, `<code style="background:#f2f0ec;padding:2px 7px;border-radius:2px;font-family:'JetBrains Mono',Menlo,monospace;color:#4a3000;font-size:12.5px">$1</code>`)
    .replace(/^> (.+)$/gm, `<blockquote style="border-left:2px solid #a07840;padding:14px 20px;color:#5a5a5a;margin:24px 0;background:#faf9f6;font-style:normal;font-size:14px;line-height:1.7">$1</blockquote>`)
    .replace(/^---$/gm, `<hr style="border:none;border-top:1px solid #e8e6e1;margin:32px 0"/>`)
    .replace(/^\d+\. (.+)$/gm, `<div style="display:flex;gap:16px;margin:3px 0"><span style="color:#b0b0b0;font-size:13px;min-width:18px;padding-top:2px;font-family:Georgia,serif">—</span><span style="font-size:15px;line-height:1.6;color:#2a2a2a">$1</span></div>`)
    .replace(/^- (.+)$/gm, `<div style="display:flex;gap:14px;margin:3px 0"><span style="width:4px;height:4px;background:#a07840;border-radius:50%;flex-shrink:0;margin-top:9px"></span><span style="font-size:15px;line-height:1.6;color:#2a2a2a">$1</span></div>`)
    .replace(/\n\n/g, `<div style="height:18px"></div>`)
    .replace(/\n/g, `<br/>`);
}

export default function CourseDashboard() {
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completing, setCompleting] = useState(false);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  const studentEmail = localStorage.getItem("student_email") || "";
  const studentName = localStorage.getItem("student_name") || "";
  const hasPurchased = localStorage.getItem("pmp_purchased") === "true";

  useEffect(() => { loadAll(); }, []);

  async function loadAll() {
    try {
      const res = await fetch("https://big-t-app-ebcf4ddc.base44.app/functions/getCourseData", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}),
      });
      const data = await res.json();
      const sortedMods = (data.modules || []).sort((a, b) => a.module_number - b.module_number);
      const lsns = data.lessons || [];

      // Load progress from localStorage
      let prog = [];
      try {
        const key = `progress_${studentEmail}`;
        prog = JSON.parse(localStorage.getItem(key) || "[]");
      } catch (_) {}

      setModules(sortedMods);
      setLessons(lsns);
      setProgress(prog);

      if (sortedMods.length > 0) {
        const firstMod = sortedMods[0];
        setExpandedModules({ [firstMod.id]: true });
        const firstLessons = lsns.filter(l => l.module_id === firstMod.id).sort((a, b) => a.lesson_number - b.lesson_number);
        if (firstLessons.length > 0) setActiveLesson(firstLessons[0]);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  function isCompleted(lessonId) {
    return progress.some(p => p.lesson_id === lessonId && p.completed);
  }

  function getModuleProgress(moduleId) {
    const moduleLessons = lessons.filter(l => l.module_id === moduleId);
    const completed = moduleLessons.filter(l => isCompleted(l.id)).length;
    return { completed, total: moduleLessons.length };
  }

  function toggleModule(moduleId) {
    setExpandedModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  }

  function selectLesson(lesson) {
    if (!hasPurchased && lesson.requires_purchase) {
      navigate("/login");
      return;
    }
    setActiveLesson(lesson);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }

  async function markComplete(lesson) {
    if (!lesson || isCompleted(lesson.id)) return;
    setCompleting(true);
    try {
      const key = `progress_${studentEmail}`;
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      const newRecord = {
        id: lesson.id + "_done", lesson_id: lesson.id, module_id: lesson.module_id,
        completed: true, completed_at: new Date().toISOString(), student_email: studentEmail,
      };
      existing.push(newRecord);
      localStorage.setItem(key, JSON.stringify(existing));
      setProgress(existing);
    } catch (e) { console.error(e); }
    setCompleting(false);
  }

  const totalCompleted = progress.filter(p => p.completed).length;
  const totalLessons = lessons.length;
  const overallPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div style={{ background: V.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ color: V.muted, fontSize: 14 }}>Loading your course...</div>
      </div>
    );
  }

  if (!hasPurchased) {
    return (
      <div style={{ background: V.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 24, color: V.dark, marginBottom: 16 }}>Access Required</h2>
          <p style={{ color: V.muted, marginBottom: 32, lineHeight: 1.6 }}>Please sign in with your enrolled email to access the course.</p>
          <button onClick={() => navigate("/login")} style={{ background: V.dark, color: "#fff", border: "none", padding: "12px 32px", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: V.bg, minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: V.text, display: "flex", flexDirection: "column" }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #e0ddd8; border-radius: 2px; }`}</style>

      {/* TOP NAV */}
      <nav style={{ background: V.surface, borderBottom: `1px solid ${V.rule}`, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: V.muted, fontSize: 18 }}>
            {sidebarOpen ? "←" : "→"}
          </button>
          <div style={{ fontFamily: "'Georgia', serif", fontSize: 15, fontWeight: 700, color: V.dark }}>Skillformed: The AI Operator System</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 12, color: V.muted }}>{overallPct}% complete</div>
          <div style={{ width: 80, height: 4, background: V.rule, borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${overallPct}%`, height: "100%", background: V.gold, borderRadius: 2, transition: "width 0.3s" }} />
          </div>
          <div style={{ fontSize: 12, color: V.muted }}>{studentName || studentEmail}</div>
          <button onClick={() => { localStorage.clear(); navigate("/login"); }}
            style={{ background: "none", border: `1px solid ${V.rule}`, color: V.muted, padding: "5px 12px", borderRadius: 3, fontSize: 12, cursor: "pointer" }}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", height: "calc(100vh - 56px)" }}>

        {/* SIDEBAR */}
        {sidebarOpen && (
          <div style={{ width: 300, background: V.sidebar, borderRight: `1px solid ${V.rule}`, overflowY: "auto", flexShrink: 0 }}>
            <div style={{ padding: "20px 20px 12px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: V.subtle, letterSpacing: "0.1em", textTransform: "uppercase" }}>Course Curriculum</div>
            </div>
            {modules.map(mod => {
              const { completed, total } = getModuleProgress(mod.id);
              const expanded = expandedModules[mod.id];
              const modLessons = lessons.filter(l => l.module_id === mod.id).sort((a, b) => a.lesson_number - b.lesson_number);
              return (
                <div key={mod.id}>
                  <div onClick={() => toggleModule(mod.id)}
                    style={{ padding: "14px 20px", cursor: "pointer", borderBottom: `1px solid ${V.rule}`, background: expanded ? V.light : "transparent" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: V.subtle, letterSpacing: "0.08em" }}>
                        {String(mod.module_number).padStart(2, "0")}
                      </div>
                      <div style={{ fontSize: 11, color: completed === total && total > 0 ? V.green : V.subtle }}>
                        {completed}/{total}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: V.dark, lineHeight: 1.4 }}>{mod.title}</div>
                  </div>
                  {expanded && modLessons.map(lesson => {
                    const done = isCompleted(lesson.id);
                    const active = activeLesson?.id === lesson.id;
                    return (
                      <div key={lesson.id} onClick={() => selectLesson(lesson)}
                        style={{ padding: "11px 20px 11px 32px", cursor: "pointer", background: active ? "#f0ece4" : "transparent", borderBottom: `1px solid ${V.rule}`, borderLeft: active ? `2px solid ${V.gold}` : "2px solid transparent", display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", border: `1.5px solid ${done ? V.green : V.rule}`, background: done ? V.green : "transparent", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {done && <svg width="7" height="5" viewBox="0 0 7 5" fill="none"><path d="M1 2.5L2.8 4.3L6.3 1" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, color: active ? V.dark : V.mid, lineHeight: 1.4, fontWeight: active ? 600 : 400 }}>{lesson.title}</div>
                          {lesson.duration_minutes && <div style={{ fontSize: 11, color: V.subtle, marginTop: 2 }}>{lesson.duration_minutes} min</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* MAIN CONTENT */}
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", background: V.bg }}>
          {activeLesson ? (
            <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 48px" }}>
              {/* Breadcrumb */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 40 }}>
                <span style={{ fontSize: 12, color: V.subtle }}>
                  {modules.find(m => m.id === activeLesson.module_id)?.title}
                </span>
                <span style={{ fontSize: 12, color: V.subtle }}>—</span>
                <span style={{ fontSize: 12, color: V.muted }}>Lesson {activeLesson.lesson_number}</span>
              </div>

              {/* Content */}
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(activeLesson.content) }} style={{ lineHeight: 1.75 }} />

              {/* Resources */}
              {activeLesson.resources && (
                <div style={{ marginTop: 48, padding: "24px", background: V.surface, border: `1px solid ${V.rule}`, borderRadius: 4 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: V.subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Resources</div>
                  <div style={{ fontSize: 14, color: V.muted, lineHeight: 1.7 }}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(activeLesson.resources) }} />
                </div>
              )}

              {/* Complete button */}
              <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${V.rule}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {isCompleted(activeLesson.id) ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, color: V.green, fontSize: 14, fontWeight: 600 }}>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M1 6L5.5 10.5L15 1" stroke={V.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Lesson Complete
                  </div>
                ) : (
                  <button onClick={() => markComplete(activeLesson)} disabled={completing}
                    style={{ background: V.dark, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: completing ? "wait" : "pointer" }}>
                    {completing ? "Saving..." : "Mark as Complete"}
                  </button>
                )}
                <div style={{ display: "flex", gap: 12 }}>
                  {(() => {
                    const allLessons = lessons.sort((a, b) => {
                      const modA = modules.find(m => m.id === a.module_id)?.module_number || 0;
                      const modB = modules.find(m => m.id === b.module_id)?.module_number || 0;
                      return modA !== modB ? modA - modB : a.lesson_number - b.lesson_number;
                    });
                    const idx = allLessons.findIndex(l => l.id === activeLesson.id);
                    return (
                      <>
                        {idx > 0 && (
                          <button onClick={() => selectLesson(allLessons[idx - 1])}
                            style={{ background: "none", border: `1px solid ${V.rule}`, color: V.muted, padding: "10px 20px", borderRadius: 4, fontSize: 13, cursor: "pointer" }}>
                            Previous
                          </button>
                        )}
                        {idx < allLessons.length - 1 && (
                          <button onClick={() => selectLesson(allLessons[idx + 1])}
                            style={{ background: V.dark, color: "#fff", border: "none", padding: "10px 20px", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                            Next Lesson
                          </button>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: V.muted, fontSize: 14 }}>
              Select a lesson to begin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
