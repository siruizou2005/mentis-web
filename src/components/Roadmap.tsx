import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

type Phase = {
  phase: string; title: string; period: string
  status: 'active' | 'upcoming'
  milestones: { label: string; done: boolean }[]
  color: string; bg: string; border: string
  note?: string; emoji: string
}

const phases: Phase[] = [
  {
    phase: 'Phase 01', emoji: '🌱',
    title: '项目筹备与方向确认',
    period: '2026 Q1（当前阶段）',
    status: 'active',
    color: '#d97706', bg: '#fef3c7', border: 'rgba(217, 119, 6, 0.25)',
    note: '我们正处于这个阶段',
    milestones: [
      { label: '明确项目定位与核心价值主张', done: true },
      { label: '调研教师真实备课痛点', done: true },
      { label: '技术路线选型与可行性验证', done: false },
      { label: '第一批种子用户教师访谈', done: false },
    ],
  },
  {
    phase: 'Phase 02', emoji: '⚙️',
    title: '核心技术开发',
    period: '2026 Q2 – Q3（规划中）',
    status: 'upcoming',
    color: '#c2410c', bg: '#fff1ec', border: 'rgba(194, 65, 12, 0.2)',
    milestones: [
      { label: '多模态资源采集与处理 Pipeline', done: false },
      { label: '知识点抽取与结构化模型', done: false },
      { label: '教材目录树系统搭建', done: false },
      { label: '解题逻辑提炼模型训练', done: false },
    ],
  },
  {
    phase: 'Phase 03', emoji: '📝',
    title: '内容生产与小范围内测',
    period: '2026 Q4（规划中）',
    status: 'upcoming',
    color: '#b45309', bg: '#fffbf0', border: 'rgba(180, 83, 9, 0.2)',
    milestones: [
      { label: '1-2 门学科内容首批产出', done: false },
      { label: '邀请种子教师内测并收集反馈', done: false },
      { label: '根据反馈迭代优化', done: false },
      { label: '内容质量标准建立', done: false },
    ],
  },
  {
    phase: 'Phase 04', emoji: '🚀',
    title: '平台上线 · 公益开放',
    period: '2027 Q1+（展望）',
    status: 'upcoming',
    color: '#65a30d', bg: '#f1f8e9', border: 'rgba(101, 163, 13, 0.2)',
    milestones: [
      { label: '教师端平台正式发布', done: false },
      { label: '公益申请通道开放', done: false },
      { label: '学科覆盖范围持续扩展', done: false },
      { label: '社区与反馈机制建立', done: false },
    ],
  },
]

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const doneCount = phase.milestones.filter(m => m.done).length

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="phase-card warm-card"
      style={{
        padding: '1.75rem',
        borderColor: phase.border,
        position: 'relative', overflow: 'hidden',
        boxShadow: phase.status === 'active'
          ? `0 8px 32px rgba(217, 119, 6, 0.15), 0 2px 8px rgba(120, 73, 26, 0.08)`
          : 'var(--shadow-card)',
      }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(120, 73, 26, 0.14)' }}
    >
      {/* Active phase top accent */}
      {phase.status === 'active' && (
        <>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${phase.color}, ${phase.color}99)`,
            borderRadius: '3px 3px 0 0',
          }} />
          <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: 11, height: 11 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: phase.color }} />
            <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${phase.color}`, animation: 'pulse-ring 1.5s ease-out infinite' }} />
          </div>
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 14,
            background: `linear-gradient(135deg, ${phase.bg}, ${phase.bg}dd)`,
            border: `1.5px solid ${phase.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.35rem', flexShrink: 0,
            boxShadow: `0 2px 12px ${phase.border}`,
          }}>
            {phase.emoji}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: phase.color, letterSpacing: '0.1em', marginBottom: '0.15rem' }}>
              {phase.phase}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.98rem', fontWeight: 700, color: 'var(--brown-deep)' }}>
              {phase.title}
            </h3>
          </div>
        </div>
        <span style={{
          padding: '0.2rem 0.65rem', borderRadius: 100, fontSize: '0.65rem',
          background: phase.status === 'active' ? phase.bg : '#fef3c7',
          color: phase.status === 'active' ? phase.color : '#b07d42',
          border: `1px solid ${phase.status === 'active' ? phase.border : 'rgba(195, 155, 80, 0.35)'}`,
          fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
          flexShrink: 0, marginLeft: '0.5rem',
        }}>
          {phase.status === 'active' ? '进行中' : '规划中'}
        </span>
      </div>

      <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{phase.period}</div>
      {phase.note && (
        <div style={{ fontSize: '0.7rem', color: phase.color, fontStyle: 'italic', marginBottom: '1rem' }}>
          ← {phase.note}
        </div>
      )}
      {!phase.note && <div style={{ marginBottom: '1rem' }} />}

      {/* Progress bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>里程碑完成</span>
          <span style={{ fontSize: '0.68rem', color: phase.color, fontFamily: 'var(--font-mono)' }}>
            {doneCount}/{phase.milestones.length}
          </span>
        </div>
        <div style={{ height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 3, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${(doneCount / phase.milestones.length) * 100}%` } : {}}
            transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
            style={{ height: '100%', background: `linear-gradient(90deg, ${phase.color}, ${phase.color}cc)`, borderRadius: 3 }}
          />
        </div>
      </div>

      {/* Milestones */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {phase.milestones.map((m) => (
          <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <div style={{
              width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
              border: `1.5px solid ${m.done ? phase.color : 'rgba(0,0,0,0.12)'}`,
              background: m.done ? phase.bg : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {m.done && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l1.5 1.5 3.5-3.5" stroke={phase.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontSize: '0.79rem', color: m.done ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Roadmap() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="roadmap" className="roadmap-section" style={{ padding: 'var(--section-py) 0', background: 'var(--bg-section-alt)', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background decoration */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%', width: '35%', height: '50%',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(253, 211, 77, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="roadmap-title"
          style={{ marginBottom: '4rem', textAlign: 'center' }}
        >
          <div className="section-label" style={{ margin: '0 auto 1.25rem' }}>ROADMAP · 2026</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            我们在哪里<br /><em>计划去哪里</em>
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0.75rem auto 0' }}>
            项目刚刚开始筹备。我们不想编数字给你看，而是真实呈现现在的进展和接下来的计划。
          </p>
        </motion.div>

        <div className="roadmap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {phases.map((phase, i) => <PhaseCard key={phase.phase} phase={phase} index={i} />)}
        </div>

        {/* Honest note - 关于这份路线图 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="roadmap-note"
          style={{
            padding: '1.6rem 2rem', borderRadius: 16,
            background: 'linear-gradient(135deg, #fef9ee 0%, #fef6e4 100%)',
            border: '1px solid var(--border-warm)',
            boxShadow: '0 4px 24px rgba(120, 73, 26, 0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
            display: 'flex', alignItems: 'flex-start', gap: '1rem',
            borderLeft: '4px solid var(--amber)',
          }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
            border: '1px solid rgba(217, 119, 6, 0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem', boxShadow: '0 2px 12px rgba(217, 119, 6, 0.12)',
          }}>
            💡
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--brown-deep)', marginBottom: '0.5rem' }}>
              关于这份路线图
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              以上是我们现在的规划，时间节点可能随实际进展调整。
              <strong style={{ color: 'var(--brown-mid)' }}> 我们承诺保持透明</strong>
              ——进展顺利时会告诉你，遇到困难时也不会遮掩。
              如果你对这件事感兴趣，欢迎关注我们的进展。
            </p>
          </div>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .roadmap-grid { grid-template-columns: 1fr !important; gap: 1.25rem !important; }
        }
        @media (max-width: 768px) {
          .roadmap-title { margin-bottom: 2.5rem !important; }
          .phase-card [style*="0.98rem"] { font-size: 1.05rem !important; }
          .phase-card [style*="0.73rem"] { font-size: 0.82rem !important; }
          .phase-card [style*="0.79rem"] { font-size: 0.9rem !important; }
          .phase-card [style*="0.68rem"] { font-size: 0.76rem !important; }
          .roadmap-note { padding: 1.25rem 1.5rem !important; flex-direction: column; gap: 0.85rem; }
          .roadmap-note p { font-size: 0.95rem !important; }
          .roadmap-note > div:first-child { width: 40px; height: 40px; font-size: 1.2rem; }
        }
        .phase-card { transition: box-shadow 0.3s ease, transform 0.3s ease; }
      `}</style>
    </section>
  )
}
