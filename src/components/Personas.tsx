import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const personas = [
  {
    avatar: '👩‍🏫', name: '刚入职的新手教师', subject: '初中数学',
    color: '#d97706', bg: '#fef3c7', border: 'rgba(217, 119, 6, 0.2)',
    pain: '每次备课要花大量时间查资料，不知道这道题有哪些解法，也不清楚学生最容易在哪里出错。',
    hope: '如果有一个地方能快速告诉我每道典型例题的常见解法和高频错误，备课效率会大大提升。',
  },
  {
    avatar: '👨‍🏫', name: '有经验的骨干教师', subject: '高中物理',
    color: '#c2410c', bg: '#fff1ec', border: 'rgba(194, 65, 12, 0.18)',
    pain: '有了自己的教学经验，但很难了解全国顶尖教师如何处理同一个知识点，视野难以突破。',
    hope: '希望能看到来自不同地方优秀教师的解题视角和策略，而不是只靠自己摸索和同校交流。',
  },
  {
    avatar: '👩‍💼', name: '教研组长 / 备课组长', subject: '语文组',
    color: '#b45309', bg: '#fffbf0', border: 'rgba(180, 83, 9, 0.18)',
    pain: '组织教研活动时，收集资料、整理素材的工作量巨大，大量时间花在准备上而非讨论本身。',
    hope: '如果有系统化的学科知识体系可以参照，可以把更多精力放在教研的核心——讨论与碰撞上。',
  },
  {
    avatar: '🏫', name: '偏远地区的教师', subject: '乡镇中学',
    color: '#65a30d', bg: '#f1f8e9', border: 'rgba(101, 163, 13, 0.2)',
    pain: '本地教研资源很少，和城市学校差距越来越大，很多时候只能一个人摸索。',
    hope: '希望无论在哪里，只要有网络，就能和城市教师获取同等质量的教研资源——这也是我们做这件事的初衷。',
  },
]

function PersonaCard({ persona, index }: { persona: typeof personas[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="persona-card warm-card"
      style={{
        padding: '2rem',
        borderColor: persona.border,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 320,
      }}
      whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(120, 73, 26, 0.16)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem', marginBottom: '1.5rem', flexShrink: 0 }}>
        <div style={{
          width: 54, height: 54, borderRadius: 16,
          background: `linear-gradient(135deg, ${persona.bg}, ${persona.bg}dd)`,
          border: `1.5px solid ${persona.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.6rem', flexShrink: 0,
          boxShadow: `0 3px 14px ${persona.border}`,
        }}>
          {persona.avatar}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--brown-deep)', marginBottom: '0.25rem' }}>{persona.name}</div>
          <span style={{
            fontSize: '0.7rem', color: persona.color,
            background: persona.bg, border: `1px solid ${persona.border}`,
            padding: '0.15rem 0.6rem', borderRadius: 100,
            display: 'inline-block',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.05em',
          }}>{persona.subject}</span>
        </div>
      </div>

      <div
        className="persona-pain"
        style={{
          padding: '1rem 1.1rem', borderRadius: 12,
          background: 'rgba(253, 243, 199, 0.35)',
          borderLeft: `3px solid ${persona.border}`,
          marginBottom: '1rem',
          flex: '1 1 auto',
          minHeight: 0,
        }}
      >
        <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.4rem', fontWeight: 600 }}>
          现在的困扰
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.82, margin: 0 }}>{persona.pain}</p>
      </div>

      <div
        className="persona-hope"
        style={{
          padding: '1rem 1.1rem', borderRadius: 12,
          background: persona.bg,
          border: `1px solid ${persona.border}`,
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: persona.color, letterSpacing: '0.1em', marginBottom: '0.4rem', fontWeight: 600 }}>
          ✦ 我们希望能帮到的
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.82, margin: 0 }}>{persona.hope}</p>
      </div>
    </motion.div>
  )
}

export default function Personas() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="personas" className="personas-section" style={{ padding: 'var(--section-py) 0', background: 'var(--bg-page)', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '-5%', left: '-3%', width: '30%', height: '40%',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(253, 211, 77, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="personas-title"
          style={{ marginBottom: '4rem', textAlign: 'center', maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div className="section-label" style={{ margin: '0 auto 1.25rem' }}>FOR TEACHERS</div>
          <h2 className="section-title personas-heading" style={{ textAlign: 'center', lineHeight: 1.35 }}>
            我们在乎的<br /><em>不同的教师，相同的困境</em>
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0.75rem auto 0' }}>
            无论是刚入职的新手，还是经验丰富的教研组长；无论在城市还是乡镇——教研资源匮乏、备课耗时、视野受限，是很多教师共同面对的现实。
          </p>
        </motion.div>

        <div className="personas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', alignItems: 'stretch' }}>
          {personas.map((p, i) => <PersonaCard key={p.name} persona={p} index={i} />)}
        </div>
        <style>{`
          .personas-heading { display: block; }
          .personas-heading em { display: block; margin-top: 0.12em; }
          @media (min-width: 769px) {
            .personas-grid { gap: 1.75rem; }
            .persona-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
          }
          @media (max-width: 1200px) {
            .personas-grid { grid-template-columns: repeat(2, 1fr); }
            .persona-card { min-height: 280 !important; }
          }
          @media (max-width: 768px) {
            .personas-title { margin-bottom: 2.5rem !important; }
            .persona-card { min-height: auto !important; }
            #personas .warm-card p { font-size: 0.95rem !important; }
            #personas .persona-card [style*="0.95rem"] { font-size: 1rem !important; }
            #personas .persona-pain [style*="0.65rem"],
            #personas .persona-hope [style*="0.65rem"] { font-size: 0.72rem !important; }
            .personas-grid {
              grid-template-columns: 1fr !important;
              gap: 1rem;
              min-width: 0;
            }
            #personas .warm-card { padding: 1.5rem !important; min-width: 0; }
          }
        `}</style>
      </div>
    </section>
  )
}
