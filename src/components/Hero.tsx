import { motion } from 'motion/react'
import ParticleCanvas from './ParticleCanvas'

const visions = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 5h16M3 9h11M3 13h13M3 17h9" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: '覆盖主流学科',
    desc: '希望做到文科理科全覆盖',
    color: '#d97706',
    bg: '#fef3c7',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="3" width="18" height="16" rx="3" stroke="#c2410c" strokeWidth="1.5" fill="none"/>
        <path d="M6 8h10M6 12h7" stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: '对齐教材目录',
    desc: '精准挂载至每一个章节知识点',
    color: '#c2410c',
    bg: '#fff1ec',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2l2.2 4.6 5.1.4-3.8 3.5 1.2 5-4.7-2.6-4.7 2.6 1.2-5L3.7 7l5.1-.4L11 2z"
          stroke="#d97706" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    label: '名师经验沉淀',
    desc: '将顶尖教师的解题逻辑系统化',
    color: '#d97706',
    bg: '#fef3c7',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C6.6 3 3 6.6 3 11s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8z" stroke="#65a30d" strokeWidth="1.5" fill="none"/>
        <path d="M7.5 11l2.5 2.5 5-5" stroke="#65a30d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: '查阅免费开放',
    desc: '资源查阅面向一线教师免费开放',
    color: '#65a30d',
    bg: '#f1f8e9',
  },
]

export default function Hero() {
  return (
    <section id="hero" className="hero-section" style={{
      position: 'relative',
      minHeight: 'min(100dvh, 100vh)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      paddingTop: '7rem',
      paddingBottom: '5rem',
      background: 'linear-gradient(160deg, #fef9ee 0%, #fdf4dd 40%, #fef8ec 100%)',
    }}>
      <ParticleCanvas />

      {/* Decorative warm blobs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-8%', left: '55%',
          width: '50vw', height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(253, 211, 77, 0.22) 0%, transparent 70%)',
          transform: 'translateX(-30%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '0', left: '-10%',
          width: '40vw', height: '40vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '-5%',
          width: '30vw', height: '30vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(194, 65, 12, 0.07) 0%, transparent 70%)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hero-badge-wrap"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.25rem' }}
        >
          <div className="hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap',
            padding: '0.4rem 1.1rem', borderRadius: 100,
            border: '1px solid rgba(217, 119, 6, 0.35)',
            background: 'rgba(254, 243, 199, 0.8)',
            fontSize: '0.8rem', color: 'var(--amber)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
            boxShadow: '0 2px 8px rgba(217, 119, 6, 0.1)',
            maxWidth: '100%',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', background: '#d97706',
              boxShadow: '0 0 6px rgba(217, 119, 6, 0.6)',
              animation: 'pulse-dot 2s infinite', flexShrink: 0,
            }} />
            2026 · 项目筹备中 · 公益性质 · 敬请期待
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '1.5rem',
            color: 'var(--brown-deep)',
            letterSpacing: '-0.01em',
          }}
        >
          让每一位教师<br />
          <span style={{
            background: 'linear-gradient(120deg, #d97706 0%, #c2410c 60%, #d97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200%',
          }}>
            都能站在名师肩膀上
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-secondary)',
            maxWidth: 640,
            margin: '0 auto 1.4rem',
            lineHeight: 1.9,
          }}
        >
          教材帮手是一个面向教师的 AI 教研资源平台。
          我们希望用 AI 技术，从海量真实教学资源中系统化提炼知识体系、
          名师解题逻辑与考点规律，并精准对齐教材目录，
          <strong style={{ color: 'var(--amber)', fontWeight: 600 }}>让每一位一线教师都能用得上</strong>。
        </motion.p>

        {/* Honest note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            display: 'inline-block',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            marginBottom: '3rem',
            padding: '0.45rem 1.1rem',
            borderRadius: 100,
            background: 'rgba(253, 211, 77, 0.15)',
            border: '1px solid rgba(217, 119, 6, 0.15)',
          }}
        >
          目前处于早期筹备阶段，以下是我们希望做到的方向 ↓
        </motion.p>

        {/* Vision cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
          className="hero-vision-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            maxWidth: 860,
            margin: '0 auto 3.5rem',
          }}
        >
          {visions.map((v) => (
            <motion.div
              key={v.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 + visions.indexOf(v) * 0.08, duration: 0.55 }}
              className="warm-card"
              style={{
                padding: '1.4rem 1.1rem',
                textAlign: 'center',
                borderColor: `${v.color}25`,
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              whileHover={{ y: -4, boxShadow: '0 10px 32px rgba(120, 73, 26, 0.13)' }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                background: v.bg,
                border: `1px solid ${v.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.85rem',
              }}>
                {v.icon}
              </div>
              <div className="vision-label" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--brown-deep)', marginBottom: '0.3rem' }}>
                {v.label}
              </div>
              <div className="vision-desc" style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {v.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="hero-cta-wrap"
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#features" className="hero-cta-primary">
            了解我们的目标
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </a>
          <a href="#cta" className="hero-cta-secondary">
            关注项目进展
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          color: 'var(--text-muted)', fontSize: '0.62rem',
          fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', zIndex: 2,
        }}
      >
        <span>SCROLL</span>
        <div style={{
          width: 1.5, height: 28,
          background: 'linear-gradient(to bottom, var(--amber), transparent)',
          borderRadius: 1, animation: 'float 2s ease-in-out infinite',
        }} />
      </motion.div>
      <style>{`
        @media (max-width: 768px) {
          .hero-section { padding-top: calc(5rem + env(safe-area-inset-top, 0px)) !important; padding-bottom: 3rem !important; }
          .hero-badge-wrap { margin-bottom: 1.5rem !important; }
          .hero-badge { font-size: 0.8rem !important; padding: 0.45rem 0.9rem !important; flex-wrap: wrap; justify-content: center; white-space: normal; text-align: center; max-width: 100%; border-radius: 12px !important; }
          .hero-section h1 { font-size: 2rem !important; margin-bottom: 1rem !important; }
          .hero-section p { font-size: 1.05rem !important; }
          .hero-vision-grid { margin-bottom: 2rem !important; gap: 0.75rem !important; grid-template-columns: repeat(2, 1fr) !important; }
          .hero-vision-grid .warm-card { padding: 1rem 0.75rem !important; }
          .hero-vision-grid .vision-label { font-size: 0.95rem !important; }
          .hero-vision-grid .vision-desc { font-size: 0.88rem !important; }
          .hero-cta-wrap { flex-direction: column; width: 100%; gap: 0.75rem; }
          .hero-section [style*="position: absolute"][style*="bottom"] { bottom: 1rem !important; }
        }
        @media (max-width: 480px) {
          .hero-section { padding-top: calc(4.75rem + env(safe-area-inset-top, 0px)) !important; padding-bottom: 2.5rem !important; }
          .hero-section h1 { font-size: 1.75rem !important; }
          .hero-badge { font-size: 0.75rem !important; white-space: normal; text-align: center; line-height: 1.4; padding: 0.4rem 0.75rem !important; border-radius: 10px !important; }
          .hero-vision-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
