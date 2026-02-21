import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const features = [
  {
    emoji: '🗺️',
    color: '#d97706',
    bg: '#fef3c7',
    border: 'rgba(217, 119, 6, 0.2)',
    title: '系统化知识体系',
    subtitle: 'Knowledge Mapping',
    desc: '希望从海量真实教学资源中提炼出完备的学科知识图谱，让每个知识点都有清晰脉络，而不是零散片段。',
    tags: ['知识图谱', '结构化输出', '多模态处理'],
  },
  {
    emoji: '💡',
    color: '#c2410c',
    bg: '#fff1ec',
    border: 'rgba(194, 65, 12, 0.18)',
    title: '名师解题逻辑提炼',
    subtitle: 'Expert Reasoning',
    desc: '深度提炼顶尖教师的解题思维链路与多元策略，将隐性教学经验显性化，让每位教师都能看见名师的思路。',
    tags: ['解题路径', '多元策略', '思维可视化'],
  },
  {
    emoji: '📋',
    color: '#b45309',
    bg: '#fffbf0',
    border: 'rgba(180, 83, 9, 0.18)',
    title: '考点变式与易错归纳',
    subtitle: 'Variant Analysis',
    desc: '系统归纳高频考点的变式题型与学生易犯错误，帮助教师提前预判课堂难点，让教学更有针对性。',
    tags: ['考点分析', '变式归纳', '易错预警'],
  },
  {
    emoji: '🌳',
    color: '#65a30d',
    bg: '#f1f8e9',
    border: 'rgba(101, 163, 13, 0.2)',
    title: '教材目录树挂载',
    subtitle: 'Curriculum Mapping',
    desc: '所有资源对齐教材章节目录，教师按备课的自然逻辑即可找到对应内容，告别碎片化的搜索体验。',
    tags: ['目录树结构', '精准定位', '零学习成本'],
  },
  {
    emoji: '🔍',
    color: '#d97706',
    bg: '#fef3c7',
    border: 'rgba(217, 119, 6, 0.2)',
    title: '多模态资源处理',
    subtitle: 'Multimodal AI',
    desc: '文本、图片、视频、音频等多种形式的教学资源，都希望能统一处理和提炼，资源来源不设限。',
    tags: ['图文解析', '视频提炼', '音频转录'],
  },
  {
    emoji: '🏛️',
    color: '#92400e',
    bg: '#fff8f0',
    border: 'rgba(146, 64, 14, 0.15)',
    title: '中心化运营管理',
    subtitle: 'Centralized Ops',
    desc: '统一运营，持续更新，保障内容质量与时效性。教师不需要维护任何东西，即来即用，专注教学本身。',
    tags: ['统一管理', '持续更新', '质量保障'],
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="warm-card"
      style={{ padding: '2rem', borderColor: feature.border, cursor: 'default' }}
      whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(120, 73, 26, 0.13)' }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: feature.bg,
        border: `1px solid ${feature.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.6rem', marginBottom: '1.25rem',
      }}>
        {feature.emoji}
      </div>

      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.15rem', color: 'var(--brown-deep)' }}>
        {feature.title}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: feature.color, letterSpacing: '0.12em', marginBottom: '0.9rem', opacity: 0.8 }}>
        {feature.subtitle}
      </div>
      <p style={{ fontSize: '0.87rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.2rem' }}>
        {feature.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {feature.tags.map(tag => (
          <span key={tag} style={{
            padding: '0.2rem 0.65rem', borderRadius: 100,
            fontSize: '0.68rem',
            background: feature.bg, color: feature.color,
            border: `1px solid ${feature.border}`,
            fontFamily: 'var(--font-mono)',
          }}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Features() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="features" style={{ padding: 'var(--section-py) 0', background: 'var(--bg-section-alt)' }}>
      <div className="container">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="features-title"
          style={{ marginBottom: '4rem' }}
        >
          <div className="section-label">CORE GOALS</div>
          <h2 className="section-title">我们希望做到的<br /><em>六件事</em></h2>
          <p className="section-subtitle">
            这是教材帮手的核心目标方向。我们相信，把这六件事做扎实，就能切实改变教师的备课与教研体验。
          </p>
        </motion.div>

        <div className="features-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}>
          {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #features .features-grid { grid-template-columns: 1fr !important; margin-bottom: 2rem; }
          #features .features-title { margin-bottom: 2.5rem !important; }
          #features .warm-card p { font-size: 0.95rem !important; }
          #features .warm-card [style*="1.05rem"] { font-size: 1.1rem !important; }
          #features .warm-card [style*="0.6rem"] { font-size: 0.72rem !important; }
          #features .warm-card [style*="0.68rem"] { font-size: 0.78rem !important; }
        }
        @media (max-width: 400px) {
          #features .warm-card { padding: 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
