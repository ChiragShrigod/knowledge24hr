import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { theme } from "../common/theme";

const CATEGORIES = [
  {
    id: "gk", title: "General Knowledge", icon: "🧠", color: "blue", route: "/gk",
    description: "Quizzes, full forms, and extreme facts to sharpen your mind.",
    tags: ["Full Forms", "MCQ Quiz", "Extremes"], accent: theme.categoryThemes.blue.accent,
    glow: theme.categoryThemes.blue.glow, gradient: theme.categoryThemes.blue.gradient,
    tagRoutes: { "Full Forms":"/gk/fullForms","MCQ Quiz":"/gk/quiz","Extremes":"/gk/extremes" },
  },
  {
    id: "facts", title: "Amazing Facts", icon: "⚡", color: "yellow", route: "/facts",
    description: "Fun, science, and creepy facts with detailed writeups.",
    tags: ["Fun Facts","Science","Creepy"], accent: theme.categoryThemes.yellow.accent,
    glow: theme.categoryThemes.yellow.glow, gradient: theme.categoryThemes.yellow.gradient,
    tagRoutes: { "Fun Facts":"/facts/funFacts","Science":"/facts/scienceFacts","Creepy":"/facts/randomFacts" },
  },
  {
    id: "tips", title: "Helpful Tips", icon: "💡", color: "cyan", route: "/tips",
    description: "Practical tips for health, self-improvement, and everyday life.",
    tags: ["Health","Motivation","Self Growth"], accent: theme.categoryThemes.cyan.accent,
    glow: theme.categoryThemes.cyan.glow, gradient: theme.categoryThemes.cyan.gradient,
    tagRoutes: { "Health":"/tips/health","Motivation":"/tips/motivation","Self Growth":"/tips/selfImprovement" },
  },
];

const socials = [
  {
    name: "GetTheGK",
    instagram: { handle: "@getthegk",        url: "https://instagram.com/getthegk" },
    facebook:  { handle: "@getthegk",        url: "https://facebook.com/getthegk" },
  },
  {
    name: "Educating Facts",
    instagram: { handle: "@educating.facts", url: "https://instagram.com/educating.facts" },
    facebook:  { handle: "@educating.facts", url: "https://facebook.com/educating.facts" },
  },
  {
    name: "Freaky Knowledge",
    instagram: { handle: "@freaky.knowledge", url: "https://instagram.com/freaky.knowledge" },
    facebook:  { handle: "@freakyknowledge",  url: "https://facebook.com/freakyknowledge" },
  },
  {
    name: "Knowledgepedia",
    facebook: { handle: "@knowledgepedia", url: "https://facebook.com/knowledgepedia" },
  },
];

