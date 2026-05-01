// src/pages/Contact.jsx
export default function Contact() {
  return (
    <div style={{ background:"#080C14", minHeight:"100vh", padding:"120px 2rem 80px", fontFamily:"'Nunito',sans-serif", color:"#C8CDD6" }}>
      <div style={{ maxWidth:"600px", margin:"0 auto", textAlign:"center" }}>
        <div style={{ fontSize:"48px", marginBottom:"1rem" }}>📬</div>
        <h1 style={{ color:"#E6EAF2", fontWeight:900, fontSize:"2.5rem", marginBottom:"1rem" }}>Contact Us</h1>
        <p style={{ fontSize:"17px", lineHeight:1.85, marginBottom:"2.5rem" }}>
          Have a suggestion, found an error, or just want to say hi? We'd love to hear from you!
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:"16px", alignItems:"center" }}>
          <a href="mailto:knowledge24hr@gmail.com"
            style={{ background:"linear-gradient(135deg,#4F8CFF,#2563EB)", color:"#fff", textDecoration:"none", padding:"13px 32px", borderRadius:"12px", fontWeight:700, fontSize:"15px", fontFamily:"'Outfit',sans-serif" }}>
            ✉️ Email Us
          </a>
          <a href="https://instagram.com/YOUR_PAGE" target="_blank" rel="noreferrer"
            style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", color:"#E6EAF2", textDecoration:"none", padding:"13px 32px", borderRadius:"12px", fontWeight:700, fontSize:"15px", fontFamily:"'Outfit',sans-serif" }}>
            📸 Instagram
          </a>
        </div>
      </div>
    </div>
  )
}