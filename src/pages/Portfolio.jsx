import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

const FILTERS = ['all', 'funil', 'vsl', 'email', 'anuncio', 'landing']

const CASES = [
  {
    id: 'ulbra-vsl-medicina',
    href: '/portfolio/ulbra-vsl-medicina',
    size: 'large',
    client: 'Ulbra — VSL Medicina',
    clientEn: 'Ulbra — Med School',
    title: 'VSL para o curso de medicina que forma médicos com prática desde o primeiro semestre.',
    titleEn:
      'VSL for the Med School program that gives students real clinical practice from day one.',
    desc: 'Roteiro completo de VSL para captar vestibulandos para o curso de Medicina Med Ulbra.',
    descEn:
      "Full VSL script to attract applicants to Ulbra's Med School by turning a technical advantage into an emotional promise.",
    tags: ['VSL', 'Educação', 'Roteiro'],
    metaType: 'Entrega',
    metaTypeEn: 'Deliverable',
    metaValue: 'Roteiro de VSL',
    metaValueEn: 'VSL script',
    metaLabel: 'Captação de vestibulandos',
    metaLabelEn: 'Med School lead generation',
    dataTags: 'vsl funil',
  },
  {
    id: 'ulbra-vsl-psicologia',
    href: '/portfolio/ulbra-vsl-psicologia',
    size: 'large',
    client: 'Ulbra — Psicologia',
    clientEn: 'Ulbra — Psychology',
    title: 'VSL para Psicologia que transforma medo em confiança clínica.',
    titleEn:
      'VSL for Psychology that turns fear of graduating unprepared into clinical confidence.',
    desc: 'Roteiro de VSL para campanha de captação usando o medo de se formar sem preparo prático como argumento central.',
    descEn:
      'Script for a VSL built around a visceral fear: finishing a Psychology degree without feeling ready to face real patients.',
    tags: ['VSL', 'Educação', 'Psicologia'],
    metaType: 'Entrega',
    metaTypeEn: 'Deliverable',
    metaValue: 'Roteiro de VSL',
    metaValueEn: 'VSL script',
    metaLabel: 'Captação para Psicologia',
    metaLabelEn: 'Psychology recruitment',
    dataTags: 'vsl',
  },
  {
    id: 'vagas-remanescentes',
    href: '/portfolio/vagas-remanescentes',
    size: 'medium',
    client: 'Ulbra — Medicina',
    clientEn: 'Ulbra — Med School',
    title: 'Campanha de vagas remanescentes em Medicina',
    titleEn: 'Campaign for leftover Med School seats.',
    desc: 'Landing page, cards e roteiros de vídeo para transformar 10 vagas em 10 matrículas.',
    descEn:
      'Landing page, ad creatives and video scripts to turn 10 leftover seats into 10 enrolled students.',
    tags: ['Landing page', 'Anúncios', 'Educação'],
    metaType: 'Entrega',
    metaTypeEn: 'Deliverable',
    metaValue: 'LP + cards + roteiros',
    metaValueEn: 'Landing page + cards + video scripts',
    metaLabel: 'Vagas remanescentes Medicina',
    metaLabelEn: 'Leftover seats Med School',
    dataTags: 'landing anuncio',
  },
  {
    id: 'ulbra-pos-psicologia',
    href: '/portfolio/ulbra-pos-psicologia',
    size: 'large',
    client: 'Ulbra — Educação superior',
    clientEn: 'Ulbra — Graduate Programs',
    title: 'Funil completo para pós em Psicologia Clínica',
    titleEn: 'Full funnel for the Clinical Psychology postgraduate program.',
    desc: 'Landing, e-mails, roteiro, cards e WhatsApp em torno de um único insight clínico.',
    descEn:
      'Landing page, email sequence, script and social cards built around a single clinical insight.',
    tags: ['Funil completo', 'Educação'],
    metaType: 'Entrega',
    metaValue: 'Funil completo',
    metaValueEn: 'Full funnel',
    metaLabel: 'Landing · e-mails · roteiro · cards',
    metaLabelEn: 'Landing · email · script · social cards',
    dataTags: 'funil landing email anuncio',
  },
  {
    id: 'landing-destaque',
    href: '/portfolio/landing-destaque',
    size: 'medium',
    client: 'Paraflu — Mercado automotivo',
    clientEn: 'Paraflu — Automotive market',
    title: 'Landing page para captação de revendedores',
    titleEn: 'Landing page to turn repair shop owners into official Paraflu resellers.',
    desc: 'Landing page para donos de oficinas mecânicas se cadastrarem como revendedores autorizados Paraflu.',
    descEn:
      'Copy for a high-intent landing page inviting independent mechanics to become certified Paraflu distributors.',
    tags: ['Landing page', 'Anúncio', 'Automotivo'],
    metaType: 'Entrega',
    metaValue: 'Landing page',
    metaValueEn: 'Landing page',
    metaLabel: 'Captação de revendedores',
    metaLabelEn: 'Reseller acquisition',
    dataTags: 'landing anuncio',
  },
  {
    id: 'campanha-cripto',
    href: '/portfolio/campanha-cripto',
    size: 'half',
    client: 'Tasso Lago — Formação Criptotrader',
    clientEn: 'Tasso Lago — Criptotrader training',
    title: 'Sequência completa de e-mails e WhatsApp para um lançamento no mercado cripto.',
    titleEn: 'Full email + WhatsApp sequence for a crypto launch.',
    tags: ['Funil completo', 'E-mail', 'WhatsApp'],
    metaType: 'Entrega',
    metaValue: 'Sequência de 6 e-mails + 6 disparos',
    metaValueEn: '6-email + 6-message sequence',
    dataTags: 'funil email',
  },
  {
    id: 'ricos-na-america',
    href: '/portfolio/ricos-na-america',
    size: 'half',
    client: 'Ricos na América — Finanças para imigrantes',
    clientEn: 'Ricos na América — Finances for immigrants',
    title: 'E-mail que transforma uma história de 1935 em argumento de venda hoje.',
    titleEn: 'Email that turns a 1935 story into a modern investment argument.',
    desc: 'E-mail de nutrição para brasileiros que vivem nos EUA e querem investir em dólar com consistência.',
    descEn:
      'Nurture email for Brazilian immigrants in the US who want to invest in dollars with consistency and a long-term view.',
    tags: ['E-mail', 'Finanças', 'Imigrantes'],
    metaType: 'Entrega',
    metaValue: 'E-mail de nutrição',
    metaValueEn: 'Nurture email',
    metaLabel: 'Finanças para brasileiros nos EUA',
    metaLabelEn: 'Finances for Brazilians in the US',
    dataTags: 'email',
  },
  {
    id: 'ulbra-cartas-venda',
    href: '/portfolio/ulbra-cartas-venda',
    size: 'third',
    client: 'Ulbra — Cartas de Venda',
    clientEn: 'Ulbra — Sales letters',
    title: 'Três cartas de venda para cursos da área da saúde.',
    titleEn: 'Three long-form sales letters for health-related programs.',
    desc: 'Mesmo argumento central, três cartas diferentes para Psicologia, Medicina Veterinária e Fonoaudiologia.',
    descEn:
      'Same strategic argument, three different long-form letters for Psychology, Veterinary Medicine and Speech Therapy.',
    tags: ['Carta de venda', 'Educação', 'Long form'],
    metaType: 'Entrega',
    metaValue: '3 cartas de venda',
    metaValueEn: '3 sales letters',
    metaLabel: 'Psico · Vet · Fono',
    metaLabelEn: 'Psychology · Vet · Speech Therapy',
    dataTags: 'funil',
  },
  {
    id: 'ultec-escola-empreendedorismo',
    href: '/portfolio/ultec-escola-empreendedorismo',
    size: 'half',
    client: 'Ultec — Escola de Empreendedorismo',
    clientEn: 'Ultec — School of Entrepreneurship',
    title: 'Site institucional e 4 landing pages para a nova escola de empreendedorismo.',
    titleEn:
      'Full website and four course landing pages for the new entrepreneurship school.',
    desc: 'Copy para o lançamento da Ultec: site completo e 4 landing pages de curso, alinhadas ao público de alta performance.',
    descEn:
      'Copy for the launch of Ultec: main site plus four course-specific landing pages, tailored to high-performance audiences.',
    tags: ['Landing page', 'Site', 'Educação'],
    metaType: 'Entrega',
    metaValue: 'Site + 4 LPs',
    metaValueEn: 'Website + 4 LPs',
    metaLabel: 'Business · Tech · Jornalismo · Marketing',
    metaLabelEn: 'Business · Tech · Journalism · Marketing',
    dataTags: 'landing funil',
  },
  {
    id: 'ulbra-saude-tech',
    href: '/portfolio/ulbra-saude-tech',
    size: 'half',
    client: 'Ulbra — Saúde & Tecnologia',
    clientEn: 'Ulbra — Health & Technology',
    title: 'Landing pages para Fisioterapia, Farmácia e Ciências da Computação.',
    titleEn: 'Three landing pages for Physiotherapy, Pharmacy and Computer Science.',
    desc: '3 LPs ajustadas para a dor específica de cada curso, mantendo o argumento central de prática real desde o início.',
    descEn:
      'Three LPs tuned to the specific fears and ambitions of each area, all anchored on early hands-on practice and academic credibility.',
    tags: ['Landing page', 'Educação', 'Saúde & Tech'],
    metaType: 'Entrega',
    metaValue: '3 landing pages',
    metaValueEn: '3 landing pages',
    metaLabel: 'Fisioterapia · Farmácia · Ciência da Computação',
    metaLabelEn: 'Physiotherapy · Pharmacy · Computer Science',
    dataTags: 'landing',
  },
  {
    id: 'ulbra-transferencia-70',
    href: '/portfolio/ulbra-transferencia-70',
    size: 'half',
    client: 'Ulbra',
    clientEn: 'Ulbra',
    title: 'Landing page de transferência com 70% de desconto no 1º semestre.',
    titleEn: 'Transfer landing page with 70% off the first semester.',
    desc: 'Copy para campanha de transferência com 70% de desconto no 1º semestre de 2026 e continuidade de bolsa até a formatura.',
    descEn:
      'Copy for a transfer campaign combining a bold first-semester discount with long-term scholarship continuity.',
    tags: ['Landing page', 'Educação', 'Captação'],
    metaType: 'Entrega',
    metaValue: 'Landing page de transferência',
    metaValueEn: 'Transfer landing page',
    metaLabel: '70% 1º semestre 2026',
    metaLabelEn: '70% off · 1st semester 2026',
    dataTags: 'landing',
  },
]

