// Global theme config

export const theme = {
  fonts: {
    display: "'Outfit', sans-serif",
    heading: "'Space Grotesk', sans-serif",
    body: "'Nunito', sans-serif",
    legacyHeading: "'Syne', 'Plus Jakarta Sans', sans-serif",
    fallback: "'DM Sans', sans-serif",
  },

  colors: {
    // Backgrounds
    appBg: "#080C14",
    bg: "#0B0F19",
    surface: "#121826",
    surfaceLight: "#1A2236",
    surfaceCard: "rgba(18,24,38,0.82)",
    surfaceCardStrong: "rgba(18,24,38,0.85)",
    surfaceModal: "rgba(16,22,38,0.97)",

    // Text
    textPrimary: "#E6EAF2",
    textBody: "#C8CDD6",
    textSecondary: "#9AA4B2",
    textMuted: "#6B7280",
    textFaint: "#3D4450",
    textInverse: "#0B0F19",
    white: "#FFFFFF",

    // Borders
    border: "rgba(255,255,255,0.06)",
    borderSoft: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.12)",

    // Brand / Accent
    primary: "#4F8CFF",
    yellow: "#FFD600",
    cyan: "#22D3EE",
    purple: "#A78BFA",
    orange: "#F97316",
    pink: "#F472B6",
    redSoft: "#F87171",
    brandBlueStart: "#1565C0",
    brandBlueEnd: "#42A5F5",

    // States
    success: "#22C55E",
    error: "#EF4444",
    warning: "#F59E0B",
  },

  gradients: {
    main: "linear-gradient(135deg, #0B0F19 0%, #121826 100%)",
    logoBlue: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
    cardBlue: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
    cardYellow: "linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)",
    cardCyan: "linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)",
    shimmerBlue: "linear-gradient(90deg, #4F8CFF 0%, #22D3EE 50%, #4F8CFF 100%)",
    divider: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
  },

  shadows: {
    soft: "0 8px 30px rgba(0,0,0,0.35)",
    card: "0 8px 40px rgba(0,0,0,0.4)",
    cardModal: "0 30px 80px rgba(0,0,0,0.6)",
    glowBlue: "0 0 40px rgba(79,140,255,0.18)",
    glowYellow: "0 0 40px rgba(255,214,0,0.18)",
    glowCyan: "0 0 40px rgba(34,211,238,0.18)",
    ctaBlue: "0 8px 30px rgba(79,140,255,0.45), 0 0 0 1px rgba(79,140,255,0.2)",
    ctaYellow: "0 8px 28px rgba(255,214,0,0.35)",
  },

  glass: {
    bg: "rgba(255,255,255,0.04)",
    blur: "blur(16px)",
    blurStrong: "blur(20px)",
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
    xl: "22px",
    xxl: "28px",
    pill: "999px",
  },

  layout: {
    pagePadding: "120px 2rem 80px",
    pagePaddingCompact: "110px 2rem 80px",
    containerWide: "1140px",
    containerNarrow: "820px",
    containerForm: "600px",
  },

  categoryThemes: {
    gk: {
      accent: "#EF4444",
      glow: "rgba(239,68,68,0.30)",
      glowStrong: "rgba(239,68,68,0.38)",
      gradient: "linear-gradient(135deg,#7F1D1D,#EF4444)",
      textColor: "#FFFFFF",
    },   
    facts: {
      accent: "#FFD600",
      glow: "rgba(255,214,0,0.30)",
      glowStrong: "rgba(255,214,0,0.35)",
      gradient: "linear-gradient(135deg,#FACC15,#F59E0B)",
      textColor: "#0B0F19",
    },
    tips: {
      accent: "#22D3EE",
      glow: "rgba(34,211,238,0.30)",
      glowStrong: "rgba(34,211,238,0.35)",
      gradient: "linear-gradient(135deg,#0891B2,#22D3EE)",
      textColor: "#FFFFFF",
    },
    blue: {
      accent: "#EF4444",
      glow: "rgba(239,68,68,0.35)",
      gradient: "linear-gradient(135deg,#7F1D1D,#EF4444)",
      textColor: "#FFFFFF",
    },
    yellow: {
      accent: "#FFD600",
      glow: "rgba(255,214,0,0.35)",
      gradient: "linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)",
      textColor: "#0B0F19",
    },
    cyan: {
      accent: "#22D3EE",
      glow: "rgba(34,211,238,0.35)",
      gradient: "linear-gradient(135deg, #0891B2 0%, #22D3EE 100%)",
      textColor: "#FFFFFF",
    },
  },

  labelAccents: {
    gk: "#EF4444",
    "fun-facts": "#FFD600",
    "science-facts": "#A78BFA",
    "random-facts": "#FFD600",
    health: "#22D3EE",
    motivation: "#F97316",
    "self-improvement": "#22D3EE",
    extremes: "#F87171",
    "full-forms": "#EF4444",
    quiz: "#F472B6",
  },

  brand: {
    name: "knowledge24hr",
    hubAccent: "#FFD600",
  },
};
