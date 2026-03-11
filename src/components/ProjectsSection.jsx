import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CASES } from '../data/cases'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

// Seleciona os primeiros cases do portfólio para aparecerem na home
const HOME_PROJECTS = CASES.slice(0, 6)

function ProjectCard({ project, index, lang, localizePath }) {
  const client = (lang === 'en' && project.clientEn) ? project.clientEn : project.client
  const title = (lang === 'en' && project.titleEn) ? project.titleEn : project.title
  const shortTitle = (lang === 'en' && project.shortTitleEn) ? project.shortTitleEn : (project.shortTitle || project.client)
  return (
    <Link
      to={localizePath(`/portfolio/${project.id}`)}
      className="portfolio-case-card group"
      data-index={index}
    >
      <div className="portfolio-card-inner flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-sm transition-all duration-300">
        <div>
          <p className="portfolio-card-client mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-amber-accent transition-colors duration-300">
            {client}
          </p>
          <h3 className="portfolio-card-title text-lg sm:text-xl font-semibold leading-snug tracking-tight text-white transition-colors duration-300">
            {title}
          </h3>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/70">
            {shortTitle}
          </span>
          <span className="portfolio-card-arrow text-lg text-white/90 transition-colors duration-300">
            ↗
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ProjectsSection() {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].home.projects
  const gridRef = useRef(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = Array.from(grid.querySelectorAll('.portfolio-case-card'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target
            const index = Number(el.dataset.index || '0')

            // atraso em função da posição: linha a linha, esquerda antes da direita
            const delay = index * 140

            setTimeout(() => {
              el.classList.add('portfolio-case-card-visible')
            }, delay)

            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.25 }
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="relative border-t border-white/10 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.heading}
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/70 sm:text-lg">
              {t.subtext}
            </p>
          </div>
          {/* CTA principal desta seção ficará abaixo dos cards */}
        </div>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {HOME_PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} lang={lang} localizePath={localizePath} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to={localizePath('/portfolio')}
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/15 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:border-white hover:bg-white/25"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  )
}
