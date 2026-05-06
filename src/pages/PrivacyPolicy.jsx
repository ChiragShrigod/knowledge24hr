// src/pages/PrivacyPolicy.jsx
import { theme } from "../common/theme"

export default function PrivacyPolicy() {
  return (
    <div style={{ background:theme.colors.appBg, minHeight:"100vh", padding:theme.layout.pagePadding, fontFamily:theme.fonts.body, color:theme.colors.textBody }}>
      <div style={{ maxWidth:"820px", margin:"0 auto" }}>
        <h1 style={{ color:theme.colors.textPrimary, fontWeight:900, fontSize:"2.2rem", marginBottom:"0.5rem" }}>Privacy Policy</h1>
        <p style={{ color:theme.colors.textMuted, marginBottom:"2.5rem" }}>Last updated: April 2025</p>

        {[
          { title:"Information We Collect", body:"We do not collect any personally identifiable information. We may collect anonymous usage data through third-party analytics tools to improve the website." },
          { title:"Cookies", body:"We use cookies to serve ads via Google AdSense. These cookies help Google show relevant ads based on your interests. You can opt out via Google's ad settings." },
          { title:"Third-Party Advertising", body:"We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your visits to this and other websites." },
          { title:"External Links", body:"Our website may contain links to external sites. We are not responsible for the privacy practices or content of those sites." },
          { title:"Changes to This Policy", body:"We may update this Privacy Policy occasionally. Changes will be posted on this page with an updated date." },
          { title:"Contact", body:"If you have any questions about this Privacy Policy, please contact us through the Contact page." },
        ].map(({ title, body }) => (
          <div key={title} style={{ marginBottom:"2rem" }}>
            <h2 style={{ color:theme.colors.textPrimary, fontWeight:700, fontSize:"1.2rem", marginBottom:"0.5rem" }}>{title}</h2>
            <p style={{ lineHeight:1.8 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
