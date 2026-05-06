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

const LABEL_ACCENT = {
  "gk": "#4F8CFF", "fun-facts": "#FFD600", "science-facts": "#a78bfa",
  "random-facts": "#FFD600", "health": "#22D3EE", "motivation": "#f97316",
  "self-improvement": "#22D3EE", "extremes": "#f87171", "full-forms": "#4F8CFF", "quiz": "#f472b6",
}
const LABEL_EMOJI = {
  "gk": "🧠", "fun-facts": "⚡", "science-facts": "🔬",
  "random-facts": "🎲", "health": "💚", "motivation": "🔥",
  "self-improvement": "💡", "extremes": "🌍", "full-forms": "📚", "quiz": "❓",
}

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

export default function Home() {
  const [mounted,  setMounted]  = useState(false);
  const [mouse,    setMouse]    = useState({ x:0, y:0 });
  const [particles]             = useState(() => Array.from({length:18},(_,i)=>({ id:i, x:Math.random()*100, y:Math.random()*100, size:1.5+Math.random()*2.5, dur:10+Math.random()*16, delay:Math.random()*10, op:0.1+Math.random()*0.18, color:["#4F8CFF","#FFD600","#22D3EE","#a78bfa"][i%4] })));
  const navigate   = useNavigate();

  useEffect(() => { const t = setTimeout(()=>setMounted(true),60); return ()=>clearTimeout(t); }, []);
  useEffect(() => {
    const h = (e) => setMouse({x:e.clientX,y:e.clientY});
    window.addEventListener("mousemove",h);
    return () => window.removeEventListener("mousemove",h);
  }, []);

  const anim = (d=0) => ({
    opacity:   mounted?1:0,
    transform: mounted?"translateY(0)":"translateY(28px)",
    transition:`opacity 0.8s ease ${d}s,transform 0.8s cubic-bezier(0.23,1,0.32,1) ${d}s`,
  });

  const def = { "/gk":"/gk/fullForms","/facts":"/facts/funFacts","/tips":"/tips/health" };

  return (
    <div style={{ fontFamily: theme.fonts.display, overflowX:"hidden", background: theme.colors.appBg }}>
      <style>{`
        @keyframes floatP { 0%,100%{transform:translateY(0) scale(1);opacity:var(--op)} 50%{transform:translateY(-20px) scale(1.08);opacity:calc(var(--op)*1.5)} }
        @keyframes shimmerH { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fadeUpH { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gridP { 0%,100%{opacity:0.035} 50%{opacity:0.07} }
        @keyframes pRing { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.3);opacity:0} }
        .art-card { transition:transform 0.35s cubic-bezier(0.23,1,0.32,1),box-shadow 0.3s,border-color 0.3s; }
        .art-card:hover { transform:translateY(-10px) !important; }
        .art-arr { transition:transform 0.25s ease; }
        .art-link:hover .art-arr { transform:translateX(5px); }
      `}</style>

      {/* Cursor glow */}
      <div style={{ position:"fixed",pointerEvents:"none",zIndex:0,width:"440px",height:"440px",borderRadius:"50%",background:"radial-gradient(circle,rgba(79,140,255,0.06) 0%,transparent 70%)",left:mouse.x-220,top:mouse.y-220,transition:"left 0.1s,top 0.1s" }} />

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"130px 2rem 80px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(79,140,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(79,140,255,0.04) 1px,transparent 1px)",backgroundSize:"60px 60px",animation:"gridP 4s ease-in-out infinite" }} />
        {particles.map(p=>(
          <div key={p.id} style={{ position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,borderRadius:"50%",background:p.color,"--op":p.op,opacity:p.op,animation:`floatP ${p.dur}s ease-in-out ${p.delay}s infinite`,pointerEvents:"none" }} />
        ))}
        <div style={{ position:"absolute",top:"8%",left:"50%",transform:"translateX(-50%)",width:"650px",height:"650px",borderRadius:"50%",background:"radial-gradient(circle,rgba(79,140,255,0.12) 0%,transparent 70%)",filter:"blur(50px)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:"5%",right:"-8%",width:"360px",height:"360px",borderRadius:"50%",background:"radial-gradient(circle,rgba(34,211,238,0.09) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",top:"30%",left:"-6%",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,214,0,0.07) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none" }} />

        <div style={{ maxWidth:"820px",zIndex:2,position:"relative" }}>
          <h1 style={{ fontWeight:900,fontSize:"clamp(2.8rem,6.5vw,4.6rem)",color:theme.colors.textPrimary,marginBottom:"1.3rem",letterSpacing:"-2px",lineHeight:1.05,fontFamily:theme.fonts.display,...anim(0.15) }}>
            Learn Something{" "}
            <span style={{ background:theme.gradients.shimmerBlue,backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmerH 3s linear infinite",display:"inline-block" }}>
              Extraordinary
            </span>
            <br />Every Single Day
          </h1>

          <p style={{ color:theme.colors.textSecondary,fontSize:"clamp(1rem,2vw,1.12rem)",lineHeight:1.75,maxWidth:"560px",margin:"0 auto 2.8rem",fontFamily:theme.fonts.body,fontWeight:500,...anim(0.35) }}>
            GK, Facts & Life Tips — curated, clean, and actually useful. No fluff. No clickbait. Just sharp knowledge.
          </p>

          <div style={{ display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap",...anim(0.5) }}>
            <a href="#categories" style={{ textDecoration:"none",padding:"14px 34px",borderRadius:"14px",fontWeight:700,fontSize:"15px",background:theme.gradients.cardBlue,color:theme.colors.white,boxShadow:theme.shadows.ctaBlue,fontFamily:theme.fonts.display,transition:"transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 40px rgba(79,140,255,0.55)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=theme.shadows.ctaBlue}}
            >Explore Now →</a>
            <Link to="/facts/funFacts" style={{ textDecoration:"none",padding:"14px 34px",borderRadius:"14px",fontWeight:700,fontSize:"15px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",color:theme.colors.textPrimary,backdropFilter:"blur(10px)",fontFamily:theme.fonts.display,transition:"all 0.2s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.09)";e.currentTarget.style.transform="translateY(-3px)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.transform=""}}
            >Browse Facts ⚡</Link>
          </div>
        </div>

        <div style={{ position:"absolute",bottom:"36px",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",opacity:mounted?0.45:0,transition:"opacity 1s ease 1.2s" }}>
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
              <Link to="/gk/fullForms" style={{ textDecoration:"none",padding:"13px 28px",borderRadius:"12px",fontWeight:700,fontSize:"15px",background:theme.gradients.cardYellow,color:theme.colors.textInverse,boxShadow:theme.shadows.ctaYellow,transition:"transform 0.2s,box-shadow 0.2s",fontFamily:theme.fonts.display }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 36px rgba(255,214,0,0.45)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=theme.shadows.ctaYellow}}
              >Start with GK →</Link>
              <Link to="/facts/funFacts" style={{ textDecoration:"none",padding:"13px 28px",borderRadius:"12px",fontWeight:700,fontSize:"15px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:theme.colors.textPrimary,transition:"all 0.2s",fontFamily:theme.fonts.display }}
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
