// Global theme config

export const theme = {
  colors: {
    // Backgrounds
    bg: "#0B0F19",
    surface: "#121826",
    surfaceLight: "#1A2236",

    // Text
    textPrimary: "#E6EAF2",
    textSecondary: "#9AA4B2",
    textMuted: "#6B7280",

    // Borders
    border: "rgba(255,255,255,0.06)",

    // Brand / Accent
    primary: "#4F8CFF",
    yellow: "#FFD600",
    cyan: "#22D3EE",

    // States
    success: "#22C55E",
    error: "#EF4444",
    warning: "#F59E0B",
  },

  gradients: {
    main: "linear-gradient(135deg, #0B0F19 0%, #121826 100%)",
    cardBlue: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
    cardYellow: "linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)",
    cardCyan: "linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)",
  },

  shadows: {
    soft: "0 8px 30px rgba(0,0,0,0.35)",
    glowBlue: "0 0 40px rgba(79,140,255,0.18)",
    glowYellow: "0 0 40px rgba(255,214,0,0.18)",
    glowCyan: "0 0 40px rgba(34,211,238,0.18)",
  },

  glass: {
    bg: "rgba(255,255,255,0.04)",
    blur: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  transition: {
    smooth: "all 0.3s ease",
    bounce: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "20px",
  },
};
