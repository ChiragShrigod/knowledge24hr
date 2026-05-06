// src/pages/Contact.jsx
import { theme } from "../common/theme"

export default function Contact() {
  return (
    <div style={{ background:theme.colors.appBg, minHeight:"100vh", padding:theme.layout.pagePadding, fontFamily:theme.fonts.body, color:theme.colors.textBody }}>
      <div style={{ maxWidth:"600px", margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:"48px", marginBottom:"1rem" }}>📬</div>
        <h1 style={{ color:theme.colors.textPrimary, fontWeight:900, fontSize:"2.5rem", marginBottom:"1rem" }}>Contact Us</h1>
        <p style={{ fontSize:"17px", lineHeight:1.85, marginBottom:"2.5rem" }}>
          Have a suggestion, found an error, or just want to say hi? We'd love to hear from you!
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:"16px", alignItems:"center" }}>
          <a href="mailto:knowledge24hr@gmail.com"
            style={{ background:theme.gradients.cardBlue, color:theme.colors.white, textDecoration:"none", padding:"13px 32px", borderRadius:"12px", fontWeight:700, fontSize:"15px", fontFamily:theme.fonts.display }}>
            ✉️ Email Us
          </a>
          <a href="https://instagram.com/YOUR_PAGE" target="_blank" rel="noreferrer"
            style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", color:theme.colors.textPrimary, textDecoration:"none", padding:"13px 32px", borderRadius:"12px", fontWeight:700, fontSize:"15px", fontFamily:theme.fonts.display }}>
            📸 Instagram
          </a>
        </div>
      </div>
    </div>
  )
}
