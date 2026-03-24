import { useState, useEffect } from "react";
// Standalone course app — uses Big T backend functions directly
const BIG_T_BASE = "https://big-t-app-ebcf4ddc.base44.app/functions";


const V = {
  bg:"#04070F", s1:"#080D1A", s2:"#0D1424", s3:"#111827",
  border:"#1A2540", cyan:"#00D4FF", green:"#10b981", amber:"#f59e0b",
  white:"#FFFFFF", text:"#C8D4E8", muted:"#6B7A9A", subtle:"#2A3550",
};

const CSS = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',-apple-system,sans-serif;background:#04070F;color:#C8D4E8}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#1A2540;border-radius:2px}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .fade{animation:fadeIn .2s ease}
  .mod-item:hover{background:#0D1424!important;border-color:rgba(0,212,255,0.2)!important}
  .lesson-item:hover{background:#111827!important}
  .lesson-item.active{background:#0D1424!important;border-left:2px solid #00D4FF!important}
  .prose{font-size:15px;line-height:1.85;color:#C8D4E8}
  .prose h1{font-size:22px;font-weight:800;color:#FFFFFF;margin:24px 0 10px;line-height:1.25;letter-spacing:-0.02em;border-bottom:1px solid #1A2540;padding-bottom:8px}
  .prose h2{font-size:17px;font-weight:700;color:#FFFFFF;margin:20px 0 8px;line-height:1.3;letter-spacing:-0.01em}
  .prose h3{font-size:14px;font-weight:700;color:#00D4FF;margin:16px 0 6px;line-height:1.3;text-transform:uppercase;letter-spacing:0.06em}
  .prose p{color:#C8D4E8;line-height:1.75;margin-bottom:10px;font-size:15px}
  .prose ul{padding-left:0;margin:8px 0 12px;list-style:none}
  .prose ol{padding-left:20px;margin:8px 0 12px}
  .prose li{color:#C8D4E8;line-height:1.6;margin-bottom:4px;font-size:15px;padding-left:16px;position:relative}
  .prose ul li::before{content:"";position:absolute;left:0;top:11px;width:5px;height:5px;border-radius:50%;background:#00D4FF;opacity:0.7}
  .prose ol li{padding-left:0}
  .prose strong{color:#FFFFFF;font-weight:700}
  .prose em{color:#C8D4E8;font-style:italic}
  .prose hr{border:none;border-top:1px solid #1A2540;margin:20px 0}
  .prose code{background:#0D1424;border:1px solid #1A2540;border-radius:4px;padding:2px 8px;font-size:13px;color:#00D4FF;font-family:monospace}
  .prose blockquote{border-left:3px solid #00D4FF;margin:12px 0;padding:10px 16px;background:rgba(0,212,255,0.04);border-radius:0 8px 8px 0;color:#C8D4E8;font-size:14px}
`;



const formatContent = (text) => {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '';
  let inList = false;
  let listType = '';

  const closeList = () => {
    if (inList) {
      html += inList === 'ul' ? '</ul>' : '</ol>';
      inList = false;
      listType = '';
    }
  };

  const inline = (t) => t
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');

  lines.forEach(line => {
    if (/^# (.+)$/.test(line)) {
      closeList();
      html += `<h1>${inline(line.slice(2))}</h1>`;
    } else if (/^## (.+)$/.test(line)) {
      closeList();
      html += `<h2>${inline(line.slice(3))}</h2>`;
    } else if (/^### (.+)$/.test(line)) {
      closeList();
      html += `<h3>${inline(line.slice(4))}</h3>`;
    } else if (/^> (.+)$/.test(line)) {
      closeList();
      html += `<blockquote>${inline(line.slice(2))}</blockquote>`;
    } else if (/^---$/.test(line.trim())) {
      closeList();
      html += '<hr/>';
    } else if (/^[\*\-—] (.+)$/.test(line) || /^—(.+)$/.test(line)) {
      if (inList !== 'ul') { closeList(); html += '<ul>'; inList = 'ul'; }
      html += `<li>${inline(line.replace(/^[\*\-] /, '').replace(/^—\s*/, ''))}</li>`;
    } else if (/^\d+\. (.+)$/.test(line)) {
      if (inList !== 'ol') { closeList(); html += '<ol>'; inList = 'ol'; }
      html += `<li>${inline(line.replace(/^\d+\. /, ''))}</li>`;
    } else if (line.trim() === '') {
      closeList();
    } else {
      closeList();
      html += `<p>${inline(line)}</p>`;
    }
  });
  closeList();
  return html;
};

export default function CourseViewer() {
  const [modules, setModules] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Standalone app — fetch from Big T backend
        const BIG_T = "https://big-t-app-ebcf4ddc.base44.app/functions";
        const [modsRes, lessRes] = await Promise.all([
          fetch(`${BIG_T}/getCourseData`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "modules" })
          }),
          fetch(`${BIG_T}/getCourseData`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "lessons" })
          })
        ]);
        const modsData = await modsRes.json();
        const lessData = await lessRes.json();
        const mods = modsData.data || modsData || [];
        const less = lessData.data || lessData || [];

        const sortedMods = (mods || []).sort((a,b) => (a.module_number||0) - (b.module_number||0));
        const sortedLess = (less || []).sort((a,b) => (a.lesson_number||0) - (b.lesson_number||0));

        setModules(sortedMods);
        setLessons(sortedLess);

        if (sortedMods.length > 0) {
          setSelectedModule(sortedMods[0]);
          const firstLesson = sortedLess.find(l => l.module_id === sortedMods[0].id);
          if (firstLesson) setSelectedLesson(firstLesson);
        }
      } catch(e) {
        console.error("Load error:", e);
        setError(e.message);
      }
      setLoading(false);
    };
    load();
  }, []);

  const moduleLessons = (moduleId) =>
    lessons.filter(l => l.module_id === moduleId).sort((a,b) => (a.lesson_number||0) - (b.lesson_number||0));

  const totalDuration = lessons.reduce((a,b) => a + (b.duration_minutes || 0), 0);

  const selectLesson = (lesson, mod) => {
    setSelectedLesson(lesson);
    if (mod) setSelectedModule(mod);
  };

  if (loading) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:V.bg,flexDirection:"column",gap:16}}>
      <div style={{width:32,height:32,border:`2px solid ${V.border}`,borderTop:`2px solid ${V.cyan}`,borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
      <div style={{fontSize:12,color:V.muted}}>Loading course content...</div>
    </div>
  );

  if (error) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:V.bg,flexDirection:"column",gap:12}}>
      <div style={{fontSize:14,color:V.danger}}>Error loading course data</div>
      <div style={{fontSize:11,color:V.muted}}>{error}</div>
    </div>
  );

  return (
    <div style={{display:"flex",height:"100vh",background:V.bg,fontFamily:"'Inter',-apple-system,sans-serif",overflow:"hidden"}}>
      <style>{CSS}</style>

      {/* SIDEBAR */}
      <div style={{
        width: sidebarOpen ? 300 : 0,
        flexShrink:0, background:V.s1,
        borderRight:`1px solid ${V.border}`,
        display:"flex", flexDirection:"column",
        overflow:"hidden", transition:"width 0.2s ease"
      }}>
        {/* Header */}
        <div style={{padding:"20px 20px 16px",borderBottom:`1px solid ${V.border}`,flexShrink:0}}>
          <div style={{fontSize:11,color:V.cyan,fontWeight:700,letterSpacing:"0.1em",marginBottom:6}}>SKILLFORMED</div>
          <div style={{fontSize:15,fontWeight:800,color:V.white,lineHeight:1.3}}>The AI Operator System</div>
          <div style={{display:"flex",gap:16,marginTop:10}}>
            <div style={{fontSize:11,color:V.muted}}>{modules.length} modules</div>
            <div style={{fontSize:11,color:V.muted}}>{lessons.length} lessons</div>
            <div style={{fontSize:11,color:V.muted}}>{Math.round(totalDuration/60)}h total</div>
          </div>
        </div>

        {/* Module + Lesson List */}
        <div style={{flex:1,overflowY:"auto",padding:"12px 0"}}>
          {modules.map((mod) => {
            const modLessons = moduleLessons(mod.id);
            const isActiveModule = selectedModule?.id === mod.id;
            return (
              <div key={mod.id} style={{marginBottom:2}}>
                {/* Module Row */}
                <div
                  className="mod-item"
                  onClick={() => {
                    if (isActiveModule) {
                      setSelectedLesson(null);
                    } else {
                      setSelectedModule(mod);
                      setSelectedLesson(null);
                    }
                  }}
                  style={{
                    padding:"12px 16px", cursor:"pointer",
                    background: isActiveModule ? "#0D1424" : "transparent",
                    borderLeft: `2px solid ${isActiveModule ? V.cyan : "transparent"}`,
                    margin:"0 8px 2px", borderRadius:6,
                    border:`1px solid ${isActiveModule ? "rgba(0,212,255,0.15)" : "transparent"}`,
                  }}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{
                      width:22,height:22,borderRadius:5,
                      background: isActiveModule ? "rgba(0,212,255,0.15)" : V.s2,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontSize:10,fontWeight:800,
                      color: isActiveModule ? V.cyan : V.muted,
                      flexShrink:0,
                    }}>
                      {String(Math.floor(mod.module_number||0)).padStart(2,"0")}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:12,fontWeight:600,color:isActiveModule?V.white:V.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {mod.title}
                      </div>
                      <div style={{fontSize:10,color:V.muted,marginTop:2}}>
                        {modLessons.length} lessons · {mod.estimated_duration}
                      </div>
                    </div>
                    {mod.is_free_preview && (
                      <div style={{fontSize:9,color:V.cyan,fontWeight:700,background:"rgba(0,212,255,0.1)",borderRadius:3,padding:"1px 5px",flexShrink:0}}>FREE</div>
                    )}
                  </div>
                </div>

                {/* Lesson Rows */}
                {isActiveModule && modLessons.map((lesson, li) => {
                  const isActive = selectedLesson?.id === lesson.id;
                  return (
                    <div
                      key={lesson.id}
                      className={`lesson-item${isActive ? " active" : ""}`}
                      onClick={() => selectLesson(lesson, mod)}
                      style={{
                        padding:"9px 16px 9px 50px", cursor:"pointer",
                        background: isActive ? V.s2 : "transparent",
                        borderLeft: `2px solid ${isActive ? V.cyan : "transparent"}`,
                        marginLeft:8, borderRadius:"0 6px 6px 0",
                      }}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <div style={{
                          width:18,height:18,borderRadius:"50%",flexShrink:0,
                          background: isActive ? "rgba(0,212,255,0.2)" : V.s2,
                          border: `1px solid ${isActive ? V.cyan : V.border}`,
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:9,fontWeight:700,
                          color: isActive ? V.cyan : V.muted,
                        }}>{li+1}</div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontSize:12,color:isActive?V.white:V.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                            {lesson.title}
                          </div>
                          <div style={{fontSize:10,color:V.muted,marginTop:1}}>{lesson.duration_minutes}m</div>
                        </div>
                        {lesson.is_free_preview && (
                          <div style={{fontSize:9,color:V.green,fontWeight:700,flexShrink:0}}>FREE</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

        {/* Top Bar */}
        <div style={{height:52,background:V.s1,borderBottom:`1px solid ${V.border}`,display:"flex",alignItems:"center",padding:"0 20px",gap:14,flexShrink:0}}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{background:"transparent",border:"none",color:V.muted,cursor:"pointer",fontSize:18,padding:4,lineHeight:1}}>
            {sidebarOpen ? "«" : "»"}
          </button>
          <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}>
            {selectedModule && (
              <>
                <span style={{fontSize:11,color:V.muted}}>Module {Math.floor(selectedModule.module_number||0)}</span>
                <span style={{color:V.subtle}}>·</span>
                <span style={{fontSize:12,color:V.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selectedModule.title}</span>
              </>
            )}
            {selectedLesson && (
              <>
                <span style={{color:V.subtle}}>·</span>
                <span style={{fontSize:12,color:V.white,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selectedLesson.title}</span>
              </>
            )}
          </div>
          <a href="/CommandCenter" style={{fontSize:11,color:V.muted,background:V.s2,border:`1px solid ${V.border}`,borderRadius:5,padding:"5px 12px",whiteSpace:"nowrap",textDecoration:"none"}}>
            Command Center
          </a>
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"40px 60px"}}>

          {/* LESSON VIEW */}
          {selectedLesson ? (
            <div className="fade" style={{maxWidth:760,margin:"0 auto"}}>
              <div style={{marginBottom:32}}>
                <div style={{fontSize:11,color:V.cyan,fontWeight:700,letterSpacing:"0.1em",marginBottom:8}}>
                  MODULE {Math.floor(selectedModule?.module_number||0)} — LESSON {selectedLesson.lesson_number}
                </div>
                <h1 style={{fontSize:28,fontWeight:800,color:V.white,lineHeight:1.2,marginBottom:12,letterSpacing:"-0.03em"}}>
                  {selectedLesson.title}
                </h1>
                <div style={{display:"flex",gap:16,alignItems:"center"}}>
                  <span style={{fontSize:12,color:V.muted}}>{selectedLesson.duration_minutes} min read</span>
                  {selectedLesson.is_free_preview && (
                    <span style={{fontSize:11,color:V.cyan,fontWeight:700,background:"rgba(0,212,255,0.1)",borderRadius:4,padding:"2px 8px"}}>FREE PREVIEW</span>
                  )}
                </div>
                <div style={{height:1,background:V.border,marginTop:24}}/>
              </div>

              <div
                className="prose"
                dangerouslySetInnerHTML={{__html: formatContent(selectedLesson.content)}}
                style={{lineHeight:1.8}}
              />

              {/* Resources */}
              {selectedLesson.resources && selectedLesson.resources.length > 0 && (
                <div style={{marginTop:40,padding:20,background:V.s2,border:`1px solid ${V.border}`,borderRadius:10}}>
                  <div style={{fontSize:11,fontWeight:700,color:V.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:12}}>Resources</div>
                  {selectedLesson.resources.map((r,i) => (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<selectedLesson.resources.length-1?`1px solid ${V.border}`:"none"}}>
                      <div style={{width:6,height:6,borderRadius:"50%",background:V.cyan,flexShrink:0}}/>
                      <div style={{fontSize:13,color:V.text}}>{r}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Next Lesson */}
              {(() => {
                const ml = moduleLessons(selectedModule?.id);
                const ci = ml.findIndex(l => l.id === selectedLesson.id);
                const nextLesson = ml[ci + 1];
                const cmi = modules.findIndex(m => m.id === selectedModule?.id);
                const nextMod = modules[cmi + 1];
                const firstOfNext = nextMod ? moduleLessons(nextMod.id)[0] : null;
                const next = nextLesson || firstOfNext;
                const nextMod2 = nextLesson ? selectedModule : nextMod;

                if (!next) return (
                  <div style={{marginTop:40,padding:24,background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:10,textAlign:"center"}}>
                    <div style={{fontSize:15,fontWeight:700,color:V.green,marginBottom:6}}>System Complete</div>
                    <div style={{fontSize:13,color:V.muted}}>You have completed Skillformed: The AI Operator System.</div>
                  </div>
                );

                return (
                  <div
                    onClick={() => selectLesson(next, nextMod2)}
                    style={{marginTop:40,padding:18,background:V.s2,border:`1px solid ${V.border}`,borderRadius:10,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                    <div>
                      <div style={{fontSize:10,color:V.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Next Lesson</div>
                      <div style={{fontSize:14,fontWeight:600,color:V.white}}>{next.title}</div>
                      <div style={{fontSize:11,color:V.muted,marginTop:2}}>{next.duration_minutes} min</div>
                    </div>
                    <div style={{fontSize:24,color:V.cyan}}>›</div>
                  </div>
                );
              })()}
            </div>

          /* MODULE OVERVIEW */
          ) : selectedModule ? (
            <div className="fade" style={{maxWidth:760,margin:"0 auto"}}>
              <div style={{fontSize:11,color:V.cyan,fontWeight:700,letterSpacing:"0.1em",marginBottom:8}}>
                MODULE {Math.floor(selectedModule.module_number||0)}
              </div>
              <h1 style={{fontSize:28,fontWeight:800,color:V.white,lineHeight:1.2,marginBottom:16,letterSpacing:"-0.03em"}}>
                {selectedModule.title}
              </h1>
              <div style={{fontSize:14,color:V.text,lineHeight:1.8,marginBottom:32}}>{selectedModule.description}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:32}}>
                {[
                  {l:"Lessons",v:moduleLessons(selectedModule.id).length},
                  {l:"Duration",v:selectedModule.estimated_duration},
                  {l:"Status",v:(selectedModule.status||"published").toUpperCase()},
                ].map(({l,v})=>(
                  <div key={l} style={{background:V.s2,borderRadius:8,padding:"14px 16px"}}>
                    <div style={{fontSize:10,color:V.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>{l}</div>
                    <div style={{fontSize:16,fontWeight:700,color:V.white}}>{v}</div>
                  </div>
                ))}
              </div>
              {moduleLessons(selectedModule.id).map((lesson,i)=>(
                <div key={lesson.id}
                  onClick={()=>selectLesson(lesson,selectedModule)}
                  style={{display:"flex",gap:14,padding:"14px 16px",background:V.s1,border:`1px solid ${V.border}`,borderRadius:8,marginBottom:8,cursor:"pointer",alignItems:"center"}}>
                  <div style={{width:32,height:32,borderRadius:8,background:V.s2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:V.cyan,flexShrink:0}}>{i+1}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,color:V.white}}>{lesson.title}</div>
                    <div style={{fontSize:11,color:V.muted,marginTop:2}}>{lesson.duration_minutes} min</div>
                  </div>
                  {lesson.is_free_preview && <div style={{fontSize:10,color:V.green,fontWeight:700}}>FREE</div>}
                  <div style={{fontSize:20,color:V.muted}}>›</div>
                </div>
              ))}
            </div>

          /* COURSE HOME */
          ) : (
            <div className="fade" style={{maxWidth:760,margin:"0 auto"}}>
              <div style={{marginBottom:40}}>
                <div style={{fontSize:13,color:V.cyan,fontWeight:700,letterSpacing:"0.08em",marginBottom:10}}>SKILLFORMED</div>
                <h1 style={{fontSize:32,fontWeight:800,color:V.white,lineHeight:1.2,marginBottom:16,letterSpacing:"-0.04em"}}>
                  The AI Operator System
                </h1>
                <p style={{fontSize:15,color:V.text,lineHeight:1.8,marginBottom:24}}>
                  Stop using AI like a search engine. This system teaches you to build agentic workflows, automate your business, and operate at a level most professionals never reach.
                </p>
                <div style={{display:"flex",gap:24}}>
                  {[
                    {l:"Modules",v:modules.length},
                    {l:"Lessons",v:lessons.length},
                    {l:"Duration",v:`${Math.round(totalDuration/60)}h`},
                  ].map(({l,v})=>(
                    <div key={l} style={{textAlign:"center"}}>
                      <div style={{fontSize:28,fontWeight:800,color:V.cyan,letterSpacing:"-0.03em"}}>{v}</div>
                      <div style={{fontSize:11,color:V.muted,marginTop:2}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{height:1,background:V.border,marginBottom:32}}/>
              {modules.map((mod)=>(
                <div key={mod.id}
                  onClick={()=>setSelectedModule(mod)}
                  style={{display:"flex",gap:16,padding:18,background:V.s1,border:`1px solid ${V.border}`,borderRadius:10,marginBottom:10,cursor:"pointer",alignItems:"flex-start"}}>
                  <div style={{width:40,height:40,borderRadius:10,background:V.s2,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:V.cyan,flexShrink:0}}>
                    {String(Math.floor(mod.module_number||0)).padStart(2,"0")}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700,color:V.white,marginBottom:4}}>{mod.title}</div>
                    <div style={{fontSize:12,color:V.muted,lineHeight:1.6}}>{(mod.description||"").slice(0,120)}...</div>
                    <div style={{fontSize:11,color:V.muted,marginTop:8}}>{moduleLessons(mod.id).length} lessons · {mod.estimated_duration}</div>
                  </div>
                  {mod.is_free_preview && (
                    <div style={{fontSize:10,color:V.cyan,fontWeight:700,background:"rgba(0,212,255,0.1)",borderRadius:4,padding:"2px 8px",flexShrink:0}}>FREE</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
