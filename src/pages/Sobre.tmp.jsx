import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const EXPERIENCE = [
  {
    dateLine1: 'jul 2025',
    dateLine2: 'atual',
    company: 'Ulbra',
    role: 'Copywriter Pleno',
    desc: 'VSLs, sales letters, copy para anúncios e resposta direta para performance e conversão.',
  },
  {
    dateLine1: 'mai 2024',
    dateLine2: 'jun 2025',
    company: 'Agência SPR',
    role: 'Social Media & Copy',
    desc: 'Campanhas, e-mail marketing, anúncios, landing pages e roteiros de vídeo para marcas como Dell, WEG, Gerdau e Randon.',
  },
  {
    dateLine1: 'out 2023',
    dateLine2: 'mai 2024',
    company: 'Vuê Marketing',
    role: 'Copywriter',
    desc: 'Lançamentos de infoprodutos, funis, e-mail marketing, anúncios e páginas de vendas.',
  },
  {
    dateLine1: '2021',
    dateLine2: 'atual',
    company: 'Freelancer',
    role: 'Projetos independentes',
    desc: 'Projetos pontuais e recorrentes em copy, funis, e-mails, landing pages e anúncios para diferentes segmentos.',
  },
]

const FORMACAO = [
  { name: 'Copywriter Certificado AAA — Empiricus', detail: 'Copy Camp', badge: 'Principal' },
  { name: 'Mentoria Além da Copy', detail: '2024' },
  { name: 'Marketing — PUCRS Online', detail: 'em andamento', badge: 'Em curso' },
]

