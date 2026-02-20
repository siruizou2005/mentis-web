import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function submitEarlyAccessEmail(email: string): Promise<boolean> {
  const res = await fetch('/api/early-access', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || '提交失败')
  }
  return true
}

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmed = email.trim()
    if (!trimmed) {
      setError('请输入邮箱地址')
      return
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('请输入有效的邮箱格式')
      return
    }
    setLoading(true)
    try {
      const ok = await submitEarlyAccessEmail(trimmed)
      if (ok) setSubmitted(true)
      else setError('提交失败，请稍后重试')
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* CTA section */}
      <section id="cta" style={{
        padding: 'var(--section-py) 0',
        background: 'linear-gradient(160deg, #fef9ee 0%, #fef4dd 50%, #fef9ee 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '-20%', right: '10%',
            width: '40vw', height: '40vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(253, 211, 77, 0.25) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', left: '-5%',
            width: '30vw', height: '30vw', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.12) 0%, transparent 70%)',
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}
          >
            {/* Icon */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
              <div style={{
                width: 76, height: 76, borderRadius: '50%',
                background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                border: '2px solid rgba(217, 119, 6, 0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.2rem', animation: 'float 3s ease-in-out infinite',
                boxShadow: '0 8px 32px rgba(217, 119, 6, 0.15)',
              }}>
                🌱
              </div>
            </div>

            <div className="section-label" style={{ margin: '0 auto 1.25rem' }}>
              公益性质 · 现已开放关注申请
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              fontWeight: 900, lineHeight: 1.2,
              color: 'var(--brown-deep)', marginBottom: '1.1rem',
            }}>
              让好的教研资源<br />
              <span style={{
                background: 'linear-gradient(120deg, #d97706, #c2410c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                不再是少数人的特权
              </span>
            </h2>

            <p style={{
              fontSize: '1rem', color: 'var(--text-secondary)',
              lineHeight: 1.9, marginBottom: '2.5rem',
              maxWidth: 560, margin: '0 auto 2.5rem',
            }}>
              教材帮手的核心资源查阅功能<strong style={{ color: 'var(--amber)', fontWeight: 600 }}>对所有一线教师免费开放</strong>，
              课件导出等增值服务未来将适当收费以支撑平台持续运营。
              无论您身处哪里，都欢迎申请早期关注资格，留下邮箱，我们将在平台开放时第一时间通知您。
            </p>

            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '0.75rem',
                  maxWidth: 460, margin: '0 auto 2rem',
                  flexWrap: 'wrap',
                }}
              >
                <div className="cta-form-row" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="your@school.edu.cn"
                    required
                    disabled={loading}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'cta-email-error' : undefined}
                    className={`cta-email-input${error ? ' cta-email-input--error' : ''}`}
                    style={{
                      flex: 1, minWidth: 200,
                      padding: '0.85rem 1.2rem',
                      background: 'white',
                      borderRadius: 100, color: 'var(--brown-deep)',
                      fontSize: '0.92rem', outline: 'none',
                      fontFamily: 'var(--font-body)',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="cta-submit-btn"
                    style={{
                      padding: '0.85rem 1.8rem', borderRadius: 100,
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white', fontWeight: 600, fontSize: '0.92rem',
                      border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 18px rgba(217, 119, 6, 0.32)',
                      transition: 'all 0.28s', fontFamily: 'var(--font-body)',
                      whiteSpace: 'nowrap', opacity: loading ? 0.8 : 1,
                    }}
                  >
                    {loading ? '提交中...' : '申请早期关注'}
                  </button>
                </div>
                {error && (
                  <p id="cta-email-error" role="alert" style={{
                    fontSize: '0.82rem', color: 'var(--terra)',
                    margin: 0, paddingLeft: '1.2rem',
                  }}>
                    {error}
                  </p>
                )}
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  maxWidth: 460, margin: '0 auto 2rem',
                  padding: '1.1rem 1.75rem', borderRadius: 14,
                  background: '#f1f8e9', border: '1px solid rgba(101, 163, 13, 0.3)',
                  color: '#65a30d', fontSize: '0.92rem', fontWeight: 500,
                }}
              >
                ✓ 已记录！平台开放时我们会第一时间通知您。
              </motion.div>
            )}

            {/* Trust signals */}
            <div className="cta-trust" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {[
                { icon: '🔒', text: '资源查阅永久免费' },
                { icon: '📧', text: '不发送垃圾邮件' },
                { icon: '❤️', text: '教育公益，长期承诺' },
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  fontSize: '0.8rem', color: 'var(--text-muted)',
                }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#fdf4e3',
        borderTop: '1px solid var(--border-faint)',
        padding: '3rem 0 2rem',
      }}>
        <div className="container">
          {/* Logo + links row */}
          <div className="footer-main" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
            flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem',
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem' }}>
                <div style={{
                  width: 34, height: 34,
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(217, 119, 6, 0.25)',
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M3 5h14M3 9h10M3 13h12M3 17h8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--brown-deep)' }}>
                    教材帮手
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.57rem', color: 'var(--amber)', letterSpacing: '0.08em' }}>
                    Mentis
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: 260, lineHeight: 1.7 }}>
                面向教师的公益 AI 教研资源平台，让每一位教师都能站在名师肩膀上。
              </p>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brown-mid)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                  了解项目
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[['核心功能', '#features'], ['工作原理', '#how'], ['适用场景', '#personas'], ['开发进度', '#roadmap']].map(([label, href]) => (
                    <a key={href} href={href} className="footer-link">{label}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer — 天星声明 */}
          <div style={{
            padding: '1rem 1.25rem', borderRadius: 10,
            background: 'rgba(217, 119, 6, 0.05)',
            border: '1px solid rgba(217, 119, 6, 0.15)',
            marginBottom: '1.75rem',
            display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
          }}>
            <span style={{ fontSize: '0.9rem', flexShrink: 0, marginTop: 1 }}>ℹ️</span>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: 'var(--brown-mid)' }}>声明：</strong>
              本平台「教材帮手」与天星教育旗下产品「天星教材帮」及相关服务
              <strong style={{ color: 'var(--brown-mid)' }}>无任何关联</strong>，两者为独立项目，请勿混淆。
            </p>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '0.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-faint)',
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              © 2026 教材帮手 · 公益教研平台
            </span>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['隐私政策', '联系我们'].map(item => (
                <a key={item} href="#" className="footer-link footer-link-sm">{item}</a>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          .cta-email-input {
            border: 1.5px solid rgba(195, 155, 80, 0.35);
            box-shadow: 0 2px 8px rgba(120, 73, 26, 0.06);
            transition: border-color 0.2s, box-shadow 0.2s;
          }
          .cta-email-input:focus {
            border-color: rgba(217, 119, 6, 0.55);
            box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1);
          }
          .cta-email-input--error {
            border-color: rgba(194, 65, 12, 0.5) !important;
          }
          .cta-email-input--error:focus {
            border-color: rgba(194, 65, 12, 0.6) !important;
            box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.1);
          }
          .cta-submit-btn:not(:disabled):hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 28px rgba(217, 119, 6, 0.45);
          }
          .footer-link {
            font-size: 0.82rem;
            color: var(--text-muted);
            transition: color 0.2s;
          }
          .footer-link:hover {
            color: var(--amber);
          }
          .footer-link-sm { font-size: 0.75rem; }
          @media (max-width: 768px) {
            #cta h2 { font-size: 1.75rem !important; }
            #cta p { font-size: 1.05rem !important; margin-bottom: 1.75rem !important; }
            .cta-form-row input { font-size: 1rem !important; padding: 0.95rem 1.25rem !important; }
            .cta-submit-btn { font-size: 1rem !important; }
            .cta-form-row { flex-direction: column !important; }
            .cta-form-row input { min-width: 0 !important; width: 100%; }
            .cta-trust { gap: 1rem !important; font-size: 0.88rem; }
          }
          @media (max-width: 480px) {
            .footer-main { flex-direction: column; gap: 1.5rem; margin-bottom: 1.75rem; }
            footer { padding: 2rem 0 1.5rem !important; }
            footer p, .footer-link { font-size: 0.9rem !important; }
            .footer-bottom { flex-direction: column; align-items: flex-start !important; gap: 0.75rem; }
          }
        `}</style>
      </footer>
    </>
  )
}
