import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const COLOR_MAP = {
  blue:   { accent: "#4F8CFF", glow: "rgba(79,140,255,0.35)",  gradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)", textColor: "#fff" },
  yellow: { accent: "#FFD600", glow: "rgba(255,214,0,0.35)",   gradient: "linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)", textColor: "#0B0F19" },
  cyan:   { accent: "#22D3EE", glow: "rgba(34,211,238,0.35)",  gradient: "linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)", textColor: "#fff" },
};

const TAG_ROUTES = {
  "Full Forms":  "/gk/fullForms",
  "MCQ Quiz":    "/gk/quiz",
  "Extremes":    "/gk/extremes",
  "Fun Facts":   "/facts/funFacts",
  "Science":     "/facts/scienceFacts",
  "Creepy":      "/facts/randomFacts",
  "Health":      "/tips/health",
  "Motivation":  "/tips/motivation",
  "Self Growth": "/tips/selfImprovement",
};

const DEFAULT_ROUTES = {
  "/gk":    "/gk/fullForms",
  "/facts": "/facts/funFacts",
  "/tips":  "/tips/health",
};

export default function CategoryCard({ id, title, description, icon, color, route, tags }) {
  const navigate  = useNavigate();
  const cardRef   = useRef(null);
  const { accent, glow, gradient, textColor } = COLOR_MAP[color] || COLOR_MAP.blue;

  /* ── 3-D magnetic tilt ── */
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 20;
    cardRef.current.style.transform =
      `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-12px) scale(1.03)`;
    cardRef.current.style.boxShadow = `0 24px 60px ${glow}, 0 0 0 1px ${accent}22`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
    cardRef.current.style.boxShadow = "0 8px 40px rgba(0,0,0,0.4)";
  };

  return (
    <>
      <style>{`
        @keyframes pulseRingCC {
          0%   { transform: scale(1);   opacity: 0.65; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shimmerCC {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .cat-tag:hover { transform: translateY(-2px) !important; }
        .cat-cta:hover { transform: translateX(6px) !important; }
      `}</style>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(DEFAULT_ROUTES[route] || route)}
        style={{
          background: "rgba(18,24,38,0.85)",
          borderRadius: "22px",
          padding: "2.2rem",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          transition: "transform 0.28s cubic-bezier(0.23,1,0.32,1), box-shadow 0.28s ease",
          willChange: "transform",
          backdropFilter: "blur(20px)",
          fontFamily: "'Syne', 'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Gradient bg wash */}
        <div style={{
          position: "absolute", inset: 0,
          background: gradient,
          opacity: 0.07,
          pointerEvents: "none",
        }} />

        {/* Top shimmer accent */}
        <div style={{
          position: "absolute", top: 0, left: "15%", right: "15%",
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          borderRadius: "999px",
          opacity: 0.8,
        }} />

        {/* Noise texture overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.025,
          pointerEvents: "none",
          borderRadius: "22px",
        }} />

        {/* ── Icon with pulse rings ── */}
        <div style={{ position: "relative", display: "inline-flex", marginBottom: "1.5rem" }}>
          <div style={{
            width: "60px", height: "60px", borderRadius: "16px",
            background: `${accent}14`,
            border: `1px solid ${accent}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px",
            boxShadow: `0 0 24px ${glow}`,
            position: "relative", zIndex: 2,
          }}>
            {icon}
          </div>
          {[0, 0.5, 1].map((d, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0,
              borderRadius: "16px",
              border: `1.5px solid ${accent}`,
              animation: `pulseRingCC 2.8s ease-out ${d}s infinite`,
              pointerEvents: "none",
            }} />
          ))}
        </div>

        {/* ── Title ── */}
        <h3 style={{
          fontWeight: 800,
          fontSize: "21px",
          color: "#E6EAF2",
          marginBottom: "10px",
          letterSpacing: "-0.3px",
          lineHeight: 1.2,
        }}>
          {title}
        </h3>

        {/* ── Description ── */}
        <p style={{
          color: "#9AA4B2",
          fontSize: "14px",
          lineHeight: 1.68,
          marginBottom: "1.5rem",
        }}>
          {description}
        </p>

        {/* ── Tags ── */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "1.7rem" }}>
          {tags?.map((tag) => (
            <span
              key={tag}
              className="cat-tag"
              onClick={(e) => { e.stopPropagation(); navigate(TAG_ROUTES[tag] || route); }}
              style={{
                background: `${accent}14`,
                color: accent,
                fontSize: "12px",
                fontWeight: 700,
                padding: "5px 13px",
                borderRadius: "999px",
                border: `1px solid ${accent}28`,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${accent}26`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${accent}14`; }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── CTA Button ── */}
        <button
          className="cat-cta"
          onClick={(e) => { e.stopPropagation(); navigate(DEFAULT_ROUTES[route] || route); }}
          style={{
            background: gradient,
            color: textColor,
            border: "none",
            cursor: "pointer",
            padding: "11px 22px",
            borderRadius: "11px",
            fontWeight: 700,
            fontSize: "14px",
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            boxShadow: `0 6px 24px ${glow}`,
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            fontFamily: "'Syne', sans-serif",
            letterSpacing: "0.2px",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 10px 32px ${glow}`; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 6px 24px ${glow}`; }}
          onMouseDown={e => { e.currentTarget.style.transform = "scale(0.96) translateX(4px)"; }}
          onMouseUp={e => { e.currentTarget.style.transform = "translateX(6px)"; }}
        >
          Start Now <span style={{ fontSize: "16px" }}>→</span>
        </button>
      </div>
    </>
  );
}
