import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

const DURATION_MS = 3000
const DURATION_MS_MOBILE = 5000

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function useCountUp(target, isActive, durationMs = DURATION_MS) {
  const [displayValue, setDisplayValue] = useState(0)
  const startTimeRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isActive) return

    startTimeRef.current = null

    function tick(timestamp) {
      if (startTimeRef.current === null) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = easeOutExpo(progress)
      const value = Math.round(eased * target)
      setDisplayValue(value)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, isActive, durationMs])

  return displayValue
}

function StatCard({ target, prefix = '', suffix = '', label, isActive, durationMs }) {
  const value = useCountUp(target, isActive, durationMs)
  return (
    <div className="flex flex-col items-center text-center font-sans">
      <p className="text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {prefix}{value}{suffix === '+' ? <span className="text-amber-accent">+</span> : suffix}
      </p>
      <p className="mt-1.5 text-xs font-normal leading-snug text-white/60 sm:mt-3 sm:text-base md:mt-4 md:text-lg">
        {label}
      </p>
    </div>
  )
}

/** Destaque do topo: 10+ milhões em cima, com "milhões" em negrito */
function HeroStat({ isActive, durationMs, unit, label }) {
  const value = useCountUp(10, isActive, durationMs)
  return (
    <div className="flex flex-col items-center text-center font-sans">
      <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {value}<span className="text-amber-accent">+</span> <span className="font-bold">{unit}</span>
      </p>
      <p className="mt-2 text-base font-normal text-white/70 sm:mt-3 sm:text-lg md:text-xl">
        {label}
      </p>
    </div>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])
  return isMobile
}

export default function RevenueHighlight() {
  const { lang } = useLanguage()
  const t = messages[lang].home.revenue
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasAnimatedRef = useRef(false)
  const isMobile = useIsMobile()
  const durationMs = isMobile ? DURATION_MS_MOBILE : DURATION_MS

  const rowStats = [
    { target: 40, prefix: '', suffix: '+', label: t.statBrands },
    { target: 6, prefix: '', suffix: '+', label: t.statYears },
  ]

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!entry.isIntersecting || hasAnimatedRef.current) return
        hasAnimatedRef.current = true
        setIsVisible(true)
      },
      { threshold: 0.25, rootMargin: '0px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative font-sans bg-black pt-10 pb-14 sm:pt-14 sm:pb-20 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28"
      aria-labelledby="revenue-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 id="revenue-heading" className="sr-only">
          {t.srOnly}
        </h2>

        {/* Destaque: 10+ milhões em cima, sozinho */}
        <div className="mb-12 sm:mb-14 md:mb-16">
          <HeroStat isActive={isVisible} durationMs={durationMs} unit={t.heroUnit} label={t.heroLabel} />
        </div>

        {/* 40+ marcas e 6+ anos na mesma linha (mobile e desktop) */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          {rowStats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col border-r border-white/10 pr-4 last:border-r-0 last:pr-0 sm:pr-8"
            >
              <StatCard
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                isActive={isVisible}
                durationMs={durationMs}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
