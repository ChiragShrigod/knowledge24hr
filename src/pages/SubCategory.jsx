import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { theme } from "../common/theme";
import { useBloggerPosts } from "../hooks/useBloggerPosts";

const ITEMS_PER_PAGE = 9;

const TAB_CONFIG = {
  gk: [
    { name: "Full Forms", sub: "fullforms",      route: "/gk/fullForms" },
    { name: "MCQ Quiz",   sub: "quiz",            route: "/gk/quiz" },
    { name: "Extremes",   sub: "extremes",        route: "/gk/extremes" },
  ],
  facts: [
    { name: "Fun Facts",  sub: "funfacts",        route: "/facts/funFacts" },
    { name: "Science",    sub: "sciencefacts",    route: "/facts/scienceFacts" },
    { name: "Creepy",     sub: "randomfacts",     route: "/facts/randomFacts" },
  ],
  tips: [
    { name: "Health",     sub: "health",          route: "/tips/health" },
    { name: "Motivation", sub: "motivation",      route: "/tips/motivation" },
    { name: "Self Growth",sub: "selfimprovement", route: "/tips/selfImprovement" },
  ],
};

const LABEL_MAP = {
  fullforms:       "full-forms",
  quiz:            "quiz",
  extremes:        "extremes",
  funfacts:        "fun-facts",
  sciencefacts:    "science-facts",
  randomfacts:     "random-facts",
  health:          "health",
  motivation:      "motivation",
  selfimprovement: "self-improvement",
};

const CAT_ACCENT = {
  gk:    theme.categoryThemes.gk,
  facts: theme.categoryThemes.facts,
  tips:  theme.categoryThemes.tips,
};

