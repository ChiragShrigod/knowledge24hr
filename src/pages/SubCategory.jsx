import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { fullForms }       from "../data/gk/fullForms";
import { quiz }            from "../data/gk/quiz";
import { extremes }        from "../data/gk/extremes";
import { funFacts }        from "../data/facts/funFacts";
import { scienceFacts }    from "../data/facts/scienceFacts";
import { randomFacts }     from "../data/facts/randomFacts";
import { health }          from "../data/tips/health";
import { motivation }      from "../data/tips/motivation";
import { selfImprovement } from "../data/tips/selfImprovement";
import { motion, AnimatePresence } from "framer-motion";

/* ── Tab config ── */
const TAB_CONFIG = {
  gk:    [
    { name: "Full Forms",  sub: "fullforms",      route: "/gk/fullForms" },
    { name: "MCQ Quiz",    sub: "quiz",            route: "/gk/quiz" },
    { name: "Extremes",    sub: "extremes",        route: "/gk/extremes" },
  ],
  facts: [
    { name: "Fun Facts",   sub: "funfacts",        route: "/facts/funFacts" },
    { name: "Science",     sub: "sciencefacts",    route: "/facts/scienceFacts" },
    { name: "Creepy",      sub: "randomfacts",     route: "/facts/randomFacts" },
  ],
  tips:  [
    { name: "Health",      sub: "health",          route: "/tips/health" },
    { name: "Motivation",  sub: "motivation",      route: "/tips/motivation" },
    { name: "Self Growth", sub: "selfimprovement", route: "/tips/selfImprovement" },
  ],
};

/* ── Accent colors ── */
const CAT_ACCENT = {
  gk:    { accent: "#4F8CFF", glow: "rgba(79,140,255,0.30)",  gradient: "linear-gradient(135deg,#1E3A8A,#2563EB)" },
  facts: { accent: "#FFD600", glow: "rgba(255,214,0,0.30)",   gradient: "linear-gradient(135deg,#FACC15,#F59E0B)" },
  tips:  { accent: "#22D3EE", glow: "rgba(34,211,238,0.30)",  gradient: "linear-gradient(135deg,#0891B2,#22D3EE)" },
};

/* ── Data resolver ── */
function resolveData(category, sub) {
  const s = (sub || "").toLowerCase();
  if (category === "gk") {
    if (s === "fullforms") return Array.isArray(fullForms)    ? fullForms    : [];
    if (s === "quiz")      return Array.isArray(quiz)         ? quiz         : [];
    if (s === "extremes")  return Array.isArray(extremes)     ? extremes     : [];
  }
  if (category === "facts") {
    if (s === "funfacts")     return Array.isArray(funFacts)     ? funFacts     : [];
    if (s === "sciencefacts") return Array.isArray(scienceFacts) ? scienceFacts : [];
    if (s === "randomfacts")  return Array.isArray(randomFacts)  ? randomFacts  : [];
  }
  if (category === "tips") {
    if (s === "health")          return Array.isArray(health)          ? health          : [];
    if (s === "motivation")      return Array.isArray(motivation)      ? motivation      : [];
    if (s === "selfimprovement") return Array.isArray(selfImprovement) ? selfImprovement : [];
  }
  return [];
}

/* ── Highlight matching text ── */
function Highlight({ text = "", query = "" }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "rgba(79,140,255,0.35)", color: "#E6EAF2", borderRadius: "3px", padding: "0 2px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

/* ── Toggle icons ── */
function GridIcon({ active, color }) {
  const c = active ? color : "#6B7280";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill={c}/>
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill={c}/>
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill={c}/>
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill={c}/>
    </svg>
  );
}
function TableIcon({ active, color }) {
  const c = active ? color : "#6B7280";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2"   width="14" height="2.5" rx="1" fill={c}/>
      <rect x="1" y="6.5" width="14" height="2.5" rx="1" fill={c} opacity="0.7"/>
      <rect x="1" y="11"  width="14" height="2.5" rx="1" fill={c} opacity="0.45"/>
    </svg>
  );
}

