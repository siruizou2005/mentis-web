import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'

type TreeNode = {
  label: string
  type?: 'chapter' | 'section' | 'leaf'
  badge?: string
  badgeColor?: string
  badgeBg?: string
  children?: TreeNode[]
}

const treeData: TreeNode[] = [
  {
    label: '人教版 · 数学 · 八年级上册',
    type: 'chapter',
    children: [
      {
        label: '第十一章 三角形',
        type: 'section',
        children: [
          { label: '11.1 与三角形有关的线段', type: 'leaf', badge: '知识体系 · 例题逻辑', badgeColor: '#d97706', badgeBg: '#fef3c7' },
          { label: '11.2 与三角形有关的角', type: 'leaf', badge: '考点变式归纳', badgeColor: '#c2410c', badgeBg: '#fff1ec' },
          { label: '11.3 多边形及其内角和', type: 'leaf', badge: '易错陷阱整理', badgeColor: '#b45309', badgeBg: '#fffbf0' },
        ],
      },
      {
        label: '第十二章 全等三角形',
        type: 'section',
        children: [
          { label: '12.1 全等三角形', type: 'leaf', badge: '知识体系 · 例题逻辑', badgeColor: '#d97706', badgeBg: '#fef3c7' },
          { label: '12.2 三角形全等的判定', type: 'leaf', badge: '多解法对比 · 变式归纳', badgeColor: '#65a30d', badgeBg: '#f1f8e9' },
        ],
      },
    ],
  },
]

function TreeItem({ node, depth = 0, delay = 0 }: { node: TreeNode; depth?: number; delay?: number }) {
  const [open, setOpen] = useState(depth < 2)
  const hasChildren = !!node.children?.length
  const indentColors = ['#d97706', '#c2410c', '#b45309', '#65a30d']
  const c = indentColors[depth % indentColors.length]

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div
        onClick={() => hasChildren && setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 0.65rem',
          marginLeft: depth * 18,
          borderRadius: 8,
          cursor: hasChildren ? 'pointer' : 'default',
          transition: 'background 0.18s',
          borderLeft: depth > 0 ? `2px solid ${c}20` : 'none',
          marginBottom: 2,
        }}
        onMouseEnter={e => hasChildren && ((e.currentTarget as HTMLElement).style.background = `${c}08`)}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
      >
        {hasChildren ? (
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.18 }} style={{ color: c, flexShrink: 0 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.span>
        ) : (
          <span style={{ width: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: c, opacity: 0.5, display: 'block' }} />
          </span>
        )}

        {node.type === 'chapter' && (
          <span style={{ fontSize: '0.85rem', marginRight: 2 }}>📖</span>
        )}
        {node.type === 'section' && (
          <span style={{ fontSize: '0.78rem', marginRight: 2 }}>📑</span>
        )}

        <span style={{
          fontSize: depth === 0 ? '0.87rem' : '0.82rem',
          fontWeight: depth === 0 ? 600 : 400,
          color: depth === 0 ? 'var(--brown-deep)' : 'var(--text-secondary)',
          flex: 1,
        }}>
          {node.label}
        </span>

        {node.badge && (
          <span style={{
            fontSize: '0.6rem', padding: '0.16rem 0.5rem', borderRadius: 100,
            background: node.badgeBg, color: node.badgeColor,
            border: `1px solid ${node.badgeColor}28`,
            fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            {node.badge}
          </span>
        )}
      </div>

      <AnimatePresence>
        {open && node.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            {node.children.map((child, i) => (
              <TreeItem key={child.label} node={child} depth={depth + 1} delay={i * 0.05} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function TreeVisualization() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{ padding: 'var(--section-py) 0', background: 'var(--bg-section-alt)' }}>
      <div className="container">
        <div className="tree-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
          >
            <div className="section-label">CURRICULUM TREE</div>
            <h2 className="section-title" style={{ marginBottom: '1.25rem' }}>
              精准挂载<br /><em>教材目录树</em>
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '100%' }}>
              我们希望所有教研资源都以教材章节为索引。教师不需要搜索、不需要筛选，按自己备课的自然逻辑，打开对应章节即可获取所需资源。
            </p>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { icon: '📚', title: '按教材版本分类', desc: '人教版、苏教版、北师大版等主流版本均计划覆盖' },
                { icon: '🎯', title: '章节颗粒度对齐', desc: '每条资源精确对应教材具体章节与知识点' },
                { icon: '🔄', title: '持续同步更新', desc: '新版教材上线后，平台对应跟进适配' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.55 }}
                  style={{
                    display: 'flex', gap: '0.85rem', alignItems: 'flex-start',
                    padding: '0.85rem 1rem', borderRadius: 12,
                    background: 'white', border: '1px solid var(--border-faint)',
                    boxShadow: '0 1px 6px rgba(120, 73, 26, 0.05)',
                  }}
                >
                  <div style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--brown-deep)', marginBottom: '0.15rem' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="warm-card" style={{ padding: '1.5rem', borderColor: 'rgba(217, 119, 6, 0.18)' }}>
              {/* Window chrome */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                marginBottom: '1.1rem', paddingBottom: '0.85rem',
                borderBottom: '1px solid var(--border-faint)',
              }}>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                    <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.55 }} />
                  ))}
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
                  color: 'var(--text-muted)', marginLeft: '0.3rem',
                }}>
                  教材目录树 · 资源挂载示意（设计稿）
                </span>
              </div>

              {treeData.map((node) => (
                <TreeItem key={node.label} node={node} depth={0} delay={0.25} />
              ))}

              <div style={{
                marginTop: '1rem', paddingTop: '0.85rem',
                borderTop: '1px solid var(--border-faint)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#d97706',
                  display: 'block', animation: 'pulse-dot 2s infinite',
                }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                  可交互演示 · 点击节点展开收起
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .tree-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 768px) {
          .tree-grid { gap: 2rem !important; }
          .tree-grid .warm-card { padding: 1.25rem !important; }
          .tree-grid [style*="marginTop: 2rem"] { margin-top: 1.5rem !important; gap: 0.65rem !important; }
          .tree-grid [style*="0.86rem"] { font-size: 0.95rem !important; }
          .tree-grid [style*="0.78rem"] { font-size: 0.9rem !important; }
          .tree-grid [style*="0.87rem"], .tree-grid [style*="0.82rem"] { font-size: 0.95rem !important; }
        }
      `}</style>
    </section>
  )
}