function Highlight({ text = "", query = "" }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "rgba(79,140,255,0.35)", color: theme.colors.textPrimary, borderRadius: "3px", padding: "0 2px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

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

function fmtDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

const FALLBACK_IMG = "https://placehold.co/600x300/1a2235/4F8CFF?text=Knowledge24hr";

const excerptClampStyle = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default function SubCategory() {
  const { category, sub } = useParams();
  const navigate           = useNavigate();
  const cat                = (category || "").toLowerCase();
  const subLower           = (sub || "").toLowerCase();

  const [selectedItem, setSelectedItem] = useState(null);
  const [search,       setSearch]       = useState("");
  const [viewMode,     setViewMode]     = useState("grid");
  const [currentPage,  setCurrentPage]  = useState(1);

  // ── MODAL NAVIGATION STATE ──
  const [modalDir, setModalDir] = useState(0); // -1 = prev, 1 = next
  const touchStartX = useRef(null);

  const bloggerLabel = LABEL_MAP[subLower] || subLower;
  const { posts, loading, error } = useBloggerPosts(bloggerLabel);

  useEffect(() => {
    setSearch("");
    setSelectedItem(null);
    setCurrentPage(1);
  }, [cat, sub]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const tabs   = TAB_CONFIG[cat] || [];
  const colors = CAT_ACCENT[cat] || CAT_ACCENT.gk;

  const filtered = posts.filter((post) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated  = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const categoryLabel =
    cat === "gk"    ? "General Knowledge" :
    cat === "facts" ? "Amazing Facts"     :
    cat === "tips"  ? "Helpful Tips"      : category;

  const goTab = useCallback((route) => navigate(route, { replace: true }), [navigate]);

  // ── MODAL NAVIGATION HELPERS ──
  const selectedIndex = selectedItem ? filtered.findIndex(p => p.id === selectedItem.id) : -1;
  const hasPrev = selectedIndex > 0;
  const hasNext = selectedIndex < filtered.length - 1;

  const goModal = useCallback((dir) => {
    const next = selectedIndex + dir;
    if (next < 0 || next >= filtered.length) return;
    setModalDir(dir);
    setSelectedItem(filtered[next]);
  }, [selectedIndex, filtered]);

  // ── KEYBOARD NAVIGATION ──
  useEffect(() => {
    if (!selectedItem) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft")  goModal(-1);
      if (e.key === "ArrowRight") goModal(1);
      if (e.key === "Escape")     setSelectedItem(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedItem, goModal]);

  // ── SWIPE HANDLERS ──
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goModal(diff > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  function Pagination() {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "2.5rem", flexWrap: "wrap" }}>
        <button
          onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          disabled={currentPage === 1}
          style={{ padding: "9px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, fontFamily: theme.fonts.heading, background: currentPage === 1 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)", color: currentPage === 1 ? theme.colors.textFaint : theme.colors.textSecondary, border: "1px solid rgba(255,255,255,0.08)", cursor: currentPage === 1 ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
        >← Prev</button>
        {pages.map(page => (
          <button key={page} onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ width: "40px", height: "40px", borderRadius: "10px", fontSize: "14px", fontWeight: 700, fontFamily: theme.fonts.heading, background: currentPage === page ? colors.gradient : "rgba(255,255,255,0.05)", color: currentPage === page ? "#fff" : theme.colors.textSecondary, border: currentPage === page ? "none" : "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.2s ease", boxShadow: currentPage === page ? `0 4px 16px ${colors.glow}` : "none" }}
          >{page}</button>
        ))}
        <button
          onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          disabled={currentPage === totalPages}
          style={{ padding: "9px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, fontFamily: theme.fonts.heading, background: currentPage === totalPages ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)", color: currentPage === totalPages ? theme.colors.textFaint : theme.colors.textSecondary, border: "1px solid rgba(255,255,255,0.08)", cursor: currentPage === totalPages ? "not-allowed" : "pointer", transition: "all 0.2s ease" }}
        >Next →</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", fontFamily: theme.fonts.body, padding: theme.layout.pagePaddingCompact, maxWidth: "1280px", margin: "0 auto" }}>
      <style>{`
        @keyframes fadeUpCard { from{opacity:0;transform:translateY(22px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes shimmer { to { transform: translateX(50%); } }
        .sc-card:hover .sc-arrow { transform:translateX(5px) !important; }
        .sc-card:hover .sc-glow  { opacity:1 !important; }
        .sc-tr:hover { background:rgba(255,255,255,0.04) !important; }
        .modal-nav-btn { transition: all 0.2s ease !important; }
        .modal-nav-btn:hover:not(:disabled) { transform: scale(1.12) !important; }
        .modal-nav-btn:active:not(:disabled) { transform: scale(0.94) !important; }
      `}</style>

      {/* ══ HEADER ══ */}
      <div style={{ marginBottom: "2.6rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <span onClick={() => navigate("/")}
            style={{ color: theme.colors.textMuted, fontSize: "13px", cursor: "pointer", fontWeight: 600, fontFamily: theme.fonts.body, transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = colors.accent}
            onMouseLeave={e => e.currentTarget.style.color = theme.colors.textMuted}
          >Home</span>
          <span style={{ color: theme.colors.textFaint }}>›</span>
          <span style={{ color: colors.accent, fontSize: "13px", fontWeight: 700, fontFamily: theme.fonts.body }}>{categoryLabel}</span>
          <span style={{ color: theme.colors.textFaint }}>›</span>
          <span style={{ color: theme.colors.textSecondary, fontSize: "13px", fontWeight: 600, fontFamily: theme.fonts.body }}>{sub}</span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, fontFamily: theme.fonts.heading, letterSpacing: "-0.8px", lineHeight: 1.1, color: theme.colors.textPrimary, textShadow: `0 0 48px ${colors.accent}70`, margin: "0 0 8px" }}>
              {sub}
            </h1>
            <p style={{ color: theme.colors.textSecondary, fontSize: "14px", lineHeight: 1.6, margin: 0, fontFamily: theme.fonts.body }}>
              {loading ? "Loading posts…" : `${filtered.length} post${filtered.length !== 1 ? "s" : ""} in `}
              {!loading && <span style={{ color: colors.accent, fontWeight: 700 }}>{categoryLabel}</span>}
              {!loading && totalPages > 1 && <span style={{ color: theme.colors.textMuted, marginLeft: "8px" }}>— Page {currentPage} of {totalPages}</span>}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.04)", border: `1px solid ${search ? colors.accent + "55" : "rgba(255,255,255,0.09)"}`, borderRadius: "12px", padding: "10px 16px", transition: "border 0.25s ease, box-shadow 0.25s ease", boxShadow: search ? `0 0 20px ${colors.glow}` : "none" }}>
              <span style={{ fontSize: "15px", opacity: 0.5 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${sub}...`}
                style={{ background: "none", border: "none", outline: "none", color: theme.colors.textPrimary, fontSize: "14px", fontWeight: 500, fontFamily: theme.fonts.body, width: "160px", caretColor: colors.accent }} />
              {search && <span onClick={() => setSearch("")} style={{ color: theme.colors.textMuted, cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>✕</span>}
            </div>

            <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "12px", overflow: "hidden" }}>
              {[{ mode: "grid", Icon: GridIcon }, { mode: "table", Icon: TableIcon }].map(({ mode, Icon }) => {
                const isOn = viewMode === mode;
                return (
                  <button key={mode} title={mode === "grid" ? "Grid view" : "Table view"} onClick={() => setViewMode(mode)}
                    style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", background: isOn ? `${colors.accent}22` : "transparent", border: "none", borderRight: mode === "grid" ? "1px solid rgba(255,255,255,0.08)" : "none", cursor: "pointer", transition: "background 0.18s ease" }}
                    onMouseEnter={e => { if (!isOn) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                    onMouseLeave={e => { if (!isOn) e.currentTarget.style.background = "transparent"; }}
                  ><Icon active={isOn} color={colors.accent} /></button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══ TABS ══ */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "2.6rem", flexWrap: "wrap" }}>
        {tabs.map((tab) => {
          const isActive = subLower === tab.sub;
          return (
            <button key={tab.name} onClick={() => goTab(tab.route)}
              style={{ padding: "9px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 700, background: isActive ? colors.gradient : "rgba(255,255,255,0.05)", color: isActive ? "#fff" : "#9AA4B2", border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)", cursor: "pointer", transition: "all 0.22s ease", boxShadow: isActive ? `0 6px 20px ${colors.glow}` : "none", fontFamily: theme.fonts.heading, letterSpacing: "0.3px" }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#E6EAF2"; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#9AA4B2"; } }}
            >{tab.name}</button>
          );
        })}
      </div>

      {/* ══ LOADING SKELETONS ══ */}
      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ background: "rgba(18,24,38,0.82)", borderRadius: "20px", padding: "26px 28px", height: "200px", border: "1px solid rgba(255,255,255,0.07)", animation: `fadeUpCard 0.52s ease ${i * 0.05}s both`, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: "-100%", width: "200%", height: "100%", background: `linear-gradient(90deg, transparent 0%, ${colors.accent}08 50%, transparent 100%)`, animation: "shimmer 1.5s infinite" }} />
            </div>
          ))}
        </div>
      )}

      {/* ══ ERROR ══ */}
      {!loading && error && (
        <div style={{ textAlign: "center", padding: "6rem 2rem" }}>
          <div style={{ fontSize: "52px", marginBottom: "1rem" }}>⚠️</div>
          <p style={{ fontSize: "16px", fontWeight: 600, fontFamily: theme.fonts.body, color: theme.colors.textSecondary }}>
            Couldn't load posts — check your internet connection.
          </p>
          <p style={{ fontSize: "13px", color: theme.colors.textMuted, marginTop: "8px", fontFamily: theme.fonts.body }}>{error}</p>
        </div>
      )}

      {/* ══ EMPTY STATE ══ */}
      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "6rem 2rem", color: theme.colors.textMuted }}>
          <div style={{ fontSize: "52px", marginBottom: "1rem" }}>{search ? "🔍" : "📭"}</div>
          <p style={{ fontSize: "16px", fontWeight: 600, fontFamily: theme.fonts.body }}>
            {search ? `No results for "${search}"` : "No posts yet in this category."}
          </p>
          {search
            ? <button onClick={() => setSearch("")} style={{ marginTop: "1rem", padding: "9px 20px", borderRadius: "10px", background: colors.gradient, color: theme.colors.white, border: "none", fontWeight: 700, cursor: "pointer", fontFamily: theme.fonts.body }}>Clear search</button>
            : <p style={{ fontSize: "14px", marginTop: "8px", fontFamily: theme.fonts.body }}>Check back soon</p>
          }
        </div>
      )}

      {/* ══ GRID ══ */}
      {!loading && !error && filtered.length > 0 && viewMode === "grid" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
            {paginated.map((post, index) => (
              <div key={post.id} className="sc-card" onClick={() => { setModalDir(0); setSelectedItem(post); }}
                style={{ background: "rgba(18,24,38,0.82)", borderRadius: "20px", padding: "26px 28px", cursor: "pointer", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 6px 30px rgba(0,0,0,0.35)", transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease, border-color 0.3s ease", position: "relative", overflow: "hidden", animation: `fadeUpCard 0.52s ease ${Math.min(index * 0.04, 0.48)}s both`, willChange: "transform" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = `0 20px 50px ${colors.glow}, 0 0 0 1px ${colors.accent}22`; e.currentTarget.style.borderColor = `${colors.accent}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 30px rgba(0,0,0,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}
              >
                <div className="sc-glow" style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${colors.accent}12 0%, transparent 70%)`, opacity: 0, transition: "opacity 0.3s ease", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "2px", background: `linear-gradient(90deg, transparent, ${colors.accent}80, transparent)`, borderRadius: "999px" }} />

                {post.thumbnail && (
                  <div style={{ width: "calc(100% + 56px)", marginLeft: "-28px", marginTop: "-26px", marginBottom: "20px", height: "160px", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
                    <img src={post.thumbnail} alt={post.title} onError={e => { e.target.src = FALLBACK_IMG; }}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}

                {post.labels.length > 0 && (
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
                    {post.labels.map(lbl => (
                      <span key={lbl} style={{ background: `${colors.accent}18`, color: colors.accent, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", border: `1px solid ${colors.accent}30`, fontFamily: theme.fonts.heading }}>{lbl}</span>
                    ))}
                  </div>
                )}

                <h2 style={{ fontWeight: 800, fontSize: "17px", color: theme.colors.textPrimary, marginBottom: "7px", lineHeight: 1.3, letterSpacing: "-0.2px", fontFamily: theme.fonts.heading }}>
                  <Highlight text={post.title} query={search} />
                </h2>

                {post.excerpt && (
                  <p style={{ color: theme.colors.textSecondary, fontSize: "14px", lineHeight: 1.65, marginTop: "4px", fontFamily: theme.fonts.body, ...excerptClampStyle }}>
                    <Highlight text={post.excerpt} query={search} />
                  </p>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "14px" }}>
                  <span style={{ color: theme.colors.textFaint, fontSize: "12px", fontFamily: theme.fonts.body }}>{fmtDate(post.published)}</span>
                  <div className="sc-arrow" style={{ color: colors.accent, fontSize: "13px", fontWeight: 700, display: "flex", alignItems: "center", gap: "5px", transition: "transform 0.25s ease", fontFamily: theme.fonts.body }}>
                    Read more →
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination />
        </>
      )}

      {/* ══ TABLE ══ */}
      {!loading && !error && filtered.length > 0 && viewMode === "table" && (
        <>
          <div style={{ background: "rgba(18,24,38,0.82)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden"}}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: theme.fonts.body }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  {["Title", "Preview", "Date", ""].map((col, i) => (
                    <th key={i} style={{ padding: "14px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: theme.colors.textMuted, letterSpacing: "1px", textTransform: "uppercase", background: "rgba(255,255,255,0.02)", fontFamily: theme.fonts.heading }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((post, index) => (
                  <tr key={post.id} className="sc-tr" onClick={() => { setModalDir(0); setSelectedItem(post); }}
                    style={{ borderBottom: index < paginated.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", cursor: "pointer", transition: "background 0.18s ease" }}
                  >
                    <td style={{ padding: "14px 16px", minWidth: "200px" }}>
                      <div style={{ fontWeight: 700, fontSize: "14px", color: theme.colors.textPrimary, lineHeight: 1.3, fontFamily: theme.fonts.heading }}>
                        <Highlight text={post.title} query={search} />
                      </div>
                      {post.labels.length > 0 && (
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginTop: "4px" }}>
                          {post.labels.map(lbl => (
                            <span key={lbl} style={{ background: `${colors.accent}18`, color: colors.accent, fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "999px", border: `1px solid ${colors.accent}30`, fontFamily: theme.fonts.heading }}>{lbl}</span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: "14px 16px", maxWidth: "320px" }}>
                      <span style={{ color: theme.colors.textMuted, fontSize: "13px", lineHeight: 1.5, fontFamily: theme.fonts.body, ...excerptClampStyle }}>
                        <Highlight text={post.excerpt || ""} query={search} />
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                      <span style={{ color: theme.colors.textFaint, fontSize: "12px", fontFamily: theme.fonts.body }}>{fmtDate(post.published)}</span>
                    </td>
                    <td style={{ padding: "14px 16px", textAlign: "right" }}>
                      <span style={{ color: colors.accent, fontSize: "12px", fontWeight: 700, fontFamily: theme.fonts.body }}>View →</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </>
      )}

      {/* ══ MODAL ══ */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedItem(null)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "rgba(5,8,16,0.88)"}}
          >


            {/* ── MODAL CARD ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, x: modalDir === 0 ? 0 : modalDir * 80, scale: modalDir === 0 ? 0.88 : 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: modalDir === 0 ? 0 : -modalDir * 80, scale: 0.96 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onClick={e => e.stopPropagation()}
                style={{ background: theme.colors.surfaceModal, borderRadius: "24px", padding: "2.4rem", maxWidth: "640px", width: "100%", border: `1px solid ${colors.accent}30`, boxShadow: `${theme.shadows.cardModal}, 0 0 60px ${colors.glow}`, position: "relative", fontFamily: theme.fonts.body, maxHeight: "85vh", overflowY: "auto" }}
              >
                {/* Close btn */}
                <button onClick={() => setSelectedItem(null)}
                  style={{ position: "absolute", top: "18px", right: "20px", color: theme.colors.textMuted, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", width: "32px", height: "32px", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.color = theme.colors.textPrimary; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = theme.colors.textMuted; }}
                >✕</button>

                <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: "2px", background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`, borderRadius: "999px" }} />

                {/* Thumbnail */}
                {selectedItem.thumbnail && (
                  <div style={{ width: "calc(100% + 4.8rem)", marginLeft: "-2.4rem", marginTop: "-2.4rem", marginBottom: "1.6rem", height: "200px", overflow: "hidden", borderRadius: "24px 24px 0 0" }}>
                    <img src={selectedItem.thumbnail} alt={selectedItem.title} onError={e => { e.target.src = FALLBACK_IMG; }}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}

                {/* Labels */}
                {selectedItem.labels?.length > 0 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
                    {selectedItem.labels.map(lbl => (
                      <span key={lbl} style={{ background: `${colors.accent}18`, color: colors.accent, fontSize: "12px", fontWeight: 700, padding: "4px 12px", borderRadius: "999px", border: `1px solid ${colors.accent}30`, fontFamily: theme.fonts.heading, textTransform: "uppercase", letterSpacing: "0.5px" }}>{lbl}</span>
                    ))}
                  </div>
                )}

                <h2 style={{ fontSize: "24px", fontWeight: 800, color: theme.colors.textPrimary, marginBottom: "10px", letterSpacing: "-0.4px", lineHeight: 1.2, paddingRight: "40px", fontFamily: theme.fonts.heading }}>
                  {selectedItem.title}
                </h2>

                <span style={{ color: theme.colors.textFaint, fontSize: "12px", fontFamily: theme.fonts.body }}>{fmtDate(selectedItem.published)}</span>

                <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "16px 0" }} />

                <div
                  style={{ color: theme.colors.textSecondary, lineHeight: 1.75, fontSize: "15px", fontFamily: theme.fonts.body }}
                  dangerouslySetInnerHTML={{ __html: selectedItem.rawContent || selectedItem.excerpt || "" }}
                />

                {/* ── BOTTOM NAV ROW ── */}
                <div style={{ marginTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {/* Counter */}
                  <span style={{ color: theme.colors.textFaint, fontSize: "12px", fontFamily: theme.fonts.body }}>
                    {selectedIndex + 1} / {filtered.length}
                  </span>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {/* ← arrow */}
                    <button
                      className="modal-nav-btn"
                      onClick={() => goModal(-1)}
                      disabled={!hasPrev}
                      style={{ width: "38px", height: "38px", borderRadius: "10px", background: hasPrev ? `${colors.accent}18` : "rgba(255,255,255,0.02)", color: hasPrev ? colors.accent : theme.colors.textFaint, border: `1px solid ${hasPrev ? colors.accent + "40" : "rgba(255,255,255,0.06)"}`, fontWeight: 700, fontSize: "18px", cursor: hasPrev ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: hasPrev ? `0 2px 12px ${colors.glow}` : "none" }}
                    >←</button>

                    {/* → arrow */}
                    <button
                      className="modal-nav-btn"
                      onClick={() => goModal(1)}
                      disabled={!hasNext}
                      style={{ width: "38px", height: "38px", borderRadius: "10px", background: hasNext ? `${colors.accent}18` : "rgba(255,255,255,0.02)", color: hasNext ? colors.accent : theme.colors.textFaint, border: `1px solid ${hasNext ? colors.accent + "40" : "rgba(255,255,255,0.06)"}`, fontWeight: 700, fontSize: "18px", cursor: hasNext ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: hasNext ? `0 2px 12px ${colors.glow}` : "none" }}
                    >→</button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}