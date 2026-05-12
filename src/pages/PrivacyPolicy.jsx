// src/pages/PrivacyPolicy.jsx
import { theme } from "../common/theme"

export default function PrivacyPolicy() {
  return (
    <div style={{ background:theme.colors.appBg, minHeight:"100vh", padding:theme.layout.pagePadding, fontFamily:theme.fonts.body, color:theme.colors.textBody }}>
      <div style={{ maxWidth:"820px", margin:"0 auto" }}>
        <h1 style={{ color:theme.colors.textPrimary, fontWeight:900, fontSize:"2.2rem", marginBottom:"2.5rem" }}>Privacy Policy</h1>

        {[
          {
            title: "About This Website",
            body: "Knowledge24hr is a free educational website that publishes General Knowledge, Amazing Facts, and Helpful Tips. We do not sell any products or require users to create accounts. All content is publicly accessible."
          },
          {
            title: "Information We Collect",
            body: "We do not collect any personally identifiable information from visitors. We do not have login systems, forms, or databases that store your personal data. Anonymous usage data may be collected through Google Analytics to help us understand how visitors use the site."
          },

          {
            title: "Google AdSense & Advertising",
            body: "We use Google AdSense to display advertisements on this website. Google and its partners may use cookies to show ads based on your previous visits to this site and other websites. You can opt out of personalised advertising by visiting Google's Ad Settings at adssettings.google.com."
          },
          {
            title: "Third-Party Services",
            body: "Our content is powered by Blogger (a Google service). We also link to social media platforms including Instagram and Facebook. These third-party services have their own privacy policies, and we are not responsible for their practices."
          },
          {
            title: "External Links",
            body: "Knowledge24hr may contain links to external websites. We are not responsible for the privacy practices or content of those external sites. We encourage you to review the privacy policy of any site you visit."
          },
          {
            title: "Children's Privacy",
            body: "Our website is intended for general audiences. We do not knowingly collect any information from children under the age of 13. If you believe your child has provided personal information, please contact us so we can remove it."
          },
          {
            title: "Changes to This Policy",
            body: "We may update this Privacy Policy from time to time. Any changes will be reflected on this page. We encourage you to review this page periodically to stay informed."
          },
          {
            title: "Contact",
            body: "If you have any questions or concerns about this Privacy Policy, please reach out to us via our Contact page. We're happy to help."
          },
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