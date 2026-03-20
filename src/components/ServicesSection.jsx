import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

const WHATSAPP_URL = 'https://wa.me/5551998655005'

export default function ServicesSection() {
  const { lang } = useLanguage()
  const t = messages[lang].home.services
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(el)
    const fallbackTimer = window.setTimeout(() => setIsVisible(true), 2000)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="servicos"
      className="services-cards-section relative border-t border-white/10 bg-black py-14 sm:py-16 lg:py-20"
      aria-labelledby="servicos-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="servicos-heading"
          className="mb-2 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
        >
          {t.heading}
        </h2>
        <p className="mb-8 text-center text-base text-white/80 sm:mb-10 sm:text-lg">
          {t.subheading}
        </p>

        <div className="services-cards-grid grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 lg:items-stretch">
          {t.list.map((service) => (
            <div
              key={service.id}
              className={`services-card-wrapper h-full rounded-2xl border border-white/10 bg-white/[0.04] ${
                isVisible ? 'services-card-visible' : ''
              }`}
            >
              <article className="flex h-full min-h-0 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                {service.description}
              </p>

              <div className="mt-4 flex-1 min-h-0">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                  {t.whatIncludes}
                </h4>
                <ul className="mt-2 space-y-1.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/75">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-amber-accent" aria-hidden>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-white/60 sm:text-sm">
                  {service.subtext}
                </p>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="services-card-cta mt-5 inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/15"
              >
                {service.cta}
              </a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
