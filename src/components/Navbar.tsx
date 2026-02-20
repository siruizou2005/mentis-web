import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const navLinks = [
  { label: '核心功能', href: '#features' },
  { label: '工作原理', href: '#how' },
  { label: '适用场景', href: '#personas' },
  { label: '开发进度', href: '#roadmap' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      className={scrolled ? 'scrolled' : ''}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
        transition: 'all 0.4s ease',
        paddingTop: `calc(${scrolled ? '0.6rem' : '1rem'} + env(safe-area-inset-top, 0px))`,
        paddingBottom: scrolled ? '0.6rem' : '1rem',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        background: scrolled ? 'rgba(253, 248, 239, 0.94)' : 'rgba(253, 248, 239, 0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(195, 155, 80, 0.25)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(120, 73, 26, 0.08)' : 'none',
      }}
    >
      <div className="container navbar-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minWidth: 0 }}>
        {/* Logo */}
        <a href="#" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flexShrink: 1 }}>
          <div style={{
            width: 38, height: 38,
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            borderRadius: 11,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 3px 12px rgba(217, 119, 6, 0.3)',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 9h10M3 13h12M3 17h8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700,
              color: 'var(--brown-deep)', letterSpacing: '0.02em',
            }}>教材帮手</div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.57rem',
              color: 'var(--amber)', letterSpacing: '0.1em', marginTop: -1,
            }}>Mentis</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }} className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <a href="#cta" className="nav-cta-btn">关注进展</a>
        </nav>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={menuOpen}
          style={{
          display: 'none', background: 'none', border: 'none',
          cursor: 'pointer', padding: 8, color: 'var(--brown-deep)',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></>
            }
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu-dropdown"
            style={{
              background: 'rgba(253, 248, 239, 0.98)',
              borderTop: '1px solid var(--border-faint)',
              padding: '1rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '0',
            }}
          >
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
                padding: '0.75rem 0', fontSize: '1rem',
                color: 'var(--text-secondary)',
                borderBottom: '1px solid var(--border-faint)',
              }}>{link.label}</a>
            ))}
            <a href="#cta" onClick={() => setMenuOpen(false)} style={{
              marginTop: '0.5rem', padding: '0.75rem', textAlign: 'center',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: 'white', borderRadius: 10, fontWeight: 600,
            }}>关注进展</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          border-radius: 8px;
          transition: all 0.2s;
        }
        .nav-link:hover {
          color: var(--amber);
          background: var(--amber-pale);
        }
        .nav-cta-btn {
          margin-left: 0.75rem;
          padding: 0.55rem 1.4rem;
          font-size: 0.88rem;
          font-weight: 600;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          border-radius: 100px;
          box-shadow: 0 3px 14px rgba(217, 119, 6, 0.3);
          transition: all 0.25s;
        }
        .nav-cta-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(217, 119, 6, 0.45);
        }
        @media (max-width: 768px) {
          header {
            padding-top: calc(1rem + max(env(safe-area-inset-top, 0px), 44px)) !important;
          }
          header.scrolled { padding-top: calc(0.6rem + max(env(safe-area-inset-top, 0px), 44px)) !important; }
          .navbar-inner { gap: 0.5rem; overflow: hidden; }
          .navbar-logo { min-width: 0; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
            min-width: 44px;
            min-height: 44px;
            padding: 10px;
            -webkit-tap-highlight-color: transparent;
          }
          .mobile-menu-dropdown {
            padding: 0 1.25rem 1rem !important;
          }
          .mobile-menu-dropdown a {
            padding: 0.9rem 0 !important;
            font-size: 1.05rem !important;
            min-height: 48px;
            display: flex;
            align-items: center;
            -webkit-tap-highlight-color: transparent;
          }
        }
      `}</style>
    </motion.header>
  )
}