export default function Sobre() {
  const heroRef = useRef(null)
  const timelineRef = useRef(null)
  const certRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const heroEl = heroRef.current
    if (heroEl) {
      const obs = new IntersectionObserver(
        ([e]) => e.isIntersecting && setHeroVisible(true),
        { threshold: 0.2 }
      )
      obs.observe(heroEl)
      return () => obs.disconnect()
    }
  }, [])

  useEffect(() => {
    const timelineEl = timelineRef.current
    if (!timelineEl) return
    const items = timelineEl.querySelectorAll('.sobre-tl-item')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('sobre-tl-visible'), i * 80)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    items.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const certEl = certRef.current
    if (!certEl) return
    const items = certEl.querySelectorAll('.sobre-cert-item')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('sobre-cert-visible'), i * 80)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    items.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main className="relative min-h-screen bg-black">
      <div className="mesh-gradient pointer-events-none absolute inset-0" aria-hidden />

      {/* Hero: duas colunas — texto | foto + chips */}
      <section
        ref={heroRef}
        className="sobre-hero relative z-10 grid min-h-screen max-w-6xl grid-cols-1 items-center gap-0 px-4 sm:px-6 lg:mx-auto lg:grid-cols-[1fr,420px] lg:px-8"
      >
        <div className="sobre-hero-left pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div
            className={`sobre-hero-pill mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/50 transition-all duration-500 ${
              heroVisible ? 'sobre-fade-up opacity-100' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            Copywriter · Resposta direta
          </div>

          <h1
            className={`sobre-hero-name mb-8 text-4xl font-semibold leading-[0.97] tracking-tight text-white sm:text-5xl lg:text-6xl transition-all duration-500 ${
              heroVisible ? 'sobre-fade-up opacity-100' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Prazer,<br />
            <span className="text-amber-accent italic">Thiago</span>
            <br />
            Klein.
          </h1>

          <div
            className={`sobre-hero-bio max-w-xl space-y-4 text-base leading-relaxed text-white/80 sm:text-lg transition-all duration-500 ${
              heroVisible ? 'sobre-fade-up opacity-100' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <p>
              Durante muito tempo, escrever era a última coisa que eu queria fazer. Na escola, deixava as redações para a madrugada anterior à entrega. Não era preguiça — era bloqueio mesmo.
            </p>
            <p>
              Um dia descobri que escrever não é seguir fórmulas. <strong className="font-semibold text-white">É entender de pessoas.</strong> O texto é o que se vê. O que converte é o que está por trás dele.
            </p>
            <p>
              Hoje trabalho como copywriter especializado em funis e campanhas de resposta direta. Já desenvolvi projetos para Ulbra, Dell, WEG, Gerdau, Randon e Zenklub — e o que aprendi em cada um está em cada texto que entrego hoje.
            </p>
          </div>

          <div
            className={`mt-10 flex flex-wrap gap-3 transition-all duration-500 ${
              heroVisible ? 'sobre-fade-up opacity-100' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <a
              href="https://wa.me/5551998655005"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/15 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:border-white hover:bg-white/25"
            >
              Fale comigo
            </a>
            <Link
              to="/portfolio"
              className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
            >
              Ver portfólio →
            </Link>
          </div>
        </div>

        <div
          className={`sobre-hero-right relative flex items-center py-12 lg:min-h-[80vh] lg:py-24 transition-all duration-500 ${
            heroVisible ? 'sobre-fade-up opacity-100' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="sobre-photo-glow absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-accent/10 blur-3xl pointer-events-none" />
          <div className="sobre-photo-wrap relative w-full">
            <div className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:h-[440px] lg:h-[520px]">
              <img
                src="/foto-perfil.png"
                alt="Thiago Klein - Copywriter"
                className="h-full w-full object-cover object-center saturate-0"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      <hr className="relative z-10 border-0 border-t border-white/10" />

      {/* Experiência — timeline */}
      <section className="relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-wrap items-baseline gap-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">
              Trajetória
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Experiência
            </h2>
          </div>

          <div ref={timelineRef} className="sobre-timeline relative">
            {EXPERIENCE.map((item, i) => (
              <div
                key={`${item.company}-${i}`}
                className="sobre-tl-item grid grid-cols-1 gap-0 border-b border-white/10 py-8 first:pt-0 last:border-b-0 sm:grid-cols-[140px_1fr] sm:gap-0 sm:py-9"
              >
                <div className="sobre-tl-left mb-2 sm:mb-0 sm:pr-8 sm:pt-1">
                  <p className="text-xs font-medium leading-snug text-white/50 sm:text-sm">
                    {item.dateLine1}
                    <br />
                    {item.dateLine2}
                  </p>
                </div>
                <div className="sobre-tl-right relative border-l-0 pl-0 sm:border-l sm:border-white/10 sm:pl-10">
                  <span className="sobre-tl-dot absolute -left-[5px] top-2 hidden h-2.5 w-2.5 rounded-full border border-white/10 bg-white/5 sm:block" />
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
                    {item.company}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white sm:text-xl">{item.role}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formação e certificações */}
      <section className="relative z-10 border-t border-white/10 bg-white/[0.02] py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Formação e<br />
              certificações
            </h2>
            <ul ref={certRef} className="space-y-0">
              {FORMACAO.map((item, i) => (
                <li
                  key={item.name}
                className="sobre-cert-item flex flex-wrap items-start gap-4 border-b border-white/10 py-6 last:border-b-0"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-amber-accent">
                    {i === 0 ? '✦' : i === 1 ? '◈' : '○'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="mt-0.5 text-sm text-white/50">{item.detail}</p>
                  </div>
                  {item.badge && (
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                        item.badge === 'Em curso'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-amber-accent/25 bg-amber-accent/10 text-amber-accent'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative z-10 overflow-hidden py-24 sm:py-28 lg:py-32">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-accent/5 blur-3xl pointer-events-none" />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
            Pronto para o próximo passo?
          </p>
          <h2 className="mb-10 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
            A próxima campanha que converte começa com{' '}
            <span className="text-amber-accent italic">uma mensagem.</span>
          </h2>
          <a
            href="https://wa.me/5551998655005"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/40 bg-white/15 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition-all hover:border-white hover:bg-white/25"
          >
            Fale comigo
          </a>
        </div>
      </section>

      <div className="relative z-10 border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            ← Voltar ao início
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
