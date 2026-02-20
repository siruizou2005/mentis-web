import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  radius: number; opacity: number
  color: string; pulse: number; pulseSpeed: number
}

// Warm light-mode particles — soft amber/gold tones
const COLORS = [
  'rgba(217, 119, 6,',    // amber
  'rgba(245, 158, 11,',   // amber-bright
  'rgba(194, 120, 40,',   // brown-warm
  'rgba(253, 211, 77,',   // gold-light
  'rgba(180, 83, 9,',     // amber-dark
]

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let particles: Particle[] = []
    let width = 0, height = 0

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const count = Math.floor((width * height) / 18000)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.22 + 0.05,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.007,
      }))
    }

    const drawConnections = () => {
      const maxDist = 100
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.06
            ctx.beginPath()
            ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      drawConnections()
      particles.forEach(p => {
        p.pulse += p.pulseSpeed
        const pf = 0.5 + 0.5 * Math.sin(p.pulse)
        const op = p.opacity * pf
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${op})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
      })
      animId = requestAnimationFrame(draw)
    }

    const handleResize = () => { resize(); createParticles() }
    resize(); createParticles(); draw()
    window.addEventListener('resize', handleResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}