export default function SubCategory() {
  const { category, sub } = useParams();
  const navigate = useNavigate();
  const cat = (category || "").toLowerCase();

  const [selectedItem, setSelectedItem] = useState(null);
  const [search,       setSearch]       = useState("");
  const [viewMode,     setViewMode]     = useState("grid");

  /*
   * KEY FIX: No more mounted/opacity toggle.
   * Just reset search + modal when route changes.
   * The component stays visible; React reconciles it in-place.
   */
  useEffect(() => {
    setSearch("");
    setSelectedItem(null);
  }, [cat, sub]);

  const data   = resolveData(cat, sub);
  const tabs   = TAB_CONFIG[cat] || [];
  const colors = CAT_ACCENT[cat] || CAT_ACCENT.gk;

  const filtered = data.filter((item) => {
    if (typeof item !== "object" || !item) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (item.title       || "").toLowerCase().includes(q) ||
      (item.question    || "").toLowerCase().includes(q) ||
      (item.full        || "").toLowerCase().includes(q) ||
      (item.description || "").toLowerCase().includes(q) ||
      (item.explanation || "").toLowerCase().includes(q)
    );
  });

  const categoryLabel =
    cat === "gk"    ? "General Knowledge" :
    cat === "facts" ? "Amazing Facts"     :
    cat === "tips"  ? "Helpful Tips"      : category;

  /* replace:true so back-button exits the section entirely → home */
  const goTab = useCallback((route) => navigate(route, { replace: true }), [navigate]);

  /* ── shared card key includes cat+sub so React remounts on section change ── */
  const cardKey = (item, index) => `${cat}-${sub}-${item.id ?? index}`;

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
      padding: "110px 2rem 80px",
      maxWidth: "1160px",
      margin: "0 auto",
    }}>
      <style>{`
        @keyframes fadeUpCard {
          from { opacity: 0; transform: translateY(22px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .sc-card:hover .sc-arrow { transform: translateX(5px) !important; }
        .sc-card:hover .sc-glow  { opacity: 1 !important; }
        .sc-tr:hover { background: rgba(255,255,255,0.04) !important; }
      `}</style>

      {/* ══ HEADER ══ */}
      <div style={{ marginBottom: "2.6rem" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <span
            onClick={() => navigate("/")}
            style={{ color: "#6B7280", fontSize: "13px", cursor: "pointer", fontWeight: 600, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = colors.accent}
            onMouseLeave={e => e.currentTarget.style.color = "#6B7280"}
          >Home</span>
          <span style={{ color: "#3D4450" }}>›</span>
          <span style={{ color: colors.accent, fontSize: "13px", fontWeight: 700 }}>{categoryLabel}</span>
          <span style={{ color: "#3D4450" }}>›</span>
          <span style={{ color: "#9AA4B2", fontSize: "13px", fontWeight: 600 }}>{sub}</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            {/*
              FIX: Plain color title with glow shadow.
              The WebkitBackgroundClip:"text" trick breaks during React
              re-renders (shows as a solid colored box). textShadow is safe.
            */}
            <h1 style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              letterSpacing: "-0.8px",
              marginBottom: "8px",
              lineHeight: 1.1,
              color: "#E6EAF2",
              textShadow: `0 0 48px ${colors.accent}70`,
              margin: "0 0 8px",
            }}>
              {sub}
            </h1>
            <p style={{ color: "#9AA4B2", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
              {filtered.length} item{filtered.length !== 1 ? "s" : ""} in{" "}
              <span style={{ color: colors.accent, fontWeight: 700 }}>{categoryLabel}</span>
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Search */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${search ? colors.accent + "55" : "rgba(255,255,255,0.09)"}`,
              borderRadius: "12px", padding: "10px 16px",
              transition: "border 0.25s ease, box-shadow 0.25s ease",
              boxShadow: search ? `0 0 20px ${colors.glow}` : "none",
              backdropFilter: "blur(12px)",
            }}>
              <span style={{ fontSize: "15px", opacity: 0.5 }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={`Search ${sub}...`}
                style={{
                  background: "none", border: "none", outline: "none",
                  color: "#E6EAF2", fontSize: "14px", fontWeight: 500,
                  fontFamily: "'Syne', sans-serif", width: "160px",
                  caretColor: colors.accent,
                }}
              />
              {search && (
                <span onClick={() => setSearch("")} style={{ color: "#6B7280", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>✕</span>
              )}
            </div>

            {/* Grid / Table toggle */}
            <div style={{
              display: "flex",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "12px", overflow: "hidden",
              backdropFilter: "blur(12px)",
            }}>
              {[
                { mode: "grid",  Icon: GridIcon  },
                { mode: "table", Icon: TableIcon },
              ].map(({ mode, Icon }) => {
                const isOn = viewMode === mode;
                return (
                  <button
                    key={mode}
                    title={mode === "grid" ? "Grid view" : "Table view"}
                    onClick={() => setViewMode(mode)}
                    style={{
                      width: "40px", height: "40px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isOn ? `${colors.accent}22` : "transparent",
                      border: "none",
                      borderRight: mode === "grid" ? "1px solid rgba(255,255,255,0.08)" : "none",
                      cursor: "pointer", transition: "background 0.18s ease",
                    }}
                    onMouseEnter={e => { if (!isOn) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                    onMouseLeave={e => { if (!isOn) e.currentTarget.style.background = "transparent"; }}
                  >
                    <Icon active={isOn} color={colors.accent} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "2.6rem", flexWrap: "wrap" }}>
        {tabs.map((tab) => {
          const isActive = (sub || "").toLowerCase() === tab.sub;
          return (
            <button
              key={tab.name}
              onClick={() => goTab(tab.route)}
              style={{
                padding: "9px 20px", borderRadius: "999px",
                fontSize: "13px", fontWeight: 700,
                background: isActive ? colors.gradient : "rgba(255,255,255,0.05)",
                color: isActive ? "#fff" : "#9AA4B2",
                border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer", transition: "all 0.22s ease",
                boxShadow: isActive ? `0 6px 20px ${colors.glow}` : "none",
                fontFamily: "'Syne', sans-serif", letterSpacing: "0.3px",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#E6EAF2"; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#9AA4B2"; } }}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* ══ EMPTY STATE ══ */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "6rem 2rem", color: "#6B7280" }}>
          <div style={{ fontSize: "52px", marginBottom: "1rem" }}>🔍</div>
          <p style={{ fontSize: "16px", fontWeight: 600 }}>No results for "{search}"</p>
          <button onClick={() => setSearch("")} style={{ marginTop: "1rem", padding: "9px 20px", borderRadius: "10px", background: colors.gradient, color: "#fff", border: "none", fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}>
            Clear search
          </button>
        </div>

      ) : viewMode === "grid" ? (

        /* ════ GRID ════ */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "22px" }}>
          {filtered.map((item, index) => (
            <div
              key={cardKey(item, index)}
              className="sc-card"
              onClick={() => setSelectedItem(item)}
              style={{
                background: "rgba(18,24,38,0.82)", borderRadius: "20px", padding: "22px",
                cursor: "pointer", border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 6px 30px rgba(0,0,0,0.35)",
                transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.3s ease",
                position: "relative", overflow: "hidden", backdropFilter: "blur(18px)",
                animation: `fadeUpCard 0.52s ease ${Math.min(index * 0.04, 0.48)}s both`,
                willChange: "transform",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = `0 20px 50px ${colors.glow}, 0 0 0 1px ${colors.accent}22`; e.currentTarget.style.borderColor = `${colors.accent}30`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 30px rgba(0,0,0,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
            >
              <div className="sc-glow" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${colors.accent}12 0%, transparent 70%)`, opacity: 0, transition: "opacity 0.3s ease", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "2px", background: `linear-gradient(90deg, transparent, ${colors.accent}80, transparent)`, borderRadius: "999px" }} />
              <div style={{ fontSize: "30px", marginBottom: "12px", filter: `drop-shadow(0 0 8px ${colors.glow})` }}>{item.emoji}</div>
              <h2 style={{ fontWeight: 800, fontSize: "17px", color: "#E6EAF2", marginBottom: "7px", lineHeight: 1.3, letterSpacing: "-0.2px" }}>
                <Highlight text={item.title || item.question || ""} query={search} />
              </h2>
              {item.full && <p style={{ color: colors.accent, fontSize: "13px", fontWeight: 700, marginBottom: "6px", letterSpacing: "0.3px" }}><Highlight text={item.full} query={search} /></p>}
              {item.value && <p style={{ fontWeight: 700, color: "#E6EAF2", fontSize: "14px", marginBottom: "6px" }}>{item.value}</p>}
              <p style={{ color: "#9AA4B2", fontSize: "13px", lineHeight: 1.6, marginTop: "4px" }}>
                <Highlight text={(item.description || item.explanation || "").slice(0, 95) + "…"} query={search} />
              </p>
              <div className="sc-arrow" style={{ marginTop: "14px", color: colors.accent, fontSize: "13px", fontWeight: 700, display: "flex", alignItems: "center", gap: "5px", transition: "transform 0.25s ease" }}>
                Read more →
              </div>
            </div>
          ))}
        </div>

      ) : (

        /* ════ TABLE ════ */
        <div style={{ background: "rgba(18,24,38,0.82)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", backdropFilter: "blur(18px)" }}>
          {(() => {
            const hasFullForm = filtered.some(i => i.full);
            const hasValue    = !hasFullForm && filtered.some(i => i.value);
            return (
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Syne', sans-serif" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["", "Title", ...(hasFullForm ? ["Full Form"] : hasValue ? ["Value"] : []), "Preview", ""].map((col, i) => (
                      <th key={i} style={{ padding: "14px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#6B7280", letterSpacing: "1px", textTransform: "uppercase", background: "rgba(255,255,255,0.02)" }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, index) => (
                    <tr
                      key={cardKey(item, index)}
                      className="sc-tr"
                      onClick={() => setSelectedItem(item)}
                      style={{ borderBottom: index < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", cursor: "pointer", transition: "background 0.18s ease" }}
                    >
                      <td style={{ padding: "14px 16px", width: "50px", fontSize: "22px" }}>{item.emoji}</td>
                      <td style={{ padding: "14px 16px", minWidth: "160px" }}>
                        <span style={{ fontWeight: 700, fontSize: "14px", color: "#E6EAF2", lineHeight: 1.3 }}><Highlight text={item.title || item.question || ""} query={search} /></span>
                      </td>
                      {(hasFullForm || hasValue) && (
                        <td style={{ padding: "14px 16px" }}>
                          {item.full
                            ? <span style={{ color: colors.accent, fontSize: "13px", fontWeight: 700 }}><Highlight text={item.full} query={search} /></span>
                            : item.value
                            ? <span style={{ color: "#E6EAF2",    fontSize: "13px", fontWeight: 600 }}>{item.value}</span>
                            : null}
                        </td>
                      )}
                      <td style={{ padding: "14px 16px", maxWidth: "320px" }}>
                        <span style={{ color: "#6B7280", fontSize: "13px", lineHeight: 1.5 }}><Highlight text={(item.description || item.explanation || "").slice(0, 80) + "…"} query={search} /></span>
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <span style={{ color: colors.accent, fontSize: "12px", fontWeight: 700 }}>View →</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()}
        </div>
      )}

      {/* ══ MODAL ══ */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedItem(null)}
            style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "rgba(5,8,16,0.78)", backdropFilter: "blur(14px)" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 40 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{   scale: 0.9,  opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "rgba(16,22,38,0.97)", borderRadius: "24px", padding: "2.4rem", maxWidth: "620px", width: "100%", border: `1px solid ${colors.accent}30`, boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${colors.glow}`, backdropFilter: "blur(30px)", position: "relative", fontFamily: "'Syne', sans-serif", maxHeight: "85vh", overflowY: "auto" }}
            >
              <button onClick={() => setSelectedItem(null)} style={{ position: "absolute", top: "18px", right: "20px", color: "#6B7280", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", width: "32px", height: "32px", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.color = "#E6EAF2"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#6B7280"; }}
              >✕</button>

              <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "2px", background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`, borderRadius: "999px" }} />

              <div style={{ fontSize: "46px", marginBottom: "14px", filter: `drop-shadow(0 0 12px ${colors.glow})` }}>{selectedItem.emoji}</div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#E6EAF2", marginBottom: "10px", letterSpacing: "-0.4px", lineHeight: 1.2, paddingRight: "40px" }}>
                {selectedItem.title || selectedItem.question}
              </h2>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
                {selectedItem.full  && <span style={{ background: `${colors.accent}18`, color: colors.accent, fontSize: "13px", fontWeight: 700, padding: "5px 14px", borderRadius: "999px", border: `1px solid ${colors.accent}30` }}>{selectedItem.full}</span>}
                {selectedItem.value && <span style={{ background: "rgba(255,255,255,0.07)", color: "#E6EAF2",  fontSize: "13px", fontWeight: 700, padding: "5px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.12)" }}>{selectedItem.value}</span>}
                {selectedItem.wow   && <span style={{ background: "rgba(255,214,0,0.10)", color: "#FFD600",   fontSize: "12px", fontWeight: 700, padding: "5px 14px", borderRadius: "999px", border: "1px solid rgba(255,214,0,0.25)" }}>✨ {selectedItem.wow}</span>}
              </div>

              {selectedItem.options && (
                <ul style={{ margin: "10px 0 14px", padding: 0, listStyle: "none" }}>
                  {selectedItem.options.map((opt, i) => (
                    <li key={i} style={{ padding: "9px 14px", marginBottom: "7px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#9AA4B2", fontSize: "14px", fontWeight: 600 }}>
                      <span style={{ color: colors.accent, marginRight: "8px", fontWeight: 800 }}>{String.fromCharCode(65 + i)}.</span>{opt}
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "14px 0" }} />
              <p style={{ color: "#9AA4B2", lineHeight: 1.75, fontSize: "15px" }}>{selectedItem.description || selectedItem.explanation}</p>

              {selectedItem.tags?.length > 0 && (
                <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginTop: "16px" }}>
                  {selectedItem.tags.map(tag => (
                    <span key={tag} style={{ background: "rgba(255,255,255,0.05)", color: "#6B7280", fontSize: "11px", fontWeight: 600, padding: "4px 11px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.08)" }}>#{tag}</span>
                  ))}
                </div>
              )}

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setSelectedItem(null)} style={{ padding: "10px 24px", borderRadius: "10px", background: colors.gradient, color: "#fff", border: "none", fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "'Syne', sans-serif", boxShadow: `0 6px 20px ${colors.glow}`, transition: "transform 0.2s ease" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}
                >Got it ✓</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}