import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const highlights = [
  {
    icon: '⚡',
    stat: '大幅提升',
    label: '备课效率',
    desc: '让教师从「数小时查资料」变为「分钟级精准定位」，AI 做搜集整理，教师做判断决策',
    color: '#d97706',
    bg: 'linear-gradient(135deg, #fef9ee, #fef3c7)',
    border: 'rgba(217, 119, 6, 0.2)',
  },
  {
    icon: '🌏',
    stat: '打破壁垒',
    label: '教育资源公平',
    desc: '无论身处城市还是偏远乡镇，每位教师都应该获得同等质量的教研资源与名师经验',
    color: '#c2410c',
    bg: 'linear-gradient(135deg, #fff8f5, #fff1ec)',
    border: 'rgba(194, 65, 12, 0.18)',
  },
  {
    icon: '❤️',
    stat: '查阅免费',
    label: '公益性质承诺',
    desc: '资源查阅对所有一线教师免费开放；课件导出等增值服务未来将适当收费，以支撑平台持续运营',
    color: '#65a30d',
    bg: 'linear-gradient(135deg, #f9fef5, #f1f8e9)',
    border: 'rgba(101, 163, 13, 0.2)',
  },
]

export default function Highlights() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="highlights-section" style={{ padding: 'var(--section-py) 0', background: 'var(--bg-page)' }}>
      <div className="container">
        <div ref={ref} className="highlights-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              className="highlight-card"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '2.25rem 2rem',
                borderRadius: 20,
                background: h.bg,
                border: `1px solid ${h.border}`,
                textAlign: 'center',
                boxShadow: '0 2px 16px rgba(120, 73, 26, 0.07)',
                transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              whileHover={{ y: -4, boxShadow: '0 10px 36px rgba(120, 73, 26, 0.12)' }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>{h.icon}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                fontWeight: 900, color: h.color,
                lineHeight: 1.1, marginBottom: '0.2rem',
              }}>{h.stat}</div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--brown-deep)', marginBottom: '0.7rem' }}>
                {h.label}
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {h.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .highlights-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .highlight-card { padding: 1.5rem 1.25rem !important; }
          .highlight-card [style*="1.4rem"] { font-size: 1.5rem !important; }
          .highlight-card [style*="0.88rem"] { font-size: 0.98rem !important; }
          .highlight-card [style*="0.84rem"] { font-size: 0.95rem !important; }
        }
      `}</style>
    </section>
  )
}
