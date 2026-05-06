// src/pages/Content.jsx
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchPostBySlug } from "../services/bloggerApi"
import { theme } from "../common/theme"

export default function Content() {
  const { slug }       = useParams()
  const navigate       = useNavigate()
  const [post,    setPost]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPostBySlug(slug)
        if (!data) throw new Error("Post not found")
        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) return (
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", background:theme.colors.appBg }}>
      <p style={{ color:theme.colors.textSecondary, fontFamily:theme.fonts.body, fontSize:"16px" }}>Loading post...</p>
    </div>
  )

  if (error) return (
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", background:theme.colors.appBg }}>
      <p style={{ color:theme.colors.redSoft, fontFamily:theme.fonts.body, fontSize:"16px" }}>{error}</p>
    </div>
  )

  return (
    <div style={{ background:theme.colors.appBg, minHeight:"100vh", padding:theme.layout.pagePadding, fontFamily:theme.fonts.display }}>
      <div style={{ maxWidth:"820px", margin:"0 auto" }}>

        {/* Back button */}
        <button onClick={() => navigate(-1)}
          style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", color:theme.colors.textSecondary, padding:"8px 18px", borderRadius:"10px", cursor:"pointer", fontSize:"14px", marginBottom:"2rem", fontFamily:theme.fonts.body }}>
          ← Back
        </button>

        {/* Labels */}
        {post.labels.length > 0 && (
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"1.2rem" }}>
            {post.labels.map(label => (
              <span key={label} style={{ background:"rgba(79,140,255,0.15)", color:theme.colors.primary, fontSize:"12px", fontWeight:700, padding:"4px 12px", borderRadius:"999px", border:"1px solid rgba(79,140,255,0.3)", textTransform:"uppercase", fontFamily:theme.fonts.body }}>
                {label}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 style={{ color:theme.colors.textPrimary, fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, lineHeight:1.15, letterSpacing:"-1px", marginBottom:"1rem" }}>
          {post.title}
        </h1>

        {/* Date */}
        <p style={{ color:theme.colors.textMuted, fontSize:"14px", marginBottom:"2rem", fontFamily:theme.fonts.body }}>
          {new Date(post.published).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}
        </p>

        {/* Thumbnail */}
        {post.thumbnail && (
          <img src={post.thumbnail} alt={post.title}
            style={{ width:"100%", maxHeight:"420px", objectFit:"cover", borderRadius:"16px", marginBottom:"2.5rem" }} />
        )}

        {/* Content */}
        <div
          style={{ color:theme.colors.textBody, fontSize:"17px", lineHeight:1.85, fontFamily:theme.fonts.body }}
          dangerouslySetInnerHTML={{ __html: post.rawContent }}
        />

      </div>
    </div>
  )
}