function MagneticCard({ children, style, onClick }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 16;
    ref.current.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-10px) scale(1.025)`;
  };
  const onLeave = () => { ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)"; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}
      style={{ ...style, transition:"transform 0.25s cubic-bezier(0.23,1,0.32,1),box-shadow 0.3s ease", cursor:"pointer", willChange:"transform" }}>
      {children}
    </div>
  );
}

const IgSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FbSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [atTop,   setAtTop]   = useState(true);
  const [mouse,   setMouse]   = useState({ x: 0, y: 0 });
  const [particles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5, dur: 10 + Math.random() * 16,
      delay: Math.random() * 10, op: 0.1 + Math.random() * 0.18,
      color: ["#4F8CFF","#FFD600","#22D3EE","#a78bfa"][i % 4],
    }))
  );
  const navigate = useNavigate();

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  // Hide scroll indicator when user scrolls, show again at top
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const h = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const anim = (d = 0) => ({
    opacity:   mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.8s ease ${d}s, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${d}s`,
  });

  const def = { "/gk": "/gk/fullForms", "/facts": "/facts/funFacts", "/tips": "/tips/health" };

  return (
    <div style={{ fontFamily: theme.fonts.display, overflowX: "hidden", background: theme.colors.appBg }}>
      <style>{`
        @keyframes floatP { 0%,100%{transform:translateY(0) scale(1);opacity:var(--op)} 50%{transform:translateY(-20px) scale(1.08);opacity:calc(var(--op)*1.5)} }
        @keyframes shimmerH { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fadeUpH { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gridP { 0%,100%{opacity:0.035} 50%{opacity:0.07} }
        @keyframes pRing { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.3);opacity:0} }
        @media (max-width: 980px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
          .hero-right { padding-left: 0 !important; }
          .hero-left { text-align: center; }
          .hero-desc { margin-left: auto !important; margin-right: auto !important; }
          .hero-btns { justify-content: center; }
        }
      `}</style>

      {/* Cursor glow */}
      <div style={{ position:"fixed",pointerEvents:"none",zIndex:0,width:"440px",height:"440px",borderRadius:"50%",background:"radial-gradient(circle,rgba(79,140,255,0.06) 0%,transparent 70%)",left:mouse.x-220,top:mouse.y-220,transition:"left 0.1s,top 0.1s" }} />

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"130px 2rem 80px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(79,140,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(79,140,255,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px",animation:"gridP 4s ease-in-out infinite" }} />
        {particles.map(p => (
          <div key={p.id} style={{ position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,borderRadius:"50%",background:p.color,"--op":p.op,opacity:p.op,animation:`floatP ${p.dur}s ease-in-out ${p.delay}s infinite`,pointerEvents:"none" }} />
        ))}
        <div style={{ position:"absolute",top:"8%",left:"50%",transform:"translateX(-50%)",width:"650px",height:"650px",borderRadius:"50%",background:"radial-gradient(circle,rgba(79,140,255,0.12) 0%,transparent 70%)",filter:"blur(50px)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:"5%",right:"-8%",width:"360px",height:"360px",borderRadius:"50%",background:"radial-gradient(circle,rgba(34,211,238,0.09) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",top:"30%",left:"-6%",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,214,0,0.07) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none" }} />

        <div className="hero-grid" style={{ maxWidth:"1280px",width:"100%",display:"grid",gridTemplateColumns:"1.1fr 0.8fr",gap:"90px",alignItems:"center",position:"relative",zIndex:2 }}>

          {/* LEFT */}
          <div className="hero-left">
            <h1 style={{ fontWeight:900,fontSize:"clamp(2.8rem,6.5vw,4.6rem)",color:theme.colors.textPrimary,marginBottom:"1.3rem",letterSpacing:"-2px",lineHeight:1.05,fontFamily:theme.fonts.display,...anim(0.15) }}>
              Learn Something{" "}
              <span style={{ background:theme.gradients.shimmerBlue,backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmerH 3s linear infinite",display:"inline-block" }}>
                Extraordinary
              </span>
              <br />Every Single Day
            </h1>

            <p className="hero-desc" style={{ color:theme.colors.textSecondary,fontSize:"clamp(1rem,2vw,1.12rem)",lineHeight:1.75,maxWidth:"560px",margin:"0 auto 2.8rem",fontFamily:theme.fonts.body,fontWeight:500,...anim(0.35) }}>
              GK, Facts & Life Tips — curated, clean, and actually useful.
              No fluff. No clickbait. Just sharp knowledge.
            </p>

            <div className="hero-btns" style={{ display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap",...anim(0.5) }}>
              <a href="#categories"
                style={{ textDecoration:"none",padding:"14px 34px",borderRadius:"14px",fontWeight:700,fontSize:"15px",background:theme.gradients.cardBlue,color:theme.colors.white,boxShadow:theme.shadows.ctaBlue,fontFamily:theme.fonts.display,transition:"transform 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 14px 40px rgba(79,140,255,0.55)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=theme.shadows.ctaBlue; }}
              >Explore Now →</a>

              <Link to="/facts/funFacts"
                style={{ textDecoration:"none",padding:"14px 34px",borderRadius:"14px",fontWeight:700,fontSize:"15px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.06)",color:theme.colors.textPrimary,backdropFilter:"blur(10px)",fontFamily:theme.fonts.display,transition:"all 0.2s ease" }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.09)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.transform=""; }}
              >Browse Facts ⚡</Link>
            </div>
          </div>

          {/* RIGHT — clean social account rows, no platform buttons */}
          <div className="hero-right" style={{ position:"relative",paddingLeft:"10px",maxWidth:"550px",width:"100%"}}>
            <div style={{ marginBottom:"18px", ...anim(0.32) }}>
              <span style={{ color:theme.colors.textMuted,fontSize:"11px",letterSpacing:"3px",fontWeight:800,textTransform:"uppercase",fontFamily:theme.fonts.body }}>
                FIND US ON
              </span>
            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:"12px" }}>
              {socials.map((s, i) => (
                <div key={i}
              style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 20px",borderRadius:"16px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.055)",backdropFilter:"blur(12px)",gap:"18px",opacity:mounted?1:0,transform:mounted?"translateY(0)":"translateY(30px)",transition:`all 0.7s cubic-bezier(0.23,1,0.32,1) ${0.45 + i * 0.12}s` }}                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(79,140,255,0.2)"; e.currentTarget.style.transform="translateX(5px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.055)"; e.currentTarget.style.transform=""; }}
                >
                  {/* Name + handle stacked */}
                  <div style={{ minWidth:0 }}>
                    <div style={{ color:theme.colors.textPrimary,fontWeight:700,fontSize:"15px",fontFamily:theme.fonts.display,whiteSpace:"nowrap",marginBottom:"2px" }}>
                      {s.name}
                    </div>
                    <div style={{ color:theme.colors.primary,fontSize:"12px",fontWeight:500,whiteSpace:"nowrap" }}>
                      {s.instagram ? s.instagram.handle : s.facebook.handle}
                    </div>
                  </div>

                  {/* Platform icons on the right */}
                  <div style={{ display:"flex",gap:"6px",flexShrink:0 }}>
                    {s.instagram && (
                      <a href={s.instagram.url} target="_blank" rel="noopener noreferrer"
                        style={{ width:"36px",height:"36px",borderRadius:"7px",background:"rgba(225,48,108,0.1)",border:"1px solid rgba(225,48,108,0.22)",display:"flex",alignItems:"center",justifyContent:"center",color:"#E1306C",textDecoration:"none",transition:"all 0.18s ease",flexShrink:0 }}
                        onMouseEnter={e=>{ e.currentTarget.style.background="rgba(225,48,108,0.22)"; e.currentTarget.style.transform="scale(1.15)"; }}
                        onMouseLeave={e=>{ e.currentTarget.style.background="rgba(225,48,108,0.1)"; e.currentTarget.style.transform=""; }}
                      ><IgSVG /></a>
                    )}
                    {s.facebook && (
                      <a href={s.facebook.url} target="_blank" rel="noopener noreferrer"
                        style={{ width:"36px",height:"36px",borderRadius:"7px",background:"rgba(24,119,242,0.1)",border:"1px solid rgba(24,119,242,0.22)",display:"flex",alignItems:"center",justifyContent:"center",color:"#1877F2",textDecoration:"none",transition:"all 0.18s ease",flexShrink:0 }}
                        onMouseEnter={e=>{ e.currentTarget.style.background="rgba(24,119,242,0.22)"; e.currentTarget.style.transform="scale(1.15)"; }}
                        onMouseLeave={e=>{ e.currentTarget.style.background="rgba(24,119,242,0.1)"; e.currentTarget.style.transform=""; }}
                      ><FbSVG /></a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <p style={{ marginTop:"14px", ...anim(0.95),color:theme.colors.textMuted,fontSize:"12px",lineHeight:1.65,fontFamily:theme.fonts.body }}>
              Stay connected for daily updates, facts, quizzes, and useful knowledge.
            </p>
          </div>
        </div>

        {/* Scroll indicator — disappears on scroll, returns at top */}
        <div style={{
          position:"absolute",bottom:"28px",left:"50%",
          transform:"translateX(-50%)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",
          opacity: mounted && atTop ? 0.45 : 0,
          transition:"opacity 0.5s ease",
          zIndex:3,pointerEvents:"none",
        }}>
          <span style={{ fontSize:"10px",color:theme.colors.textMuted,letterSpacing:"2.5px",textTransform:"uppercase",fontFamily:theme.fonts.body }}>scroll</span>
          <div style={{ width:"1px",height:"40px",background:`linear-gradient(to bottom,${theme.colors.primary},transparent)` }} />
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section id="categories" style={{ padding:"7rem 2rem" }}>
        <div style={{ maxWidth:"1140px",margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:"4rem" }}>
            <span style={{ fontWeight:700,fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",color:theme.colors.primary,display:"block",marginBottom:"14px",fontFamily:theme.fonts.body }}>◆ EXPLORE CATEGORIES ◆</span>
            <h2 style={{ fontWeight:900,fontSize:"clamp(2rem,4vw,3rem)",color:theme.colors.textPrimary,margin:"0 0 14px",letterSpacing:"-1.2px",fontFamily:theme.fonts.display }}>Choose your learning path</h2>
            <p style={{ color:theme.colors.textSecondary,fontSize:"15px",maxWidth:"420px",margin:"0 auto",lineHeight:1.65,fontFamily:theme.fonts.body }}>Short, sharp content — no fluff, no filler. Just pure knowledge.</p>
          </div>

          <div style={{ display:"flex",gap:"28px",flexWrap:"wrap",justifyContent:"center" }}>
            {CATEGORIES.map((cat,i)=>(
              <MagneticCard key={cat.id} onClick={()=>navigate(def[cat.route]||cat.route)}
                style={{ flex:"1 1 310px",maxWidth:"370px",background:theme.colors.surfaceCard,borderRadius:"22px",padding:"2.2rem",border:"1px solid rgba(255,255,255,0.07)",boxShadow:theme.shadows.card,position:"relative",overflow:"hidden",animation:`fadeUpH 0.7s ease ${0.1+i*0.15}s both`,backdropFilter:"blur(20px)" }}>
                <div style={{ position:"absolute",inset:0,background:cat.gradient,opacity:0.07,pointerEvents:"none" }} />
                <div style={{ position:"absolute",top:0,left:"18%",right:"18%",height:"2px",background:`linear-gradient(90deg,transparent,${cat.accent},transparent)`,borderRadius:"999px",opacity:0.75 }} />
                <div style={{ position:"relative",display:"inline-flex",marginBottom:"1.4rem" }}>
                  <div style={{ width:"58px",height:"58px",borderRadius:"16px",background:`${cat.accent}14`,border:`1px solid ${cat.accent}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",boxShadow:`0 0 22px ${cat.glow}`,position:"relative",zIndex:2 }}>{cat.icon}</div>
                  {[0,0.5,1].map((d,ri)=>(
                    <div key={ri} style={{ position:"absolute",inset:0,borderRadius:"16px",border:`1.5px solid ${cat.accent}`,animation:`pRing 2.8s ease-out ${d}s infinite`,pointerEvents:"none" }} />
                  ))}
                </div>
                <h3 style={{ fontWeight:800,fontSize:"21px",color:theme.colors.textPrimary,marginBottom:"10px",letterSpacing:"-0.4px",fontFamily:theme.fonts.display }}>{cat.title}</h3>
                <p style={{ color:theme.colors.textSecondary,fontSize:"14px",lineHeight:1.68,marginBottom:"1.4rem",fontFamily:theme.fonts.body }}>{cat.description}</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:"7px",marginBottom:"1.7rem" }}>
                  {cat.tags.map(tag=>(
                    <span key={tag} onClick={e=>{e.stopPropagation();navigate(cat.tagRoutes[tag])}}
                      style={{ background:`${cat.accent}15`,color:cat.accent,fontSize:"12px",fontWeight:700,padding:"5px 13px",borderRadius:"999px",border:`1px solid ${cat.accent}30`,cursor:"pointer",transition:"all 0.2s",fontFamily:theme.fonts.body }}
                      onMouseEnter={e=>{e.currentTarget.style.background=`${cat.accent}28`;e.currentTarget.style.transform="translateY(-2px)"}}
                      onMouseLeave={e=>{e.currentTarget.style.background=`${cat.accent}15`;e.currentTarget.style.transform=""}}
                    >{tag}</span>
                  ))}
                </div>
                <button onClick={e=>{e.stopPropagation();navigate(def[cat.route]||cat.route)}}
                  style={{ background:cat.gradient,color:cat.color==="yellow"?theme.colors.textInverse:theme.colors.white,border:"none",cursor:"pointer",padding:"11px 22px",borderRadius:"11px",fontWeight:700,fontSize:"14px",display:"inline-flex",alignItems:"center",gap:"7px",boxShadow:`0 6px 24px ${cat.glow}`,transition:"all 0.25s ease",fontFamily:theme.fonts.display }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateX(5px)";e.currentTarget.style.boxShadow=`0 10px 32px ${cat.glow}`}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`0 6px 24px ${cat.glow}`}}
                >Start Now <span style={{fontSize:"16px"}}>→</span></button>
              </MagneticCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding:"4rem 2rem 8rem" }}>
        <div style={{ maxWidth:"700px",margin:"0 auto",textAlign:"center" }}>
          <div style={{ background:theme.colors.surfaceCard,borderRadius:"28px",padding:"3.5rem 2rem",border:"1px solid rgba(79,140,255,0.18)",boxShadow:"0 0 80px rgba(79,140,255,0.10)",position:"relative",overflow:"hidden" }}>
            <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 0%,rgba(79,140,255,0.11) 0%,transparent 60%)",pointerEvents:"none" }} />
            <div style={{ fontSize:"40px",marginBottom:"1rem" }}>🚀</div>
            <h2 style={{ fontWeight:900,fontSize:"clamp(1.5rem,3vw,2.2rem)",color:theme.colors.textPrimary,marginBottom:"0.8rem",letterSpacing:"-0.6px",fontFamily:theme.fonts.display }}>Ready to get smarter?</h2>
            <p style={{ color:theme.colors.textSecondary,fontSize:"15px",marginBottom:"2rem",lineHeight:1.65,fontFamily:theme.fonts.body }}>Dive into hundreds of curated facts, GK questions, and practical life tips.</p>
            <div style={{ display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap" }}>
              <Link to="/gk/fullForms"
                style={{ textDecoration:"none",padding:"13px 28px",borderRadius:"12px",fontWeight:700,fontSize:"15px",background:theme.gradients.cardYellow,color:theme.colors.textInverse,boxShadow:theme.shadows.ctaYellow,transition:"transform 0.2s,box-shadow 0.2s",fontFamily:theme.fonts.display }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 36px rgba(255,214,0,0.45)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=theme.shadows.ctaYellow}}
              >Start with GK →</Link>
              <Link to="/facts/funFacts"
                style={{ textDecoration:"none",padding:"13px 28px",borderRadius:"12px",fontWeight:700,fontSize:"15px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.06)",color:theme.colors.textPrimary,transition:"all 0.2s",fontFamily:theme.fonts.display }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.10)";e.currentTarget.style.transform="translateY(-3px)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.transform=""}}
              >Explore Facts ⚡</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}