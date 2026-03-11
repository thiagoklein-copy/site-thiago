import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

const TAG_STAGGER_MS = 85
const TAG_BASE_DELAY_MS = 620

export default function AboutSection() {
  const { lang } = useLanguage()
  const t = messages[lang].home.about
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.4, rootMargin: '0px 0px 0px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className={`relative border-t border-white/10 bg-black py-20 sm:py-24 lg:py-32 ${isVisible ? 'about-visible' : ''}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">
          {/* Coluna do texto */}
          <div className="flex flex-col">
            {/* Curtain Reveal: título linha por linha */}
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              <span className="about-curtain-line">
                <span className="about-curtain-line-inner">{t.greeting}</span>
              </span>
              <span className="about-curtain-line">
                <span className="about-curtain-line-inner">
                  {t.namePrefix}
                  <span className="text-amber-accent">{t.name}</span>
                </span>
              </span>
            </h2>
            <p className="about-body mt-6 text-base leading-relaxed text-white/85 sm:text-lg">
              {t.para1}
            </p>
            <p className="about-body mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              {t.para2}
            </p>

            {/* Tags: stagger fade-up */}
            <div className="mt-10 flex flex-wrap gap-2 sm:gap-3">
              {t.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="about-tag rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white/95 transition-colors hover:bg-white/15"
                  style={{ transitionDelay: `${TAG_BASE_DELAY_MS + i * TAG_STAGGER_MS}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Trabalhos recentes: fade-in por último */}
            <a
              href="#projects"
              className="about-cta mt-10 flex flex-shrink-0 items-center gap-3 text-white/90 transition-colors hover:text-white"
            >
              <span className="text-base font-medium text-amber-accent">{t.recentWork}</span>
              <span
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/30 text-white/80"
                aria-hidden
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </a>
          </div>

          {/* Coluna da imagem – fade simples */}
          <div className="relative min-h-[280px] w-full overflow-hidden rounded-2xl bg-white/5 lg:min-h-0 lg:h-full">
            <div className="about-photo-fade h-full w-full">
              <img
                src="/foto-perfil.png"
                alt="Thiago Klein - Copywriter"
                className="h-full w-full object-cover object-center saturate-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
