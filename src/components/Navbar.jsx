import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { theme } from "../common/theme";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home",  path: "/",      exact: true  },
    { label: "GK",    path: "/gk",    exact: false },
    { label: "Facts", path: "/facts", exact: false },
    { label: "Tips",  path: "/tips",  exact: false },
    { label: "About", path: "/about", exact: true  },
  ];

  const isActive = (link) => {
    if (link.exact) return location.pathname === link.path;
    return location.pathname.startsWith(link.path);
  };

  const getTo = (link) => {
    if (link.exact || link.path === "/") return link.path;
    if (link.path === "/gk")    return "/gk/fullForms";
    if (link.path === "/facts") return "/facts/funFacts";
    if (link.path === "/tips")  return "/tips/health";
    return link.path;
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.4s ease",
      background: scrolled ? "rgba(11,15,25,0.92)" : "rgba(11,15,25,0.65)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      boxShadow: scrolled ? "0 0 40px rgba(79,140,255,0.12)" : "none",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        height: "66px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem 0 1rem",
      }}>

        {/* BRAND — no logo box */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <span style={{
            fontWeight: 800,
            fontSize: "22px",
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.display,
            letterSpacing: "-0.5px",
          }}>
            Knowledge<span style={{ color: "#FFD600" }}>24hr</span>
          </span>
        </Link>

        {/* NAV LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          {links.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.path}
                to={getTo(link)}
                replace={location.pathname !== "/" && location.pathname !== link.path}
                style={{
                  textDecoration: "none",
                  padding: "7px 16px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: active ? theme.colors.primary : theme.colors.textSecondary,
                  background: active ? "rgba(79,140,255,0.12)" : "transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.color = "#E6EAF2";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.color = theme.colors.textSecondary;
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* CTA */}
          <Link
            to="/gk/fullForms"
            style={{
              textDecoration: "none",
              marginLeft: "14px",
              padding: "9px 22px",
              borderRadius: "9px",
              fontWeight: 700,
              fontSize: "14px",
              background: theme.gradients.cardYellow,
              color: "#0B0F19",
              boxShadow: theme.shadows.glowYellow,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              fontFamily: theme.fonts.display,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
          >
            Start Now →
          </Link>
        </div>
      </div>
    </nav>
  );
}