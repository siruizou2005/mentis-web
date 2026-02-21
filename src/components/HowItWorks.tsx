import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const steps = [
  {
    num: '01', color: '#d97706', bg: '#fef3c7', border: 'rgba(217, 119, 6, 0.2)',
    title: '多模态资源采集',
    desc: '从网络课程、名师讲义、练习册、真题等海量真实教学资源中采集数据，以真实课堂素材为基础，不制造、不杜撰。',
    detail: ['视频课程转录', 'PDF 讲义解析', '图文题目识别', '真题资源收录'],
    emoji: '📥',
  },
  {
    num: '02', color: '#c2410c', bg: '#fff1ec', border: 'rgba(194, 65, 12, 0.18)',
    title: 'AI 深度理解与提炼',
    desc: '大模型对原始资源进行深度语义理解，提炼知识要点、解题逻辑、考点规律，并质量筛选与去重。这是整个平台的核心技术挑战。',
    detail: ['语义理解分析', '知识点抽取', '逻辑链条梳理', '质量过滤去重'],
    emoji: '🤖',
  },
  {
    num: '03', color: '#b45309', bg: '#fffbf0', border: 'rgba(180, 83, 9, 0.18)',
    title: '结构化知识组织',
    desc: '将提炼出的零散内容转化为结构化、系统化的教研资源，按统一标准分类标注，形成清晰的知识体系而非碎片堆砌。',
    detail: ['知识点分类标注', '难度梯度划分', '关联关系建立', '多维标签体系'],
    emoji: '🗂️',
  },
  {
    num: '04', color: '#65a30d', bg: '#f1f8e9', border: 'rgba(101, 163, 13, 0.2)',
    title: '教材目录树精准挂载',
    desc: '将结构化资源与教材章节目录精准对齐。教师按自己熟悉的教材结构即可找到对应资源，零额外学习成本。',
    detail: ['章节精准对齐', '跨版本适配', '目录树导航', '实时同步更新'],
    emoji: '📚',
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="step-row"
      style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
    >
      {/* Step number column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 56 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: step.bg, border: `2px solid ${step.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem', position: 'relative', zIndex: 1,
          boxShadow: `0 4px 16px ${step.border}`,
        }}>
          {step.emoji}
        </div>
        {index < steps.length - 1 && (
          <div style={{
            width: 2, flex: 1, minHeight: 32, marginTop: 8,
            background: `linear-gradient(to bottom, ${step.border}, transparent)`,
          }} />
        )}
      </div>

      {/* Content card */}
      <div className="warm-card" style={{
        flex: 1, padding: '1.6rem 1.8rem',
        marginBottom: index < steps.length - 1 ? '1.5rem' : 0,
        borderColor: step.border,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.65rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
            color: step.color, background: step.bg,
            border: `1px solid ${step.border}`,
            padding: '0.15rem 0.6rem', borderRadius: 100, letterSpacing: '0.1em',
          }}>STEP {step.num}</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--brown-deep)' }}>
            {step.title}
          </h3>
        </div>
        <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
          {step.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {step.detail.map((d) => (
            <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem', color: step.color }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5l2 2 4.5-4" stroke={step.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {d}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="how" style={{ padding: 'var(--section-py) 0', background: 'var(--bg-page)' }}>
      <div className="container">
        <div className="how-grid">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 28 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="how-sticky-title"
          >
            <div className="section-label">HOW IT WORKS</div>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>
              四步流水线<br /><em>从数据到教研资源</em>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '100%' }}>
              这是我们设想的端到端处理链路——将零散的非结构化教学资源，转化为对教师真正有价值的结构化教研内容。
            </p>

            {/* Mini pipeline */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: '原始教学资源', color: '#d97706', bg: '#fef3c7' },
                { label: '→ AI 理解引擎', color: '#c2410c', bg: '#fff1ec' },
                { label: '→ 结构化知识', color: '#b45309', bg: '#fffbf0' },
                { label: '→ 教材目录树', color: '#65a30d', bg: '#f1f8e9' },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex', alignItems: 'center', gap: '0.7rem',
                  padding: '0.65rem 0.9rem', borderRadius: 10,
                  background: item.label === '→ 教材目录树' ? item.bg : 'white',
                  border: `1px solid ${item.label === '→ 教材目录树' ? 'rgba(101, 163, 13, 0.25)' : 'var(--border-faint)'}`,
                  boxShadow: '0 1px 4px rgba(120, 73, 26, 0.05)',
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: item.color }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div>{steps.map((step, i) => <StepCard key={step.num} step={step} index={i} />)}</div>
        </div>
      </div>
      <style>{`
        .how-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 5rem;
          align-items: start;
        }
        .how-sticky-title { position: sticky; top: 8rem; }
        @media (max-width: 900px) {
          .how-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .how-sticky-title { position: static !important; }
        }
        @media (max-width: 768px) {
          .how-grid { gap: 2rem !important; }
          #how .warm-card { padding: 1.25rem 1.5rem !important; }
          #how .warm-card p { font-size: 0.95rem !important; }
          #how .warm-card h3 { font-size: 1.1rem !important; }
          #how .warm-card [style*="0.65rem"] { font-size: 0.75rem !important; }
          #how .warm-card [style*="0.76rem"] { font-size: 0.88rem !important; }
          #how .step-row { gap: 1rem !important; }
        }
        @media (max-width: 480px) {
          #how .step-row { gap: 0.75rem; }
          #how .step-row > div:first-child { width: 44px !important; }
          #how .step-row > div:first-child > div:first-child { width: 44px !important; height: 44px !important; font-size: 1.2rem !important; }
          #how .warm-card { padding: 1rem 1.25rem !important; }
        }
      `}</style>
    </section>
  )
}
