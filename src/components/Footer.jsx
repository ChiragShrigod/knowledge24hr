import { Link } from "react-router-dom";
import { theme } from "../common/theme";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    url: "https://instagram.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    hoverColor: "#E1306C",
  },
  {
    label: "Facebook",
    url: "https://facebook.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
    hoverColor: "#1877F2",
  },
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

export default function Footer() {
  return (
    <footer style={{
      background: "rgba(8,12,20,0.95)",
      borderTop: `1px solid ${theme.colors.border}`,
      padding: "3rem 2rem 1.5rem",
      fontFamily: theme.fonts.legacyHeading,
    }}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>

        {/* ── TOP ROW ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          marginBottom: "2.5rem",
        }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{
                width: "34px", height: "34px",
                background: theme.gradients.logoBlue,
                borderRadius: "9px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "17px", color: theme.colors.white,
              }}>K</div>
              <span style={{ fontWeight: 800, fontSize: "17px", color: theme.colors.textPrimary }}>
                Knowledge<span style={{ color: theme.colors.yellow }}>Hub</span>
              </span>
            </Link>
            <p style={{ color: theme.colors.textMuted, fontSize: "13px", lineHeight: 1.7, maxWidth: "220px" }}>
              GK, Facts & Life Tips — curated, clean, and actually useful.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Follow on ${s.label}`}
                  style={{
                    width: "38px", height: "38px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: theme.colors.textSecondary,
                    transition: "all 0.22s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = s.hoverColor;
                    e.currentTarget.style.borderColor = s.hoverColor + "55";
                    e.currentTarget.style.background = s.hoverColor + "18";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${s.hoverColor}30`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = theme.colors.textSecondary;
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ color: theme.colors.textPrimary, fontSize: "13px", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Categories
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {CATEGORY_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.route}
                  style={{ textDecoration: "none", color: theme.colors.textMuted, fontSize: "14px", transition: "color 0.2s ease" }}
                  onMouseEnter={e => e.currentTarget.style.color = theme.colors.primary}
                  onMouseLeave={e => e.currentTarget.style.color = theme.colors.textMuted}
                >
                  {link.label}
                </Link>
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
                <Link
                  key={link.label}
                  to={link.route}
                  style={{ textDecoration: "none", color: theme.colors.textMuted, fontSize: "14px", transition: "color 0.2s ease" }}
                  onMouseEnter={e => e.currentTarget.style.color = theme.colors.primary}
                  onMouseLeave={e => e.currentTarget.style.color = theme.colors.textMuted}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 style={{ color: theme.colors.textPrimary, fontSize: "13px", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Start Learning
            </h4>
            <p style={{ color: theme.colors.textMuted, fontSize: "13px", lineHeight: 1.65, marginBottom: "14px" }}>
              Jump into curated GK, science facts, and life tips.
            </p>
            <Link
              to="/gk/fullForms"
              style={{
                textDecoration: "none",
                display: "inline-block",
                padding: "9px 20px",
                borderRadius: "9px",
                background: theme.gradients.cardYellow,
                color: theme.colors.textInverse,
                fontWeight: 700,
                fontSize: "13px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                boxShadow: "0 6px 20px rgba(255,214,0,0.3)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(255,214,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,214,0,0.3)"; }}
            >
              Explore Now →
            </Link>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div style={{ height: "1px", background: theme.gradients.divider, margin: "0 0 1.4rem" }} />

        {/* ── BOTTOM ROW ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}>
          <span style={{ color: theme.colors.textFaint, fontSize: "13px", fontWeight: 600 }}>
            knowledge24hr 
          </span>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.route}
                style={{ textDecoration: "none", color: theme.colors.textFaint, fontSize: "12px", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = theme.colors.textSecondary}
                onMouseLeave={e => e.currentTarget.style.color = theme.colors.textFaint}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