const DESTAQUE = {
  id: 'ulbra-direito-sija',
}

const CARD_MIN_HEIGHT = 'min-h-[300px] sm:min-h-[320px]'

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const gridRef = useRef(null)
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].portfolio

  const matchesFilter = (dataTags) => {
    if (filter === 'all') return true
    return (dataTags || '').includes(filter)
  }

  const filteredCases = CASES.filter((c) => matchesFilter(c.dataTags))

  // Scroll reveal para os cards
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target
            setTimeout(() => {
              el.classList.add('portfolio-case-card-visible')
            }, 80 * i)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.08 }
    )
    const cards = grid.querySelectorAll('.portfolio-case-card')
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [filter])

  return (
    <main className="relative min-h-screen bg-black">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Hero — alinhado ao estilo da home */}
      <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-end">
            <div>
              <p className="mb-6 text-xs font-medium tracking-[0.15em] uppercase text-white/50">
                {t.heroKicker}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.08] tracking-tight text-white">
                {t.heroTitleLine1}
                <br />
                <span className="text-amber-accent italic">{t.heroTitleLine2Part1}</span>
                <br />
                {t.heroTitleLine2Part2}
              </h1>
            </div>
            <div className="flex flex-col justify-end pb-1">
              <p className="text-base text-white/80 leading-relaxed max-w-md">
                {t.heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-10 sm:gap-14">
                <div>
                  <div className="text-2xl font-semibold text-white">+R$10M</div>
                  <div className="text-xs text-white/50 mt-1">{t.statRevenueLabel}</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-amber-accent">40+</div>
                  <div className="text-xs text-white/50 mt-1">{t.statBrandsLabel}</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-white">97%</div>
                  <div className="text-xs text-white/50 mt-1">{t.statSatisfactionLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-white/10 max-w-6xl mx-auto" />

      {/* Filtros */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-xs font-medium tracking-[0.1em] uppercase text-white/50 mr-1">
            {t.filterLabel}
          </span>
          {FILTERS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`portfolio-filter-btn px-4 py-2 text-sm rounded-lg border transition-all ${
                filter === id
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white/70 border-white/20 hover:border-white/40 hover:text-white'
              }`}
              data-filter={id}
            >
              {t.filters[id]}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de cases */}
      <div
        ref={gridRef}
        className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-12 sm:pb-14 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
      >
        {filteredCases.map((caseItem) => (
          <Link
            key={caseItem.id}
            to={localizePath(caseItem.href)}
            data-tags={caseItem.dataTags}
            className={`portfolio-case-card group ${CARD_MIN_HEIGHT}`}
          >
            <div className="portfolio-card-inner flex flex-col justify-between h-full min-h-[280px] sm:min-h-[300px] p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300">
              <div>
                <p className="portfolio-card-client text-[11px] font-medium tracking-[0.15em] uppercase text-white/50 mb-3 transition-colors duration-300">
                  {lang === 'en' && caseItem.clientEn ? caseItem.clientEn : caseItem.client}
                </p>
                <h2 className="portfolio-card-title text-xl sm:text-2xl font-semibold leading-tight text-white tracking-tight transition-colors duration-300">
                  {lang === 'en' && caseItem.titleEn ? caseItem.titleEn : caseItem.title}
                </h2>
                {caseItem.desc && (
                  <p className="portfolio-card-desc mt-3 text-sm text-white/70 leading-relaxed max-w-md transition-colors duration-300">
                    {lang === 'en' && caseItem.descEn ? caseItem.descEn : caseItem.desc}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {caseItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="portfolio-card-tag text-[11px] tracking-wider uppercase border border-[#D4A553]/70 text-amber-accent px-2.5 py-1 rounded-lg transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-end justify-between mt-6">
                <div>
                  {caseItem.metaType && (
                    <div className="portfolio-card-meta-type text-[11px] tracking-wider uppercase text-white/50 mb-1 transition-colors duration-300">
                      {lang === 'en' && caseItem.metaTypeEn ? caseItem.metaTypeEn : caseItem.metaType}
                    </div>
                  )}
                  {caseItem.metaValue && (
                    <div className="portfolio-card-meta-value text-lg sm:text-xl font-semibold text-white transition-colors duration-300">
                      {lang === 'en' && caseItem.metaValueEn ? caseItem.metaValueEn : caseItem.metaValue}
                    </div>
                  )}
                  {caseItem.metaLabel && (
                    <div className="portfolio-card-meta-label text-xs text-white/50 mt-0.5 transition-colors duration-300">
                      {lang === 'en' && caseItem.metaLabelEn ? caseItem.metaLabelEn : caseItem.metaLabel}
                    </div>
                  )}
                </div>
                <span className="portfolio-card-arrow text-lg text-white/90 transition-colors duration-300">
                  ↗
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* Card destaque — mesmo padrão dos outros, com badges */}
        {(filter === 'all' || filter === 'vsl') && (
          <Link
            to={localizePath(`/portfolio/${DESTAQUE.id}`)}
            className={`portfolio-case-card group ${CARD_MIN_HEIGHT}`}
            data-tags="vsl"
          >
            <div className="portfolio-card-inner flex flex-col justify-between h-full min-h-[280px] sm:min-h-[300px] p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300">
              <div>
                <p className="portfolio-card-client text-[11px] font-medium tracking-[0.15em] uppercase text-white/50 mb-3 transition-colors duration-300">
                  {t.highlightClient}
                </p>
                <h2 className="portfolio-card-title text-xl sm:text-2xl font-semibold leading-tight text-white tracking-tight transition-colors duration-300">
                  "{t.highlightQuote}"
                </h2>
                <p className="portfolio-card-desc mt-3 text-sm text-white/70 leading-relaxed transition-colors duration-300">
                  {t.highlightDesc}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {t.highlightTags.map((tag) => (
                    <span
                      key={tag}
                      className="portfolio-card-tag text-[11px] tracking-wider uppercase border border-[#D4A553]/70 text-amber-accent px-2.5 py-1 rounded-lg transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-end justify-between mt-6">
                <div>
                  <div className="portfolio-card-meta-type text-[11px] tracking-wider uppercase text-white/50 mb-1 transition-colors duration-300">
                    {t.highlightType}
                  </div>
                  <div className="portfolio-card-meta-value text-lg sm:text-xl font-semibold text-white transition-colors duration-300">
                    {t.highlightValue}
                  </div>
                </div>
                <span className="portfolio-card-arrow text-lg text-white/90 transition-colors duration-300">↗</span>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* CTA antes do rodapé */}
      <section className="relative border-t border-white/10 bg-black py-10 sm:py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl sm:text-3xl font-semibold leading-snug text-white">
            {t.ctaLine1}
            <br />
            {t.ctaLine2}<span className="text-amber-accent italic">{t.ctaLine2Italic}</span>
          </p>
          <a
            href="https://wa.me/5551998655005"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow mt-5 inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
