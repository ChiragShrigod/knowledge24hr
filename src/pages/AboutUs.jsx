// src/pages/AboutUs.jsx
import { theme } from "../common/theme"

export default function AboutUs() {
  return (
    <div style={{ background:theme.colors.appBg, minHeight:"100vh", padding:theme.layout.pagePadding, fontFamily:theme.fonts.body, color:theme.colors.textBody }}>
      <div style={{ maxWidth:"820px", margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:"48px", marginBottom:"1rem" }}>🧠</div>
        <h1 style={{ color:theme.colors.textPrimary, fontWeight:900, fontSize:"2.5rem", marginBottom:"1rem" }}>About Knowledge24hr</h1>
        <p style={{ fontSize:"17px", lineHeight:1.85, maxWidth:"600px", margin:"0 auto 2rem" }}>
          Knowledge24hr is your daily destination for General Knowledge, Amazing Facts, and Practical Life Tips. We believe learning should be fun, quick, and accessible to everyone.
        </p>
        <p style={{ fontSize:"17px", lineHeight:1.85, maxWidth:"600px", margin:"0 auto 2rem" }}>
          Our content is carefully curated and updated regularly so you always have something new to discover — whether it's a mind-blowing science fact, a useful full form, or a tip that changes your morning routine.
        </p>
        <p style={{ fontSize:"17px", lineHeight:1.85, maxWidth:"600px", margin:"0 auto" }}>
          Follow us on Instagram and Facebook for daily knowledge drops! 🚀
        </p>
      </div>
    </div>
  )
}
