import { useState } from "react";
import { Link } from "react-router-dom";
import { theme } from "../common/theme";

const IG_ACCOUNTS = [
  { name: "GetTheGK",        handle: "@getthegk",        url: "https://instagram.com/getthegk" },
  { name: "Educating Facts", handle: "@educating.facts", url: "https://instagram.com/educating.facts" },
  { name: "Freaky Knowledge", handle: "@freaky.knowledge", url: "https://instagram.com/freaky.knowledge" },
];

const FB_ACCOUNTS = [
  { name: "GetTheGK",        handle: "@getthegk",        url: "https://facebook.com/getthegk" },
  { name: "Educating Facts", handle: "@educating.facts", url: "https://facebook.com/educating.facts" },
  { name: "Freaky Knowledge", handle: "@freakyknowledge", url: "https://facebook.com/freakyknowledge" },
  { name: "Knowledgepedia",  handle: "@knowledgepedia",  url: "https://facebook.com/knowledgepedia" },
];

const NAV_LINKS = [
  { label: "Privacy Policy", route: "/privacy" },
  { label: "Disclaimer",     route: "/disclaimer" },
  { label: "About",          route: "/about" },
  { label: "Contact",        route: "/contact" },
];

const CATEGORY_LINKS = [
  { label: "General Knowledge", route: "/gk/fullForms" },
  { label: "Amazing Facts",     route: "/facts/funFacts" },
  { label: "Helpful Tips",      route: "/tips/health" },
];

const IgSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FbSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

function SocialDropdown({ accounts, color, icon, label }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(o => !o)}
    >
      {/* Icon button */}
      <button
        aria-label={`Follow on ${label}`}
        style={{
          width: "38px", height: "38px",
          borderRadius: "10px",
          background: open ? `${color}18` : "rgba(255,255,255,0.05)",
          border: `1px solid ${open ? color + "55" : "rgba(255,255,255,0.09)"}`,
          color: open ? color : theme.colors.textSecondary,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.22s ease",
          transform: open ? "translateY(-3px)" : "none",
          boxShadow: open ? `0 8px 24px ${color}30` : "none",
        }}
      >
        {icon}
      </button>

      {/* Dropdown — fixed left-align so it never overflows off-screen */}
      {open && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "0",                  // left-aligned to button, no off-screen
            transform: "none",
            background: "rgba(10,14,26,0.98)",
            border: `1px solid ${color}28`,
            borderRadius: "13px",
            padding: "6px",
            minWidth: "200px",
            maxWidth: "calc(100vw - 48px)",  // never exceed screen width
            zIndex: 200,
            boxShadow: `0 -12px 40px rgba(0,0,0,0.5), 0 0 0 1px ${color}12`,
          }}>
          {/* Arrow pointing down — aligned left */}
          <div style={{
            position: "absolute",
            bottom: "-5px", left: "16px",
            transform: "rotate(45deg)",
            width: "10px", height: "10px",
            background: "rgba(10,14,26,0.98)",
            border: `1px solid ${color}28`,
            borderTop: "none", borderLeft: "none",
          }} />

          {/* Label */}
          <div style={{ padding: "6px 12px 4px", marginBottom: "2px" }}>
            <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: color, opacity: 0.7 }}>
              {label}
            </span>
          </div>

          {accounts.map((a) => (
            <a
              key={a.name}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 12px",
                borderRadius: "8px",
                textDecoration: "none",
                gap: "12px",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = `${color}14`}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ color: theme.colors.textPrimary, fontWeight: 700, fontSize: "12px", fontFamily: theme.fonts.display, whiteSpace: "nowrap" }}>
                {a.name}
              </span>
              <span style={{ color: color, fontSize: "11px", fontWeight: 500, opacity: 0.85, whiteSpace: "nowrap" }}>
                {a.handle}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{
      background: "rgba(8,12,20,0.95)",
      borderTop: `1px solid ${theme.colors.border}`,
      padding: "3rem 2rem 2rem",
      fontFamily: theme.fonts.body,
    }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>

        {/* TOP ROW */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "2.5rem",
          marginBottom: "2.5rem",
        }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", marginBottom: "14px" }}>
              <span style={{
                fontWeight: 800, fontSize: "22px",
                color: theme.colors.textPrimary,
                fontFamily: theme.fonts.display,
                letterSpacing: "-0.5px",
              }}>
                Knowledge<span style={{ color: theme.colors.yellow }}>24hr</span>
              </span>
            </Link>

            <p style={{ color: theme.colors.textMuted, fontSize: "13px", lineHeight: 1.7, maxWidth: "220px" }}>
              GK, Facts & Life Tips — curated, clean, and actually useful.
            </p>

            {/* Social icons with dropdowns */}
            <div style={{ display: "flex", gap: "10px", marginTop: "18px" }}>
              <SocialDropdown
                label="Instagram"
                accounts={IG_ACCOUNTS}
                color="#E1306C"
                icon={<IgSVG />}
              />
              <SocialDropdown
                label="Facebook"
                accounts={FB_ACCOUNTS}
                color="#1877F2"
                icon={<FbSVG />}
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ color: theme.colors.textPrimary, fontSize: "13px", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Categories
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {CATEGORY_LINKS.map((link) => (
                <Link key={link.label} to={link.route}
                  style={{ textDecoration: "none", color: theme.colors.textMuted, fontSize: "14px", transition: "color 0.2s ease" }}
                  onMouseEnter={e => e.currentTarget.style.color = theme.colors.primary}
                  onMouseLeave={e => e.currentTarget.style.color = theme.colors.textMuted}
                >{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: theme.colors.textPrimary, fontSize: "13px", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {NAV_LINKS.map((link) => (
                <Link key={link.label} to={link.route}
                  style={{ textDecoration: "none", color: theme.colors.textMuted, fontSize: "14px", transition: "color 0.2s ease" }}
                  onMouseEnter={e => e.currentTarget.style.color = theme.colors.primary}
                  onMouseLeave={e => e.currentTarget.style.color = theme.colors.textMuted}
                >{link.label}</Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 style={{ color: theme.colors.textPrimary, fontSize: "13px", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Start Learning
            </h4>
            <p style={{ color: theme.colors.textMuted, fontSize: "13px", lineHeight: 1.65, marginBottom: "14px" }}>
              Jump into curated GK, science facts, and life tips.
            </p>
            <Link to="/gk/fullForms"
              style={{
                textDecoration: "none", display: "inline-block",
                padding: "9px 20px", borderRadius: "9px",
                background: theme.gradients.cardYellow,
                color: theme.colors.textInverse,
                fontWeight: 700, fontSize: "13px",
                fontFamily: theme.fonts.display,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 6px 20px rgba(255,214,0,0.3)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(255,214,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,214,0,0.3)"; }}
            >Explore Now →</Link>
          </div>
        </div>

        {/* DIVIDER + COPYRIGHT */}
        <div style={{ height: "1px", background: theme.gradients.divider, margin: "0 0 1.4rem" }} />
        <p style={{ color: theme.colors.textFaint, fontSize: "12px", textAlign: "center" }}>
          © {new Date().getFullYear()} Knowledge24hr. All rights reserved.
        </p>

      </div>
    </footer>
  );
}