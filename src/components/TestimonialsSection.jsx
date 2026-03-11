import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

function AnimatedStat({ stat, animate }) {
  const [current, setCurrent] = useState(0)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!animate) return

    const duration = 1200
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const value = Math.round(stat.value * progress)
      setCurrent(value)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [animate, stat.value])

  const displayValue = animate ? current : stat.value

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm sm:p-8">
      <div className="text-3xl font-bold text-white sm:text-4xl">
        {displayValue}
        {stat.suffix}
      </div>
      <div className="mt-1 text-sm text-white/60">{stat.label}</div>
    </div>
  )
}

function StarRating({ value, lang }) {
  const label = lang === 'en' ? `${value} out of 5 stars` : `${value} de 5 estrelas`
  return (
    <div className="flex gap-0.5" aria-label={label}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="text-amber-400">
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewCard({ review, lang }) {
  return (
    <article className="testimonials-card flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm sm:p-9">
      <div>
        <h4 className="font-semibold text-white">{review.name}</h4>
        <p className="text-sm text-white/60">{review.role}</p>
      </div>
      <p className="mt-4 flex-1 text-base leading-relaxed text-white/80">
        "{review.quote}"
      </p>
      <div className="mt-4">
        <StarRating value={5} lang={lang} />
      </div>
    </article>
  )
}

export default function TestimonialsSection() {
  const { lang } = useLanguage()
  const t = messages[lang].home.testimonials
  const sectionRef = useRef(null)
  const [animateStats, setAnimateStats] = useState(false)

  const stats = [
    { id: 'satisfaction', value: 97, suffix: '%', label: t.statSatisfaction },
    { id: 'projects', value: 200, suffix: '+', label: t.statProjects },
    { id: 'brands', value: 40, suffix: '+', label: t.statBrands },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateStats(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      className="relative border-t border-white/10 py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-3 max-w-xl text-base text-white/70 sm:text-lg">
            {t.subheading}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat) => (
            <AnimatedStat key={stat.id} stat={stat} animate={animateStats} />
          ))}
        </div>

        {/* Reviews marquee */}
        <div className="testimonials-marquee-viewport mt-14 sm:mt-16">
          <div className="testimonials-marquee-track">
            {[...t.reviews, ...t.reviews].map((review, i) => (
              <div key={i} className="testimonials-marquee-item">
                <ReviewCard review={review} lang={lang} />
              </div>
            ))}
          </div>
        </div>

        {/* Trusted by avatars */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-white/70 sm:mt-12">
          <div className="flex -space-x-2">
            {[
              'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
              'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
              'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
              'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
              'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
            ].map((src, index) => (
              <div
                key={src}
                className="h-8 w-8 rounded-full border border-white/10 bg-white/10 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`Foto de cliente ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70 sm:text-[11px]">
            {t.trustedBy}
          </p>
        </div>
      </div>
    </section>
  )
}
