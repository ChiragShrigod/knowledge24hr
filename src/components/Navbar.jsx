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
    { label: "About", path: "/about", exact: true, hideOnMobile: true },
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
    <>
      <style>{`
        @media (max-width: 500px) {
          .nav-about { display: none !important; }
          .nav-cta-text { display: none !important; }
          .nav-cta-short { display: inline !important; }
        }
        @media (min-width: 501px) {
          .nav-cta-short { display: none !important; }
        }
      `}</style>
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
          padding: "0 clamp(0.75rem, 2vw, 2rem) 0 clamp(0.5rem, 1.5vw, 1rem)",
        }}>

          {/* BRAND */}
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", flexShrink: 0 }}>
            <span style={{
              fontWeight: 800,
              fontSize: "clamp(16px, 4vw, 22px)",
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
                  className={link.hideOnMobile ? "nav-about" : ""}
                  style={{
                    textDecoration: "none",
                    padding: "7px clamp(6px, 1.5vw, 16px)",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "clamp(11px, 2.5vw, 14px)",
                    color: active ? theme.colors.primary : theme.colors.textSecondary,
                    background: active ? "rgba(79,140,255,0.12)" : "transparent",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
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
                marginLeft: "clamp(4px, 1vw, 14px)",
                padding: "9px clamp(10px, 2vw, 22px)",
                borderRadius: "9px",
                fontWeight: 700,
                fontSize: "clamp(11px, 2.5vw, 14px)",
                background: theme.gradients.cardYellow,
                color: "#0B0F19",
                boxShadow: theme.shadows.glowYellow,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                fontFamily: theme.fonts.display,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
            >
              <span className="nav-cta-text">Start Now →</span>
              <span className="nav-cta-short">Go →</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}