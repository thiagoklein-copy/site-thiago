import { useEffect, useRef } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

export default function ProcessSection() {
  const { lang } = useLanguage()
  const t = messages[lang].home.process
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = Array.from(grid.querySelectorAll('.process-card'))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        cards.forEach((card, index) => {
          const delay = index * 180
          setTimeout(() => {
            card.classList.add('process-card-visible')
          }, delay)
        })

        observer.disconnect()
      },
      { threshold: 0.35 }
    )

    observer.observe(grid)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative border-t border-white/10 pt-16 pb-12 sm:pt-20 sm:pb-14 lg:pt-24 lg:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center sm:mb-20">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            {t.subheading}
          </p>
        </div>

        <div ref={gridRef} className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {t.steps.map((item, index) => (
            <article
              key={index}
              className="process-card relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-amber-accent bg-amber-accent/20 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/75">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <a
            href="https://wa.me/5551998655005"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/15 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:border-white hover:bg-white/25"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
