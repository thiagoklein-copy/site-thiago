import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { getCaseBySlug, getOtherCases } from '../data/cases'
import { getCaseContent } from './caseContent'
import { DIREITO_CONTENT } from '../data/direitoCaseContent'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

const WHATSAPP_URL = 'https://wa.me/5551998655005'

const PARAFLU_CONTENT = {
  pt: {
    pill: 'Landing page · Mercado automotivo',
    heroTitle: 'Landing page para captação de revendedores da marca líder em arrefecimento.',
    metaClient: 'Paraflu',
    metaDeliverable: 'Landing page',
    metaContext: 'Captação de donos de oficinas mecânicas',
    briefingHeading: 'A oferta era boa. A copy precisava estar à altura.',
    briefingP1: 'A Paraflu é líder de mercado há mais de 50 anos no segmento de arrefecimento automotivo. O objetivo da campanha era simples: convencer donos de oficinas mecânicas a se cadastrarem como revendedores autorizados.',
    briefingP2: 'O público já conhecia o produto — a maioria já vendia ou indicava Paraflu informalmente. O trabalho foi transformar esse reconhecimento em ação concreta: preencher o formulário, oficializar a parceria e receber o brinde de boas-vindas.',
    briefingP3: 'A copy foi construída para falar direto com o dono de oficina — sem enrolação, sem linguagem corporativa. Autoridade da marca como argumento principal, benefícios concretos como suporte, visita técnica e material de exposição como reforço, e prova social de outros revendedores para fechar o ciclo.',
    copyEyebrow: 'Landing Page — Captação de revendedores · Paraflu',
    copyBadge: '✦ Copy entregue',
    heroBadge: 'EXCLUSIVO PARA DONO DE OFICINAS MECÂNICAS',
    heroTitle: 'Descubra o segredo de todo mecânico de sucesso: ser um revendedor autorizado Paraflu',
    heroP1: 'Como revendedor Paraflu, você terá acesso à marca líder em qualidade e eficiência, garantindo a satisfação dos seus clientes e aumentando a reputação do seu negócio no mercado automotivo.',
    heroP2: 'Preencha o formulário, se torne um revendedor autorizado e ganhe um brinde de boas-vindas!',
    ctaMain: 'QUERO ME TORNAR UM REVENDEDOR AUTORIZADO',
    ctaSub: 'Responda o formulário e ganhe um brinde de boas-vindas!',
    whyTitle: 'Por que se tornar um revendedor Paraflu?',
    whyList: [
      '➜ Apoio técnico e comercial: Receba suporte especializado para maximizar suas vendas.',
      '➜ Visita técnica e treinamento: Nossos técnicos visitam sua oficina para garantir a aplicação correta e fornecer treinamento detalhado.',
      '➜ Brinde de boas-vindas: Ganhe um brinde ao se cadastrar e iniciar sua parceria com Paraflu.',
      '➜ Qualidade garantida: Ofereça aos seus clientes a melhor marca do mercado.',
      '➜ Apoio comercial: Receba banners e estandes da Paraflu para colocar na sua mecânica, atraindo mais clientes e destacando sua oficina.',
    ],
    socialTitle: 'Quem revende Paraflu recomenda!',
    socialQuotes: [
      { handle: '@lojaodoradiador', text: '"Paraflu é o campeão de vendas em meu estabelecimento."' },
      { handle: '@ronaldo_rost_', text: '"Produto é ótimo mesmo fiz a troca na minha Strada faz 3 anos e nem baixa água no reservatório, vou fazer a troca porque está vencendo o prazo."' },
      { handle: '@carlossantos_1590', text: '"Sempre usei @paraflubr, na minha opinião é o melhor da categoria."' },
    ],
    section4Title: 'ELEVE O PATAMAR DO SEU NEGÓCIO',
    section4P: 'Para começar, basta preencher o formulário com seus dados. É rápido e simples: insira suas informações de contato, cidade, estado e CNPJ. Em poucos minutos, você estará a um passo de transformar sua oficina. Preencha o formulário hoje mesmo e ganhe um brinde de boas-vindas.',
    section5Title: 'Prazer, líder no mercado automotivo.',
    section5P: 'Há mais de 50 anos no mercado, a Paraflu é referência em tecnologia e especialista no desenvolvimento de produtos para o máximo desempenho para o seu veículo. Nossa estrutura é voltada para atender ao mais exigente consumidor com qualidade, segurança, agilidade e eficiência. Possuímos uma equipe altamente técnica e preparada para tirar dúvidas e garantir todo o suporte no pós-venda, auxiliando e oferecendo treinamento para os aplicadores. A proteção do sistema de arrefecimento e a segurança do sistema de freio é nosso compromisso.',
    ctaSection5: 'QUERO SER LÍDER COM A PARAFLU',
    finalP: 'Os mecânicos que trabalham com PARAFLU oferecem aos seus clientes o que há de melhor.',
    ctaFinal: 'ÚLTIMA CHANCE PARA SER REVENDEDOR PARAFLU',
    nextCaseLabel: 'Próximo case',
    nextCaseTitle: 'Campanha de vagas remanescentes — Ulbra Medicina',
    nextCaseDesc: 'Veja como uma oferta com escassez real ganhou uma narrativa de resposta direta para preencher todas as vagas.',
    nextCaseLinkSub: 'Ulbra · Medicina',
    nextCaseLinkTitle: 'Campanha de vagas remanescentes em Medicina',
    nextCaseHref: '/portfolio/vagas-remanescentes',
  },
  en: {
    pill: 'Landing page · Automotive market',
    heroTitle: 'Landing page to turn repair shop owners into official Paraflu resellers.',
    metaClient: 'Paraflu',
    metaDeliverable: 'Landing page',
    metaContext: 'Recruiting auto repair shop owners as resellers',
    briefingHeading: 'The offer was strong. The copy had to match it.',
    briefingP1: 'Paraflu has been the market leader for over 50 years in automotive cooling. The campaign goal was simple: get repair shop owners to sign up as authorized resellers.',
    briefingP2: 'The audience already knew the product — most were already selling or recommending Paraflu informally. The job was to turn that recognition into action: fill the form, formalize the partnership, and get the welcome gift.',
    briefingP3: 'The copy was written to speak directly to the shop owner — no fluff, no corporate speak. Brand authority as the main argument, concrete benefits like support, technical visits and display materials as backup, and social proof from other resellers to close the loop.',
    copyEyebrow: 'Landing Page — Reseller recruitment · Paraflu',
    copyBadge: '✦ Copy delivered',
    heroBadge: 'EXCLUSIVE FOR AUTO REPAIR SHOP OWNERS',
    heroTitle: 'The secret of every successful mechanic: being an authorized Paraflu reseller',
    heroP1: 'As a Paraflu reseller you get access to the leading brand in quality and efficiency, keeping your customers satisfied and boosting your shop’s reputation in the automotive market.',
    heroP2: 'Fill in the form, become an authorized reseller and get a welcome gift!',
    ctaMain: 'I WANT TO BECOME AN AUTHORIZED RESELLER',
    ctaSub: 'Fill in the form and get a welcome gift!',
    whyTitle: 'Why become a Paraflu reseller?',
    whyList: [
      '➜ Technical and sales support: Get dedicated support to maximize your sales.',
      '➜ Technical visit and training: Our technicians visit your shop to ensure correct application and provide detailed training.',
      '➜ Welcome gift: Get a gift when you sign up and start your partnership with Paraflu.',
      '➜ Guaranteed quality: Offer your customers the best brand in the market.',
      '➜ Sales support: Get Paraflu banners and displays for your shop to attract more customers and stand out.',
    ],
    socialTitle: 'Those who resell Paraflu recommend it!',
    socialQuotes: [
      { handle: '@lojaodoradiador', text: '"Paraflu is the best seller in my store."' },
      { handle: '@ronaldo_rost_', text: '"Great product — I changed my Strada 3 years ago and the reservoir never runs low; I\'m changing again because the warranty is expiring."' },
      { handle: '@carlossantos_1590', text: '"I\'ve always used @paraflubr — in my view it\'s the best in its category."' },
    ],
    section4Title: 'RAISE THE BAR FOR YOUR BUSINESS',
    section4P: 'To get started, just fill in the form with your details. It\'s quick and simple: enter your contact info, city, state and tax ID. In a few minutes you\'re one step away from transforming your shop. Fill in the form today and get a welcome gift.',
    section5Title: 'Meet the leader in the automotive market.',
    section5P: 'For over 50 years Paraflu has been the reference in technology and a specialist in developing products for peak performance in your vehicle. We\'re built to serve the most demanding customers with quality, safety, speed and efficiency. We have a highly trained technical team ready to answer questions and provide full after-sales support, including training for applicators. Protecting the cooling system and brake system safety is our commitment.',
    ctaSection5: 'I WANT TO LEAD WITH PARAFLU',
    finalP: 'Mechanics who work with PARAFLU offer their customers the best.',
    ctaFinal: 'LAST CHANCE TO BECOME A PARAFLU RESELLER',
    nextCaseLabel: 'Next case',
    nextCaseTitle: 'Campaign for leftover Med School seats — Ulbra',
    nextCaseDesc: 'How a real scarcity offer got a direct-response narrative that filled every seat.',
    nextCaseLinkSub: 'Ulbra · Med School',
    nextCaseLinkTitle: 'Campaign for leftover Med School seats',
    nextCaseHref: '/portfolio/vagas-remanescentes',
  },
}

function ParafluCasePage({ caseData }) {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].casePage
  const c = PARAFLU_CONTENT[lang] || PARAFLU_CONTENT.pt
  const otherCases = getOtherCases(caseData.id, 6)

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Above the fold */}
      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">
              {t.portfolio}
            </Link>
            <span className="opacity-40">/</span>
            <span>Paraflu</span>
          </p>

          <div className="mt-10 sm:mt-12 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            {c.pill}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {c.heroTitle}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.client}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaClient}</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.deliverable}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaDeliverable}</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.context}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaContext}</p>
            </div>
            {/* Sem bloco de resultado para este case específico */}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      {/* Briefing */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.briefing}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                {c.briefingHeading}
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">{c.briefingP1}</p>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">{c.briefingP2}</p>
              <p className="text-[15px] leading-relaxed text-white/75">{c.briefingP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copy entregue — Landing Page */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.copyDelivered}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-accent/15 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-accent py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  {c.copyBadge}
                </span>

                <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-white/45">
                  {c.copyEyebrow}
                </p>

                {/* Topo / Hero */}
                <div className="mb-8 space-y-4 border-b border-white/10 pb-6">
                  <span className="inline-flex items-center rounded-full border border-amber-accent/60 bg-amber-accent/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">
                    {c.heroBadge}
                  </span>
                  <div>
                    <h2 className="mb-3 text-xl sm:text-2xl font-semibold leading-snug text-white">
                      {c.heroTitle}
                    </h2>
                    <p className="text-[15px] leading-relaxed text-white/75">{c.heroP1}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/75">{c.heroP2}</p>
                  </div>
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                      {c.ctaMain}
                    </div>
                    <p className="mt-2 text-[12px] text-white/60">{c.ctaSub}</p>
                  </div>
                </div>

                {/* Seção 2 */}
                <div className="mb-8 space-y-3 border-b border-white/10 pb-6">
                  <h3 className="text-base font-semibold text-white">{c.whyTitle}</h3>
                  <ul className="space-y-2 text-[15px] leading-relaxed text-white/80">
                    {c.whyList.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                      {c.ctaMain}
                    </div>
                  </div>
                </div>

                {/* Seção 3 — Prova social */}
                <div className="mb-8 space-y-4 border-b border-white/10 pb-6">
                  <span className="inline-flex items-center rounded-full border border-amber-accent/60 bg-amber-accent/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">
                    {c.heroBadge}
                  </span>
                  <h3 className="text-base font-semibold text-white">{c.socialTitle}</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {c.socialQuotes.map((q, i) => (
                      <div key={i} className="rounded-xl border border-white/10 bg-black/40 p-4 text-[13px] leading-relaxed text-white/80">
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{q.handle}</p>
                        <p>{q.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seção 4 */}
                <div className="mb-8 space-y-3 border-b border-white/10 pb-6">
                  <h3 className="text-base font-semibold text-white">{c.section4Title}</h3>
                  <p className="text-[15px] leading-relaxed text-white/75">{c.section4P}</p>
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                      {c.ctaMain}
                    </div>
                  </div>
                </div>

                {/* Seção 5 — Sobre a marca */}
                <div className="mb-8 space-y-3 border-b border-white/10 pb-6">
                  <h3 className="text-base font-semibold text-white">{c.section5Title}</h3>
                  <p className="text-[15px] leading-relaxed text-white/75">{c.section5P}</p>
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                      {c.ctaSection5}
                    </div>
                  </div>
                </div>

                {/* Seção 6 — CTA final */}
                <div className="space-y-3">
                  <span className="inline-flex items-center rounded-full border border-amber-accent/60 bg-amber-accent/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">
                    {c.heroBadge}
                  </span>
                  <p className="text-[15px] leading-relaxed text-white/80">{c.finalP}</p>
                  <div>
                    <div className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                      {c.ctaFinal}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <main className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">{t.otherCases}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((caseItem) => (
              <li key={caseItem.id}>
                <Link
                  to={localizePath(`/portfolio/${caseItem.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">{lang === 'en' && caseItem.clientEn ? caseItem.clientEn : caseItem.client}</p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">
                      {lang === 'en' && caseItem.titleEn ? caseItem.titleEn : caseItem.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {t.ctaFinalMain}<span className="text-amber-accent italic">{t.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const CRIPTOTRADER_CONTENT = {
  pt: {
    pill: 'Funil de lançamento · Mercado cripto',
    heroTitle: 'Sequência completa de e-mails e WhatsApp para um lançamento no mercado cripto.',
    metaClient: 'Tasso Lago — Formação Criptotrader 4.0',
    metaDeliverable: 'Sequência de e-mails + disparos de WhatsApp',
    metaContext: 'Semana Investidor do Amanhã — novembro',
    briefingHeading: 'Seis e-mails, seis disparos de WhatsApp, uma semana para converter.',
    briefingP1: 'A Formação Criptotrader 4.0 é um curso de investimentos em criptomoedas do Tasso Lago — metodologia validada em cinco anos de mercado, com foco em análise gráfica e gestão de risco. O lançamento foi estruturado em torno de uma semana de aulas gratuitas chamada Semana Investidor do Amanhã, com três CPLs ao vivo e abertura de turma ao final.',
    briefingP2: 'O trabalho foi escrever toda a cadência de comunicação do lançamento: e-mails e mensagens de WhatsApp sincronizados dia a dia, do boas-vindas até o depoimento com quebra de objeção. Cada peça tinha função específica na jornada — aquecimento, antecipação de aula, convite para grupo prioritário, revelação da oferta e prova social.',
    briefingP3: 'O desafio era manter energia e urgência ao longo de uma semana inteira sem queimar o público — e fazer a voz do Tasso soar natural nos dois canais ao mesmo tempo.',
    copiesLabel: 'Copies entregues',
    tabEmails: 'E-mails',
    tabWhatsapp: 'WhatsApp',
    copyBadge: '✦ Copy entregue',
    eyebrowEmails: 'Sequência de e-mails — Lançamento Formação Criptotrader 4.0 · Tasso Lago',
    eyebrowWhatsapp: 'Disparos de WhatsApp — Lançamento Formação Criptotrader 4.0 · Tasso Lago',
  },
  en: {
    pill: 'Launch funnel · Crypto market',
    heroTitle: 'Full email + WhatsApp sequence for a crypto launch.',
    metaClient: 'Tasso Lago — Criptotrader 4.0',
    metaDeliverable: 'Email sequence + WhatsApp broadcasts',
    metaContext: 'Investidor do Amanhã week — November',
    briefingHeading: 'Six emails, six WhatsApp sends, one week to convert.',
    briefingP1: 'Criptotrader 4.0 is Tasso Lago’s crypto investing course — a methodology validated over five years in the market, focused on chart analysis and risk management. The launch was built around a free week of classes called Investidor do Amanhã week, with three live sessions and cohort opening at the end.',
    briefingP2: 'The job was to write the full launch cadence: emails and WhatsApp messages aligned day by day, from welcome to testimonial with objection handling. Each piece had a clear role — warming up, class reminder, priority group invite, offer reveal and social proof.',
    briefingP3: 'The challenge was to keep energy and urgency across a full week without burning the audience — and to make Tasso’s voice feel natural on both channels at once.',
    copiesLabel: 'Copy delivered',
    tabEmails: 'Emails',
    tabWhatsapp: 'WhatsApp',
    copyBadge: '✦ Copy delivered',
    eyebrowEmails: 'Email sequence — Criptotrader 4.0 launch · Tasso Lago',
    eyebrowWhatsapp: 'WhatsApp broadcasts — Criptotrader 4.0 launch · Tasso Lago',
  },
}

function CriptotraderCasePage({ caseData }) {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].casePage
  const c = CRIPTOTRADER_CONTENT[lang] || CRIPTOTRADER_CONTENT.pt
  const [activeTab, setActiveTab] = useState('emails')
  const otherCases = getOtherCases(caseData.id, 6)

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Above the fold */}
      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">
              {t.portfolio}
            </Link>
            <span className="opacity-40">/</span>
            <span>{lang === 'en' ? 'Criptotrader' : 'Formação Criptotrader'}</span>
          </p>

          <div className="mt-10 sm:mt-12 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            {c.pill}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {c.heroTitle}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.client}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaClient}</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.deliverable}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaDeliverable}</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.context}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaContext}</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      {/* Briefing */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.briefing}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                {c.briefingHeading}
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">{c.briefingP1}</p>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">{c.briefingP2}</p>
              <p className="text-[15px] leading-relaxed text-white/75">{c.briefingP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copies entregues */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{c.copiesLabel}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="mb-6 flex gap-2 overflow-x-auto rounded-full bg-white/5 p-1 text-xs sm:text-[13px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('emails')}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium tracking-wide transition-all ${
                    activeTab === 'emails' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {c.tabEmails}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('whatsapp')}
                  className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium tracking-wide transition-all ${
                    activeTab === 'whatsapp' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {c.tabWhatsapp}
                </button>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-accent/15 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-accent py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  {c.copyBadge}
                </span>

                {activeTab === 'emails' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {c.eyebrowEmails}
                    </p>

                    {/* E-mail 01 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? 'Email 01 · Welcome with Big Idea and intro video'
                          : 'E-mail 01 · Boas-vindas com Big Idea e vídeo de intro'}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {lang === 'en'
                          ? 'Subject: Welcome, Investor of Tomorrow'
                          : 'Assunto: Boas vindas, Investidor do Amanhã'}
                      </p>
                      <p className="text-[11px] text-white/60">
                        {lang === 'en'
                          ? 'Preheader: Congrats on securing your seat on the plane to the future'
                          : 'Pré-header: Parabéns por garantir sua passagem para o avião do futuro'}
                      </p>
                      <p className="text-[14px] leading-relaxed text-white/80 whitespace-pre-line">
                        {lang === 'en'
                          ? `GOOD EVENING, INVESTOR OF TOMORROW!

Along with welcoming you, I want to congratulate you for securing your seat on the plane to the future — in other words, for boarding Investidor do Amanhã week, which will take place from November 11th to 16th. 🔥🚀

Throughout this week, you’ll learn, in a transparent way, the methodology that has been validated over 5 years of hard work to invest consistently and safely in the crypto market.

Hit play on the video to understand more about this methodology and about who created it:`
                          : `BOA NOITE, INVESTIDOR DO AMANHÃ!

Além de desejar boas vindas, gostaria de parabenizar você por garantir a sua passagem para o avião do futuro!
Ou seja, por embarcar na semana do Investidor do Amanhã, que vai acontecer entre os dias 11 a 16 de novembro 🔥🚀

Durante essa semana, você aprenderá, de forma transparente, a metodologia, que foi validada em 5 anos de muito trabalho,
para investir com consistência de forma segura no mercado cripto.

Dá play no vídeo para entender mais sobre essa metodologia e sobre quem a criou:`}
                      </p>
                      <div className="inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                        {lang === 'en' ? 'WATCH THE VIDEO' : 'ASSISTA AO VÍDEO'}
                      </div>
                      <p className="text-[14px] leading-relaxed text-white/80 whitespace-pre-line">
                        {lang === 'en'
                          ? `Crypto is increasingly on the rise. Contrary to what you might think, NOW is the time to deepen your knowledge, learn the techniques you need to become a confident investor and get big results from a market that is the FUTURE.

Want to gain your freedom by applying these techniques? DON’T MISS THIS OPPORTUNITY — HERE’S THE SCHEDULE FOR THE WEEK:
→ Class 1 (11/11) – The steps that brought me here
You’ll see the method I’ve used over the last 5 years in the Digital Currency market to invest consistently and safely.
→ Class 2 (14/11) – The map to your freedom
Learn how to build your portfolio for the short and long term to win your financial freedom and make your family’s dreams real.
→ Class 3 (16/11) – The key to investing like a professional
You’ll discover how I became a professional investor using chart analysis in a simple way — knowing when to get in and out of Digital Currencies by looking at the market about 1 hour per week.

I’m counting on you 🔥

Let’s go!!
#temmercadotododia
Tasso Lago`
                          : `As criptomoedas estão cada vez mais em ascensão! Ao contrário do que você pode pensar, AGORA é o momento de aprofundar
seus conhecimentos para adquirir todas as técnicas necessárias para se tornar um investidor assertivo, e ter grandes
resultados através desse mercado que é o FUTURO.

Quer conquistar a sua liberdade aplicando essas técnicas? NÃO PERCA ESSA OPORTUNIDADE E FICA LIGADO NO CRONOGRAMA DESTA
SEMANA:
→ Aula 1 (11/11) - Os passos que me trouxeram até aqui
Você vai conhecer o método que usei nos últimos 5 anos no mercado de Moedas Digitais para investir com consistência de
forma segura.
→ Aula 2 (14/11) - O mapa para sua liberdade
Aprenda a construir sua carteira de investimentos no curto e longo prazo para conquistar sua liberdade financeira e
realizar os sonhos da sua família.
→ Aula 3 (16/11) - A chave para investir como um profissional
Você vai descobrir como eu me tornei um investidor profissional usando Análise Gráfica de forma simples para saber o
momento certo de entrar e sair das Moedas Digitais analisando o mercado com 1h por semana.

Contamos com a participação de vocês 🔥

Boraaa!!
#temmercadotododia
Tasso Lago`}
                      </p>
                    </div>

                    {/* E-mail 02 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? 'Email 02 · Warm-up — Today is CPL1'
                          : 'E-mail 02 · Antecipação — É hoje o CPL1'}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {lang === 'en'
                          ? 'Subject: Let’s open the black box!'
                          : 'Assunto: Vamos abrir a caixa-preta!'}
                      </p>
                      <p className="text-[11px] text-white/60">
                        {lang === 'en'
                          ? 'Preheader: Classes that can change your life'
                          : 'Pré-header: Aulas que podem mudar sua vida'}
                      </p>
                      <p className="text-[14px] leading-relaxed text-white/80 whitespace-pre-line">
                        {lang === 'en'
                          ? `Just a quick reminder that today at 9 p.m. we have the first class of Investidor do Amanhã week!!

Click the link to turn on notifications and confirm your presence so you don’t miss anything from Investidor do Amanhã week — you’ll thank me later…`
                          : `Passando para relembrar que hoje às 21h teremos a primeira aula da Semana Investidor do Amanhã!!

Clica no link para ativar o sininho, e confirmar sua presença, para não perder nada da Semana Investidor do Amanhã, você
vai me agradecer depois...`}
                      </p>
                      <div className="inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                        {lang === 'en' ? 'CONFIRM ATTENDANCE' : 'CONFIRMAR PRESENÇA'}
                      </div>
                      <p className="text-[14px] leading-relaxed text-white/80 whitespace-pre-line">
                        {lang === 'en'
                          ? `Today is the day we open the black box. You’ll see the method I’ve used over the last 5 years in the Digital Currency market to invest consistently and safely. 💰✅
EVEN IF YOU KNOW VERY LITTLE ABOUT THE CRYPTO WORLD

Grab pen and paper to take notes — this class is essential, because it’s the start of your journey in the most profitable and revolutionary market of the next decade.

So put it in your calendar, set an alarm for 9 p.m. ⏰

Let’s go!!
#temmercadotododia
Tasso Lago

PS: I said you’d “thank me later” because I’ve already received a lot of messages from people who missed my free classes. These are classes that can change your life — but they won’t stay available.`
                          : `Hoje é o dia de abrir a caixa-preta! Você vai conhecer o método que usei nos últimos 5 anos no mercado de Moedas
Digitais para investir com consistência de forma segura 💰✅
AINDA QUE VOCÊ TENHA POUCO CONHECIMENTO DO MUNDO CRIPTO

Prepara papel e caneta para anotar tudo! Essa aula é essencial, já que ela é o princípio da sua jornada no mercado mais
lucrativo e revolucionário da próxima década.

Então, coloca aí na agenda, ativa o despertador para às 21h ⏰

Pra cima!!
#temmercadotododia
Tasso Lago

OBS: Eu disse que você "iria me agradecer depois", porque eu já recebi muitas mensagens de pessoas que perderam minhas
aulas gratuitas. São aulas que podem mudar sua vida, porém não ficarão salvas.`}
                      </p>
                    </div>

                    {/* E-mail 03 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? 'Email 03 · Invitation to the Priority Group'
                          : 'E-mail 03 · Convite para o Grupo Prioritário'}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {lang === 'en'
                          ? 'Subject: The turning point'
                          : 'Assunto: A virada de chave'}
                      </p>
                      <p className="text-[11px] text-white/60">
                        {lang === 'en'
                          ? 'Preheader: Secure your spot to learn the method that can change your life'
                          : 'Pré-header: Garanta sua vaga para aprender o método que vai mudar sua vida'}
                      </p>
                      <p className="text-[14px] leading-relaxed text-white/80 whitespace-pre-line">
                        {lang === 'en'
                          ? `Straight talk: today was insane. From now on, you’re going to take off in the market of the future — the one that has grown the most in recent years — the crypto market.

And honestly, this method changed my life. I left my 9-to-5 job, gained financial and geographic freedom, even though I only look at the charts 1–2 times a week, with safety. I’m sure it can change yours too.

And here comes the turning point: on Tuesday, the 16th, we’re starting a new cohort of the Criptotrader 4.0 Program.

To help you secure your spot with no risk and in an exclusive way, we’ve prepared something special for you…

We created a PRIORITY group. There, we’ll send the Criptotrader 4.0 link so you can secure your EARLY spot.

This cohort will have a very limited number of places, because we want to deliver the best possible quality for those who are serious about transforming their lives and joining the most INNOVATIVE market of the decade.`
                          : `Papo reto, hoje foi insano! A partir de agora, vocês vão decolar no mercado do futuro - o que mais cresceu nos últimos
anos - o mercado das Criptomoedas.

E na moral, esse método mudou minha vida. Consegui sair da CLT, ter liberdade financeira e geográfica, mesmo olhando os
gráficos 1-2 vezes por semana, de forma segura. Tenho certeza que vai mudar a sua também!

E aqui vem a virada de chave: na terça feira, dia 16, vamos começar uma nova turma da Formação Criptotrader 4.0.

Para que você possa garantir sua vaga, sem riscos e de forma exclusiva, preparamos algo muito especial para você...

Nós criamos um grupo PRIORITÁRIO, lá nós vamos enviar o link da Formação Criptotrader 4.0 para você garantir sua vaga
ANTECIPADA.

Essa turma terá uma quantidade bem limitada de vagas, pois queremos entregar a melhor qualidade de conteúdo possível
para quem quer transformar sua vida, e fazer parte do mercado mais INOVADOR da década!`}
                      </p>
                      <div className="inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                        {lang === 'en' ? 'I WANT TO CHANGE MY LIFE' : 'QUERO MUDAR DE VIDA'}
                      </div>
                      <p className="text-[14px] leading-relaxed text-white/80">Tasso Lago</p>
                    </div>

                    {/* E-mail 04 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? 'Email 04 · Offer reveal with video'
                          : 'E-mail 04 · Revelação da oferta com vídeo'}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {lang === 'en'
                          ? 'Subject: What Criptotrader and Bitcoin have in common'
                          : 'Assunto: O que a Formação Criptotraders e o Bitcoin têm em comum?'}
                      </p>
                      <p className="text-[11px] text-white/60">
                        {lang === 'en'
                          ? 'Preheader: A message from Tasso'
                          : 'Pré-header: Recado do Tasso'}
                      </p>
                      <p className="text-[14px] leading-relaxed text-white/80 whitespace-pre-line">
                        {lang === 'en'
                          ? `Good morning, %FIRSTNAME%!

Do you know what Bitcoin and the Criptotrader Program have in common?

If you said both are scarce, you’re right.

Bitcoin is the first scarce digital asset. Its maximum supply is capped at 21 million units, released over time.

Criptotrader works the same way. Spots are extremely limited and, as I’ve already mentioned, we don’t know when we’ll open a new cohort. So pay attention to the announcement attached here.

Here’s the deal: I need to give you a very important message.

But it’s crucial that you pay close ATTENTION — this is for people who actually deserve it and genuinely want to learn and take off in the digital currency market.

Spoiler: in the first cohort, those who took my messages seriously and committed to the method managed to DOUBLE their capital.`
                          : `Bom dia, %FIRSTNAME%!

Você sabe qual a relação entre o Bitcoin e a Formação Criptotraders?

Se você disse que ambos são escassos, você está certo!

O Bitcoin é o primeiro ativo digital escasso. Ele tem um estoque máximo limitado a 21 milhões de unidades, com emissão
controlada ao longo do tempo.

Assim como a Formação Criptotraders! As vagas são extremamente limitadas, e como eu já comentei, não sabemos quando
abriremos uma nova turma. Então, fica ligado nesse comunicado em anexo.

Pega a visão, eu preciso te dar um recado importantíssimo.

Porém, é fundamental que você preste muita ATENÇÃO, pois é um comunicado para aqueles que merecem, e querem de fato
aprender, e decolar no mercado das moedas digitais.

Spoiler: O Tasso enfatizou que, na turma 1, quem levou a sério os seus recados, e se dedicou ao método, conseguiu DOBRAR
seu patrimônio!`}
                      </p>
                      <div className="inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                        {lang === 'en' ? 'MESSAGE FROM TASSO' : 'RECADO DO TASSO'}
                      </div>
                    </div>

                    {/* E-mail 05 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? 'Email 05 · Warm-up — Today is CPL3'
                          : 'E-mail 05 · Antecipação — É hoje o CPL3'}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {lang === 'en'
                          ? 'Subject: Last class — the key to investing like a professional'
                          : 'Assunto: Última aula, a chave para investir como um profissional'}
                      </p>
                      <p className="text-[11px] text-white/60">
                        {lang === 'en'
                          ? 'Preheader: This is your chance to change your reality'
                          : 'Pré-header: Essa é a sua chance de transformar sua realidade'}
                      </p>
                      <p className="text-[14px] leading-relaxed text-white/80 whitespace-pre-line">
                        {lang === 'en'
                          ? `Today at 9 p.m. we have our LAST CLASS of the week.

The key to investing like a professional.

In this class, you’ll see how I became a professional investor using chart analysis in a simple way.

I’ll show you, step by step, how to read the market so you know the right moment to get in and out of Digital Currencies — without spending more than 1 hour per week.

Imagine being able to focus on other activities, sleep, eat and enjoy life without constantly worrying about risk.

So turn on notifications and set your alarm, because at 9 p.m. I’ll be live for our last class — and for the long-awaited opening of the Criptotrader 4.0 cohort. ⏰`
                          : `Hoje às 21h temos a nossa ÚLTIMA AULA da semana!

A chave para investir como um profissional

Nessa aula, você vai descobrir como eu me tornei um investidor profissional usando Análise Gráfica de forma simples!

Vou ensinar vocês de forma CLARA como poderão analisar o mercado para saber o momento certo de entrar e sair das Moedas
Digitais sem precisar despender mais de 1 hora por semana.

Já imaginou conseguir focar em outras atividades, dormir, comer e aproveitar a vida sem precisar se preocupar com os
temidos riscos?

Então, ativa as notificações e o seu despertador, porque às 21hrs, eu entro ao vivo para a nossa última aula e para a
tão esperada abertura da turma Formação Criptotrader 4.0 ⏰`}
                      </p>
                      <div className="inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                        {lang === 'en'
                          ? 'THIS IS YOUR CHANCE TO CHANGE YOUR REALITY'
                          : 'ESSA É A SUA CHANCE DE TRANSFORMAR SUA REALIDADE'}
                      </div>
                    </div>

                    {/* E-mail 06 */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? 'Email 06 · Testimonial with storytelling and objection handling'
                          : 'E-mail 06 · Depoimento com storytelling e quebra de objeção'}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {lang === 'en'
                          ? 'Subject: Testimonial from a Criptotrader student'
                          : 'Assunto: Depoimento de um aluno da Formação Cripto'}
                      </p>
                      <p className="text-[11px] text-white/60">
                        {lang === 'en'
                          ? 'Preheader: Are you persistent or just stubborn?'
                          : 'Pré-header: Você é persistente ou teimoso?'}
                      </p>
                      <p className="text-[14px] leading-relaxed text-white/80 whitespace-pre-line">
                        {lang === 'en'
                          ? 'Check this out. Matheus is a student from the first Criptotrader cohort and he shared a powerful testimonial about the results he got from the course. 👇'
                          : 'Se liga!! Matheus é um aluno da primeira turma da Formação Criptotrader e ele deu um depoimento fera sobre os resultados que adquiriu com o curso 👇'}
                      </p>
                      <div className="inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                        {lang === 'en' ? 'MATHEUS’ TESTIMONIAL' : 'DEPOIMENTO DO MATHEUS'}
                      </div>
                      <p className="text-[14px] leading-relaxed text-white/80 whitespace-pre-line">
                        {lang === 'en'
                          ? `Matheus used to be stubborn. He followed his own “methodology”, hoping that at some point it would work.

But stubbornness and persistence only look alike from the outside. There’s a crucial difference:
there’s only persistence when there is progress — if there’s no progress, we’re just being stubborn.

That insight only clicked for Matheus after joining the first Criptotrader cohort. He realised he was losing money not because of crypto’s volatility, but because he wasn’t applying the right strategies to invest safely.

Watching charts 24/7, feeling anxious about every move, constantly exposed to high risk and big losses — that was just a waste of time and money.

Through the Criptotrader Program, Matheus developed real investing maturity and built the mindset of a professional investor, with the right vision to reach his goals in the medium and long term. 💰

See what I mean? It’s possible to succeed in the crypto world even if you have little time to study the market — you just need a few minutes to do chart analysis and the RIGHT METHOD.

So ask yourself: are you being persistent, or just stubborn?

Let go of stubbornness — there’s still time to change your life. 🔥`
                          : `Matheus era teimoso, seguia sua própria metodologia, esperando que, em algum momento, fosse assertivo. No entanto,
teimosia e persistência andam de mãos dadas, exceto por uma coisa…
Só há persistência quando tem progresso, se não temos progresso, estamos apenas sendo teimosos.

Esse insight surgiu para o Matheus somente após entrar na primeira turma da Formação Criptotraders. Ele percebeu que
estava perdendo dinheiro, não pela volatilidade do mercado Cripto, mas, sim, porque não estava aplicando as estratégias
certas para investir de forma segura.

Operar 24 horas por dia, estar sempre ansioso pela variação do gráfico, exposto a grandes riscos e perdas, era
desperdício de tempo e dinheiro.

Através da Formação Criptotrader, Matheus desenvolveu sua maturidade nos investimentos, e construiu a mentalidade de
investidor profissional com a visão ideal para conquistar os seus objetivos em médio e longo prazo! 💰

Sacaram? É possível ter sucesso no mundo Cripto, mesmo que você tenha pouco tempo disponível para estudar o mercado;
só vai precisar de alguns minutos para fazer a análise gráfica e do MÉTODO CERTO!

Você está sendo persistente ou teimoso?

Bora largar de mão a teimosia que ainda dá tempo de mudar de vida 🔥`}
                      </p>
                      <div className="inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                        {lang === 'en'
                          ? 'I WANT TO BE ONE OF THE PERSISTENT ONES'
                          : 'QUERO FAZER PARTE DOS PERSISTENTES'}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'whatsapp' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {c.eyebrowWhatsapp}
                    </p>

                    {/* Disparo 01 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? '08/11 Mon. 21:00 · Welcome with Big Idea and intro video'
                          : '08/11 seg. 21:00 · Boas-vindas com Big Idea e vídeo de intro'}
                      </p>
                      <div className="inline-block max-w-full rounded-2xl bg-white/8 px-4 py-3 text-[13px] leading-relaxed text-white/85">
                        <p className="whitespace-pre-line">
                          {lang === 'en'
                            ? `GOOD EVENING, INVESTORS OF TOMORROW!

Besides welcoming you, I want to congratulate you for securing your seats on the plane to the future — for boarding Investidor do Amanhã week, which will take place from November 11th to 16th. 🔥🚀

Throughout this week, you’ll get transparent access to the methodology that has been validated over 5 years of hard work to invest consistently and safely in the crypto market.

Hit play on the video to understand more about this methodology and about who created it. 😉

Crypto is increasingly on the rise. Contrary to what you might think, NOW is the time to deepen your knowledge and learn the techniques you need to become a confident investor and get great results from this market of the FUTURE.

Want to win your freedom by applying these techniques?
DON’T MISS THIS OPPORTUNITY — HERE’S THE SCHEDULE FOR THIS WEEK:
📆 Class 1 (11/11) – The steps that brought me here
📆 Class 2 (14/11) – The map to your freedom
📆 Class 3 (16/11) – The key to investing like a professional

🔥 We’re counting on you 🔥
Let’s go!!
#temmercadotododia`
                            : `BOA NOITE, INVESTIDORES DO AMANHÃ!

Além de desejar boas vindas, gostaria de parabenizar vocês por garantirem as suas passagens para o avião do futuro!
Ou seja, por embarcarem na semana do Investidor do Amanhã, que vai acontecer entre os dias 11 a 16 de novembro 🔥🚀

Durante essa semana, vocês terão acesso, de forma transparente, à metodologia, que foi validada em 5 anos de muito
trabalho, para investir com consistência de forma segura no mercado Cripto.

Dá play no vídeo a seguir para entender mais sobre essa metodologia e sobre quem a criou 😉

As criptomoedas estão cada vez mais em ascensão! Ao contrário do que você pode pensar, AGORA é o momento de
aprofundar seus conhecimentos para adquirir todas as técnicas necessárias para se tornar um investidor assertivo, e
ter grandes resultados através desse mercado que é o FUTURO.

Quer conquistar a sua liberdade aplicando essas técnicas?
NÃO PERCA ESSA OPORTUNIDADE E FICA LIGADO NO CRONOGRAMA DESTA SEMANA:
📆 Aula 1 (11/11) - Os passos que me trouxeram até aqui
📆 Aula 2 (14/11) - O mapa para sua liberdade
📆 Aula 3 (16/11) - A chave para investir como um profissional

🔥 Contamos com a participação de vocês 🔥
Boraaa!!
#temmercadotododia`}
                        </p>
                      </div>
                    </div>

                    {/* Disparo 02 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? '11/11 Thu. 11:50 · Warm-up — Today is CPL1'
                          : '11/11 qui. 11:50 · Antecipação — É hoje o CPL1'}
                      </p>
                      <div className="inline-block max-w-full rounded-2xl bg-white/8 px-4 py-3 text-[13px] leading-relaxed text-white/85">
                        <p className="whitespace-pre-line">
                          {lang === 'en'
                            ? `🔴 IT’S TODAY! DON’T FORGET OUR APPOINTMENT 🔴

Just reminding you that today at 9 p.m. we’ll have the first class of Investidor do Amanhã week.

Today is the day we open the black box. You’ll see the method I’ve used over the last 5 years in the Digital Currency market to invest consistently and safely. 💰✅
EVEN IF YOU KNOW VERY LITTLE ABOUT THE CRYPTO WORLD.

Grab pen and paper to take notes. This class is essential — it’s the start of your journey in the most profitable and revolutionary market of the next decade.

⏰ So put it in your calendar and set an alarm for 9 p.m. ⏰

CLICK THE LINK BELOW to turn on notifications so you don’t regret missing it later. 👇👇`
                            : `🔴 É HOJE! NÃO ESQUEÇA O NOSSO COMPROMISSO 🔴

Passando para relembrar que hoje às 21h teremos a primeira aula da Semana Investidor do Amanhã

Hoje é o dia de abrir a caixa-preta! Você vai conhecer o método que usei nos últimos 5 anos no mercado de Moedas
Digitais para investir com consistência de forma segura 💰✅

AINDA QUE VOCÊ TENHA POUCO CONHECIMENTO DO MUNDO CRIPTO

Prepara papel e caneta para anotar tudo! Essa aula é essencial, já que ela é o princípio da sua jornada no mercado
mais lucrativo e revolucionário da próxima década

⏰ Então, coloca aí na agenda, ativa o despertador para às 21h ⏰

CLICA NO LINK ABAIXO para ativar o sininho e não se arrepender depois 👇👇`}
                        </p>
                      </div>
                    </div>

                    {/* Disparo 03 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? '14/11 Sun. 23:00 · Invitation to the Priority Group'
                          : '14/11 dom. 23:00 · Convite para o Grupo Prioritário'}
                      </p>
                      <div className="inline-block max-w-full rounded-2xl bg-white/8 px-4 py-3 text-[13px] leading-relaxed text-white/85">
                        <p className="whitespace-pre-line">
                          {lang === 'en'
                            ? `🔥 THE TURNING POINT 🔥

Straight talk: today was insane. From now on, you’re taking off in the market of the future — the one that has grown the most in recent years — the crypto market.

And honestly, this method changed my life. I left my 9-to-5, gained financial and geographic freedom, even though I only look at charts 1–2 times a week, safely. I’m sure it can change your life too.

Here’s the turning point: on Tuesday, the 16th, we’re starting a new Criptotrader 4.0 cohort.

To help you secure your spot with no risk and in an exclusive way, we created something special for you…

We opened a PRIORITY group. There, we’ll send the Criptotrader 4.0 link so you can secure your EARLY place.

This cohort will have very limited spots, because we want to deliver the best possible quality for those who are serious about transforming their lives and joining the most INNOVATIVE market of the decade.

CLICK THE LINK BELOW TO JOIN THE PRIORITY GROUP AND SECURE EARLY ACCESS TO THE COHORT.`
                            : `🔥 A VIRADA DE CHAVE 🔥

Papo reto, hoje foi insano! A partir de agora, vocês vão decolar no mercado do futuro - o que mais cresceu nos
últimos anos - o mercado das Criptomoedas.

E na moral, esse método mudou minha vida. Consegui sair da CLT, ter liberdade financeira e geográfica, mesmo olhando
os gráficos 1-2 vezes por semana, de forma segura. Tenho certeza que vai mudar a sua também!

E aqui vem a virada de chave: na terça feira, dia 16, vamos começar uma nova turma da Formação Criptotrader 4.0

Para que você possa garantir sua vaga, sem riscos e de forma exclusiva, preparamos algo muito especial para você...

Nós criamos um grupo PRIORITÁRIO, lá nós vamos enviar o link da Formação Criptotrader 4.0 para você garantir sua vaga
ANTECIPADA

Essa turma terá uma quantidade bem limitada de vagas, pois queremos entregar a melhor qualidade de conteúdo possível
para quem quer transformar sua vida, e fazer parte do mercado mais INOVADOR da década

CLIQUE NO LINK ABAIXO PARA FAZER PARTE DO GRUPO PRIORITÁRIO E GARANTIR ACESSO ANTECIPADO À TURMA`}
                        </p>
                      </div>
                    </div>

                    {/* Disparo 04 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? '15/11 Mon. 11:50 · Offer reveal with video'
                          : '15/11 seg. 11:50 · Revelação da oferta com vídeo'}
                      </p>
                      <div className="inline-block max-w-full rounded-2xl bg-white/8 px-4 py-3 text-[13px] leading-relaxed text-white/85">
                        <p className="whitespace-pre-line">
                          {lang === 'en'
                            ? `🚨 UNIQUE OPPORTUNITY 🚨

Heads up — Tasso just told me he needs to give you a very important message.

It’s crucial that you pay CLOSE ATTENTION, because this is for people who actually deserve it and truly want to learn and take off in the digital currency market.

Spoiler: in the first cohort, those who took his messages seriously and committed to the method managed to DOUBLE their capital.

Watch the video so you don’t miss this opportunity. 👇👇`
                            : `🚨 OPORTUNIDADE ÚNICA 🚨

Pega a visão, o Tasso me avisou que precisa dar um recado importantíssimo.

Porém, é fundamental que vocês prestem muita ATENÇÃO, pois é um comunicado para aqueles que merecem, e querem de fato
aprender, e decolar no mercado das moedas digitais

Spoiler: O Tasso enfatizou que, na turma 1, quem levou a sério os seus recados, e se dedicou ao método, conseguiu
DOBRAR seu patrimônio

Assista o vídeo para não perder essa oportunidade 👇👇`}
                        </p>
                      </div>
                    </div>

                    {/* Disparo 05 */}
                    <div className="space-y-2 border-b border-white/10 pb-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? '16/11 Tue. 10:30 · Warm-up — Today is CPL3'
                          : '16/11 ter. 10:30 · Antecipação — É hoje o CPL3'}
                      </p>
                      <div className="inline-block max-w-full rounded-2xl bg-white/8 px-4 py-3 text-[13px] leading-relaxed text-white/85">
                        <p className="whitespace-pre-line">
                          {lang === 'en'
                            ? `LAST CLASS OF INVESTIDOR DO AMANHÃ WEEK

TODAY at 9 p.m. we have our LAST CLASS of the week.

The key to investing like a professional.

In this class, I’ll show you how I became a professional investor using chart analysis in a simple way.

You’ll see clearly how to analyse the market to know the right moment to get in and out of Digital Currencies, without spending more than 1 hour per week.

Imagine focusing on other activities — sleeping, eating, enjoying life 😏 — without being constantly worried about risk.

So turn on notifications and set your alarm, because at 9 p.m. I’ll be live for our last class and for the long‑awaited opening of the Criptotrader 4.0 cohort. ⏰

THIS IS YOUR CHANCE TO CHANGE YOUR REALITY.`
                            : `ÚLTIMA AULA DA SEMANA O INVESTIDOR DO AMANHÃ

HOJE às 21h temos a nossa ÚLTIMA AULA da semana!

A chave para investir como um profissional

Nessa aula, você vai descobrir como eu me tornei um investidor profissional usando Análise Gráfica de forma simples!

Vou ensinar vocês de forma CLARA como poderão analisar o mercado para saber o momento certo de entrar e sair das
Moedas Digitais sem precisar despender mais de 1 hora por semana.

Já imaginou conseguir focar em outras atividades, dormir, comer e aproveitar a vida 😏 sem precisar se preocupar com
os temidos riscos?

Então, ativa as notificações e o seu despertador, porque às 21hrs, eu entro ao vivo para a nossa última aula e para a
tão esperada abertura da turma Formação Criptotrader 4.0 ⏰

ESSA É A SUA CHANCE DE TRANSFORMAR SUA REALIDADE`}
                        </p>
                      </div>
                    </div>

                    {/* Disparo 06 */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en'
                          ? '18/11 Thu. 11:30 · Testimonial with storytelling and objection handling'
                          : '18/11 qui. 11:30 · Depoimento com storytelling e quebra de objeção'}
                      </p>
                      <div className="inline-block max-w-full rounded-2xl bg-white/8 px-4 py-3 text-[13px] leading-relaxed text-white/85">
                        <p className="whitespace-pre-line">
                          {lang === 'en'
                            ? `MATHEUS’ TESTIMONIAL

Check this out — Matheus is a student from the first Criptotrader cohort and he shared a powerful testimonial about the results he got from the course. 👇

Matheus used to be stubborn, following his own “methodology” and hoping that at some point it would work. But stubbornness and persistence only walk side by side until one crucial point…
There is only persistence when there is progress — if there’s no progress, we’re just being stubborn.

That insight only clicked for Matheus after joining the first Criptotrader cohort. He realised he was losing money not because of the crypto market’s volatility, but because he wasn’t applying the right strategies to invest safely. ✅

Watching charts 24/7, being constantly anxious about price swings, exposed to huge risks and losses — that was just a waste of time and money. ❌

Through the Criptotrader Program, Matheus developed real investing maturity and built the mindset of a professional investor, with the ideal vision to reach his medium‑ and long‑term goals. 💰

See? It’s possible to succeed in the crypto world even if you have little time to study the market — you just need a few minutes for chart analysis and the RIGHT METHOD.

So ask yourself: are you being persistent, or just stubborn?

Time to drop stubbornness — there’s still time to change your life. 🔥`
                            : `DEPOIMENTO DO MATHEUS

Se liga!! Matheus é um aluno da primeira turma da Formação Criptotrader e ele deu um depoimento fera sobre os
resultados que adquiriu com o curso 👇

Matheus era teimoso, seguia sua própria metodologia, esperando que, em algum momento, fosse assertivo. No entanto,
teimosia e persistência andam de mãos dadas, exceto por uma coisa…
Só há persistência quando tem progresso, se não temos progresso, estamos apenas sendo teimosos.

Esse insight surgiu para o Matheus somente após entrar na primeira turma da Formação Criptotraders. Ele percebeu que
estava perdendo dinheiro, não pela volatilidade do mercado Cripto, mas, sim, porque não estava aplicando as
estratégias certas para investir de forma segura. ✅

Operar 24 horas por dia, estar sempre ansioso pela variação do gráfico, exposto a grandes riscos e perdas, era
desperdício de tempo e dinheiro. ❌

Através da Formação Criptotrader, Matheus desenvolveu sua maturidade nos investimentos, e construiu a mentalidade de
investidor profissional com a visão ideal para conquistar os seus objetivos em médio e longo prazo! 💰

Sacaram? É possível ter sucesso no mundo Cripto, mesmo que você tenha pouco tempo disponível para estudar o mercado;
só vai precisar de alguns minutos para fazer a análise gráfica e do MÉTODO CERTO!

Você está sendo persistente ou teimoso?

Bora largar de mão a teimosia que ainda dá tempo de mudar de vida 🔥`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <main className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">{t.otherCases}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((caseItem) => (
              <li key={caseItem.id}>
                <Link
                  to={localizePath(`/portfolio/${caseItem.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">{lang === 'en' && caseItem.clientEn ? caseItem.clientEn : caseItem.client}</p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">
                      {lang === 'en' && caseItem.titleEn ? caseItem.titleEn : caseItem.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* CTA final */}
      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {t.ctaFinalMain}<span className="text-amber-accent italic">{t.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const ULBRA_MEDICINA_COPY = {
  pt: {
    badge: '✦ Copy entregue',
    landing: {
      eyebrow: 'Landing Page — Vagas Remanescentes Medicina · Ulbra',
      notice: '⚠️ ATENÇÃO: condição especial válida para o 1º semestre de 2026, apenas 10 vagas por campus.',
      heroLabel: 'Hero',
      heroTitle: 'Benefício exclusivo para cursar o que você sempre sonhou: Medicina.',
      heroBullets: ['✔️ APENAS 10 VAGAS', '✔️ Ingresso exclusivo para novos alunos*', '✔️ Financiamento estudantil de até 60% do curso com a UDEbank'],
      heroNote: '*Válido para novos alunos que não tenham nenhum tipo de financiamento, desconto ou benefício ativo.',
      heroCta: 'QUERO GARANTIR UMA VAGA',
      heroCtaSub: 'Apenas 10 vagas por campus.',
      financingLabel: 'Financiamento',
      financingTitle: 'ESTUDE MEDICINA COM FINANCIAMENTO ESTUDANTIL DE ATÉ 60% DO CURSO COM A UDEBANK',
      financingIntro: 'A Ulbra entende que o seu tempo é precioso. Por isso, removemos as barreiras burocráticas e financeiras que te impediam de começar.',
      financingCards: ['Processo seletivo facilitado', 'Ingresso fácil', 'Financiamento estudantil de até 60%'],
      stepLabel: 'Passo a passo',
      stepTitle: 'PASSO A PASSO PARA VOCÊ GARANTIR ESSA CONDIÇÃO ESPECIAL',
      stepIntro: 'O processo de Vagas Remanescentes da Ulbra valoriza você, que tem a ambição de estudar e ajudar a comunidade. Veja como funciona o seu ingresso:',
      stepItems: [
        { strong: 'Sem vestibular:', text: 'sua seleção é feita através da análise do seu diploma e histórico acadêmico.' },
        { strong: 'Qualquer novo aluno é bem-vindo:', text: 'seja você um novo aluno ou profissional em transição de carreira. O único requisito é que você não tenha nenhum tipo de financiamento, desconto ou benefício ativo.' },
        { strong: 'Alívio financeiro:', text: 'através da parceria exclusiva Ulbra + UDEbank, você pode financiar até 60% das mensalidades, tornando o sonho da Medicina viável hoje.' },
      ],
      conquerLabel: 'O que você conquista',
      conquerTitle: 'O QUE VOCÊ CONQUISTA COM ESTE INGRESSO',
      conquerItems: ['☑ ACESSO FINANCEIRO — crédito estudantil de até 60% do curso.', '☑ QUALIDADE ACADÊMICA GARANTIDA — você entrará em uma universidade com nota máxima no MEC.', '☑ O SONHO REALIZADO — a chance de dar o próximo passo definitivo na sua carreira e finalmente buscar o seu CRM.', '☑ UM NOVO PROPÓSITO — com a Medicina, você ganha um novo propósito profissional e pessoal.', '☑ NOVO ALUNO — que busca a primeira graduação com viabilidade financeira.'],
      conquerCta: 'QUERO GARANTIR UMA VAGA',
      conquerCtaSub: 'Apenas 10 vagas por campus.',
      paraQuemLabel: 'Para quem',
      paraQuemTitle: 'ESTA É A SUA CHANCE SE VOCÊ:',
      paraQuemItems: [
        { strong: 'Sente que parou "antes do CRM":', text: 'profissionais da saúde que sempre quiseram dar o próximo passo.' },
        { strong: 'Busca por transição de carreira:', text: 'profissionais de outras áreas que procuram propósito ou uma melhor situação financeira.' },
        { strong: 'Precisa de viabilidade financeira:', text: 'para quem sabe que Medicina é o melhor investimento, mas precisa de fôlego no fluxo de caixa mensal.' },
      ],
      finalTitle: 'SÃO APENAS 10 VAGAS POR CAMPUS. A PRÓXIMA PODE SER A SUA.',
      finalP: 'Preencha o formulário e dê o primeiro passo. Nossa equipe de consultores entrará em contato para validar sua inscrição, tirar todas as suas dúvidas sobre o edital e garantir a sua condição especial.',
      finalCta: 'QUERO GARANTIR UMA VAGA',
      finalCtaSub: 'Apenas 10 vagas por campus.',
      finalPs: 'PS: Inscrições abertas por tempo limitado. Atenção: são apenas 10 vagas por unidade. A ocupação ocorre por ordem de aprovação dos requisitos. Esse benefício exclusivo pode acabar sem qualquer aviso prévio.',
      faqLabel: 'FAQ',
    },
    cards: {
      eyebrow: 'Cards de campanha — Vagas Remanescentes Medicina · Ulbra',
      card1Label: 'Card 1',
      card1Title: 'Matricule-se em Medicina na Ulbra com benefício exclusivo',
      card1Bullets: '✔️ Financiamento estudantil de até 60% do curso.\n✔️ Ingresso exclusivo para novos alunos\n✔️ Apenas 10 vagas',
      card2Label: 'Card 2',
      card2Title: '60% do seu curso de Medicina financiado',
      card2Lines: 'Parceria Ulbra + UDEbank\nCrédito estudantil facilitado para novos alunos',
      card3Label: 'Card 3',
      card3Title: 'Matricule-se em Medicina sem vestibular!',
      card3Bullets: '✔️ Financiamento estudantil de até 60% do curso.\n✔️ Ingresso exclusivo para novos alunos\n✔️ Apenas 10 vagas',
      ctaLabel: 'CTA: Matricule-se',
      legendLabel: 'Legenda',
      legendText: 'O seu próximo capítulo começa aqui. A Ulbra abre as portas para você conquistar o seu sonho na Medicina com condições exclusivas: 👉 Ingresso facilitado: processo seletivo simplificado e sem vestibular para novos alunos. 👉 Viabilidade: financiamento estudantil de até 60% do curso com a UDEbank. 👉 Apoio total: menos burocracia para você focar no que realmente importa: seu futuro. Sua história te trouxe até aqui. A gente garante as condições para você chegar mais longe. ⚠️ URGENTE: São apenas 10 vagas por campus. A ocupação ocorre por ordem de aprovação dos requisitos. 👉 Clique no botão e inscreva-se agora.',
    },
    roteiros: {
      eyebrow: 'Roteiros de vídeo — Vagas Remanescentes Medicina · Ulbra',
      roteiro1Label: 'Roteiro 1',
      roteiro1: 'Cansado de adiar o sonho da Medicina por causa do valor da mensalidade? A oportunidade que você esperava chegou. Na Ulbra, novos alunos entram direto, com processo seletivo facilitado e sem vestibular. E o melhor: a iniciativa da UDEbank viabiliza o financiamento estudantil de até 60% do curso. Mas atenção: são apenas 10 vagas por campus. A ocupação ocorre por ordem de aprovação dos requisitos e essa condição exclusiva pode acabar sem aviso prévio. Inscreva-se agora clicando no botão abaixo.',
      roteiro2Label: 'Roteiro 2',
      roteiro2: 'Você olha para o espelho e sente que falta algo? Falta o jaleco, falta o propósito, falta a Medicina? Sua trajetória trouxe você até aqui, mas o seu próximo capítulo vai cuidar do seu sonho. Na Ulbra, o ingresso é facilitado e sem vestibular para novos alunos. Nós removemos as barreiras: com a parceria UDEbank, você financia até 60% do curso. O seu próximo capítulo começa agora. Clique no botão e garanta uma das 10 vagas disponíveis para essa modalidade.',
      roteiro3Label: 'Roteiro 3',
      roteiro3: 'Graduação em Medicina com condições exclusivas para novos alunos. Você ingressa em Medicina sem vestibular e com um benefício especial: a UDEbank entrou como parceira, garantindo o financiamento estudantil de até 60% do curso. O caminho para o seu CRM está aberto. Clique no botão e garanta uma das 10 vagas disponíveis.',
      legendLabel: 'Legenda / texto de apoio para todos',
      legendText: 'O seu próximo capítulo começa aqui. Aproveite as condições exclusivas que a Ulbra e a UDEbank prepararam para você conquistar o seu sonho na Medicina: ✅ Ingresso facilitado: processo seletivo simplificado e sem vestibular para novos alunos. ✅ Viabilidade: até 60% do curso financiado pela UDEbank. ✅ Agilidade: menos burocracia para você focar no que realmente importa. Sua história te trouxe até aqui. A gente garante as condições para você chegar mais longe. ⚠️ URGENTE: São apenas 10 vagas por campus e a ocupação é por ordem de aprovação dos requisitos. 👉 Clique no botão e garanta sua vaga agora!',
    },
  },
  en: {
    badge: '✦ Copy delivered',
    landing: {
      eyebrow: 'Landing Page — Leftover Med School seats · Ulbra',
      notice: '⚠️ NOTICE: Special condition valid for 1st semester 2026 only, 10 seats per campus.',
      heroLabel: 'Hero',
      heroTitle: 'Exclusive benefit to study what you always dreamed of: Medicine.',
      heroBullets: ['✔️ ONLY 10 SEATS', '✔️ Exclusive intake for new students*', '✔️ Up to 60% student financing with UDEbank'],
      heroNote: '*Valid for new students with no active financing, discount or benefit.',
      heroCta: 'I WANT TO SECURE A SEAT',
      heroCtaSub: 'Only 10 seats per campus.',
      financingLabel: 'Financing',
      financingTitle: 'STUDY MEDICINE WITH UP TO 60% STUDENT FINANCING WITH UDEBANK',
      financingIntro: 'Ulbra understands that your time is precious. So we removed the bureaucratic and financial barriers that were holding you back.',
      financingCards: ['Simplified selection process', 'Easy enrollment', 'Up to 60% student financing'],
      stepLabel: 'Step by step',
      stepTitle: 'STEP BY STEP TO SECURE THIS SPECIAL CONDITION',
      stepIntro: 'Ulbra’s leftover-seats process values you — someone with the ambition to study and serve the community. Here’s how your enrollment works:',
      stepItems: [
        { strong: 'No entrance exam:', text: 'your selection is based on your diploma and academic record.' },
        { strong: 'Any new student is welcome:', text: 'whether you’re a first-time student or a professional in career transition. The only requirement is that you have no active financing, discount or benefit.' },
        { strong: 'Financial relief:', text: 'through the exclusive Ulbra + UDEbank partnership, you can finance up to 60% of tuition, making the dream of Medicine achievable today.' },
      ],
      conquerLabel: 'What you get',
      conquerTitle: 'WHAT YOU GET WITH THIS INTAKE',
      conquerItems: ['☑ FINANCIAL ACCESS — up to 60% student credit for the course.', '☑ GUARANTEED ACADEMIC QUALITY — you’ll join a university with top MEC rating.', '☑ DREAM ACHIEVED — the chance to take the definitive next step in your career and finally pursue your degree.', '☑ A NEW PURPOSE — with Medicine, you gain a new professional and personal purpose.', '☑ NEW STUDENT — looking for a first degree with financial feasibility.'],
      conquerCta: 'I WANT TO SECURE A SEAT',
      conquerCtaSub: 'Only 10 seats per campus.',
      paraQuemLabel: 'For whom',
      paraQuemTitle: 'THIS IS YOUR CHANCE IF YOU:',
      paraQuemItems: [
        { strong: 'Feel you stopped "before the degree":', text: 'health professionals who always wanted to take the next step.' },
        { strong: 'Are in career transition:', text: 'professionals from other fields looking for purpose or better financial stability.' },
        { strong: 'Need financial feasibility:', text: 'for those who know Medicine is the best investment but need breathing room in their monthly cash flow.' },
      ],
      finalTitle: 'ONLY 10 SEATS PER CAMPUS. THE NEXT ONE COULD BE YOURS.',
      finalP: 'Fill in the form and take the first step. Our consultant team will get in touch to validate your application, answer any questions about the edital and secure your special condition.',
      finalCta: 'I WANT TO SECURE A SEAT',
      finalCtaSub: 'Only 10 seats per campus.',
      finalPs: 'PS: Applications open for a limited time. Note: only 10 seats per unit. Seats are filled in order of approval. This exclusive benefit may end without prior notice.',
      faqLabel: 'FAQ',
    },
    cards: {
      eyebrow: 'Campaign cards — Leftover Med School seats · Ulbra',
      card1Label: 'Card 1',
      card1Title: 'Enroll in Medicine at Ulbra with exclusive benefit',
      card1Bullets: '✔️ Up to 60% student financing for the course.\n✔️ Exclusive intake for new students\n✔️ Only 10 seats',
      card2Label: 'Card 2',
      card2Title: '60% of your Medicine course financed',
      card2Lines: 'Ulbra + UDEbank partnership\nSimplified student credit for new students',
      card3Label: 'Card 3',
      card3Title: 'Enroll in Medicine with no entrance exam!',
      card3Bullets: '✔️ Up to 60% student financing for the course.\n✔️ Exclusive intake for new students\n✔️ Only 10 seats',
      ctaLabel: 'CTA: Enroll now',
      legendLabel: 'Caption',
      legendText: 'Your next chapter starts here. Ulbra opens the door for you to achieve your dream in Medicine with exclusive conditions: 👉 Easy enrollment: simplified selection process and no entrance exam for new students. 👉 Feasibility: up to 60% student financing with UDEbank. 👉 Full support: less bureaucracy so you can focus on what really matters — your future. Your story brought you here. We’ll make sure you have the conditions to go further. ⚠️ URGENT: Only 10 seats per campus. Seats are filled in order of approval. 👉 Click the button and sign up now.',
    },
    roteiros: {
      eyebrow: 'Video scripts — Leftover Med School seats · Ulbra',
      roteiro1Label: 'Script 1',
      roteiro1: 'Tired of putting off the dream of Medicine because of tuition? The opportunity you were waiting for is here. At Ulbra, new students enroll directly, with a simplified selection process and no entrance exam. And best of all: the UDEbank initiative makes up to 60% student financing possible. But note: only 10 seats per campus. Seats are filled in order of approval and this exclusive condition may end without notice. Sign up now by clicking the button below.',
      roteiro2Label: 'Script 2',
      roteiro2: 'You look in the mirror and feel something is missing? The white coat, the purpose, Medicine? Your journey brought you here, but your next chapter will take care of your dream. At Ulbra, enrollment is easy and there’s no entrance exam for new students. We removed the barriers: with the UDEbank partnership, you can finance up to 60% of the course. Your next chapter starts now. Click the button and secure one of the 10 seats available for this intake.',
      roteiro3Label: 'Script 3',
      roteiro3: 'Undergraduate degree in Medicine with exclusive conditions for new students. You enroll in Medicine with no entrance exam and with a special benefit: UDEbank is our partner, providing up to 60% student financing for the course. The path to your degree is open. Click the button and secure one of the 10 available seats.',
      legendLabel: 'Caption / support text for all',
      legendText: 'Your next chapter starts here. Take advantage of the exclusive conditions that Ulbra and UDEbank have prepared for you to achieve your dream in Medicine: ✅ Easy enrollment: simplified selection process and no entrance exam for new students. ✅ Feasibility: up to 60% of the course financed by UDEbank. ✅ Agility: less bureaucracy so you can focus on what really matters. Your story brought you here. We’ll make sure you have the conditions to go further. ⚠️ URGENT: Only 10 seats per campus and filling is by order of approval. 👉 Click the button and secure your seat now!',
    },
  },
}

const ULBRA_MEDICINA_CONTENT = {
  pt: {
    pill: 'Campanha de resposta direta · Educação superior',
    heroTitle: 'Uma campanha para transformar 10 vagas em 10 matrículas.',
    metaClient: 'Ulbra',
    metaDeliverable: 'LP + Cards + Roteiros de vídeo',
    metaContext: 'Vagas remanescentes de Medicina — 1º semestre 2026',
    briefingHeading: 'A oferta era boa. A copy precisava estar à altura.',
    briefingP1: 'A Ulbra abriu um edital especial de vagas remanescentes para o curso de Medicina — apenas 10 vagas por campus, com ingresso sem vestibular e financiamento estudantil de até 60% via parceria com a UDEbank. Uma condição concreta, com escassez real e benefício financeiro direto.',
    briefingP2: 'O desafio era transformar um edital burocrático em campanha de resposta direta que gerasse inscrições imediatas. O público era duplo: profissionais da saúde que sempre quiseram o CRM mas travaram no custo, e pessoas em transição de carreira buscando propósito.',
    briefingP3: 'A campanha precisava comunicar urgência sem parecer desespero, e viabilidade financeira sem parecer que o curso era barato. O financiamento não era desconto — era o que tornava o sonho executável hoje.',
    copiesLabel: 'Copies entregues',
    tabLanding: 'Landing Page',
    tabCards: 'Cards',
    tabRoteiros: 'Roteiros de vídeo',
    faqItems: [
      { question: 'Quem pode ingressar?', answer: 'O edital é aberto para novos alunos em geral, que ainda não possuam nenhum financiamento ou benefício ativo.' },
      { question: 'Como funciona o financiamento UDEbank?', answer: 'É um crédito estudantil facilitado para alunos Ulbra, permitindo que você pague até 60% do valor do curso em condições especiais, diluindo o investimento ao longo do tempo.' },
      { question: 'Preciso ter feito o ENEM?', answer: 'Não. Este ingresso é via análise de documentos.' },
      { question: 'Quais são os campi?', answer: 'As vagas são limitadas para Gravataí (RS), São Jerônimo (RS), Manaus (AM) e Santarém (PA). Cada unidade dispõe de apenas 10 vagas para ingresso com essa modalidade.' },
    ],
  },
  en: {
    pill: 'Direct response campaign · Higher education',
    heroTitle: 'A campaign to turn 10 seats into 10 enrollments.',
    metaClient: 'Ulbra',
    metaDeliverable: 'LP + Cards + Video scripts',
    metaContext: 'Leftover Med School seats — 1st semester 2026',
    briefingHeading: 'The offer was strong. The copy had to match it.',
    briefingP1: 'Ulbra opened a special leftover-seats edital for the Med School program — only 10 seats per campus, no entrance exam and up to 60% student financing via UDEbank. A concrete setup with real scarcity and direct financial benefit.',
    briefingP2: 'The challenge was to turn a bureaucratic edital into a direct-response campaign that drove immediate applications. The audience was twofold: health professionals who always wanted the degree but were stuck on cost, and people in career transition looking for purpose.',
    briefingP3: 'The campaign had to communicate urgency without sounding desperate, and financial feasibility without making the course seem cheap. The financing wasn’t a discount — it was what made the goal achievable today.',
    copiesLabel: 'Copy delivered',
    tabLanding: 'Landing Page',
    tabCards: 'Cards',
    tabRoteiros: 'Video scripts',
    faqItems: [
      { question: 'Who can apply?', answer: 'The edital is open to new students in general who do not yet have any active financing or benefit.' },
      { question: 'How does UDEbank financing work?', answer: 'It is a simplified student credit for Ulbra students, allowing you to pay up to 60% of the course in special conditions, spreading the investment over time.' },
      { question: 'Do I need to have taken the ENEM?', answer: 'No. This intake is via document analysis.' },
      { question: 'Which campuses?', answer: 'Seats are limited to Gravataí (RS), São Jerônimo (RS), Manaus (AM) and Santarém (PA). Each unit has only 10 seats for this intake.' },
    ],
  },
}

// Fallback copy for Ulbra transfer 70% case.
// Se o conteúdo completo existir em outro arquivo no futuro,
// esta constante pode ser substituída por um import.
const ULBRA_TRANSFER_COPY = {
  pt: {
    copyLabel: 'Copy entregue',
    badge: '✦ Copy entregue',
    eyebrow: 'Landing Page · Transferência 70% · Ulbra',
    notice:
      'Condição especial de transferência com até 70% de desconto no 1º semestre de 2026. Válida por tempo limitado e sujeita à disponibilidade de vagas.',
    headline: 'Transfira sua graduação para a Ulbra com até 70% de desconto.',
    headlineP:
      'Uma landing page focada em destravar a decisão de transferência: deixar claro o benefício financeiro, reduzir o medo de burocracia e mostrar que você não perde o que já construiu na graduação atual.',
    cta: 'QUERO APROVEITAR 70% DE DESCONTO',
    whyTitle: 'Por que esta oferta de transferência funciona:',
    whyItems: [
      {
        strong: 'Desconto real e imediato:',
        text: 'o benefício de até 70% de desconto no 1º semestre não é um “até X%” genérico — é uma condição objetiva, com percentual definido e data para acabar.',
      },
      {
        strong: 'Menos medo de perder o que já cursou:',
        text: 'a comunicação reforça que o histórico acadêmico é analisado para aproveitamento máximo de disciplinas já concluídas.',
      },
      {
        strong: 'Burocracia simplificada:',
        text: 'passo a passo claro do que o aluno precisa fazer para transferir, sem juridiquês ou termos confusos.',
      },
    ],
    stepTitle: 'Como funciona a transferência em 3 passos:',
    stepIntro:
      'O fluxo da landing page guia o visitante por uma sequência simples, sempre ancorada no benefício principal (70% de desconto):',
    steps: [
      {
        strong: '1. Descobrir se a oferta é para ele:',
        text: 'bloco inicial de elegibilidade, explicando quem pode participar da campanha de transferência.',
      },
      {
        strong: '2. Entender o que ganha ao transferir:',
        text: 'seção que conecta o desconto com a qualidade da Ulbra, estrutura de campus e tradição acadêmica.',
      },
      {
        strong: '3. Enviar os dados para análise:',
        text: 'CTA final levando para o formulário de transferência, com reforço de urgência e de que a equipe entra em contato para guiar o processo.',
      },
    ],
    finalTitle: 'Uma landing page construída para destravar a decisão de mudar de universidade.',
    finalP1:
      'Todo o texto foi pensado para falar com quem já está cansado de promessas vagas. O benefício é concreto, o passo a passo é claro e o tom é seguro — sem pressão artificial.',
    finalP2:
      'Enquanto a maioria das comunicações de transferência foca apenas no desconto, esta peça equilibra oferta financeira, segurança acadêmica e clareza de processo.',
    faqTitle: 'Perguntas frequentes trabalhadas na landing page',
    faqItems: [
      {
        question: 'Vou perder as disciplinas que já cursei?',
        answer:
          'Não necessariamente. O histórico é analisado para que você aproveite o máximo possível das disciplinas já concluídas, conforme as regras da Ulbra e do MEC.',
      },
      {
        question: 'O desconto de 70% vale para todo o curso?',
        answer:
          'A condição é válida para o 1º semestre de 2026, conforme descrito na campanha. Outras condições podem ser apresentadas pela equipe no momento da simulação.',
      },
      {
        question: 'A transferência é muito burocrática?',
        answer:
          'O fluxo foi simplificado: você envia seus dados pelo formulário, a equipe entra em contato, orienta sobre a documentação e acompanha cada etapa até a matrícula.',
      },
    ],
  },
  en: {
    copyLabel: 'Copy delivered',
    badge: '✦ Copy delivered',
    eyebrow: 'Landing Page · 70% transfer · Ulbra',
    notice:
      'Special transfer offer with up to 70% off for the first semester of 2026. Valid for a limited time and subject to seat availability.',
    headline: 'Transfer your degree to Ulbra with up to 70% off.',
    headlineP:
      'A landing page built to unlock the transfer decision: make the financial benefit clear, reduce the fear of bureaucracy and show that you don’t lose what you have already completed.',
    cta: 'I WANT TO GET 70% OFF',
    whyTitle: 'Why this transfer offer works:',
    whyItems: [
      {
        strong: 'Real, immediate discount:',
        text: 'the benefit of up to 70% off in the first semester is not a vague “up to X%” — it is an objective condition, with a defined percentage and an expiry date.',
      },
      {
        strong: 'Less fear of losing credits:',
        text: 'the copy reinforces that your academic record is reviewed so you can transfer as many completed courses as possible.',
      },
      {
        strong: 'Simplified bureaucracy:',
        text: 'a clear, step‑by‑step explanation of what the student needs to do to transfer, with no legal jargon.',
      },
    ],
    stepTitle: 'How the transfer works in 3 steps:',
    stepIntro:
      'The landing page flow guides the visitor through a simple sequence, always anchored in the main benefit (70% off):',
    steps: [
      {
        strong: '1. Check if the offer is for them:',
        text: 'an initial eligibility block explaining who can take part in the transfer campaign.',
      },
      {
        strong: '2. Understand what they gain by transferring:',
        text: 'a section that connects the discount with Ulbra’s quality, campus infrastructure and academic tradition.',
      },
      {
        strong: '3. Send their details for review:',
        text: 'a final CTA pointing to the transfer form, with urgency and the promise that the team will guide them through the process.',
      },
    ],
    finalTitle: 'A landing page designed to unlock the decision to change universities.',
    finalP1:
      'Every line of copy is written for students who are tired of vague promises. The benefit is concrete, the step‑by‑step is clear and the tone is confident — without artificial pressure.',
    finalP2:
      'While most transfer campaigns focus only on the discount, this piece balances financial benefit, academic safety and process clarity.',
    faqTitle: 'Key FAQs addressed in the landing page',
    faqItems: [
      {
        question: 'Will I lose the courses I have already taken?',
        answer:
          'Not necessarily. Your transcript is reviewed so you can transfer as many completed courses as possible, following Ulbra and MEC rules.',
      },
      {
        question: 'Does the 70% discount apply to the entire degree?',
        answer:
          'The offer applies to the first semester of 2026, as described in the campaign. Other conditions may be presented by the team when you simulate your transfer.',
      },
      {
        question: 'Is the transfer process very bureaucratic?',
        answer:
          'The flow is streamlined: you submit your details via the form, the team gets in touch, guides you on documentation and accompanies each step until enrolment.',
      },
    ],
  },
}

function UlbraMedicinaCasePage({ caseData }) {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].casePage
  const c = ULBRA_MEDICINA_CONTENT[lang] || ULBRA_MEDICINA_CONTENT.pt
  const [activeTab, setActiveTab] = useState('landing')
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const otherCases = getOtherCases(caseData.id, 6)
  const faqItems = c.faqItems
  const copy = ULBRA_MEDICINA_COPY[lang] || ULBRA_MEDICINA_COPY.pt

  const tabs = [
    { id: 'landing', label: c.tabLanding },
    { id: 'cards', label: c.tabCards },
    { id: 'roteiros', label: c.tabRoteiros },
  ]

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index))
  }

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Above the fold */}
      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">
              {t.portfolio}
            </Link>
            <span className="opacity-40">/</span>
            <span>{lang === 'en' ? 'Ulbra — Med School' : 'Ulbra — Medicina'}</span>
          </p>

          <div className="mt-10 sm:mt-12 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            {c.pill}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {c.heroTitle}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.client}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaClient}</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.deliverable}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaDeliverable}</p>
            </div>
            <div className="pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.context}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaContext}</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      {/* Briefing */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.briefing}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                {c.briefingHeading}
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">{c.briefingP1}</p>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">{c.briefingP2}</p>
              <p className="text-[15px] leading-relaxed text-white/75">{c.briefingP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Copies entregues */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{c.copiesLabel}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="mb-6 flex gap-2 overflow-x-auto rounded-full bg-white/5 p-1 text-xs sm:text-[13px]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium tracking-wide transition-all ${
                      activeTab === tab.id ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-accent/15 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-accent py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  {copy.badge}
                </span>

                {activeTab === 'landing' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {copy.landing.eyebrow}
                    </p>

                    <div className="rounded-xl border border-amber-accent/40 bg-black/40 p-4 text-[13px] leading-relaxed text-amber-accent">
                      {copy.landing.notice}
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.landing.heroLabel}</p>
                      <h2 className="mb-3 text-xl sm:text-2xl font-semibold leading-snug text-white">
                        {copy.landing.heroTitle}
                      </h2>
                      <ul className="mb-3 space-y-1.5 text-[15px] leading-relaxed text-white/80">
                        {copy.landing.heroBullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                      <p className="text-[12px] text-white/60">{copy.landing.heroNote}</p>
                      <div className="mt-4 inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                        {copy.landing.heroCta}
                      </div>
                      <p className="mt-2 text-[12px] text-white/60">{copy.landing.heroCtaSub}</p>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.landing.financingLabel}</p>
                      <h3 className="mb-3 text-base font-semibold text-white">
                        {copy.landing.financingTitle}
                      </h3>
                      <p className="mb-4 text-[15px] leading-relaxed text-white/75">
                        {copy.landing.financingIntro}
                      </p>
                      <div className="grid gap-4 sm:grid-cols-3">
                        {copy.landing.financingCards.map((card, i) => (
                          <div key={i} className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                            <p className="font-semibold text-white">{card}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.landing.stepLabel}</p>
                      <h3 className="mb-3 text-base font-semibold text-white">
                        {copy.landing.stepTitle}
                      </h3>
                      <p className="mb-3 text-[15px] leading-relaxed text-white/75">
                        {copy.landing.stepIntro}
                      </p>
                      <ul className="space-y-2 text-[15px] leading-relaxed text-white/80">
                        {copy.landing.stepItems.map((item, i) => (
                          <li key={i}>
                            ➜ <strong className="font-semibold">{item.strong}</strong> {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.landing.conquerLabel}</p>
                      <h3 className="mb-3 text-base font-semibold text-white">{copy.landing.conquerTitle}</h3>
                      <ul className="space-y-1.5 text-[15px] leading-relaxed text-white/80">
                        {copy.landing.conquerItems.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                      <div className="mt-4 inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                        {copy.landing.conquerCta}
                      </div>
                      <p className="mt-2 text-[12px] text-white/60">{copy.landing.conquerCtaSub}</p>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.landing.paraQuemLabel}</p>
                      <h3 className="mb-3 text-base font-semibold text-white">{copy.landing.paraQuemTitle}</h3>
                      <ul className="space-y-2 text-[15px] leading-relaxed text-white/80">
                        {copy.landing.paraQuemItems.map((item, i) => (
                          <li key={i}>
                            ➜ <strong className="font-semibold">{item.strong}</strong> {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                      <p className="text-sm font-semibold text-white">
                        {copy.landing.finalTitle}
                      </p>
                      <p className="text-[14px] leading-relaxed text-white/75">
                        {copy.landing.finalP}
                      </p>
                      <div className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                        {copy.landing.finalCta}
                      </div>
                      <p className="text-[12px] text-white/60">{copy.landing.finalCtaSub}</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                        {copy.landing.finalPs}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.landing.faqLabel}</p>
                      <div className="space-y-2">
                        {faqItems.map((item, index) => {
                          const isOpen = openFaqIndex === index
                          return (
                            <div key={item.question} className="rounded-xl border border-white/10 bg-black/40 transition-colors">
                              <button
                                type="button"
                                onClick={() => toggleFaq(index)}
                                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm sm:text-[15px]"
                              >
                                <span className="font-medium text-white/85">{item.question}</span>
                                <span className="ml-3 text-white/60">{isOpen ? '−' : '+'}</span>
                              </button>
                              {isOpen && (
                                <div className="px-4 pb-3 text-sm text-white/70">
                                  <p>{item.answer}</p>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'cards' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {copy.cards.eyebrow}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.cards.card1Label}</p>
                        <p className="mb-3 text-sm font-semibold leading-snug text-white whitespace-pre-line">
                          {copy.cards.card1Title}
                          {'\n'}
                          {copy.cards.card1Bullets}
                        </p>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">{copy.cards.ctaLabel}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.cards.card2Label}</p>
                        <p className="mb-3 text-sm font-semibold leading-snug text-white whitespace-pre-line">
                          {copy.cards.card2Title}
                          {'\n'}
                          {copy.cards.card2Lines}
                        </p>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">{copy.cards.ctaLabel}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.cards.card3Label}</p>
                        <p className="mb-3 text-sm font-semibold leading-snug text-white whitespace-pre-line">
                          {copy.cards.card3Title}
                          {'\n'}
                          {copy.cards.card3Bullets}
                        </p>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">{copy.cards.ctaLabel}</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.cards.legendLabel}</p>
                      <p className="text-[13px] leading-relaxed text-white/75">
                        {copy.cards.legendText}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'roteiros' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {copy.roteiros.eyebrow}
                    </p>
                    <div className="space-y-5">
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.roteiros.roteiro1Label}</p>
                        <p className="text-[14px] leading-relaxed text-white/80">
                          {copy.roteiros.roteiro1}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.roteiros.roteiro2Label}</p>
                        <p className="text-[14px] leading-relaxed text-white/80">
                          {copy.roteiros.roteiro2}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{copy.roteiros.roteiro3Label}</p>
                        <p className="text-[14px] leading-relaxed text-white/80">
                          {copy.roteiros.roteiro3}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {copy.roteiros.legendLabel}
                      </p>
                      <p className="text-[13px] leading-relaxed text-white/75">
                        {copy.roteiros.legendText}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <main className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">{t.otherCases}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((caseItem) => (
              <li key={caseItem.id}>
                <Link
                  to={localizePath(`/portfolio/${caseItem.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">{lang === 'en' && caseItem.clientEn ? caseItem.clientEn : caseItem.client}</p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">
                      {lang === 'en' && caseItem.titleEn ? caseItem.titleEn : caseItem.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* CTA final */}
      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {t.ctaFinalMain}<span className="text-amber-accent italic">{t.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const ULBRA_PSI_CONTENT = {
  pt: {
    pill: 'Funil completo · Educação superior',
    heroTitle: 'Funil completo para uma pós-graduação.',
    metaClient: 'Ulbra',
    metaDeliverable: 'Funil completo',
    metaContext: 'Pós-Graduação em Psicologia Clínica',
    briefingHeading: 'O problema não era o curso. Era como ele estava sendo apresentado.',
    briefingP1: 'A Ulbra lançou uma pós-graduação em Psicologia Clínica da Infância e da Família com um diferencial real e concreto: supervisão clínica inclusa, pacientes encaminhados pela própria instituição e a possibilidade de continuar com esses pacientes após o curso. Nenhuma outra pós oferecia isso.',
    briefingP2: 'O problema era que ninguém sabia. O material existente descrevia o curso como mais uma especialização — listava grade, corpo docente, formato EAD. O diferencial estava enterrado no meio das informações.',
    briefingP3: 'O trabalho foi reposicionar o curso inteiro em torno do insight central: o psicólogo recém-formado não tem medo de estudar mais — ele tem medo de sentar na frente de um paciente real sem saber o que fazer. A copy partiu desse medo e apresentou a pós como a solução específica para ele.',
    copiesLabel: 'Copies entregues',
    tabLanding: 'Landing Page',
    tabEmails: 'E-mails',
    tabRoteiro: 'Roteiro',
    tabCards: 'Cards',
    tabWhatsapp: 'WhatsApp',
  },
  en: {
    pill: 'Full funnel · Higher education',
    heroTitle: 'Full funnel for a postgraduate program.',
    metaClient: 'Ulbra',
    metaDeliverable: 'Full funnel',
    metaContext: 'Clinical Psychology postgraduate',
    briefingHeading: 'The problem wasn’t the program. It was how it was being presented.',
    briefingP1: 'Ulbra launched a postgraduate program in Clinical Psychology of Childhood and Family with a real differentiator: clinical supervision included, patients referred by the institution, and the chance to continue with those patients after the program. No other program offered that.',
    briefingP2: 'The problem was that nobody knew. Existing materials described the program as just another specialization — syllabus, faculty, distance format. The differentiator was buried in the middle of the info.',
    briefingP3: 'The job was to reposition the entire program around one insight: the newly graduated psychologist isn’t afraid of studying more — they’re afraid of sitting in front of a real patient without knowing what to do. The copy started from that fear and presented the program as the specific answer.',
    copiesLabel: 'Copy delivered',
    tabLanding: 'Landing Page',
    tabEmails: 'Emails',
    tabRoteiro: 'Script',
    tabCards: 'Cards',
    tabWhatsapp: 'WhatsApp',
  },
}

function UlbraCasePage({ caseData }) {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].casePage
  const c = ULBRA_PSI_CONTENT[lang] || ULBRA_PSI_CONTENT.pt
  const [activeTab, setActiveTab] = useState('landing')
  const otherCases = getOtherCases(caseData.id, 6)

  const tabs = [
    { id: 'landing', label: c.tabLanding },
    { id: 'emails', label: c.tabEmails },
    { id: 'roteiro', label: c.tabRoteiro },
    { id: 'cards', label: c.tabCards },
    { id: 'whatsapp', label: c.tabWhatsapp },
  ]

  const faqItems =
    lang === 'en'
      ? [
          {
            question: 'Is the program 100% online?',
            answer:
              'It is a distance-learning program with live classes — you attend in real time, interact with professors and classmates, without leaving home for the theoretical part. Clinical appointments take place at the University Clinic.',
          },
          {
            question: 'Do I need previous clinical experience?',
            answer:
              'No. The postgraduate program was designed precisely for those who are starting in clinical practice and want to build that experience with safety and supervision.',
          },
          {
            question: 'Is supervision included in the tuition?',
            answer:
              'Yes. Clinical case supervision is part of the curriculum — at no additional cost.',
          },
          {
            question: 'Can I keep seeing my patients after the program ends?',
            answer:
              'Yes. That is one of the differentiators: the relationship with the patient is yours, and you can continue the follow-up in your professional practice.',
          },
          {
            question: 'How long does the program last?',
            answer: '1 year, 2 semesters.',
          },
        ]
      : [
          {
            question: 'O curso é 100% online?',
            answer:
              'É EAD com aulas síncronas — você assiste ao vivo, interage com professores e colegas, mas sem precisar sair de casa para as aulas teóricas. Os atendimentos clínicos acontecem na Clínica Escola.',
          },
          {
            question: 'Preciso ter experiência clínica prévia?',
            answer:
              'Não. A pós foi desenhada justamente para quem está começando na área clínica e quer construir essa experiência com segurança e supervisão.',
          },
          {
            question: 'A supervisão está inclusa no valor do curso?',
            answer:
              'Sim. A supervisão de casos clínicos é parte do currículo — sem custos adicionais.',
          },
          {
            question: 'Posso continuar atendendo os pacientes depois que terminar a pós?',
            answer:
              'Sim. Esse é um dos diferenciais: o vínculo com o paciente é seu, e você pode levar esse acompanhamento para sua vida profissional.',
          },
          {
            question: 'Qual é a duração do curso?',
            answer: '1 ano, 2 semestres.',
          },
        ]

  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index))
  }

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">
              {t.portfolio}
            </Link>
            <span className="opacity-40">/</span>
            <span>Ulbra</span>
          </p>

          <div className="mt-10 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8982A]" />
            {c.pill}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {c.heroTitle}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.client}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaClient}</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.deliverable}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaDeliverable}</p>
            </div>
            <div className="pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.context}</p>
              <p className="text-[15px] font-medium text-white/80">{c.metaContext}</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C8982A]">{t.briefing}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                {c.briefingHeading}
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">{c.briefingP1}</p>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">{c.briefingP2}</p>
              <p className="text-[15px] leading-relaxed text-white/75">{c.briefingP3}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C8982A]">{c.copiesLabel}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="mb-6 flex gap-2 overflow-x-auto rounded-full bg-white/5 p-1 text-xs sm:text-[13px]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium tracking-wide transition-all ${
                      activeTab === tab.id ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-[#C8982A]/15 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#C8982A] py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  {lang === 'en' ? '✦ Copy delivered' : '✦ Copy entregue'}
                </span>

                {activeTab === 'landing' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {lang === 'en'
                        ? 'Landing Page — Postgraduate Program in Clinical Psychology of Childhood and Family · Ulbra'
                        : 'Landing Page — Pós-Graduação em Psicologia Clínica da Infância e da Família · Ulbra'}
                    </p>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Hero</p>
                      <h2 className="mb-2 text-xl sm:text-2xl font-semibold leading-snug text-white">
                        {lang === 'en'
                          ? 'You graduated in Psychology. But you still don’t feel ready to see patients.'
                          : 'Você se formou em Psicologia. Mas ainda não se sente pronto para atender?'}
                      </h2>
                      <p className="text-[15px] leading-relaxed text-white/75">
                        {lang === 'en'
                          ? 'Most postgraduate programs deliver theory. Ulbra delivers experience with real patients, supervision included and the support you wish you had from the start.'
                          : 'A maioria das pós-graduações entrega teoria. A Ulbra entrega experiência com pacientes reais, supervisão especializada inclusa e o suporte que você precisava desde o início.'}
                      </p>
                      <div className="mt-4 inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                        {lang === 'en'
                          ? 'I WANT TO BUILD MY CLINICAL CAREER'
                          : 'QUERO CONSTRUIR MINHA CARREIRA CLÍNICA'}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en' ? 'Problem' : 'Problema'}
                      </p>
                      <h3 className="mb-2 text-base font-semibold text-white">
                        {lang === 'en'
                          ? 'Having the diploma is not the same as feeling like a psychologist.'
                          : 'Ter o diploma não é o mesmo que se sentir psicólogo.'}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-white/75">
                        {lang === 'en'
                          ? 'You spent years studying. Got good grades. Finished your internship. But when it is time to sit in front of a real patient — alone, without supervision — the doubt hits: “Am I really prepared for this?” That insecurity is more common than it seems.'
                          : 'Você passou anos estudando. Tirou boas notas. Fez o estágio. Mas na hora de sentar na frente de um paciente de verdade — sozinho, sem supervisão — bate aquela dúvida. "Será que estou preparado?" Essa insegurança é mais comum do que parece.'}
                      </p>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en' ? 'Solution' : 'Solução'}
                      </p>
                      <h3 className="mb-2 text-base font-semibold text-white">
                        {lang === 'en'
                          ? 'A postgraduate program made for those who want to practice.'
                          : 'Uma pós-graduação feita para quem quer atender.'}
                      </h3>
                      <p className="mb-3 text-[15px] leading-relaxed text-white/75">
                        {lang === 'en'
                          ? 'Ulbra’s Postgraduate Program in Clinical Psychology of Childhood and Family was designed to turn knowledge into clinical competence.'
                          : 'A Especialização em Psicologia Clínica da Infância e da Família da Ulbra foi desenhada para transformar conhecimento em competência clínica.'}
                      </p>
                      <ul className="space-y-2">
                        <li className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                          <span className="text-[#C8982A]">➜</span>
                          {lang === 'en'
                            ? 'Supervised practice included — you see patients at the University Clinic with specialist supervision. No extra fees, no need to look for supervision elsewhere.'
                            : 'Prática supervisionada inclusa — você atende na Clínica Escola com supervisão de especialistas. Sem custo extra. Sem precisar buscar supervisão por fora.'}
                        </li>
                        <li className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                          <span className="text-[#C8982A]">➜</span>
                          {lang === 'en'
                            ? 'Real patients from day one — Ulbra sends you your first patients. You don’t start from zero.'
                            : 'Pacientes reais desde o início — a Ulbra faz o encaminhamento dos seus primeiros pacientes. Você não começa do zero.'}
                        </li>
                        <li className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                          <span className="text-[#C8982A]">➜</span>
                          {lang === 'en'
                            ? 'Your patients, for the long term — after finishing the program, you can keep seeing the patients you followed during the course. The relationship is yours.'
                            : 'Seus pacientes, para a vida toda — ao concluir a pós, você pode continuar acompanhando os pacientes que atendeu durante o curso. O vínculo é seu.'}
                        </li>
                        <li className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                          <span className="text-[#C8982A]">➜</span>
                          {lang === 'en'
                            ? 'Distance-learning with live classes — schedule flexibility without losing real-time interaction with professors and classmates.'
                            : 'EAD com aulas ao vivo — flexibilidade de horário sem abrir mão da interação com professores e colegas.'}
                        </li>
                        <li className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                          <span className="text-[#C8982A]">➜</span>
                          {lang === 'en'
                            ? 'Specialised faculty — professors with real clinical experience, not only academic credentials.'
                            : 'Corpo docente especializado — professores com experiência clínica, não só acadêmica.'}
                        </li>
                      </ul>
                      <div className="mt-5 inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                        {lang === 'en'
                          ? 'I WANT TO BUILD MY CLINICAL CAREER'
                          : 'QUERO CONSTRUIR MINHA CARREIRA CLÍNICA'}
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en' ? 'Who it is for' : 'Para quem'}
                      </p>
                      <h3 className="mb-2 text-base font-semibold text-white">
                        {lang === 'en'
                          ? 'This postgraduate program is for you if…'
                          : 'Essa pós foi feita para você se…'}
                      </h3>
                      <ul className="space-y-1.5 text-[15px] leading-relaxed text-white/75 list-disc list-inside">
                        <li>
                          {lang === 'en'
                            ? 'You are a newly graduated psychologist and want to take your first clinical steps with confidence.'
                            : 'Você é psicólogo recém-formado e quer dar os primeiros passos na clínica com segurança'}
                        </li>
                        <li>
                          {lang === 'en'
                            ? 'You want to work with children and families, but feel you need more preparation.'
                            : 'Você quer atuar com crianças e famílias, mas sente que precisa de mais preparo'}
                        </li>
                        <li>
                          {lang === 'en'
                            ? 'You want to build your patient base already during your specialisation.'
                            : 'Você quer construir sua carteira de pacientes desde a especialização'}
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en' ? 'Comparison' : 'Comparativo'}
                      </p>
                      <h3 className="mb-4 text-base font-semibold text-white">
                        {lang === 'en'
                          ? 'What makes this postgraduate different from all the others'
                          : 'O que separa essa pós de todas as outras'}
                      </h3>
                      <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 sm:grid-cols-2 sm:p-6">
                        <div>
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                            {lang === 'en' ? 'Traditional postgraduate programs' : 'Pós tradicionais'}
                          </p>
                          <ul className="space-y-1.5 text-[14px] leading-relaxed text-white/40">
                            <li>
                              {lang === 'en'
                                ? 'Supervision paid separately'
                                : 'Supervisão paga à parte'}
                            </li>
                            <li>
                              {lang === 'en'
                                ? 'You have to find your own patients'
                                : 'Você busca seus próprios pacientes'}
                            </li>
                            <li>
                              {lang === 'en'
                                ? 'You finish the course and still start from zero'
                                : 'Termina o curso e começa do zero'}
                            </li>
                            <li>
                              {lang === 'en'
                                ? 'Focus on theory and research'
                                : 'Foco em teoria e pesquisa'}
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C8982A]">Ulbra</p>
                          <ul className="space-y-1.5 text-[14px] leading-relaxed text-white">
                            <li>
                              {lang === 'en'
                                ? '✓ Supervision included in the program'
                                : '✓ Supervisão inclusa no curso'}
                            </li>
                            <li>
                              {lang === 'en'
                                ? '✓ Ulbra sends you your first patients'
                                : '✓ A Ulbra encaminha seus primeiros pacientes'}
                            </li>
                            <li>
                              {lang === 'en'
                                ? '✓ You finish the program with patients and real experience'
                                : '✓ Termina o curso com pacientes e experiência real'}
                            </li>
                            <li>
                              {lang === 'en'
                                ? '✓ Focus on supervised clinical practice'
                                : '✓ Foco em prática clínica supervisionada'}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en' ? 'Proof' : 'Prova'}
                      </p>
                      <h3 className="mb-2 text-base font-semibold text-white">
                        {lang === 'en'
                          ? 'The story of who has already trained generations of psychologists'
                          : 'A história de quem já formou gerações de psicólogos'}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-white/75">
                        {lang === 'en'
                          ? 'Ulbra has half a century of tradition in training professionals. Our University Clinic carries out thousands of appointments every year and is a reference in applied and supervised psychology. More than 500,000 professionals in all fields have graduated from Ulbra across Brazil.'
                          : 'A Ulbra tem meio século de tradição na formação de profissionais. Nossa Clínica Escola realiza milhares de atendimentos por ano e é referência em psicologia aplicada e supervisionada. São 500+ mil profissionais de todas as áreas formados pela Ulbra, a nível nacional.'}
                      </p>
                    </div>

                    <div className="mt-2">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">FAQ</p>
                      <div className="space-y-2">
                        {faqItems.map((item, index) => {
                          const isOpen = openFaqIndex === index
                          return (
                            <div
                              key={item.question}
                              className="rounded-xl border border-white/10 bg-black/40 transition-colors"
                            >
                              <button
                                type="button"
                                onClick={() => toggleFaq(index)}
                                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm sm:text-[15px]"
                              >
                                <span className="font-medium text-white/85">{item.question}</span>
                                <span className="ml-3 text-white/60">{isOpen ? '−' : '+'}</span>
                              </button>
                              {isOpen && (
                                <div className="px-4 pb-3 text-sm text-white/70">
                                  <p>{item.answer}</p>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-6">
                      <p className="mb-3 text-sm font-medium text-white/80">
                        {lang === 'en'
                          ? 'Take the first step towards the clinical career you want.'
                          : 'Dê o primeiro passo para a carreira clínica que você tanto deseja.'}
                      </p>
                      <div className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-xs font-semibold uppercase tracking-widest">
                        QUERO CONSTRUIR MINHA CARREIRA CLÍNICA
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'emails' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {lang === 'en'
                        ? 'Email sequence — Postgraduate Program in Clinical Psychology of Childhood and Family · Ulbra'
                        : 'Sequência de e-mails — Pós-Graduação em Psicologia Clínica da Infância e da Família · Ulbra'}
                    </p>

                    <div className="space-y-5">
                      <div className="rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5">
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                          {lang === 'en' ? 'Email 1' : 'E-mail 1'}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {lang === 'en'
                            ? 'Subject: You graduated from Ulbra. Now what?'
                            : 'Assunto: Você se formou na Ulbra. E agora?'}
                        </p>
                        <p className="mb-3 text-xs text-white/60">
                          {lang === 'en'
                            ? 'Preheader: Clinical practice is calling — and Ulbra has a path for you.'
                            : 'Pré-header: A clínica te chama e a Ulbra tem um caminho pra você.'}
                        </p>
                        <p className="text-[14px] leading-relaxed text-white/75">
                          {lang === 'en'
                            ? 'Hi, [Name]. You are part of Ulbra’s story. You spent years here, dedicated yourself and graduated. But we know the diploma is only the beginning — especially for those who want to work in clinical practice. The question many psychologists carry after graduation is the same: “Am I really prepared to see patients?” If you have ever asked yourself that, what we are about to share is for you. Ulbra is launching the Postgraduate Program in Clinical Psychology of Childhood and Family — a distance-learning specialisation with live classes, created to turn knowledge into real clinical experience. It is not just another theoretical program. Here you see real patients, with specialised supervision included from the very first weeks — at no extra cost, without having to look for supervision elsewhere. And there’s more: Ulbra sends you your first patients. You don’t start from zero. Want all the details about curriculum, faculty and intakes?'
                            : 'Olá, [Nome]. Você fez parte da história da Ulbra. Passou anos aqui, se dedicou, e colou grau. Mas sabemos que o diploma é só o começo — especialmente para quem quer atuar na clínica. A dúvida que muitos psicólogos carregam depois da formatura é a mesma: "Estou preparado para atender de verdade?" Se você já se fez essa pergunta, o que vamos te contar agora foi feito pra você. A Ulbra está lançando a Pós-Graduação em Psicologia Clínica da Infância e da Família — uma especialização EAD com aulas ao vivo, criada para transformar conhecimento em experiência clínica real. Não é mais uma pós teórica. Aqui você atende pacientes reais, com supervisão especializada inclusa desde as primeiras semanas — sem custo extra, sem precisar buscar supervisão por fora. E tem mais: a Ulbra encaminha seus primeiros pacientes. Você não começa do zero. Quer saber tudo sobre a pós, grade, corpo docente e turmas?'}
                        </p>
                        <div className="mt-3 inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                          {lang === 'en'
                            ? 'I want to know more about the postgraduate program'
                            : 'Quero conhecer a pós-graduação'}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5">
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                          {lang === 'en' ? 'Email 2' : 'E-mail 2'}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {lang === 'en'
                            ? 'Subject: What no other postgraduate gives you (and Ulbra does)'
                            : 'Assunto: O que nenhuma outra pós te oferece (e a Ulbra oferece)'}
                        </p>
                        <p className="mb-3 text-xs text-white/60">
                          {lang === 'en'
                            ? 'Preheader: Supervision included, real patients and a differentiator that changes everything.'
                            : 'Pré-header: Supervisão inclusa, pacientes reais e um diferencial que muda tudo.'}
                        </p>
                        <p className="text-[14px] leading-relaxed text-white/75">
                          {lang === 'en'
                            ? 'Hi, [Name]. In the last email we told you about Ulbra’s new Postgraduate Program in Clinical Psychology of Childhood and Family. Today we want to show you why it is different from everything else on the market. Most psychology postgraduates follow the same model: classes, theory, final paper… and you leave with a title, but without really knowing how to lead a session with confidence. At Ulbra, it works like this:'
                            : 'Olá, [Nome]. No último e-mail, te contamos sobre a nova Pós em Psicologia Clínica da Infância e da Família da Ulbra. Hoje queremos te mostrar por que ela é diferente de tudo que você já viu no mercado. A maioria das pós-graduações em psicologia segue o mesmo modelo: aulas, teoria, TCC… e você sai com um título, mas sem saber exatamente como conduzir um atendimento com segurança. Na Ulbra, funciona assim:'}
                        </p>
                        <ul className="mt-2 space-y-1.5 text-[14px] leading-relaxed text-white/80">
                          <li>
                            {lang === 'en'
                              ? '✓ Clinical supervision included in the program'
                              : '✓ Supervisão clínica inclusa no curso'}
                          </li>
                          <li>
                            {lang === 'en'
                              ? '✓ Ulbra sends you your first patients'
                              : '✓ A Ulbra encaminha seus primeiros pacientes'}
                          </li>
                          <li>
                            {lang === 'en'
                              ? '✓ The patient remains yours after you finish'
                              : '✓ O paciente é seu ao terminar'}
                          </li>
                          <li>
                            {lang === 'en'
                              ? '✓ Distance-learning with live classes'
                              : '✓ EAD com aulas ao vivo'}
                          </li>
                          <li>
                            {lang === 'en'
                              ? '✓ Faculty of masters and PhDs with clinical practice'
                              : '✓ Corpo docente de mestres e doutores com atuação clínica'}
                          </li>
                        </ul>
                        <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                          {lang === 'en'
                            ? 'You complete the program with real experience, supervised practice and patients ready to continue with you in your career.'
                            : 'Você termina a pós com bagagem, experiência supervisionada e pacientes prontos para seguir com você na carreira.'}
                        </p>
                        <div className="mt-3 inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                          {lang === 'en'
                            ? 'I want to secure my spot'
                            : 'Quero garantir minha vaga'}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5">
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                          {lang === 'en' ? 'Email 3' : 'E-mail 3'}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          {lang === 'en'
                            ? 'Subject: Last spots: Postgraduate in Clinical Psychology of Childhood and Family'
                            : 'Assunto: Últimas vagas: pós em Psicologia Clínica da Infância e da Família'}
                        </p>
                        <p className="mb-3 text-xs text-white/60">
                          {lang === 'en'
                            ? 'Preheader: Enrollment is closing. Don’t leave it for later.'
                            : 'Pré-header: As inscrições estão se encerrando. Não deixe pra depois.'}
                        </p>
                        <p className="text-[14px] leading-relaxed text-white/75">
                          {lang === 'en'
                            ? 'Hi, [Name]. This is our last email about the Postgraduate Program in Clinical Psychology of Childhood and Family. Enrollment is closing. Spots are limited for a simple reason: every student receives individual follow-up and clinical supervision. We can’t open places for everyone at once. If you have come this far and are still considering it, let us ask you something: a year from now, do you want to be exactly where you are today — or already seeing patients, with supervised experience and a patient base built during the specialisation itself? Ulbra is offering exactly that: supervision included and patients referred by the institution. You already took the first step by getting here. This is the next one.'
                            : 'Olá, [Nome]. Esse é nosso último e-mail sobre a Pós em Psicologia Clínica da Infância e da Família. As inscrições estão se encerrando. As vagas são limitadas por uma razão simples: cada aluno recebe acompanhamento individualizado e supervisão clínica. Não dá para abrir vaga para todo mundo ao mesmo tempo. Se você chegou até aqui e ainda está considerando, deixa a gente te fazer uma pergunta: Daqui a um ano, você quer estar exatamente onde está hoje ou quer estar atendendo, com experiência clínica e uma carteira de pacientes construída durante a própria especialização? A Ulbra está oferecendo exatamente isso. Com supervisão inclusa e pacientes encaminhados pela instituição. Você já deu o primeiro passo aqui. Esse é o próximo.'}
                        </p>
                        <div className="mt-3 inline-flex items-center rounded-full bg-white text-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
                          {lang === 'en'
                            ? 'I want to secure my spot now'
                            : 'Quero garantir minha vaga agora'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'roteiro' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {lang === 'en'
                        ? 'Video script — Postgraduate in Clinical Psychology · Ulbra'
                        : 'Roteiro de vídeo — Pós-Graduação em Psicologia Clínica · Ulbra'}
                    </p>
                    <div className="space-y-4 text-[15px] leading-relaxed text-white/80">
                      <p>
                        {lang === 'en'
                          ? 'You graduated in Psychology. But you still don’t feel ready to see patients.'
                          : 'Você se formou em psicologia. Mas ainda não se sente pronto para atender?'}
                      </p>
                      <p>
                        {lang === 'en'
                          ? 'Most postgraduate programs deliver theory. You finish with a diploma, but without real experience.'
                          : 'A maioria das pós-graduações entrega teoria. Você termina o curso com o diploma, mas sem experiência.'}
                      </p>
                      <p>
                        {lang === 'en'
                          ? 'In Ulbra’s Postgraduate Program in Clinical Psychology of Childhood and Family it is different. You see real patients, with specialised supervision included from the very first weeks.'
                          : 'Na Pós em Psicologia Clínica da Infância e da Família da Ulbra é diferente. Você atende pacientes reais, com supervisão especializada inclusa, desde as primeiras semanas.'}
                      </p>
                      <p>
                        {lang === 'en'
                          ? 'Ulbra sends you your first patients. And when you finish — the relationship is yours for the long term. You decide whether to keep seeing them privately.'
                          : 'A Ulbra encaminha seus primeiros pacientes. E quando você terminar — o vínculo é seu, para a vida toda. Você escolhe se deseja levar o paciente para atendimento particular.'}
                      </p>
                      <p>
                        {lang === 'en'
                          ? 'You complete the program with real appointments, learning supervised by experienced faculty and patients ready to continue with you in your career.'
                          : 'Você termina a pós com a bagagem de atendimentos reais, aprendizado supervisionado por mestres e doutores e pacientes prontos para seguir com você na carreira.'}
                      </p>
                      <p>
                        {lang === 'en'
                          ? 'Take the first step towards the clinical career you want. Click the button and apply.'
                          : 'Dê o primeiro passo para a carreira clínica que você deseja. Clique no botão e inscreva-se!'}
                      </p>
                    </div>
                    <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                        {lang === 'en' ? 'Video caption' : 'Legenda do vídeo'}
                      </p>
                      <p className="text-[14px] leading-relaxed text-white/75">
                        {lang === 'en'
                          ? 'You graduated in Psychology but still don’t feel ready to see patients? That feeling is more common than it seems — and it’s not your fault. Ulbra’s Postgraduate Program in Clinical Psychology of Childhood and Family was created to close this gap: you see real patients, with specialised supervision included from the beginning. No need to search for supervision elsewhere. No starting from zero after you finish. You leave with theory, clinical experience and patients to start your career the right way.'
                          : 'Você se formou em psicologia, mas ainda não se sente pronto para atender? Essa sensação é mais comum do que parece. E não é culpa sua. A Pós em Psicologia Clínica da Infância e da Família da Ulbra foi feita para fechar esse gap: você atende pacientes reais, com supervisão especializada inclusa, desde o início do curso. Sem buscar supervisão por fora. Sem começar do zero depois que terminar. Você sai com teoria, experiência clínica e pacientes para dar início à sua carreira do jeito certo.'}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'cards' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {lang === 'en'
                        ? 'Social media cards — Postgraduate in Clinical Psychology · Ulbra'
                        : 'Cards para redes — Pós-Graduação em Psicologia Clínica · Ulbra'}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                          {lang === 'en' ? 'Card 1' : 'Card 1'}
                        </p>
                        <p className="mb-3 text-sm font-semibold leading-snug text-white">
                          {lang === 'en'
                            ? 'You have the diploma. Clinical experience is what’s missing. Ulbra gives you both.'
                            : 'Você tem o diploma. Falta a experiência clínica. A Ulbra te dá as duas coisas.'}
                        </p>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C8982A]">
                          {lang === 'en' ? 'CTA: Enroll now' : 'CTA: Matricule-se'}
                        </p>
                        <hr className="my-3 border-white/10" />
                        <p className="text-[13px] leading-relaxed text-white/75">
                          {lang === 'en'
                            ? 'Most newly graduated psychologists feel the same: diploma in hand, but insecurity when it’s time to truly see patients. Ulbra’s Postgraduate Program in Clinical Psychology of Childhood and Family was created exactly for that — you see real patients, with specialised supervision included from the start. No searching for supervision elsewhere. No starting from zero. 👉 Click the button and enroll.'
                            : 'A maioria dos psicólogos recém-formados sente o mesmo: diploma em mãos, mas insegurança na hora de atender de verdade. A Pós em Psicologia Clínica da Infância e da Família da Ulbra foi feita exatamente para isso, você atende pacientes reais, com supervisão especializada inclusa, desde o início. Sem buscar supervisão por fora. Sem começar do zero. 👉 Clique no botão e faça a sua inscrição'}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                          {lang === 'en' ? 'Card 2' : 'Card 2'}
                        </p>
                        <p className="mb-3 text-sm font-semibold leading-snug text-white">
                          {lang === 'en' ? '✅ Supervision included in the program' : '✅ Supervisão inclusa no curso'}
                          <br />
                          {lang === 'en'
                            ? '✅ Ulbra sends you your first patients'
                            : '✅ Ulbra encaminha seus primeiros pacientes'}
                          <br />
                          {lang === 'en'
                            ? '✅ Possibility to keep the patient after you finish'
                            : '✅ Possibilidade de continuar com o paciente ao terminar a pós'}
                        </p>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C8982A]">
                          {lang === 'en' ? 'CTA: Enroll now' : 'CTA: Matricule-se'}
                        </p>
                        <hr className="my-3 border-white/10" />
                        <p className="text-[13px] leading-relaxed text-white/75">
                          {lang === 'en'
                            ? 'Most newly graduated psychologists feel the same: diploma in hand, but insecurity when it’s time to truly see patients. Ulbra’s Postgraduate Program in Clinical Psychology of Childhood and Family was created exactly for that — you see real patients, with specialised supervision included from the start. No searching for supervision elsewhere. No starting from zero. 👉 Click the button and enroll.'
                            : 'A maioria dos psicólogos recém-formados sente o mesmo: diploma em mãos, mas insegurança na hora de atender de verdade. A Pós em Psicologia Clínica da Infância e da Família da Ulbra foi feita exatamente para isso, você atende pacientes reais, com supervisão especializada inclusa, desde o início. Sem buscar supervisão por fora. Sem começar do zero. 👉 Clique no botão e faça a sua inscrição'}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                          {lang === 'en' ? 'Card 3' : 'Card 3'}
                        </p>
                        <p className="mb-3 text-sm font-semibold leading-snug text-white">
                          {lang === 'en'
                            ? '✅ Distance-learning classes with in-person appointments at the University Clinic'
                            : '✅ Aulas EAD com atendimento na Clínica-Escola presencial'}
                          <br />
                          {lang === 'en'
                            ? '✅ Focus on supervised clinical practice'
                            : '✅ Foco em prática clínica supervisionada'}
                          <br />
                          {lang === 'en' ? 'Last spots!' : 'Últimas vagas!'}
                        </p>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C8982A]">
                          {lang === 'en' ? 'CTA: Enroll now' : 'CTA: Matricule-se'}
                        </p>
                        <hr className="my-3 border-white/10" />
                        <p className="text-[13px] leading-relaxed text-white/75">
                          {lang === 'en'
                            ? 'Most newly graduated psychologists feel the same: diploma in hand, but insecurity when it’s time to truly see patients. Ulbra’s Postgraduate Program in Clinical Psychology of Childhood and Family was created exactly for that — you see real patients, with specialised supervision included from the start. No searching for supervision elsewhere. No starting from zero. 👉 Click the button and enroll.'
                            : 'A maioria dos psicólogos recém-formados sente o mesmo: diploma em mãos, mas insegurança na hora de atender de verdade. A Pós em Psicologia Clínica da Infância e da Família da Ulbra foi feita exatamente para isso, você atende pacientes reais, com supervisão especializada inclusa, desde o início. Sem buscar supervisão por fora. Sem começar do zero. 👉 Clique no botão e faça a sua inscrição'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'whatsapp' && (
                  <div className="space-y-6">
                    <p className="border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                      {lang === 'en'
                        ? 'WhatsApp flow — Postgraduate in Clinical Psychology · Ulbra'
                        : 'Fluxo de WhatsApp — Pós-Graduação em Psicologia Clínica · Ulbra'}
                    </p>
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                          {lang === 'en' ? 'Message 1' : 'Mensagem 1'}
                        </p>
                        <p className="text-[14px] leading-relaxed text-white/80">
                          {lang === 'en'
                            ? 'Hi, [Name]! 👋 This is Ulbra’s team. How are you? You graduated in Psychology with us, so we want to share some news with you first-hand. We are launching the Postgraduate Program in Clinical Psychology of Childhood and Family — a distance-learning specialisation with live classes, clinical supervision included and real patients referred by Ulbra itself. In other words: you don’t start from zero. 💙 We’ve prepared a page with all the details: curriculum, faculty and conditions. 👉 [LANDING PAGE LINK] If you have any questions, just reply here — we’re available.'
                            : 'Olá, [Nome]! 👋 Aqui é a equipe da Ulbra. Tudo bem? Você se formou em Psicologia aqui conosco e, por isso, queremos te contar em primeira mão sobre uma novidade. Estamos lançando a Pós-Graduação em Psicologia Clínica da Infância e da Família, uma especialização EAD com aulas ao vivo, supervisão clínica inclusa e pacientes reais encaminhados pela própria Ulbra. Ou seja: você não começa do zero. 💙 Preparamos uma página com todos os detalhes: grade, corpo docente e condições. 👉 [LINK DA LP] Qualquer dúvida, só nos mandar por aqui. Estamos à disposição!'}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                          {lang === 'en' ? 'Message 2' : 'Mensagem 2'}
                        </p>
                        <p className="text-[14px] leading-relaxed text-white/80">
                          {lang === 'en'
                            ? 'Hi, [Name]! 😊 Just passing by to share what makes our new Postgraduate Program in Clinical Psychology of Childhood and Family different from everything else you’ll find in the market. In most psychology specialisations, you still have to find your own patients. In Ulbra’s program: ✅ Supervision included in the course / ✅ Ulbra sends you your first patients / ✅ When you finish, the relationship with the patient is yours. It’s the real clinical experience that undergrad can’t deliver. See all the details here 👇 [LANDING PAGE LINK]'
                            : 'Oi, [Nome]! 😊 Passando para compartilhar algo que faz a nossa nova Pós-Graduação em Psicologia Clínica da Infância e da Família ser diferente de tudo que você vai encontrar no mercado. Na maioria das especializações em psicologia, você ainda precisa buscar seus próprios pacientes. Na Pós da Ulbra: ✅ Supervisão inclusa no curso / ✅ A Ulbra encaminha seus primeiros pacientes / ✅ Ao terminar, o vínculo com o paciente é seu. É a experiência clínica real que a graduação não consegue entregar. Veja todos os detalhes aqui 👇 [LINK DA LP]'}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                          {lang === 'en' ? 'Message 3' : 'Mensagem 3'}
                        </p>
                        <p className="text-[14px] leading-relaxed text-white/80">
                          {lang === 'en'
                            ? 'Hi, [Name], how are you? Enrollment for the Postgraduate Program in Clinical Psychology of Childhood and Family is closing. Spots are limited because each student receives individual clinical supervision — we simply can’t open places for everyone. If you’ve been thinking about taking the next step in your clinical career, this is the moment. 👉 [LANDING PAGE LINK] Any questions, just reply here. It’ll be a pleasure to help you!'
                            : 'Oi, [Nome], tudo bem? As inscrições para a Pós em Psicologia Clínica da Infância e da Família estão se encerrando. As vagas são limitadas justamente porque cada aluno tem supervisão clínica individualizada — não dá para abrir vaga para todo mundo. Se você tem pensado em dar o próximo passo na carreira clínica, esse é o momento. 👉 [LINK DA LP] Qualquer dúvida é só responder aqui. Será um prazer te ajudar!'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">{t.otherCases}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((caseItem) => (
              <li key={caseItem.id}>
                <Link
                  to={localizePath(`/portfolio/${caseItem.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                      {lang === 'en' && caseItem.clientEn ? caseItem.clientEn : caseItem.client}
                    </p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">
                      {lang === 'en' && caseItem.titleEn ? caseItem.titleEn : caseItem.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {t.ctaFinalMain}<span className="text-[#C8982A] italic">{t.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function UlbraDireitoCasePage({ caseData }) {
  const [activeTab, setActiveTab] = useState('eles')
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].casePage
  const content = DIREITO_CONTENT[lang]
  const otherCases = getOtherCases(caseData.id, 6)

  const tabs = [
    { id: 'eles', label: content.tabEles },
    { id: 'vsl1', label: content.tabVsl1 },
    { id: 'vsl2', label: content.tabVsl2 },
    { id: 'carta', label: content.tabCarta },
  ]

  const buttonClass =
    'inline-flex items-center rounded-full bg-white text-black px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]'

  const renderEles = () => {
    if (content.elesStory) {
      return (
        <div className="space-y-6">
          <div className="flex justify-center mb-6">
            <figure className="max-w-[480px] w-full">
              <img
                src="https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/Captura%20de%20tela%202026-03-10%20164003.png"
                alt={content.figCaption}
                className="w-full rounded-2xl border border-white/10 object-cover"
              />
              <figcaption className="mt-2 text-[12px] text-white/40 text-center">{content.figCaption}</figcaption>
            </figure>
          </div>
          <p className="text-[15px] leading-relaxed text-white/75">{content.elesLead}</p>
          <hr className="my-6 border-t border-white/10" />
          <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">{content.elesStory}</p>
          <div className="mt-4">
            <span className={buttonClass} style={{ pointerEvents: 'none' }}>{content.ctaButtonJoin}</span>
          </div>
        </div>
      )
    }
    return (
    <div className="space-y-6">
      <div className="flex justify-center mb-6">
        <figure className="max-w-[480px] w-full">
          <img
            src="https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/Captura%20de%20tela%202026-03-10%20164003.png"
            alt="Referência: anúncio original de John Caples, 1926"
            className="w-full rounded-2xl border border-white/10 object-cover"
          />
          <figcaption className="mt-2 text-[12px] text-white/40 text-center">
            Referência: anúncio original de John Caples, 1926 — uma das peças de resposta direta mais estudadas da história da
            publicidade.
          </figcaption>
        </figure>
      </div>

      <p className="text-[15px] leading-relaxed text-white/75">
        Eles riram quando eu levantei para defender o meu caso… Mas quando eu comecei a falar…
      </p>

      <hr className="my-6 border-t border-white/10" />

      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {`Era dia de simulação de julgamento, um ritual sagrado no escritório.

Um "treino" onde os novatos eram jogados aos leões.

A sala de reuniões tinha cheiro de café. Nas paredes, diplomas e fotos de vitórias em tribunais.

No centro, uma mesa grande com sócios, advogados associados e uma dúzia de estagiários como eu, todos de faculdades diferentes.

Era a primeira vez que eu participava de uma simulação nesse escritório, já que acabara de iniciar o estágio.

Eu havia passado noites em claro estudando o caso, lendo artigos e ensaiando…

Pois, logo na primeira vez, fui sorteado para fazer a defesa do caso.

Assim que me posicionei no "tribunal" e me levantei para fazer a defesa…

Eu ouvi os cochichos. Vi os sorrisos de canto de boca dos outros estagiários.

Escutei as risadas, os balanços de cabeça com pena…

Eles não estavam sendo maldosos. Era apenas a ordem natural das coisas. Eu era o desconhecido, o azarão…

Ninguém esperava nada de mim além de uma apresentação nervosa e esquecível.

Ajeitei a gravata e olhei para a "promotora" — uma estagiária veterana de outra faculdade, que já tinha um sorriso de vitória no rosto.

Respirei fundo. Aquele era o momento.

"Com a permissão da corte, gostaria de iniciar a defesa do caso."

Aí as risadinhas contidas se soltaram. Um advogado no fundo da sala tossiu para disfarçar o riso.

Eles achavam graça da minha formalidade, da minha audácia.

Mas então, eu comecei a falar… comecei a fazer a minha defesa…

Nesse momento, o jogo virou.

O silêncio na sala mudou. Não era mais um silêncio de expectativa pela minha falha, mas de curiosidade.

Pilar por pilar, eu desmontei o caso dela. Não com "achismos", mas com método. Com a postura de quem faz isso na prática todos os dias.

O sócio sênior que estava presente, até então distraído, largou a caneta…

Os outros estagiários, que antes riam, agora estavam focados e boquiabertos.

A promotora já não sorria mais.

Resultado: a defesa venceu um caso que, até então, parecia impossível.

Ao final, a sala estava em silêncio absoluto. Todos me encaravam — não mais como um novato, mas como alguém que sabe o que está fazendo.

Quando a simulação terminou, alguns estagiários vieram até mim com um olhar que misturava confusão e admiração.

"Onde foi que você aprendeu a orar desse jeito?"

Muitos deles já estavam nos últimos períodos da faculdade e já trabalhavam há algum tempo no escritório.

Falei que o Direito não é o que você sabe, mas como você pratica o que sabe.

E que eu só consegui hipnotizar a todos na sala e fazer uma defesa vencedora porque fui ensinado a não olhar apenas para a teoria, mas para a prática.

Eu contei a eles meu segredo.

Não era dom, muito menos sorte. Era um método.

Comentei que na Ulbra, onde eu cursava Direito, eles têm uma filosofia totalmente diferente…

O foco é brutal na prática. A prática começa no 1º semestre.

Enquanto a maioria esmagadora das faculdades cria juristas que sabem citar leis de cor…

A Ulbra desenvolve juristas que são solucionadores de problemas. Que estão prontos para o mercado.

O que eles comentaram não foi nada novo para mim…

"Como assim? Eu estou no 7º semestre e minha prática começou só no semestre passado."

Continuei: "Durante minha pesquisa para entrar na faculdade, descobri algo que o ensino tradicional não quer que você saiba…"

"Em outras instituições, os alunos têm prática só pelo 7º semestre — com muita sorte no 6º."

"Meu sonho sempre foi defender a justiça e me tornar um advogado, mas notei que se seguisse o ensino tradicional, me formaria um jurista despreparado e nada confiante."

"Confiança essa que é fundamental para um advogado de elite."

Nesse dia, eu saí de um estagiário novato para um jurista de elite…

Todos no escritório passaram a confiar no meu trabalho e até mesmo começaram a solicitar o meu auxílio em alguns casos.

Por isso, decidi, lá atrás, estudar na Ulbra.

Para me tornar um profissional capacitado e, acima de tudo, preparado.

Na Ulbra, eles te ensinam a construir um argumento…

Eles não te preparam para uma prova, eles te preparam para a arena.

Através de simulações, estudos de caso e projetos com pessoas REAIS, você aprende fazendo, lutando, vencendo.

Com o SAJULBRA — uma iniciativa do Núcleo de Prática Jurídica da Ulbra — pude defender, estudar e praticar casos reais, aliando a prática com a ajuda à comunidade.

Agora, você também pode ser aquele que silencia a sala.

Aquela simulação não era sobre um caso fictício. Era sobre o meu futuro. E pode ser sobre o seu também…

É a chance de entrar em qualquer ambiente — seja uma sala de reuniões, um debate ou, um dia, um tribunal de verdade — e ter a confiança de que sua voz não será apenas ouvida, mas respeitada.

Isso é o que a Ulbra oferece. Não só um diploma, mas uma nova forma de ver o Direito.

As matrículas estão abertas.

Chega de ser o coadjuvante. É hora de ser o advogado que todos param para ouvir.

A próxima simulação pode ser a sua. E dessa vez, ninguém precisa rir.`}
      </p>

      <div className="mt-4">
        <span className={buttonClass} style={{ pointerEvents: 'none' }}>
          Quero fazer parte
        </span>
      </div>
    </div>
  )
  }

  const renderVslBlock = (text) => (
    <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">{text}</p>
  )

  const renderVsl1 = () => {
    if (content.vsl1) {
      const v = content.vsl1
      return (
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Hook' : 'Gancho' } ]</p>
            {renderVslBlock(v.gancho)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Problem' : 'Problema' } ]</p>
            {renderVslBlock(v.problema)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Agitation' : 'Agitação' } ]</p>
            {renderVslBlock(v.agitacao)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Turn' : 'Virada' } ]</p>
            {renderVslBlock(v.virada)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Proof' : 'Prova' } ]</p>
            {renderVslBlock(v.prova)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Close and CTA' : 'Fechamento e CTA' } ]</p>
            {renderVslBlock(v.fechamento)}
            <div className="mt-3">
              <span className={buttonClass} style={{ pointerEvents: 'none' }}>{content.ctaButtonJoin}</span>
            </div>
          </div>
        </div>
      )
    }
    return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Gancho ]</p>
        {renderVslBlock(
          `Como construir 5 anos de experiência jurídica nos seus primeiros 5 semestres da faculdade de Direito.

"Existe um sistema de formação jurídica que te coloca 5 anos à frente. Ignore isso por sua conta e risco."`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Problema ]</p>
        {renderVslBlock(
          `Você não decidiu fazer Direito por acaso.

Você escolheu este caminho porque viu nele o poder de construir algo. Uma carreira sólida, uma reputação, uma vida com propósito e, claro, segurança financeira.

Você sente a vocação para argumentar, para defender, para encontrar a ordem no caos.

Mas há uma verdade desconfortável que paira sobre essa decisão — uma sombra que a maioria das universidades prefere ignorar:

O mercado jurídico não tem espaço para teóricos.

Ele está brutalmente saturado de bacharéis que passaram 5 anos acumulando conhecimento enciclopédico, mas que tremem na base ao encarar um cliente de verdade.

Eles sabem citar a lei, mas não sabem como aplicá-la no campo de batalha.

E o mercado devora quem só sabe teoria.`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Agitação ]</p>
        {renderVslBlock(
          `A pergunta de 1 milhão de reais é: como você garante que, ao final de 5 anos, você não será apenas mais um diploma na parede, mas um profissional experiente, com um início de carreira real?

A resposta está em fugir de um erro grotesco.

O erro grotesco que a maioria esmagadora das faculdades tradicionais comete é acreditar que o conhecimento vem antes da prática.

Ela te entrega o conteúdo e diz: "Decore tudo isso. Daqui a 5 anos, você pode tentar praticar."

Isso é uma receita para o fracasso.

Alguém precisa te alertar sobre esse sistema de ensino ultrapassado…

E, mais importante, alguém precisa te mostrar um caminho diferente. Um caminho que vai te colocar em uma posição de vantagem quase injusta.`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Virada ]</p>
        {renderVslBlock(
          `Na Ulbra, nós invertemos essa lógica.

Partimos de um princípio radicalmente diferente: a única forma de dominar o Direito é praticando.

Para isso, não criamos apenas um "curso". Nós desenvolvemos o SIJA: o Sistema de Imersão Jurídica Acelerada.

Não se trata de ter "aulas práticas" esporádicas. Trata-se de um ecossistema completo, onde a prática não é um complemento — mas o ponto de partida para a teoria.

Pare um momento e imagine o seguinte…

No mesmo semestre em que seus concorrentes estão ouvindo sobre "Princípios do Direito Civil"...

Você está no SAJULBRA, nosso serviço de assistência jurídica, frente a frente com uma pessoa real, com um problema real de divórcio ou de consumidor.

O SAJULBRA não é um projeto de estágio qualquer. É um dos maiores núcleos de prática jurídica do estado, com mais de 1.200 atendimentos reais por ano.

É o seu laboratório.

Aqui, você não vai "fingir" advogar.

Você vai analisar documentos e provas concretas, desenvolver estratégias para um caso que terá um resultado real na vida de alguém, redigir peças que serão lidas por um juiz de verdade.

E a imersão não para por aí…

Você vai atuar em mediações familiares reais em parceria com a Defensoria Pública e prestar orientação no Balcão do Consumidor, lado a lado com o Procon.

Enquanto outros só aprendem o Direito do passado, você já estará em nosso Hub de Tecnologias Jurídicas, entendendo como a inteligência artificial e a blockchain vão mudar o seu futuro na profissão.

Nossas visitas técnicas não são palestras sobre o Tribunal de Justiça. Nós te levamos até lá para você caminhar pelos corredores do poder.

Nossos professores são Desembargadores, Promotores de Justiça, Delegados e advogados que aplicam a lei todos os dias. Eles trazem para a sala de aula os desafios que enfrentaram ontem no fórum.

Essa é a sua rede de contatos sendo construída desde o primeiro semestre. É o tipo de acesso que muitos advogados demoram uma década para construir.`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Prova ]</p>
        {renderVslBlock(
          `Pense na diferença gritante.

Ao final do curso, o formando tradicional tem conhecimento teórico.

O formando da Ulbra, treinado pelo SIJA, tem conhecimento validado, experiência comprovada e uma rede de contatos poderosa.

Enquanto o primeiro se pergunta "por onde eu começo?", você já estará analisando propostas de trabalho — talvez até abrindo seu próprio escritório.

Você não terá medo da prova da OAB, porque ela será apenas a formalização de tudo o que você já faz há anos.

A sua preocupação não será "será que consigo um emprego?" — mas sim "qual a melhor oportunidade para a carreira que eu já comecei a construir?".`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Fechamento e CTA ]</p>
        {renderVslBlock(
          `Os mesmos 5 anos vão passar. Isso é inevitável.

Esses 60 meses podem ser em frente aos livros, PDFs e aulas entediantes…

Ou podem ser praticando a lei, auxiliando a comunidade e ganhando 5 anos de experiência a mais que seus concorrentes.

Clique no botão abaixo, preencha o formulário e, dentro de 24 horas, nossa equipe entrará em contato com você.

Te espero aqui, do outro lado.`
        )}
        <div className="mt-3">
          <span className={buttonClass} style={{ pointerEvents: 'none' }}>
            Quero fazer parte
          </span>
        </div>
      </div>
    </div>
  )
  }

  const renderVsl2 = () => {
    if (content.vsl2) {
      const v = content.vsl2
      return (
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Hook' : 'Gancho' } ]</p>
            {renderVslBlock(v.gancho)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Problem' : 'Problema' } ]</p>
            {renderVslBlock(v.problema)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Agitation' : 'Agitação' } ]</p>
            {renderVslBlock(v.agitacao)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Turn' : 'Virada' } ]</p>
            {renderVslBlock(v.virada)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Proof' : 'Prova' } ]</p>
            {renderVslBlock(v.prova)}
          </div>
          <hr className="my-4 border-t border-white/10" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ {lang === 'en' ? 'Close and CTA' : 'Fechamento e CTA' } ]</p>
            {renderVslBlock(v.fechamento)}
            <div className="mt-3">
              <span className={buttonClass} style={{ pointerEvents: 'none' }}>{content.ctaButtonJoin}</span>
            </div>
          </div>
        </div>
      )
    }
    return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Gancho ]</p>
        {renderVslBlock(
          `Existe um sistema de formação jurídica que a elite do Direito não quer que você descubra. Ele te coloca 5 anos à frente dos concorrentes. Ignore isso por sua conta e risco.`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Problema ]</p>
        {renderVslBlock(
          `Olha, eu sei que você não decidiu fazer Direito por acaso.

Você escolheu este caminho porque viu nele o poder de construir algo. Uma carreira sólida, uma reputação, uma vida com propósito e, claro, segurança financeira.

Você sente a vocação para argumentar, para defender, para encontrar a ordem no caos.

Mas há uma verdade desconfortável que paira sobre essa decisão:

O mercado jurídico não tem espaço para teóricos. Ponto final.

Ele está brutalmente saturado de bacharéis que passaram 5 anos acumulando conhecimento enciclopédico, mas que tremem ao encarar um cliente de verdade.

Eles sabem citar a lei, mas não sabem como aplicá-la no campo de batalha.

E o mercado devora quem só sabe teoria.`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Agitação ]</p>
        {renderVslBlock(
          `Então, a pergunta de 1 milhão de reais é: como você garante que, ao final de 5 anos, você não será apenas mais um diploma na parede, mas um profissional temido e respeitado?

A resposta está em fugir de um erro grotesco.

O erro grotesco que a maioria esmagadora das faculdades tradicionais comete é acreditar que o conhecimento vem antes da prática.

Ela te entrega o conteúdo e diz: "Decore tudo isso. Daqui a 5 anos, você pode tentar praticar."

Isso é uma receita para o fracasso.

Alguém precisa te alertar sobre esse sistema de ensino ultrapassado. E, mais importante, alguém precisa te mostrar um caminho diferente. Um caminho que vai te colocar em uma posição de vantagem quase injusta.`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Virada ]</p>
        {renderVslBlock(
          `Na Ulbra, nós invertemos essa lógica. Partimos de um princípio radicalmente diferente: a única forma de dominar o Direito é praticando. Desde os primeiros semestres.

Para isso, nós desenvolvemos o SIJA: o Sistema de Imersão Jurídica Acelerada.

Não se trata de aulas práticas esporádicas. Trata-se de um ecossistema completo, onde a prática não é um complemento — é o ponto de partida para a teoria.

Agora, imagine o seguinte…

No mesmo semestre em que seus concorrentes estão sentados ouvindo sobre "Princípios do Direito Civil"...

Você está no SAJULBRA, frente a frente com uma pessoa real, com um problema real de divórcio ou de consumidor.

O SAJULBRA é um dos maiores núcleos de prática jurídica do estado, com mais de 1.200 atendimentos reais por ano.

É o seu laboratório. É o seu campo de batalha.

Aqui, você não vai "fingir" advogar.

Você vai analisar documentos e provas concretas, desenvolver estratégias para um caso que terá um resultado real na vida de alguém, redigir peças que serão lidas por um juiz de verdade.

A teoria que você aprende em sala serve como ferramenta para o trabalho que você já está realizando.

E a imersão vai muito além…

Você vai atuar em mediações familiares reais com a Defensoria Pública, orientar no Balcão do Consumidor com o Procon, e já estará no Hub de Tecnologias Jurídicas entendendo como IA e blockchain vão mudar a profissão.

Nas visitas técnicas, não apenas falamos sobre o Tribunal de Justiça — nós te levamos até lá para você caminhar pelos corredores do poder.

Nossos professores são desembargadores, promotores de justiça, delegados e advogados que aplicam a lei todos os dias. Eles trazem para a sala os desafios que enfrentaram ontem no fórum. Os atalhos, as armadilhas e os segredos não escritos que definem quem vence e quem perde.

Essa é a sua rede de contatos sendo construída desde o primeiro semestre.`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Prova ]</p>
        {renderVslBlock(
          `O resultado é simples de entender.

Ao final do curso, o formando tradicional tem conhecimento teórico.

O formando da Ulbra, treinado pelo SIJA, tem conhecimento validado, experiência comprovada e uma rede de contatos poderosa.

Enquanto o primeiro se pergunta "por onde eu começo?", você já estará analisando propostas — talvez até abrindo seu próprio escritório.

Você não terá medo da OAB, porque ela será apenas a formalização de tudo o que você já faz há anos.`
        )}
      </div>

      <hr className="my-4 border-t border-white/10" />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-accent">[ Fechamento e CTA ]</p>
        {renderVslBlock(
          `Os mesmos 5 anos vão passar. Isso é um fato.

A questão é: como você vai usá-los?

Esses 60 meses podem ser em frente aos livros, PDFs e aulas entediantes…

Ou podem ser praticando a lei, auxiliando a comunidade e ganhando 5 anos de experiência a mais que seus concorrentes.

Clique no botão abaixo. Preencha o formulário. Em 24 horas, nossa equipe entrará em contato.

Eu te espero aqui do outro lado.`
        )}
        <div className="mt-3">
          <span className={buttonClass} style={{ pointerEvents: 'none' }}>
            Quero fazer parte
          </span>
        </div>
      </div>
    </div>
  )
  }

  const renderCarta = () => {
    if (content.carta) {
      const c = content.carta
      return (
        <div className="space-y-6">
          <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">{c.intro}</p>
          <hr className="my-4 border-t border-white/10" />
          <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">{c.why}</p>
          <hr className="my-4 border-t border-white/10" />
          <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">{c.risk}</p>
          <div>
            <span className={buttonClass} style={{ pointerEvents: 'none' }}>{content.ctaButtonAccept}</span>
          </div>
          <hr className="my-4 border-t border-white/10" />
          <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">{c.ps}</p>
        </div>
      )
    }
    return (
    <div className="space-y-6">
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {`Uma mensagem confidencial para uma pessoa muito especial

Caro leitor,

Esse convite confidencial está sendo enviado para apenas um pequeno grupo de pessoas, incluindo você. Espero que aceite meu convite.

Mas, mesmo que decida não o fazer, quero lhe enviar um presente… TOTALMENTE GRÁTIS.

Um guia digital exclusivo — "O manual do advogado de sucesso: 5 estratégias que não ensinam em qualquer lugar" — pode ser seu, sem nenhuma obrigação, apenas por ler essa mensagem…

E, se você aceitar meu convite, também desfrutará de um bônus: uma mentoria com um de nossos professores Desembargadores, para você tirar dúvidas e receber conselhos que podem definir sua carreira. Será sua, de graça.`}
      </p>

      <hr className="my-4 border-t border-white/10" />

      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {`Por que estou escrevendo para você

Acredito que você é o tipo de pessoa que não se contenta com o comum. Que aprecia a diferença entre ter um diploma e construir uma carreira de impacto.

Você sabe que não é incomum pagar uma fortuna por um diploma de Direito… para descobrir, cinco anos depois, que a teoria dos livros não preparou você para o dia a dia de um fórum, para a pressão de uma audiência ou para as demandas de um grande cliente.

E é por isso que muitos dos melhores escritórios e órgãos públicos do estado buscam nossos formandos. Porque eles sabem que aqui nós formamos advogados prontos para a ação.

Nossos alunos não esperam cinco anos para pisar em um tribunal. Eles fazem isso desde os primeiros semestres em visitas técnicas orientadas.

Durante toda a formação, eles atuam em casos reais no SAJULBRA — nosso escritório-escola que realiza cerca de 600 atendimentos à comunidade todo semestre.

Tudo isso sob a orientação de um corpo docente que inclui Desembargadores, Promotores e Presidentes de Tribunais — profissionais que não só ensinam a lei, mas a aplicam em seu mais alto nível.

Enquanto você acumulou quatro anos de prática ao se formar, os egressos de outra faculdade tiveram apenas um, dois, com sorte, três.`}
      </p>

      <hr className="my-4 border-t border-white/10" />

      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {`Não há risco algum na sua decisão.

Em uma faculdade tradicional, você pode levar dois, talvez três anos — e dezenas de milhares de reais em mensalidades — imerso em teoria, antes de ter seu primeiro contato real com a advocacia.

É um investimento altíssimo para só então descobrir se a carreira jurídica realmente pulsa em suas veias.

Aqui na Ulbra, esse risco não existe.

Você vai saber se tem o gosto pela advocacia logo nos primeiros semestres. Você vai vivenciar o Direito, sentir a pressão de um caso real e a satisfação de encontrar uma solução jurídica muito antes.

O único risco que você corre é descobrir que nasceu para isso muito mais rápido do que imaginava.

Essa é a nossa promessa: clareza e certeza sobre o seu futuro, desde o começo.

Para aceitar este convite, basta preencher o formulário no botão abaixo.`}
      </p>

      <div>
        <span className={buttonClass} style={{ pointerEvents: 'none' }}>
          Aceitar o convite
        </span>
      </div>

      <hr className="my-4 border-t border-white/10" />

      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {`P.S.: Este convite é pessoal e intransferível. Para reservar sua vaga na mentoria, sua matrícula precisa ser confirmada. As vagas são limitadas para mantermos a excelência e a proximidade entre alunos e mestres.`}
      </p>
    </div>
  )
  }

  const renderActiveContent = () => {
    if (activeTab === 'eles') return renderEles()
    if (activeTab === 'vsl1') return renderVsl1()
    if (activeTab === 'vsl2') return renderVsl2()
    if (activeTab === 'carta') return renderCarta()
    return renderEles()
  }

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Above the fold */}
      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">
              {content.breadcrumbPortfolio}
            </Link>
            <span className="opacity-40">/</span>
            <span>{content.breadcrumbCase}</span>
          </p>

          <div className="mt-10 sm:mt-12 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            {content.pill}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            {content.metaStrip.map((item, i) => (
              <div key={i} className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8 last:border-r-0 last:mr-0">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{item.label}</p>
                <p className="text-[15px] font-medium text-white/80">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      {/* Briefing */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{content.briefingLabel}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                {content.briefingHeading}
              </h2>
              {content.briefingParagraphs.map((p, i) => (
                <p key={i} className={i < content.briefingParagraphs.length - 1 ? 'mb-4 text-[15px] leading-relaxed text-white/75' : 'text-[15px] leading-relaxed text-white/75'}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + copies */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{content.copiesLabel}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="mb-6 flex gap-2 overflow-x-auto rounded-full bg-white/5 p-1 text-xs sm:text-[13px]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium tracking-wide transition-all ${
                      activeTab === tab.id ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-accent/15 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-accent py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  ✦ {content.copyDeliveredLabel}
                </span>

                <p className="mb-6 border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                  {activeTab === 'eles' && content.copyLabelEles}
                  {activeTab === 'vsl1' && content.copyLabelVsl1}
                  {activeTab === 'vsl2' && content.copyLabelVsl2}
                  {activeTab === 'carta' && content.copyLabelCarta}
                </p>

                {renderActiveContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <main className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">{content.otherCases}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((c) => (
              <li key={c.id}>
                <Link
                  to={localizePath(`/portfolio/${c.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">{lang === 'en' && c.clientEn ? c.clientEn : c.client}</p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">{lang === 'en' && c.titleEn ? c.titleEn : c.title}</p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* CTA final */}
      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {content.ctaFinalMain}<span className="text-amber-accent italic">{content.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {content.ctaButtonFinal}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const ULBRA_SAUDE_TECH_COPY = {
  pt: {
    badge: '✦ Copy entregue',
    fisio: {
      eyebrow: 'Landing Page · Ulbra Fisioterapia',
      heroTitle: 'Fisioterapia nota máxima no MEC!\n+50 anos formando os profissionais mais disputados do mercado.',
      heroP: 'Uma formação que prepara você para o mercado com prática desde o primeiro semestre e laboratórios com tecnologia de ponta.',
      heroSub: 'Nota máxima no MEC · +50 anos de tradição · Formação prática presencial',
      cta: 'QUERO GARANTIR MINHA VAGA',
      ctaSub: 'Vagas limitadas por turma. Inscrições abertas.',
      section1Title: 'UMA FORMAÇÃO QUE PREPARA VOCÊ PARA O FUTURO DA SAÚDE',
      section1Body: 'Na Ulbra, você é preparado para atuar de forma completa:\n\n→ Prevenção de doenças\n→ Promoção da saúde\n→ Educação de pacientes',
      section2Title: 'PRÁTICA DESDE O 1º SEMESTRE EM LABORATÓRIOS DE PONTA',
      section2Body: 'Fisioterapia se aprende com as mãos, não apenas com livros.\n\n→ Aulas 100% presenciais\n→ Acesso à infraestrutura da Ulbra, a maior universidade privada do RS\n→ Laboratórios modernos, tecnologia de ponta e clínica-escola para aprender na prática',
      section3Title: 'PROFESSORES QUE VIVEM O MERCADO',
      section3Body: 'Aprenda com um corpo docente que une a prática do mercado e a excelência acadêmica.\n\n→ Professores que trazem casos reais para a sala de aula\n→ Conexão com as demandas atuais do mercado de trabalho\n→ Corpo docente formado por mestres e doutores que atuam e são referência em suas áreas',
      section4Title: 'O QUE VOCÊ ENCONTRA NA FISIOTERAPIA PRESENCIAL DA ULBRA',
      section4Body: '✓ Garantia de qualidade: curso reconhecido com nota máxima pelo MEC.\n\n✓ Experiências práticas diversificadas: vivências em múltiplos campos da Fisioterapia desde os primeiros semestres.\n\n✓ Infraestrutura de ponta: laboratórios e tecnologia de última geração à sua disposição no campus de Canoas.\n\n✓ Currículo inovador: aprendizado dinâmico e moderno, conectado com o que a ciência comprova e o mercado exige.\n\n✓ Visão completa da saúde: foco real em prevenção e promoção, além da reabilitação tradicional.\n\n✓ Rápido ingresso no mercado: formação estruturada para você se formar em 10 semestres, pronto para atuar.',
      section5Title: 'A GRADUAÇÃO EM FISIOTERAPIA DA ULBRA É PARA QUEM:',
      section5Body: '→ Quer uma carreira com propósito, para ajudar pessoas e fazer a diferença no mundo.\n\n→ Busca uma formação presencial e prática, com contato humano e aprendizado mão na massa.\n\n→ Não se contenta com o básico e quer ser um profissional completo, atuando da prevenção à reabilitação.\n\n→ Faz questão de aprender com professores experientes e em uma infraestrutura de excelência.\n\n→ Valoriza uma instituição com Nota Máxima no MEC e mais de 50 anos de tradição.',
      section6Title: 'COMEÇE A CARREIRA CERTA COM UMA CONDIÇÃO ESPECIAL',
      section6Body: 'Garanta sua bolsa de até 30% agora!\n\nPreencha o formulário e dê o primeiro passo. Nossa equipe de consultores entrará em contato para tirar todas as suas dúvidas sobre o curso, o campus de Canoas e como garantir sua condição especial.',
      section6Note: '*Bolsas e condições especiais sujeitas a análise e disponibilidade.',
    },
    farmacia: { eyebrow: 'Landing Page · Ulbra Farmácia' },
    ccomp: { eyebrow: 'Landing Page · Ulbra Ciências da Computação' },
  },
  en: {
    badge: '✦ Copy delivered',
    fisio: {
      eyebrow: 'Landing Page · Ulbra Physiotherapy',
      heroTitle: 'Physiotherapy with top MEC rating!\n+50 years training the most sought-after professionals in the market.',
      heroP: 'A program that prepares you for the market with hands-on practice from the first semester and state-of-the-art labs.',
      heroSub: 'Top MEC rating · +50 years of tradition · On-campus practical training',
      cta: 'I WANT TO SECURE MY SPOT',
      ctaSub: 'Limited spots per cohort. Applications open.',
      section1Title: 'A PROGRAM THAT PREPARES YOU FOR THE FUTURE OF HEALTHCARE',
      section1Body: 'At Ulbra, you’re trained to work across the full spectrum:\n\n→ Disease prevention\n→ Health promotion\n→ Patient education',
      section2Title: 'PRACTICE FROM 1ST SEMESTER IN STATE-OF-THE-ART LABS',
      section2Body: 'Physiotherapy is learned with your hands, not just from books.\n\n→ 100% on-campus classes\n→ Access to Ulbra’s infrastructure, the largest private university in RS\n→ Modern labs, cutting-edge technology and a teaching clinic for learning by doing',
      section3Title: 'FACULTY WHO WORK IN THE FIELD',
      section3Body: 'Learn from a faculty that combines real-world practice with academic excellence.\n\n→ Faculty who bring real cases into the classroom\n→ Connection to current job market demands\n→ Faculty of master’s and PhD professionals who are active and recognized in their fields',
      section4Title: 'WHAT YOU GET IN ULBRA’S ON-CAMPUS PHYSIOTHERAPY PROGRAM',
      section4Body: '✓ Quality assurance: program recognized with top MEC rating.\n\n✓ Diverse practical experience: exposure to multiple areas of physiotherapy from the first semesters.\n\n✓ State-of-the-art infrastructure: labs and latest technology at your disposal on the Canoas campus.\n\n✓ Innovative curriculum: dynamic, modern learning aligned with science and market needs.\n\n✓ Full view of health: real focus on prevention and promotion, plus traditional rehabilitation.\n\n✓ Fast entry into the market: structured program so you graduate in 10 semesters, ready to practice.',
      section5Title: 'ULBRA’S PHYSIOTHERAPY DEGREE IS FOR YOU IF:',
      section5Body: '→ You want a career with purpose, helping people and making a difference.\n\n→ You’re looking for on-campus, hands-on training with human contact and learning by doing.\n\n→ You’re not satisfied with the basics and want to be a complete professional, from prevention to rehabilitation.\n\n→ You want to learn from experienced faculty and in an excellent infrastructure.\n\n→ You value an institution with top MEC rating and over 50 years of tradition.',
      section6Title: 'START THE RIGHT CAREER WITH A SPECIAL CONDITION',
      section6Body: 'Secure your scholarship of up to 30% now!\n\nFill in the form and take the first step. Our consultant team will get in touch to answer all your questions about the program, the Canoas campus and how to secure your special condition.',
      section6Note: '*Scholarships and special conditions subject to review and availability.',
    },
    farmacia: { eyebrow: 'Landing Page · Ulbra Pharmacy' },
    ccomp: { eyebrow: 'Landing Page · Ulbra Computer Science' },
  },
}


function UlbraTransferCasePage({ caseData }) {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].casePage
  const copy = ULBRA_TRANSFER_COPY[lang] || ULBRA_TRANSFER_COPY.pt
  const otherCases = getOtherCases(caseData.id, 6)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const faqItems = copy.faqItems

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index))
  }

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Above the fold */}
      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">
              {t.portfolio}
            </Link>
            <span className="opacity-40">/</span>
            <span>{lang === 'en' ? 'Ulbra · 70% transfer' : 'Ulbra · Transferência 70%'}</span>
          </p>

          <div className="mt-10 sm:mt-12 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            {lang === 'en' ? 'Education · Recruitment' : 'Educação · Captação'}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {lang === 'en' ? 'Transfer landing page with 70% off for 1st semester 2026.' : 'Landing page de transferência com 70% de desconto no 1º semestre de 2026.'}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.client}</p>
              <p className="text-[15px] font-medium text-white/80">Ulbra</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.deliverable}</p>
              <p className="text-[15px] font-medium text-white/80">{lang === 'en' ? 'Transfer landing page' : 'Landing page de transferência'}</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.context}</p>
              <p className="text-[15px] font-medium text-white/80">
                {lang === 'en' ? '70% off campaign for 1st semester 2026' : 'Campanha de captação com 70% de desconto no 1º semestre de 2026'}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      {/* Briefing */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.briefing}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                A oferta tinha urgência real. A copy precisava honrar isso.
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">
                Transferência de faculdade é uma decisão carregada de medo: medo de perder o que já cursou, medo da burocracia, medo de sair do
                conhecido. A copy precisava desmontar essas objeções antes que o leitor sequer as formulasse conscientemente.
              </p>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">
                A estratégia foi colocar o número mais impactante — 70% de desconto — já no topo, sem rodeios, e então construir uma jornada de
                confiança: mostrar que a transição é simples, que o histórico não se perde e que o benefício não some depois do primeiro
                semestre.
              </p>
              <p className="text-[15px] leading-relaxed text-white/75">
                O senso de urgência era real (condição válida apenas para o 1º semestre de 2026), então foi usado com honestidade, ancorando a
                tomada de decisão sem artificialismo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copy entregue — peça única */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{copy.copyLabel}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-accent/15 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-accent py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  {copy.badge}
                </span>

                <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-white/45">
                  {copy.eyebrow}
                </p>

                <div className="mb-6 rounded-xl border border-amber-accent/40 bg-black/40 p-4 text-[13px] leading-relaxed text-amber-accent">
                  {copy.notice}
                </div>

                <hr className="my-6 border-t border-white/10" />

                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-semibold leading-snug text-white">
                    {copy.headline}
                  </h2>
                  <p className="text-[15px] leading-relaxed text-white/75">
                    {copy.headlineP}
                  </p>
                  <span
                    className="inline-flex items-center rounded-full bg-white text-black px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ pointerEvents: 'none' }}
                  >
                    {copy.cta}
                  </span>
                </div>

                <hr className="my-6 border-t border-white/10" />

                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-white">{copy.whyTitle}</h3>
                  <ul className="space-y-2 text-[15px] leading-relaxed text-white/75">
                    {copy.whyItems.map((item, i) => (
                      <li key={i}><strong>{item.strong}</strong> {item.text}</li>
                    ))}
                  </ul>
                </div>

                <hr className="my-6 border-t border-white/10" />

                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-white">{copy.stepTitle}</h3>
                  <p className="text-[15px] leading-relaxed text-white/75">{copy.stepIntro}</p>
                  <ol className="space-y-2 text-[15px] leading-relaxed text-white/75">
                    {copy.steps.map((item, i) => (
                      <li key={i}><strong>{item.strong}</strong> {item.text}</li>
                    ))}
                  </ol>
                  <span
                    className="inline-flex items-center rounded-full bg-white text-black px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ pointerEvents: 'none' }}
                  >
                    {copy.cta}
                  </span>
                </div>

                <hr className="my-6 border-t border-white/10" />

                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-white">
                    {copy.finalTitle}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-white/75">
                    {copy.finalP1}
                  </p>
                  <p className="text-[15px] leading-relaxed text-white/75">
                    {copy.finalP2}
                  </p>
                  <span
                    className="inline-flex items-center rounded-full bg-white text-black px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ pointerEvents: 'none' }}
                  >
                    {copy.cta}
                  </span>
                </div>

                <hr className="my-6 border-t border-white/10" />

                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-white">{copy.faqTitle}</h3>
                  <div className="space-y-2">
                    {faqItems.map((item, index) => {
                      const isOpen = openFaqIndex === index
                      return (
                        <div
                          key={item.question}
                          className="overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-[max-height] duration-300"
                          style={{ maxHeight: isOpen ? 500 : 64 }}
                        >
                          <button
                            type="button"
                            onClick={() => toggleFaq(index)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm sm:text-[15px]"
                          >
                            <span className="font-medium text-white/85">{item.question}</span>
                            <span className="ml-3 text-white/60">{isOpen ? '−' : '+'}</span>
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 text-sm text-white/70">
                              <p>{item.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <main className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">{t.otherCases}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((caseItem) => (
              <li key={caseItem.id}>
                <Link
                  to={localizePath(`/portfolio/${caseItem.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">{lang === 'en' && caseItem.clientEn ? caseItem.clientEn : caseItem.client}</p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">
                      {lang === 'en' && caseItem.titleEn ? caseItem.titleEn : caseItem.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* CTA final */}
      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {t.ctaFinalMain}<span className="text-amber-accent italic">{t.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )

}

function UlbraCartasCasePage({ caseData }) {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].casePage
  const otherCases = getOtherCases(caseData.id, 6)
  const [activeTab, setActiveTab] = useState('psicologia')

  const tabs = lang === 'en'
    ? [
        { id: 'psicologia', label: 'Psychology' },
        { id: 'vet', label: 'Veterinary Medicine' },
        { id: 'fono', label: 'Speech Therapy' },
      ]
    : [
        { id: 'psicologia', label: 'Psicologia' },
        { id: 'vet', label: 'Medicina Veterinária' },
        { id: 'fono', label: 'Fonoaudiologia' },
      ]

  const eyebrowsPt = {
    psicologia: 'Carta de venda — Curso de Psicologia · Ulbra Canoas',
    vet: 'Carta de venda — Curso de Medicina Veterinária · Ulbra',
    fono: 'Carta de venda — Curso de Fonoaudiologia · Ulbra',
  }

  const eyebrowsEn = {
    psicologia: 'Sales letter — Psychology program · Ulbra Canoas',
    vet: 'Sales letter — Veterinary Medicine program · Ulbra',
    fono: 'Sales letter — Speech Therapy program · Ulbra',
  }

  const eyebrows = lang === 'en' ? eyebrowsEn : eyebrowsPt

  const blocksByTabPt = {
    psicologia: [
      {
        label: '[ Gancho ]',
        text: `"Meu maior medo na faculdade de Psicologia não era reprovar numa matéria... era me formar."
Essa frase aí em cima... ela te causou um arrepio?
Se sim, é porque você sabe, no fundo da alma, que esse é o maior fantasma que assombra quem sonha em cursar Psicologia.
Não é o vestibular… Não são as provas difíceis…
É o medo do dia seguinte à formatura. O medo do silêncio ensurdecedor de uma sala de atendimento…
Imagine a cena: um paciente bem na sua frente, esperando uma solução que você passou 5 anos estudando para dar… A teoria some e você percebe que não sabe, na prática, o que fazer.
É o medo de congelar.
Se esse pensamento já tirou o seu sono, preste muita atenção. Porque você está prestes a descobrir que a culpa desse medo não é sua. Essa culpa foi colocada em você por um modelo de ensino que, por décadas, priorizou a teoria e esqueceu do essencial: o ser humano.`,
      },
      {
        label: '[ Storytelling — A história da Letícia ]',
        text: `Deixe-me te contar a história da Letícia. A dona da frase que começou a nossa conversa.
Ela entrou em sua primeira faculdade cheia de sonhos. A Psicologia era um chamado. Mas, semestre após semestre de teoria pura, a paixão começou a dar lugar à exaustão. Os livros se acumulavam e o paciente de verdade era uma promessa vaga, para um futuro que parecia nunca chegar.
Um dia, se olhou no espelho e não viu uma futura psicóloga. Viu uma especialista em fazer provas.
Por isso, ela resolveu trancar a matrícula… Não foi por falta de capacidade, mas por sentir que estava no caminho errado. Um caminho que a deixaria com um diploma na mão, mas completamente insegura para a vida real.
Carregou o peso de uma dúvida: "Será que o problema sou eu?"
Logo depois, decidiu tentar de novo… Mas, desta vez, ela procurava algo diferente. Uma faculdade onde a prática não fosse uma promessa vaga para o final do curso, mas o ponto de partida.
Foi quando encontrou a Ulbra e a promessa de "prática profissional desde o primeiro semestre".
A mudança foi imediata. A teoria, agora, tinha um propósito. Desde a primeira semana, ela já não era apenas uma "aluna"... Estava em um ambiente clínico, dentro da clínica-escola, integrada ao campus, observando atendimentos reais.
A insegurança se foi. A confiança nasceu. Ela não estava mais com medo de "congelar"... Pelo contrário, estava ansiosa pelo próximo desafio… pelo próximo caso…
Hoje, ela tem o próprio consultório. O medo de "congelar" virou a história de superação que ela conta com orgulho.`,
      },
      {
        label: '[ Apresentação da solução ]',
        text: `A jornada da Letícia não é um milagre. É o resultado de um método. Um método que entende que a Psicologia não é uma ciência de livros, mas uma ciência de gente. E que, para cuidar de gente, é preciso estar perto de gente. Desde o início.
Esse método é o método de ensino da Psicologia da Ulbra Canoas.
Uma infraestrutura com dezenas de salas de atendimento, laboratórios de observação e cinco serviços especializados. Você não está pagando por aulas. Está investindo em certeza.
Nossa tradição de mais de três décadas significa que tivemos anos para aperfeiçoar o que funciona. Um Centro Acadêmico ativo e uma Liga Acadêmica constantemente atualizada pelas demandas dos próprios alunos e do mercado.`,
      },
      {
        label: '[ Quebra de objeção ]',
        text: `Entendo que, é neste ponto que as dúvidas surgem, não é mesmo?
"Uma estrutura como essa, com prática desde o início, deve custar mais caro. Será que vale o investimento? Não seria melhor arriscar um ou dois anos em um cursinho para tentar uma universidade pública?"
É uma pergunta justa. E a resposta da Letícia, e de centenas de alunos como ela, é sempre a mesma…
O que parece uma "economia" em outras instituições, muitas vezes se revela um custo altíssimo de tempo e de oportunidade. Cada ano em um cursinho é um ano a menos de renda como psicóloga. Cada semestre de teoria pura é um semestre a mais de insegurança.
Aqui na Ulbra, o seu investimento não é em aulas teóricas. É na certeza. O retorno não é uma possibilidade. É uma consequência do método.`,
      },
      {
        label: '[ Fechamento e CTA ]',
        text: `As inscrições para o Vestibular da Ulbra já começaram. Agora, a decisão que define o seu futuro profissional está em suas mãos.
Você pode ficar dois, três ou até quatro anos atolada em teoria… Ou, você pode escolher a universidade que te ensina a prática desde o primeiro semestre.
As portas para a próxima turma estão abertas, mas as vagas são, por natureza, limitadas. Nossa qualidade depende da supervisão atenta e próxima na clínica-escola, e não abrimos mão disso.
Dê o primeiro passo para que, daqui a cinco anos, o seu único medo seja ter uma agenda cheia demais.
[Botão demo: QUERO SER UMA PSICÓLOGA CONFIANTE]

P.S.: Lembre-se do medo que começou nossa conversa. O medo de congelar. Nosso método de imersão prática não é um benefício; é a cura para esse medo. É a garantia de que, quando chegar a sua vez, você não vai congelar. Você vai saber exatamente o que fazer.`,
      },
    ],
    vet: [
      {
        label: '[ Gancho ]',
        text: `No Rio Grande do Sul, há um seleto grupo de estudantes de veterinária que não se preocupa com o mercado de trabalho. Isso porque o mercado já briga por eles.
Essa não é uma frase de efeito. É um fato.
E para você entender o poder por trás dessa afirmação, vou te contar uma história real...`,
      },
      {
        label: '[ Cena de abertura ]',
        text: `Pense na seguinte situação: é o seu primeiro trabalho, logo após se formar em Medicina Veterinária. Uma clínica movimentada, um sábado à tarde, e o caos entra pela porta…
Um golden retriever, atropelado, se encontra bastante machucado. A equipe corre. O veterinário sênior começa a estabilizar o animal, gritando ordens e pedindo diagnósticos diferenciais.
É o tipo de cena que faz o coração de qualquer recém-formado disparar, a mão tremer, a mente dar um nó. É o teste de fogo.
Enquanto o pânico se instalava ao redor, você sente uma calma inesperada. Sua mente não foi para os livros. Foi para as noites e dias que passou no hospital da universidade. Suas mãos não tremeram. Elas se moveram com a memória muscular de quem já tinha feito aquilo dezenas de vezes…
Mais tarde, com o cão já estável e fora de perigo, o veterinário sênior se aproxima, coloca a mão em seu ombro e diz: "Você foi muito bem hoje."
Naquele momento, você deixou de ser a "novata". Você se tornou parte do time.
Essa história pode ser sua, daqui a alguns anos. Por enquanto, essa história é da Carolina.`,
      },
      {
        label: '[ O método — Formação por Antecipação de Carreira ]',
        text: `A história da Carolina não é um caso isolado. É o resultado direto de um sistema de ensino que aqui na Ulbra chamamos de Formação por Antecipação de Carreira.
Nós não acreditamos em adiar a realidade. Nós acreditamos que a única forma de aprender a nadar é entrando na água.
Você não lê sobre casos clínicos… Você os debate dentro do nosso Hospital Veterinário, um dos maiores centros de referência do estado e um dos únicos com capacidade para atender animais de grande porte.
Você não assiste a vídeos sobre manejo de gado… Você está na nossa Fazenda-Escola, aprendendo a clínica e a reprodução de bovinos e equinos na prática.
Você não decora os passos de uma cirurgia… Você os treina exaustivamente em nossos Blocos Cirúrgicos e laboratórios, com equipamentos de ponta.
E o mais importante: nossas turmas reduzidas garantem que você nunca será uma mera espectadora. Você será a protagonista, com acesso direto aos professores e aos equipamentos.`,
      },
      {
        label: '[ Prova social ]',
        text: `Mas palavras são apenas palavras, certo? Então, por um momento, não acredite em mim. Acredite em quem já está vivendo o resultado:
"No meu primeiro mês de clínica, precisei intubar um gato em crise. Enquanto outros hesitariam, eu agi. Lembrei das dezenas de vezes que treinei exatamente isso no Hospital da Ulbra. Essa confiança não tem preço."
— Dra. Fernanda Laís, Turma de 2023
"Fui chamado para um parto complicado. O dono, desconfiado pela minha idade, só relaxou quando viu a segurança com que eu manejei o animal. Essa segurança não veio de livros, veio da Fazenda-Escola da Ulbra."
— Dr. Ricardo Martins, Turma de 2022
"Minha primeira cirurgia solo foi tranquila. Parecia só mais um dos incontáveis procedimentos que realizei nos blocos cirúrgicos da Ulbra."
— Dra. Mariana Grassmann, Turma de 2019
Percebe o padrão? Fernanda, Ricardo, Mariana... A história se repete. A tranquilidade, a segurança e o respeito que eles descrevem não vêm da sorte. É o resultado inevitável de um método.`,
      },
      {
        label: '[ Fechamento e CTA ]',
        text: `Neste exato momento, você está em uma encruzilhada que definirá não apenas os seus próximos 5 anos, mas toda a sua trajetória profissional.
De um lado, o caminho tradicional: o diploma que te qualifica, mas não te diferencia… Do outro, o caminho do seleto grupo: a formação que te entrega, junto com o diploma, a coisa mais valiosa que um profissional pode ter — a segurança de quem já sabe o que fazer.
Em 5 anos, todos os seus concorrentes terão um diploma… Mas só você terá a memória muscular da prática. A calma da experiência. O respeito conquistado nos primeiros meses.
A pergunta, agora, não é se você quer fazer parte desse grupo. É se você tem a ambição necessária para pertencer a ele.
[Botão demo: GARANTIR MINHA VAGA NO GRUPO SELETO]`,
      },
    ],
    fono: [
      {
        label: '[ Gancho ]',
        text: `O que define se você será uma fonoaudióloga disputada pelo mercado ou apenas mais uma com um diploma na mão não é o seu esforço durante o curso… mas uma única escolha que 98,7% dos alunos fazem errado antes do primeiro dia de aula.
Se você está lendo isso, sei que você não quer ser apenas mais uma… Você quer ser a profissional que os hospitais procuram. A fonoaudióloga que os pais indicam de olhos fechados. Aquela que tem a agenda cheia e a confiança de quem domina o que faz.
O que as faculdades não te contam é que o seu sucesso não depende apenas do seu suor. O seu sucesso depende de uma única decisão que você toma agora, antes mesmo de pagar a primeira mensalidade. E, infelizmente, a esmagadora maioria escolhe errado.`,
      },
      {
        label: '[ Estrutura das duas portas ]',
        text: `Imagine que você, neste exato momento, está diante de duas portas…
Através da porta nº 1, está o caminho que a maioria segue… Mensalidades que parecem baratas, a promessa do "estude de onde quiser". Nos primeiros semestres, uma avalanche de PDFs, videoaulas gravadas e teoria. MUITA teoria… O paciente de verdade parece distante, algo que você só vai encontrar daqui a dois ou três anos, "se tudo der certo".
Através da porta nº 2, existe um caminho diferente. Um caminho onde, já no primeiro semestre, o seu jaleco não fica guardado no armário… Um caminho onde a sala de aula se estende até uma clínica real, com pacientes de verdade e o som de vidas sendo transformadas. Um caminho onde a teoria não é um obstáculo a ser decorado, mas uma ferramenta que você busca para resolver um problema que acabou de ver com seus próprios olhos.
A porta que você escolhe não define apenas como serão seus próximos 4 anos. Ela define a sua confiança para atender após a formatura e, principalmente, a sua empregabilidade.`,
      },
      {
        label: '[ A porta nº 2 — Fonoaudiologia Ulbra ]',
        text: `Essa porta nº 2 não é uma fantasia… ela é real. É a formação em Fonoaudiologia da Ulbra.
Construída sobre dois pilares que a maioria das faculdades trata como "detalhes", mas que para nós são a base de tudo:
Primeiro, a nossa Clínica-Escola. Não um anexo para "cumprir horas de estágio" no último ano. A Clínica de Fonoaudiologia da Ulbra é o coração pulsante do curso, dentro do campus. É onde você deixa de ser uma aluna que estuda Fonoaudiologia para se tornar uma fonoaudióloga que busca o conhecimento para transformar vidas.
Segundo, quem te guia nesse caminho. Mais de 75% dos nossos professores são mestres e doutores que não apenas lecionam, mas vivem a Fonoaudiologia. Eles estão nos hospitais, em suas próprias clínicas, no dia a dia da profissão. Eles trazem para você o caso clínico que atenderam ontem, a técnica que acabaram de aplicar.
E qual o resultado? 97,3% de empregabilidade. Quase 100% dos nossos fonoaudiólogos estão no mercado de trabalho.`,
      },
      {
        label: '[ Quebra de objeções ]',
        text: `"Um curso com essa estrutura toda deve ser mais caro que as opções a distância."
Você está certa, ele é. Mas não se trata de custo, mas de investimento. Com quase 100% de empregabilidade, o "caro" se torna o caminho mais rápido para um retorno financeiro e profissional que o "barato" jamais poderia te dar. O que é mais caro: investir em uma formação completa ou economizar na mensalidade e passar anos esperando por uma oportunidade por falta de preparo?
"E se eu descobrir que Fonoaudiologia não é para mim?"
A vivência prática desde os primeiros semestres funciona como um teste da profissão. Você confirma sua vocação no dia a dia. Não é à toa que 25% dos nossos alunos já têm outra formação e encontraram aqui a realização que buscavam.
"Como vou conciliar o trabalho com um curso presencial?"
O curso de Fonoaudiologia da Ulbra é noturno, pensado para quem tem uma jornada dupla. A grade, os horários de prática na clínica e o suporte dos professores são desenhados para quem precisa fazer o tempo render.`,
      },
      {
        label: '[ Prova social ]',
        text: `"Eu era administradora e me sentia completamente estagnada na carreira. Decidir fazer Fonoaudiologia na Ulbra foi um divisor de águas. Hoje, não só mudei de profissão, como a prática desde o início me deu a confiança que eu precisava. Já estou planejando abrir minha própria clínica."
— Ana, Administradora e agora Fonoaudióloga formada pela Ulbra
"O meu maior medo era sair da faculdade com um diploma na mão e zero segurança para atender. A diferença da Ulbra é que a gente vive a profissão desde o primeiro dia na clínica-escola. Resultado: consegui meu primeiro emprego antes mesmo da colação de grau."
— Sabrina M., Fonoaudióloga
"Conciliar trabalho e estudo parecia impossível, mas o curso noturno da Ulbra é feito para quem tem uma rotina corrida. O que mais me marcou foram os professores: eles vivem o que ensinam e isso muda o jogo. Hoje tenho minha agenda cheia e sou grata por ter feito a escolha certa."
— Carol L., Fonoaudióloga`,
      },
      {
        label: '[ Fechamento e CTA ]',
        text: `A decisão, agora, é sua…
Daqui a 4 anos, quem você quer ser? A profissional que acabou de se formar e está começando a procurar uma oportunidade? Ou a fonoaudióloga recém-formada que já está com várias propostas de emprego porque construiu uma base sólida de experiência prática nos últimos 4 anos?
A porta nº 1, do caminho mais comum, estará sempre lá… Mas a porta nº 2, a que leva a uma carreira sólida, com experiência real e reconhecimento do mercado, está aberta para você agora.
Se você se recusa a ser apenas mais uma… se quer construir uma carreira da qual possa se orgulhar… se quer ter a certeza de que fez a melhor escolha para o seu futuro...
As vagas são limitadas pela nossa capacidade de oferecer supervisão de qualidade. Garanta que a sua história de sucesso comece neste semestre.
[Botão demo: QUERO SER FONOAUDIÓLOGA]`,
      },
    ],
  }

  const blocksByTabEn = {
    psicologia: [
      {
        label: '[ Hook ]',
        text: `"My biggest fear in Psychology school wasn’t failing a class… it was graduating."
Did that sentence above give you chills?
If it did, it’s because you know, deep down, that this is the biggest ghost haunting anyone who dreams of studying Psychology.
It’s not the entrance exam… It’s not the hard tests…
It’s the fear of the day after graduation. The fear of the deafening silence of a consulting room…
Picture the scene: a patient right in front of you, expecting a solution you spent 5 years studying to deliver… The theory disappears and you realise that, in practice, you don’t know what to do.
It’s the fear of freezing.
If that thought has already kept you up at night, pay close attention. Because you’re about to discover that this fear is not your fault. It was planted in you by a teaching model that, for decades, prioritised theory and forgot what really matters: people.`,
      },
      {
        label: "[ Storytelling — Letícia's story ]",
        text: `Let me tell you Letícia’s story. She’s the one behind the sentence that opened our conversation.
She started her first degree full of dreams. Psychology was a calling. But semester after semester of pure theory, passion gave way to exhaustion. The books piled up and real patients were a vague promise, postponed to a future that never seemed to arrive.
One day, she looked in the mirror and didn’t see a future psychologist. She saw a specialist in taking tests.
So she decided to drop out… Not because she wasn’t capable, but because she felt she was on the wrong path. A path that would leave her with a diploma in hand and total insecurity in real life.
She carried the weight of a question: "Am I the problem?"
Soon after, she decided to try again… But this time, she was looking for something different. A university where practice wasn’t a vague promise for the end of the course, but the starting point.
That’s when she found Ulbra and the promise of "professional practice from the first semester".
The change was immediate. Theory suddenly had a purpose. From the first week, she was no longer just a "student" — she was in a clinical environment, inside the teaching clinic, integrated with the campus, observing real appointments.
The insecurity faded. Confidence was born. She was no longer afraid of freezing — on the contrary, she was eager for the next challenge, the next case.
Today, she runs her own practice. The fear of freezing became the story of overcoming that she proudly tells.`,
      },
      {
        label: '[ Presenting the solution ]',
        text: `Letícia’s journey isn’t a miracle. It’s the result of a method. A method that understands that Psychology is not a science of books, but a science of people. And to take care of people, you need to be close to them — from day one.
This method is the teaching model of Psychology at Ulbra Canoas.
An infrastructure with dozens of consulting rooms, observation labs and five specialised services. You’re not paying for classes — you’re investing in certainty.
Our 30+ years of tradition mean we’ve had time to refine what works. An active student council and an academic league constantly updated by the needs of students and the market.`,
      },
      {
        label: '[ Handling objections ]',
        text: `This is usually the point where doubts show up, right?
"A structure like this, with practice from the beginning, must be more expensive. Is it worth the investment? Wouldn’t it be better to spend a year or two in a prep course to try for a public university?"
It’s a fair question. And the answer Letícia — and hundreds of students like her — give is always the same…
What looks like "saving money" in other institutions often turns into a very high cost in time and missed opportunities. Every year in a prep course is one less year earning as a psychologist. Every semester of pure theory is one more semester of insecurity.
Here at Ulbra, your investment is not in theoretical classes. It’s in certainty. The return is not a possibility — it’s a consequence of the method.`,
      },
      {
        label: '[ Close and CTA ]',
        text: `Applications for Ulbra’s entrance exam are already open. Now the decision that will shape your professional future is in your hands.
You can spend two, three or even four years buried in theory… Or you can choose the university that teaches you practice from the first semester.
Doors are open for the next cohort, but spots are, by nature, limited. Our quality depends on close, attentive supervision in the teaching clinic — and we don’t compromise on that.
Take the first step so that, five years from now, your only fear is having an agenda that is too full.
[Demo button: I WANT TO BE A CONFIDENT PSYCHOLOGIST]

P.S.: Remember the fear that started our conversation — the fear of freezing. Our immersive practical method is not a "perk"; it’s the cure for that fear. It’s the guarantee that, when it’s your turn, you won’t freeze. You’ll know exactly what to do.`,
      },
    ],
    vet: [
      {
        label: '[ Hook ]',
        text: `In Rio Grande do Sul there is a select group of vet students who don’t worry about the job market — because the market fights for them.
That’s not a marketing line. It’s a fact.
To understand the power behind that statement, let me tell you a true story…`,
      },
      {
        label: '[ Opening scene ]',
        text: `Picture this: it’s your first job right after graduating in Veterinary Medicine. A busy clinic, a Saturday afternoon — and chaos walks through the door.
A golden retriever, badly hurt after being hit by a car. The team runs. The senior vet starts stabilising the animal, shouting orders and asking for differential diagnoses.
It’s the kind of scene that makes any recent graduate’s heart race, hands shake, mind go blank. It’s the trial by fire.
While panic spreads around you, you feel an unexpected calm. Your mind doesn’t jump to the books — it goes to the days and nights you spent in the university hospital. Your hands don’t shake. They move with the muscle memory of someone who has already done this dozens of times.
Later, with the dog stable and out of danger, the senior vet comes over, puts a hand on your shoulder and says: "You did really well today."
In that moment you stop being "the rookie". You become part of the team.
That story can be yours in a few years. For now, it’s Carolina’s.`,
      },
      {
        label: '[ The method — Career Anticipation Training ]',
        text: `Carolina’s story isn’t an exception. It’s the direct result of a teaching system that we at Ulbra call Career Anticipation Training.
We don’t believe in postponing reality. We believe the only way to learn how to swim is to get in the water.
You don’t just read about clinical cases — you discuss them inside our Veterinary Hospital, one of the largest reference centres in the state and one of the few with capacity to treat large animals.
You don’t just watch videos about herd management — you are at our Teaching Farm, learning bovine and equine clinic and reproduction in practice.
You don’t memorise the steps of a surgery — you practise them, over and over, in our operating theatres and labs with cutting‑edge equipment.
And most importantly: our small cohorts ensure you’ll never be just a spectator. You are the protagonist, with direct access to professors and equipment.`,
      },
      {
        label: '[ Social proof ]',
        text: `But words are just words, right? So for a moment, don’t believe me. Believe those who are already living the result:
"In my first month at the clinic I had to intubate a cat in crisis. While others hesitated, I acted. I remembered the dozens of times I had practised exactly that at Ulbra’s hospital. That confidence is priceless."
— Dr. Fernanda Laís, Class of 2023
"I was called for a complicated birth. The owner, suspicious because of my age, only relaxed when he saw how confidently I handled the animal. That confidence didn’t come from books — it came from Ulbra’s Teaching Farm."
— Dr. Ricardo Martins, Class of 2022
"My first solo surgery was calm. It felt like just another of the countless procedures I’d done in Ulbra’s operating theatres."
— Dr. Mariana Grassmann, Class of 2019
See the pattern? Fernanda, Ricardo, Mariana… The story repeats itself. The calm, confidence and respect they describe don’t come from luck — they’re the inevitable result of a method.`,
      },
      {
        label: '[ Close and CTA ]',
        text: `Right now, you stand at a crossroads that will define not just your next 5 years, but your entire professional journey.
On one side, the traditional path: a diploma that qualifies you, but doesn’t set you apart. On the other, the path of the select group: a degree that gives you, along with the diploma, the most valuable asset a professional can have — the certainty of someone who already knows what to do.
In 5 years, all of your competitors will have a diploma… But only you will have the muscle memory of practice. The calm of experience. The respect you earn in your first months.
The question now is not whether you want to be part of that group — it’s whether you have the ambition required to belong to it.
[Demo button: SECURE MY SPOT IN THE SELECT GROUP]`,
      },
    ],
    fono: [
      {
        label: '[ Hook ]',
        text: `What determines whether you’ll be a speech therapist in high demand or just another professional with a diploma in hand is not how hard you work during the course… but a single choice that 98.7% of students get wrong before the first day of class.
If you’re reading this, I know you don’t want to be "just another one". You want to be the professional hospitals compete for. The speech therapist parents recommend with their eyes closed. The one with a full calendar and the confidence of someone who truly knows what they’re doing.
What most colleges don’t tell you is that your success doesn’t depend only on your effort. It depends on one decision you make now, before you pay your first tuition. And unfortunately, the vast majority choose wrong.`,
      },
      {
        label: '[ The two doors ]',
        text: `Picture yourself right now standing in front of two doors…
Behind door #1 is the path most people take: tuition that looks cheap, the promise of "study from anywhere". In the first semesters, an avalanche of PDFs, recorded lectures and theory. A LOT of theory. Real patients seem far away — something you’ll maybe encounter in two or three years, "if all goes well".
Behind door #2 there’s a different path. One where, from the very first semester, your lab coat doesn’t stay locked in the wardrobe. A path where the classroom extends into a real clinic, with real patients and the sound of lives being transformed. A path where theory isn’t a wall you have to memorise, but a tool you actively seek out to solve a problem you just saw with your own eyes.
The door you choose doesn’t just define what your next 4 years will look like. It defines your confidence to treat patients after you graduate and, above all, your employability.`,
      },
      {
        label: '[ Door #2 — Speech Therapy at Ulbra ]',
        text: `Door #2 is not a fantasy — it exists. It’s the Speech Therapy program at Ulbra.
It’s built on two pillars that most universities treat as "details", but for us are the foundation of everything:
First, our Teaching Clinic. Not an add‑on to "log internship hours" in the last year, but the beating heart of the course, on campus. It’s where you stop being a student who studies Speech Therapy and become a speech therapist who seeks knowledge to transform lives.
Second, who guides you. Over 75% of our professors are masters and PhDs who don’t just teach — they practise Speech Therapy. They’re in hospitals, in their own clinics, in the day‑to‑day of the profession. They bring you the clinical case they saw yesterday, the technique they just applied.
And the result? 97.3% employability. Almost 100% of our graduates are in the job market.`,
      },
      {
        label: '[ Handling objections ]',
        text: `"A program with all that structure must be more expensive than the distance‑learning options."
You’re right — it is. But this is not about cost, it’s about investment. With nearly 100% employability, the "expensive" option becomes the fastest path to the financial and professional return the "cheap" option will never deliver. What’s more expensive: investing in a complete education, or saving on tuition and spending years waiting for an opportunity because you’re not prepared?
"What if I realise Speech Therapy isn’t for me?"
Hands‑on experience from the first semesters works as a real‑life test of the profession. You confirm your vocation in your daily routine. No wonder 25% of our students already have another degree and found the fulfilment they were looking for here.
"How will I juggle work with an on‑campus degree?"
Ulbra’s Speech Therapy program is at night, designed for those with a double workload. The timetable, clinic practice hours and professor support are built around those who need to make every hour count.`,
      },
      {
        label: '[ Social proof ]',
        text: `"I used to be an administrator and felt completely stuck in my career. Choosing Speech Therapy at Ulbra was a turning point. Today I not only changed professions, but the practice from day one gave me the confidence I needed. I’m already planning to open my own clinic."
— Ana, former administrator and now Speech Therapist, Ulbra graduate
"My biggest fear was graduating with a diploma in hand and zero confidence to treat patients. The difference at Ulbra is that we live the profession from the very first day in the teaching clinic. As a result, I landed my first job even before graduation."
— Sabrina M., Speech Therapist
"Balancing work and study seemed impossible, but Ulbra’s evening program is built for those with a busy routine. What struck me most were the professors: they live what they teach — and that changes everything. Today my calendar is full and I’m grateful I made the right choice."
— Carol L., Speech Therapist`,
      },
      {
        label: '[ Close and CTA ]',
        text: `The decision is now yours…
Four years from now, who do you want to be? The professional who’s just graduated and is starting to look for an opportunity? Or the newly‑graduated speech therapist who already has multiple job offers because she built a solid base of practical experience over the past 4 years?
Door #1 — the most common path — will always be there. But door #2, the one that leads to a solid career with real‑world experience and market recognition, is open for you right now.
If you refuse to be just another name on a diploma… if you want to build a career you can be proud of… if you want to be sure you made the best choice for your future…
Spots are limited by our ability to offer high‑quality supervision. Make sure your success story starts this semester.
[Demo button: I WANT TO BE A SPEECH THERAPIST]`,
      },
    ],
  }

  const blocksByTab = lang === 'en' ? blocksByTabEn : blocksByTabPt

  const activeBlocks = blocksByTab[activeTab] ?? blocksByTab.psicologia
  const activeEyebrow = eyebrows[activeTab]

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Above the fold */}
      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">
              {t.portfolio}
            </Link>
            <span className="opacity-40">/</span>
            <span>{lang === 'en' ? 'Ulbra — Sales letters' : 'Ulbra — Cartas de Venda'}</span>
          </p>

          <div className="mt-10 sm:mt-12 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            {lang === 'en' ? 'Sales letters · Higher education' : 'Cartas de venda · Educação superior'}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {lang === 'en' ? 'Three sales letters. Same client, same core argument, three completely different approaches.' : 'Três cartas de venda. Mesmo cliente, mesmo argumento central, três abordagens completamente diferentes.'}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.client}</p>
              <p className="text-[15px] font-medium text-white/80">Ulbra</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.deliverable}</p>
              <p className="text-[15px] font-medium text-white/80">{lang === 'en' ? '3 long sales letters' : '3 cartas de venda longas'}</p>
            </div>
            <div className="pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.context}</p>
              <p className="text-[15px] font-medium text-white/80">
                {lang === 'en' ? 'Prospective students — Psychology, Vet Med and Speech Therapy' : 'Captação de vestibulandos — Psicologia, Medicina Veterinária e Fonoaudiologia'}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      {/* Briefing */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.briefing}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                {lang === 'en' ? 'Same client, same differentiator, three completely different audiences.' : 'Mesmo cliente, mesmo diferencial, três públicos completamente diferentes.'}
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">
                {lang === 'en'
                  ? 'Ulbra has one core argument that runs through all of its health programs: real clinical practice from the very first semester, while most universities only allow contact with patients in the tenth semester. The differentiator is real and concrete — but communicating it to different audiences demands different approaches.'
                  : 'A Ulbra tem um argumento central que atravessa todos os seus cursos da área da saúde: prática clínica desde o primeiro semestre, quando a maioria das faculdades só permite contato com pacientes no décimo semestre. O diferencial é real e concreto — mas comunicá-lo para públicos diferentes exige abordagens diferentes.'}
              </p>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">
                {lang === 'en'
                  ? 'Psychology, Veterinary Medicine and Speech Therapy attract audiences with different fears and desires. A future psychologist is afraid of freezing in front of a patient. A future vet wants to be respected from the very first month at work. A future speech therapist wants to be sure she is making the right choice before paying her first tuition.'
                  : 'Psicologia, Medicina Veterinária e Fonoaudiologia são cursos com públicos distintos, medos distintos e desejos distintos. Uma futura psicóloga tem medo de congelar na frente de um paciente. Uma futura veterinária quer ser respeitada desde o primeiro mês de trabalho. Uma futura fonoaudióloga quer ter certeza de que está fazendo a escolha certa antes de pagar a primeira mensalidade.'}
              </p>
              <p className="text-[15px] leading-relaxed text-white/75">
                {lang === 'en'
                  ? 'The work here was to write three long‑form letters that start from the same argument — practice from day one — but arrive there through completely different paths. Each letter has its own hook, its own narrative structure and its own central character. What changes is not the product — it is the doorway into each audience’s mind.'
                  : 'O trabalho foi escrever três cartas longas que partem do mesmo argumento — prática desde o início — mas chegam por caminhos completamente diferentes. Cada carta tem seu próprio gancho, sua própria estrutura narrativa e seu próprio personagem central. O que muda não é o produto. É a porta de entrada na cabeça de cada público.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copies entregues — tabs */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.copyDelivered}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="mb-6 flex gap-2 overflow-x-auto rounded-full bg-white/5 p-1 text-xs sm:text-[13px]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium tracking-wide transition-all ${
                      activeTab === tab.id ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-accent/15 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-accent py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  {lang === 'en' ? '✦ Copy delivered' : '✦ Copy entregue'}
                </span>

                <p className="mb-6 border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                  {activeEyebrow}
                </p>

                <div className="space-y-6">
                  {activeBlocks.map((block, index) => (
                    <div key={block.label} className={index > 0 ? 'border-t border-white/10 pt-6' : ''}>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-accent">
                        {block.label}
                      </p>
                      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">{block.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <main className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">{t.otherCases}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((caseItem) => (
              <li key={caseItem.id}>
                <Link
                  to={localizePath(`/portfolio/${caseItem.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">{lang === 'en' && caseItem.clientEn ? caseItem.clientEn : caseItem.client}</p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">{lang === 'en' && caseItem.titleEn ? caseItem.titleEn : caseItem.title}</p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* CTA final */}
      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {t.ctaFinalMain}<span className="text-amber-accent italic">{t.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function UltecCasePage({ caseData }) {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].casePage
  const [activeTab, setActiveTab] = useState('home')
  const otherCases = getOtherCases(caseData.id, 6)

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'adm', label: 'Business Leadership' },
    { id: 'eng', label: 'Eng. de Software' },
    { id: 'jornalismo', label: 'Jornalismo' },
    { id: 'marketing', label: 'Marketing' },
  ]

  const eyebrowByTab = {
    home: 'Site institucional · Ultec',
    adm: 'Landing Page · Ultec ADM',
    eng: 'Landing Page · Ultec Tecnologia',
    jornalismo: 'Landing Page · Ultec Jornalismo',
    marketing: 'Landing Page · Ultec Marketing',
  }

  const activeEyebrow = eyebrowByTab[activeTab]

  const buttonClass =
    'inline-flex items-center rounded-full bg-white text-black px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]'

  const HomeContent = () => (
    <div className="space-y-6">
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `For the nonconformists. For the doers.
For the protagonists. For the leaders.
For the entrepreneurs. For you.

Inspired by the best business schools in the world, Ultec offers an exclusive undergraduate program with international experience, active mentoring and a methodology that puts practice — and the student — at the center of everything.`
          : `Para os inconformados. Para os realizadores.
Para os protagonistas. Para os líderes.
Para os empreendedores. Para você.

Inspirada nas melhores escolas de negócios do mundo, a Ultec oferece uma graduação exclusiva, com internacionalização, mentoria ativa e uma metodologia que coloca a prática e o aluno no centro de tudo.`}
      </p>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'Academic paths for new leaders' : 'Caminhos acadêmicos para novos líderes'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75">
        {lang === 'en'
          ? 'Meet the degrees that are breaking with traditional education to train the new generation of entrepreneurs.'
          : 'Conheça as graduações que estão rompendo com o ensino tradicional para formar a nova geração de empreendedores.'}
      </p>
      <ul className="mt-2 space-y-1 text-[15px] leading-relaxed text-white/80">
        <li>→ Business Leadership (ADM)</li>
        <li>→ {lang === 'en' ? 'Marketing' : 'Marketing'}</li>
        <li>→ Strategic Software Engineering</li>
        <li>→ {lang === 'en' ? 'Journalism' : 'Jornalismo'}</li>
      </ul>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'A pioneering teaching method in Brazil' : 'Um método de ensino pioneiro no Brasil'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `The first entrepreneurship school in the country to integrate the three pillars of the new economy in a single ecosystem: Business, Technology and Communication. Our degrees are interconnected to train leaders with a complete view of the market.

The first to apply mandatory active learning in every course and to implement an exclusive soft‑skills track focused on public speaking, negotiation and emotional intelligence.

On top of that, we offer individualized tutoring for both hard and soft skills, projects with real companies from the very first semester, and international partnerships in the US, Europe and the East.

This is Ultec. A new school of entrepreneurship, designed to shape the new generation of leaders in Brazil.`
          : `1ª escola de empreendedorismo do país a integrar os três pilares da nova economia em um ecossistema único: Administração, Tecnologia e Comunicação. Nossas graduações são interligadas para formar líderes com uma visão completa do mercado.

1ª na aplicação de metodologia ativa obrigatória em todas as disciplinas e na implementação de uma trilha exclusiva de soft skills, focada em oratória, negociação e inteligência emocional.

Aliado a isso, oferecemos tutoria individualizada para hard e soft skills, projetos com empresas reais desde o primeiro semestre e convênios internacionais nos EUA, Europa e Oriente.

Esta é a Ultec. Uma nova escola de empreendedorismo, projetada para formar os novos líderes do Brasil.`}
      </p>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'An undergraduate program designed for entrepreneurial minds' : 'Graduação desenhada para mentes empreendedoras'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75">
        {lang === 'en'
          ? 'We broke away from the traditional, passive lecture model. Our methodology is fully immersed in practice, designed for you to develop the skills the future market will demand. We believe knowledge only sticks when it is put to the test.'
          : 'Rompemos com o modelo de aula expositiva e passiva. Nossa metodologia é imersa na prática, desenhada para que você desenvolva as competências que o mercado do futuro irá exigir. Acreditamos que o conhecimento só é sedimentado quando colocado à prova.'}
      </p>
      <ul className="space-y-3 text-[15px] leading-relaxed text-white/75">
        <li>
          <strong>Hands-On:</strong>{' '}
          {lang === 'en'
            ? 'theory only comes to life in practice. From the first semester, you will solve real challenges from partner companies, create projects and get your hands dirty. Here, the classroom simulates the business environment.'
            : 'a teoria só ganha vida na prática. Desde o primeiro semestre, você irá solucionar desafios reais de empresas parceiras, criar projetos e colocar a mão na massa. Aqui, a sala de aula simula o ambiente de negócios.'}
        </li>
        <li>
          <strong>Technology:</strong>{' '}
          {lang === 'en'
            ? 'fluency in technology is not a bonus — it is the new baseline. Our programs have a dedicated technology track so you can master the tools and digital mindset that are now indispensable in any field.'
            : 'fluência em tecnologia não é um diferencial, é o novo padrão. Nossos cursos possuem uma trilha de tecnologia dedicada para que você domine as ferramentas e a mentalidade digital indispensáveis para qualquer área de atuação.'}
        </li>
        <li>
          <strong>Business:</strong>{' '}
          {lang === 'en'
            ? 'develop an entrepreneurial mindset to create your own company or lead innovative projects inside large organizations.'
            : 'desenvolva uma mentalidade empreendedora para criar seu próprio negócio ou para liderar projetos inovadores dentro de grandes corporações.'}
        </li>
        <li>
          <strong>People Skills:</strong>{' '}
          {lang === 'en'
            ? 'emotional intelligence, public speaking and the ability to relate to others define who becomes a leader. Our fourth track is fully dedicated to your human and behavioral development.'
            : 'inteligência emocional, oratória e capacidade de se relacionar definem quem se torna líder. Nossa quarta trilha é dedicada ao seu desenvolvimento humano e comportamental.'}
        </li>
      </ul>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'Connections with the global market' : 'Conexões com o mercado global'}
      </p>
      <ul className="space-y-3 text-[15px] leading-relaxed text-white/75">
        <li>
          <strong>{lang === 'en' ? 'Guaranteed exchange program:' : 'Intercâmbio garantido:'}</strong>{' '}
          {lang === 'en'
            ? 'every student participates in an exchange program at partner universities in the US and Europe, with the cost already included in the tuition.'
            : 'todos os alunos realizam programa de intercâmbio em universidades parceiras nos EUA e Europa, com custo já incluído na mensalidade.'}
        </li>
        <li>
          <strong>{lang === 'en' ? 'Classes in English:' : 'Aulas em inglês:'}</strong>{' '}
          {lang === 'en'
            ? 'option to take courses 100% in English, preparing you for a borderless market.'
            : 'opção de cursar disciplinas 100% em inglês, preparando você para um mercado sem fronteiras.'}
        </li>
        <li>
          <strong>{lang === 'en' ? 'International connections:' : 'Conexões internacionais:'}</strong>{' '}
          {lang === 'en'
            ? 'immersive summer programs, global networking and contact with professors and students from multiple nationalities.'
            : 'programas de férias imersivas, networking global e contato com professores e alunos de diferentes nacionalidades.'}
        </li>
      </ul>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'A high‑performance ecosystem' : 'Um ecossistema de alta performance'}
      </p>
      <ul className="space-y-3 text-[15px] leading-relaxed text-white/75">
        <li>
          <strong>{lang === 'en' ? 'Tutoring:' : 'Tutoria:'}</strong>{' '}
          {lang === 'en'
            ? 'every class has two tutors — a content specialist and a well‑being tutor dedicated to your personal development and performance.'
            : 'todas as aulas contam com dois tutores — um especialista no conteúdo e um tutor de bem-estar, dedicado ao seu desenvolvimento pessoal e performance.'}
        </li>
        <li>
          <strong>{lang === 'en' ? 'Sports:' : 'Esporte:'}</strong>{' '}
          {lang === 'en'
            ? 'tennis, swimming and basketball with top‑tier facilities, and sports courses that carry more weight in your final grade.'
            : 'tênis, natação e basquete em estrutura de ponta, com disciplinas de esporte pesando mais na nota.'}
        </li>
        <li>
          <strong>{lang === 'en' ? 'Clubs and affinity groups:' : 'Clubes e grupos de afinidade:'}</strong>{' '}
          {lang === 'en'
            ? 'finance leagues, tech groups, e‑sports and much more.'
            : 'ligas de mercado financeiro, grupos de tecnologia, e-sports e muito mais.'}
        </li>
        <li>
          <strong>{lang === 'en' ? 'Students become mentors:' : 'Alunos se tornam mentores:'}</strong>{' '}
          {lang === 'en'
            ? 'as you progress, you become a mentor for newcomers, accelerating development across the entire community.'
            : 'conforme avança, você passa a mentorar os iniciantes, acelerando o desenvolvimento de toda a comunidade.'}
        </li>
      </ul>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-3 text-[15px] leading-relaxed text-white/75">
        {lang === 'en'
          ? 'Utec is the meeting point for bold thinkers who demand a higher education that matches the scale of their ambitions.'
          : 'A Ultec é o ponto de encontro de pensadores ousados que buscam uma educação superior à altura de suas ambições.'}
      </p>
      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'Apply now' : 'Faça a sua inscrição'}
      </span>
    </div>
  )

  const AdmContent = () => (
    <div className="space-y-6">
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Business Leadership Bachelor’s Degree

An exclusive program with a practice‑driven methodology, global experiences and a high‑performance ecosystem focused on startup creation.

Duration: 4 years  |  In‑person  |  40 seats  |  R$ 4,980.00/month`
          : `Graduação em Administração

Uma graduação exclusiva, com metodologia imersa na prática, experiências globais e um ecossistema de alta performance focado em criação de startups.

Duração: 4 anos  |  Presencial  |  40 vagas  |  R$ 4.980,00/mês`}
      </p>
      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'Apply now' : 'Faça a sua inscrição'}
      </span>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'A new kind of education for new leaders' : 'Uma nova formação para novos líderes'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Ultec’s Business Leadership Bachelor’s Degree was born from a single ambition: to become the best and most transformative Business program in the country.

Our curriculum was built from a careful analysis of the top business schools in the world — Wharton, Harvard and MIT — to create a global‑standard program here in Brazil.

Our mission is not to train employees, but to equip the business owners of the future. Here, learning is a radical immersion in entrepreneurship.`
          : `O Bacharelado em Business Leadership da Ultec nasce de uma ambição: ser o melhor e mais transformador curso de Administração do país.

Nossa matriz curricular foi construída a partir de uma análise criteriosa das melhores escolas de negócios do mundo — Wharton, Harvard e MIT — para criar um programa de padrão global, aqui no Brasil.

Nossa missão não é formar funcionários, mas sim capacitar os donos de empresa do futuro. Aqui, o aprendizado é uma imersão radical no empreendedorismo.`}
      </p>
      <ul className="space-y-2 text-[15px] leading-relaxed text-white/75">
        <li>
          {lang === 'en'
            ? '· The first entrepreneurship school in the country to integrate Business, Technology and Communication in a single ecosystem.'
            : '· 1ª escola de empreendedorismo do país a integrar Administração, Tecnologia e Comunicação em um ecossistema único.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Exclusive soft‑skills track in public speaking, negotiation and emotional intelligence.'
            : '· Trilha exclusiva de soft skills em oratória, negociação e inteligência emocional.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Individualized mentoring, projects with real companies and international partnerships.'
            : '· Tutoria individualizada, projetos com empresas reais e convênios internacionais.'}
        </li>
      </ul>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'About the program' : 'Sobre o programa'}
      </p>
      <ul className="space-y-3 text-[15px] leading-relaxed text-white/75">
        <li>
          <strong>{lang === 'en' ? 'Startup Hub:' : 'Hub de Startups:'}</strong>{' '}
          {lang === 'en'
            ? 'an environment designed for building companies, with legal and accounting support.'
            : 'ambiente projetado para criação de empresas, com suporte jurídico e contábil.'}
        </li>
        <li>
          <strong>{lang === 'en' ? 'Hands‑On Methodology:' : 'Metodologia Hands-On:'}</strong>{' '}
          {lang === 'en'
            ? 'real challenges from partner companies starting in the very first semester.'
            : 'desafios reais de empresas parceiras desde o 1º semestre.'}
        </li>
        <li>
          <strong>{lang === 'en' ? 'Global passport:' : 'Passaporte global:'}</strong>{' '}
          {lang === 'en'
            ? 'mandatory exchange program included in the tuition.'
            : 'intercâmbio obrigatório incluso na mensalidade.'}
        </li>
        <li>
          <strong>{lang === 'en' ? '360° mentoring:' : 'Mentoria 360°:'}</strong>{' '}
          {lang === 'en'
            ? 'advanced students mentoring newcomers.'
            : 'alunos avançados como mentores dos iniciantes.'}
        </li>
      </ul>

      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'Apply now' : 'Faça a sua inscrição'}
      </span>
    </div>
  )

  const EngContent = () => (
    <div className="space-y-6">
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Computer Science Bachelor’s Degree

A program for the architects of the digital world. Learn how to build products, lead teams and create technology that solves real problems in an ecosystem that unites engineering, business and innovation.

Duration: 4 years  |  In‑person  |  40 seats  |  R$ 3,980.00/month`
          : `Graduação em Ciência da Computação

Uma formação para os arquitetos do digital. Aprenda a construir produtos, liderar equipes e criar tecnologia que resolve problemas reais em um ecossistema que une engenharia, negócios e inovação.

Duração: 4 anos  |  Presencial  |  40 vagas  |  R$ 3.980,00/mês`}
      </p>
      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'Apply now' : 'Faça a sua inscrição'}
      </span>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en'
          ? 'For the engineers who will define the next era of technology'
          : 'Para os engenheiros que vão definir a próxima era da tecnologia'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Knowing how to code is the baseline. Leading the creation of technology that defines the future is what truly matters.

Ultec’s Strategic Software Engineering program was designed to train the leaders who will architect the solutions to the biggest challenges of our time.`
          : `Saber programar é o básico. Liderar a criação de tecnologia que define o futuro é o que realmente importa.

O curso de Strategic Software Engineering da Ultec foi desenhado para formar os líderes que irão arquitetar as soluções para os maiores desafios do nosso tempo.`}
      </p>

      <ul className="space-y-2 text-[15px] leading-relaxed text-white/75">
        <li>
          {lang === 'en'
            ? '· Product & Venture Studio to ideate, prototype and launch real tech products.'
            : '· Product & Venture Studio para idealizar, prototipar e lançar produtos de tecnologia.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Startup Hub with multidisciplinary teams.'
            : '· Hub de Startups com equipes multidisciplinares.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Project‑ and sprint‑based methodology.'
            : '· Metodologia baseada em projetos e sprints reais.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Mandatory exchange program in the US included in the tuition.'
            : '· Intercâmbio obrigatório nos EUA incluso na mensalidade.'}
        </li>
      </ul>

      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'Apply now' : 'Faça a sua inscrição'}
      </span>
    </div>
  )

  const JornalismoContent = () => (
    <div className="space-y-6">
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Journalism Bachelor’s Degree

A program for communicators who will set the agenda for the future. Learn how to build narratives, media platforms and influence in an ecosystem that combines journalism, technology and entrepreneurship.

Duration: 4 years  |  In‑person  |  40 seats  |  R$ 3,890.00/month`
          : `Graduação em Jornalismo

Uma formação para os comunicadores que irão pautar o futuro. Aprenda a construir narrativas, plataformas de mídia e influência em um ecossistema que une jornalismo, tecnologia e empreendedorismo.

Duração: 4 anos  |  Presencial  |  40 vagas  |  R$ 3.890,00/mês`}
      </p>
      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'Apply now' : 'Faça a sua inscrição'}
      </span>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en'
          ? 'For the journalists who will write the narratives of the future'
          : 'Para os jornalistas que vão escrever as narrativas do futuro'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Journalism has been transformed by technology. Credibility and relevance now depend on the ability to create, distribute and monetize impactful content across multiple platforms.

Ultec’s Journalism program was designed to train leaders who master this new reality.`
          : `O jornalismo foi transformado pela tecnologia. A credibilidade e a relevância dependem da capacidade de criar, distribuir e monetizar conteúdo de impacto em múltiplas plataformas.

O curso de Jornalismo da Ultec foi desenhado para formar os líderes que dominam essa nova realidade.`}
      </p>

      <ul className="space-y-2 text-[15px] leading-relaxed text-white/75">
        <li>
          {lang === 'en'
            ? '· Portal Vetor: a real, multi‑platform news outlet from day one.'
            : '· Portal Vetor: veículo real multiplataforma desde o primeiro dia.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Projects with partner companies and media outlets.'
            : '· Projetos com empresas e veículos parceiros.'}
        </li>
        <li>
          {lang === 'en'
            ? '· International exchange included.'
            : '· Intercâmbio internacional incluso.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Soft‑skills track and continuous mentoring.'
            : '· Trilha de soft skills e mentoria contínua.'}
        </li>
      </ul>

      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'Apply now' : 'Faça a sua inscrição'}
      </span>
    </div>
  )

  const MarketingContent = () => (
    <div className="space-y-6">
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Marketing Bachelor’s Degree

A program for those who will build the most desired brands of the future, combining branding, growth and technology in a high‑performance ecosystem.

Duration: 4 years  |  In‑person  |  40 seats  |  R$ 3,890.00/month`
          : `Graduação em Marketing

Uma formação para quem vai construir as marcas mais desejadas do futuro, combinando branding, growth e tecnologia em um ecossistema de alta performance.

Duração: 4 anos  |  Presencial  |  40 vagas  |  R$ 3.890,00/mês`}
      </p>
      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'Apply now' : 'Faça a sua inscrição'}
      </span>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'Inspired by the best marketing schools in the world' : 'Inspirada nas melhores escolas de marketing do mundo'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Marketing, more than ever, is about building narratives, creating communities and generating exponential growth.

Ultec’s Marketing program was designed to train leaders who master this new logic.`
          : `O marketing, mais do que nunca, é sobre construir narrativas, criar comunidades e gerar crescimento exponencial.

O curso de Marketing da Ultec foi desenhado para formar os líderes que dominam essa nova lógica.`}
      </p>

      <ul className="space-y-2 text-[15px] leading-relaxed text-white/75">
        <li>
          {lang === 'en'
            ? '· Growth & Branding Lab for creating and scaling real projects.'
            : '· Growth & Branding Lab para criação e escala de projetos reais.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Startup Hub shared with Business and Software Engineering.'
            : '· Hub de Startups com Business e Engenharia de Software.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Hands‑on methodology from the very first semester.'
            : '· Metodologia "hands-on" desde o primeiro semestre.'}
        </li>
        <li>
          {lang === 'en'
            ? '· Mandatory exchange program and international connections.'
            : '· Intercâmbio obrigatório e conexões internacionais.'}
        </li>
      </ul>

      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'Apply now' : 'Faça a sua inscrição'}
      </span>
    </div>
  )

  const renderTabContent = () => {
    if (activeTab === 'home') return <HomeContent />
    if (activeTab === 'adm') return <AdmContent />
    if (activeTab === 'eng') return <EngContent />
    if (activeTab === 'jornalismo') return <JornalismoContent />
    if (activeTab === 'marketing') return <MarketingContent />
    return <HomeContent />
  }

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Above the fold */}
      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">
              {t.portfolio}
            </Link>
            <span className="opacity-40">/</span>
            <span>{lang === 'en' ? 'Ultec — School of Entrepreneurship' : 'Ultec — Escola de Empreendedorismo'}</span>
          </p>

          <div className="mt-10 sm:mt-12 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            {lang === 'en' ? 'Education · Entrepreneurship' : 'Educação · Empreendedorismo'}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {lang === 'en' ? 'A new school demanded copy that matched its ambition.' : 'Uma escola nova exigia uma copy à altura da ambição.'}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.client}</p>
              <p className="text-[15px] font-medium text-white/80">Ultec</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.deliverable}</p>
              <p className="text-[15px] font-medium text-white/80">{lang === 'en' ? 'Institutional site + 4 course LPs' : 'Site institucional + 4 LPs de curso'}</p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.context}</p>
              <p className="text-[15px] font-medium text-white/80">
                {lang === 'en' ? 'Launch of new premium entrepreneurship school' : 'Lançamento de nova escola premium de empreendedorismo'}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      {/* Briefing */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.briefing}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                {lang === 'en' ? 'A new school demanded copy that matched its ambition.' : 'Uma escola nova exigia uma copy à altura da ambição.'}
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">
                {lang === 'en' ? 'Ultec entered the market with a radical proposal: break with traditional education and create Brazil’s first school of entrepreneurship that integrates Administration, Technology and Communication in one ecosystem. The copy challenge was proportional to the institution’s boldness.' : 'A Ultec chegou ao mercado com uma proposta radical: romper com o ensino tradicional e criar a primeira escola de empreendedorismo do Brasil que integra Administração, Tecnologia e Comunicação em um ecossistema único. O desafio da copy era proporcional à ousadia da instituição.'}
              </p>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">
                O público-alvo não é o vestibulando médio. É o jovem inconformado, que já sabe que não quer ser funcionário — quer construir
                algo. Para esse perfil, copy institucional genérica não funciona. Era preciso uma linguagem que soasse como um manifesto, não
                como um prospecto.
              </p>
              <p className="text-[15px] leading-relaxed text-white/75">
                O trabalho envolveu o site institucional completo e quatro landing pages individuais para cada curso: Business Leadership,
                Strategic Software Engineering, Jornalismo e Marketing. Cada peça foi calibrada para o perfil específico do aluno de cada
                área, mantendo a identidade de alta performance da marca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + copies */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.copyDelivered}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="mb-6 flex gap-2 overflow-x-auto rounded-full bg-white/5 p-1 text-xs sm:text-[13px]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium tracking-wide transition-all ${
                      activeTab === tab.id ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-accent/15 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-accent py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  {lang === 'en' ? '✦ Copy delivered' : '✦ Copy entregue'}
                </span>

                <p className="mb-6 border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                  {activeEyebrow}
                </p>

                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <main className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">{t.otherCases}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((caseItem) => (
              <li key={caseItem.id}>
                <Link
                  to={localizePath(`/portfolio/${caseItem.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">{lang === 'en' && caseItem.clientEn ? caseItem.clientEn : caseItem.client}</p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">{lang === 'en' && caseItem.titleEn ? caseItem.titleEn : caseItem.title}</p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* CTA final */}
      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {t.ctaFinalMain}<span className="text-amber-accent italic">{t.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function UlbraSaudeTechCasePage({ caseData }) {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].casePage
  const [activeTab, setActiveTab] = useState('comp')
  const otherCases = getOtherCases(caseData.id, 6)

  const tabs = [
    { id: 'comp', label: lang === 'en' ? 'Computer Science' : 'Ciência da Computação' },
    { id: 'farmacia', label: lang === 'en' ? 'Pharmacy' : 'Farmácia' },
    { id: 'fisio', label: lang === 'en' ? 'Physiotherapy' : 'Fisioterapia' },
  ]

  const eyebrowByTab = {
    comp:
      lang === 'en'
        ? 'Landing Page · Computer Science — blended · Ulbra'
        : 'Landing Page · Ciência da Computação — semipresencial · Ulbra',
    farmacia:
      lang === 'en'
        ? 'Landing Page · Pharmacy — blended · Ulbra'
        : 'Landing Page · Farmácia — semipresencial · Ulbra',
    fisio:
      lang === 'en'
        ? 'Landing Page · Physiotherapy — on‑campus · Ulbra'
        : 'Landing Page · Fisioterapia — presencial · Ulbra',
  }

  const activeEyebrow = eyebrowByTab[activeTab]

  const buttonClass =
    'inline-flex items-center rounded-full bg-white text-black px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]'

  const CompContent = () => (
    <div className="space-y-6">
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `The tech market has dozens of doors. Computer Science gives you the master key to all of them.

Master the fundamentals that allow you to develop any system, program or network. Prepare to be the architect behind innovation — not just another user of ready‑made tools.`
          : `O mercado de tecnologia tem dezenas de portas. A Ciência da Computação te dá a chave mestra para todas elas.

Domine os fundamentos que permitem desenvolver qualquer sistema, programa ou rede. Prepare-se para ser o arquiteto por trás da inovação, não apenas mais um usuário de ferramentas prontas.`}
      </p>

      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'I WANT THE MASTER KEY' : 'QUERO A CHAVE MESTRA'}
      </span>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en'
          ? 'The trap of early specialization'
          : 'A armadilha da especialização precoce'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Do not bet your career on “the language of the moment”.

The tech market is seductive — and dangerous. Bootcamps promise to turn you into a “web developer” in six months. Tutorials teach you how to “build apps”.

But the technology that is a trend today will be obsolete tomorrow.

Many professionals invest time and money to learn how to use a single tool — only to find themselves stuck behind a single door that can close at any moment.

The safest and most lucrative career is not for the specialist in just one tool. It is for the professional who knows how to build the tool itself.`
          : `Não aposte sua carreira na "linguagem da moda".

O mercado de tecnologia é sedutor e perigoso. Bootcamps prometem te transformar em "programador web" em 6 meses. Tutoriais te ensinam a "criar apps". 

Mas a tecnologia que é tendência hoje, amanhã se torna obsoleta.

Muitos profissionais investem tempo e dinheiro para aprender a usar uma única ferramenta, apenas para se verem presos a uma única porta, que pode se fechar a qualquer momento.

A carreira mais segura e lucrativa não é a do especialista em uma única ferramenta. É a do profissional que sabe construir a própria ferramenta.`}
      </p>

      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `How does a computer scientist become future‑proof?

While others only learn the recipe for the cake, you learn the chemistry of the ingredients. That is why you do not fall behind.

The specialist programmer learns Python or JavaScript.
The computer scientist learns the logic, data structures and algorithms that give rise to ANY programming language.

It is the difference between knowing how to use an app and being able to create the next one. With this foundation, you can choose which door to walk through at every stage of your career.`
          : `Como um cientista da computação se torna à prova de futuro?

Enquanto outros aprendem a receita do bolo, você vai aprender os fundamentos da química dos ingredientes. É por isso que você nunca fica para trás.

O programador especialista: aprende Python ou JavaScript.
O cientista da computação: aprende a lógica, a estrutura de dados e os algoritmos que dão origem a QUALQUER linguagem de programação.

É a diferença entre saber usar um aplicativo e ser capaz de criar o próximo. Com esta base, você tem o poder de escolher em qual porta quer entrar a cada momento da sua carreira.`}
      </p>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en'
          ? 'What you will find in Ulbra’s blended Computer Science program'
          : 'O que você vai ver no curso Ciências da Computação semipresencial da Ulbra'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75">
        {lang === 'en'
          ? 'Our blended bachelor’s degree was designed to give you the depth that the top tier of the market demands. In practice, you will learn to:'
          : 'Nosso bacharelado semipresencial foi desenhado para te dar a profundidade que o mercado de elite exige. Na prática, você vai aprender a:'}
      </p>
      <ul className="space-y-3 text-[15px] leading-relaxed text-white/75">
        <li>
          {lang === 'en'
            ? '✅ DEVELOP SYSTEMS AND PROGRAMS FROM SCRATCH: learn how to design and build complex software for any purpose, from desktop to mobile.'
            : '✅ DESENVOLVER SISTEMAS E PROGRAMAS DO ZERO: aprenda a projetar e construir softwares complexos para qualquer finalidade, do desktop ao mobile.'}
        </li>
        <li>
          {lang === 'en'
            ? '✅ IMPLEMENT AND MANAGE COMPUTER NETWORKS: master the infrastructure that connects the world. Learn how to design, implement and secure intranet and internet networks for companies of any size.'
            : '✅ IMPLEMENTAR E GERENCIAR REDES DE COMPUTADORES: domine a infraestrutura que conecta o mundo. Aprenda a projetar, implementar e garantir a segurança de redes de intranet e internet para empresas de qualquer porte.'}
        </li>
        <li>
          {lang === 'en'
            ? '✅ MASTER LOGIC AND ALGORITHMS: understand the “brain” behind any software — the skill that lets you solve complex problems most programmers cannot.'
            : '✅ DOMINAR A LÓGICA E OS ALGORITMOS: entenda o cérebro por trás de qualquer software. É esta habilidade que te permitirá resolver problemas complexos que a maioria dos programadores não consegue.'}
        </li>
        <li>
          {lang === 'en'
            ? '✅ APPLY ARTIFICIAL INTELLIGENCE AND DATA STRUCTURES: build the foundation to work in the most advanced and best‑paid areas of tech, such as AI, machine learning and large‑scale data analysis.'
            : '✅ APLICAR INTELIGÊNCIA ARTIFICIAL E ESTRUTURA DE DADOS: tenha a base para atuar nas áreas mais avançadas e bem pagas da tecnologia, como IA, Machine Learning e análise de dados em larga escala.'}
        </li>
      </ul>

      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `A quick course gives you a skill. A Computer Science bachelor’s degree gives you a career.

It is the most complete and respected training in the tech field — the credential that opens the doors to top positions, multinational companies and the world of research and innovation.

It is the investment with the highest and most lasting return.`
          : `Um curso rápido te dá uma habilidade. Um diploma de Bacharel em Ciência da Computação te dá uma carreira.

É a formação mais completa e respeitada da área de tecnologia, a credencial que te abre as portas para os cargos mais altos, para as vagas em empresas multinacionais e para o mundo da pesquisa e inovação.

É o investimento com o maior e mais duradouro retorno.`}
      </p>

      <p className="text-[15px] leading-relaxed text-white/75">
        {lang === 'en'
          ? 'Fill in the form and talk to our team. Your journey to becoming a true architect of technology starts now.'
          : 'Preencha o formulário e fale com nossa equipe. Sua jornada para se tornar um verdadeiro arquiteto da tecnologia começa agora.'}
      </p>
    </div>
  )

  const FarmaciaContent = () => (
    <div className="space-y-6">
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `While most health careers focus on treating disease, the pharmacist works so that it often never appears.

Ulbra’s Pharmacy degree gives you the scientific foundation to act in prevention, promotion and recovery of health for the whole society — with the authority of a full university diploma.`
          : `Enquanto a maioria das profissões de saúde trata a doença, o Farmacêutico atua para que ela sequer exista.

A Graduação em Farmácia da Ulbra te dá a base científica para atuar na prevenção, promoção e recuperação da saúde de toda a sociedade, com a autoridade de um diploma universitário.`}
      </p>

      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'I WANT TO ENROL' : 'QUERO FAZER MINHA MATRÍCULA'}
      </span>

      <hr className="my-6 border-t border-white/10" />

      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Forget the narrow view of pharmacy.

The professional valued by the market does not just understand medicines — they master the entire cycle that surrounds health, from preventing diseases to developing new cures.

Ulbra pharmacists are trained to operate with excellence in three phases, becoming versatile and essential professionals for the health system.`
          : `Esqueça a visão limitada sobre a Farmácia.

O profissional valorizado pelo mercado não apenas entende de medicamentos, mas domina todo o ciclo que envolve a saúde: desde a prevenção de doenças até o desenvolvimento de novas curas.

O Farmacêutico formado pela Ulbra é treinado para atuar com competência em 3 fases, tornando-se um profissional versátil e essencial para o sistema de saúde.`}
      </p>

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'Phase 1' : 'FASE 1'}
      </p>
      <ul className="space-y-2 text-[15px] leading-relaxed text-white/75">
        <li>
          {lang === 'en'
            ? 'In the food and cosmetics industry: you guarantee the safety and quality of what people consume, acting directly at the source of well‑being.'
            : 'Na indústria de alimentos e cosméticos: você garante a segurança e a qualidade do que a população consome, atuando diretamente na fonte do bem-estar.'}
        </li>
        <li>
          {lang === 'en'
            ? 'In public health and sanitary surveillance: you act as the technical authority that sets and enforces standards to protect society’s health.'
            : 'Na saúde pública e vigilância sanitária: você atua como autoridade técnica que fiscaliza e estabelece os padrões para proteger a saúde da sociedade.'}
        </li>
        <li>
          {lang === 'en'
            ? 'In the development of immunobiologics: you are part of the chain that produces vaccines and sera — the greatest preventive tools science has ever created.'
            : 'No desenvolvimento de imunobiológicos: você participa da cadeia de produção de vacinas e soros, as maiores ferramentas de prevenção que a ciência já criou.'}
        </li>
      </ul>

      <p className="mt-6 mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'Phase 2' : 'FASE 2'}
      </p>
      <ul className="space-y-2 text-[15px] leading-relaxed text-white/75">
        <li>
          {lang === 'en'
            ? 'In clinical and hospital pharmacy: you work alongside doctors and nurses, defining the most effective therapies, adjusting dosages and monitoring patient safety.'
            : 'Na farmácia clínica e hospitalar: você colabora com médicos e enfermeiros, definindo as terapias mais eficazes, ajustando dosagens e monitorando a segurança do paciente.'}
        </li>
        <li>
          {lang === 'en'
            ? 'In clinical analysis labs: your reports and analyses provide the crucial information that guides diagnoses and medical decisions.'
            : 'Em laboratórios de análises clínicas: seus laudos e análises fornecem as informações cruciais que guiam o diagnóstico e as decisões médicas.'}
        </li>
        <li>
          {lang === 'en'
            ? 'In compounding pharmacies: you develop personalised formulations to meet specific needs in the pharmaceutical industry.'
            : 'Na farmácia magistral: você desenvolve formulações personalizadas para atender necessidades específicas da indústria farmacêutica.'}
        </li>
      </ul>

      <p className="mt-6 mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en' ? 'Phase 3' : 'FASE 3'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `In research and drug development: you work on discovering new molecules and therapies for diseases that today still have no cure.

You are on the front lines, guaranteeing the health of society.`
          : `Na pesquisa e desenvolvimento de fármacos: você trabalha na descoberta de novas moléculas e terapias para doenças que hoje são incuráveis.

Você, na linha de frente, garantindo a saúde da sociedade.`}
      </p>

      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'I WANT TO ENROL' : 'QUERO FAZER MINHA MATRÍCULA'}
      </span>

      <hr className="my-6 border-t border-white/10" />

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en'
          ? 'We combine the best of two worlds to train the best professionals'
          : 'Unimos o melhor de dois mundos para formar os melhores.'}
      </p>
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `To master such a vast field, you need a superior methodology.

The scientific foundation, with the flexibility of online learning:
You build your theoretical arsenal on our digital platform, with classes taught by masters and PhDs, studying at your own pace, from wherever you are.

Practice in real laboratories:
Your training is consolidated in on‑campus sessions in our state‑of‑the‑art labs. That is where theory becomes skill — where you learn to handle, analyse and create like a scientist.`
          : `Para dominar um campo tão vasto, você precisa de uma metodologia superior.

A base científica, na flexibilidade do EAD:
Você constrói seu arsenal teórico em nossa plataforma online, com aulas de mestres e doutores, estudando no seu ritmo, de onde estiver.

A prática em laboratórios de verdade:
Sua formação é consolidada em encontros presenciais nos nossos laboratórios de ponta. É aqui que a teoria se torna habilidade, onde você aprende a manipular, analisar e criar como um cientista.`}
      </p>

      <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {lang === 'en'
          ? 'Your career demands the endorsement of a reference institution in health'
          : 'Sua carreira exige a chancela de uma instituição referência em saúde.'}
      </p>
      <ul className="space-y-2 text-[15px] leading-relaxed text-white/75">
        <li>
          {lang === 'en'
            ? 'Bachelor’s degree diploma: the definitive credential, recognised by the Ministry of Education, that opens every door — Ulbra holds the highest MEC score.'
            : 'Diploma de bacharelado: a credencial definitiva, reconhecida pelo MEC, que te abre todas as portas. A Ulbra possui nota máxima no MEC.'}
        </li>
        <li>
          {lang === 'en'
            ? '+50 years of tradition: the security of graduating from the largest university in Rio Grande do Sul and one of the best education networks in the country.'
            : '+50 anos de tradição: a segurança de se formar na maior universidade do Rio Grande do Sul e uma das melhores redes de ensino do país.'}
        </li>
        <li>
          {lang === 'en'
            ? 'Qualified faculty: learn from those who produce the science that moves pharmacy forward in Brazil.'
            : 'Corpo docente qualificado: aprenda com quem produz a ciência que move a farmácia no Brasil.'}
        </li>
      </ul>

      <span className={buttonClass} style={{ pointerEvents: 'none' }}>
        {lang === 'en' ? 'I WANT TO ENROL' : 'QUERO FAZER MINHA MATRÍCULA'}
      </span>

      <hr className="my-6 border-t border-white/10" />

      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Start building a prestigious career.

Ulbra’s Pharmacy degree is a passport to the most valued areas in health.

Secure your place with special conditions and scholarships of up to 30% off.`
          : `Comece a construir uma carreira de prestígio.

A Graduação em Farmácia da Ulbra é um passaporte para as áreas mais valorizadas da saúde.

Garanta sua vaga com condições especiais e até 30% DE DESCONTO.`}
      </p>

      <p className="text-[15px] leading-relaxed text-white/75">
        {lang === 'en'
          ? 'Fill in your details so our team can show you how to begin your journey to becoming on the front lines of health in the world.'
          : 'Preencha seus dados para que nossa equipe te mostre como iniciar sua jornada para se tornar a linha de frente da saúde no mundo.'}
      </p>
    </div>
  )

  const FisioContent = () => (
    <div className="space-y-4">
      <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
        {lang === 'en'
          ? `Top‑rated Physiotherapy in MEC · 50+ years training the most sought‑after professionals in the market.

The LP opens by positioning the program as complete preparation for the future of health: prevention, promotion and education — not just traditional rehabilitation.

From there, it brings hard proof: maximum MEC score, more than 50 years of tradition at the largest private university in Rio Grande do Sul and a strong promise of real practice — labs and clinic‑school — from the first semester.

The bullets reinforce:
➜ 100% on‑campus classes.
➜ Access to Ulbra’s full infrastructure in Canoas, with state‑of‑the‑art labs and clinic‑school.
➜ Diverse practical experiences across different fields of Physiotherapy from the early semesters.
➜ An innovative curriculum connected to what science proves and what the market demands.

The close makes it clear who the degree is for and anchors the commercial offer: for those who want a purpose‑driven career helping people, value human contact and practice, want to learn from experienced professors and demand a traditional institution — with up to 30% scholarships and a direct CTA to secure a seat.`
          : `Fisioterapia nota máxima no MEC e mais de 50 anos formando profissionais disputados pelo mercado.

A LP abre com a promessa central: uma graduação que prepara você para o mercado com prática desde o 1º semestre e laboratórios de ponta. Em seguida, aprofunda o que significa "preparar para o futuro da saúde":
➔ Prevenção de doenças,
➔ Promoção da saúde,
➔ Educação de pacientes — não apenas reabilitação tradicional.

Depois, a copy mostra a estrutura que sustenta essa promessa:
➔ Aulas 100% presenciais.
➔ Acesso à infraestrutura completa da Ulbra, maior universidade privada do RS.
➔ Laboratórios modernos, tecnologia de ponta e clínica‑escola para aprender na prática.

Os bullets finais reforçam:
✅ Curso com nota máxima no MEC.
✅ Experiências práticas diversificadas desde os primeiros semestres.
✅ Currículo inovador, conectado com ciência e mercado.
✅ Formação em 10 semestres, pronta para atuar.

O fechamento deixa claro para quem é o curso e traz a condição comercial:
para quem quer carreira com propósito, valoriza contato humano e prática, quer aprender com professores experientes e faz questão de uma instituição tradicional, com bolsas de até 30% e um CTA forte para garantir a vaga.`}
      </p>
    </div>
  )

  const renderTabContent = () => {
    if (activeTab === 'comp') return <CompContent />
    if (activeTab === 'farmacia') return <FarmaciaContent />
    if (activeTab === 'fisio') return <FisioContent />
    return <CompContent />
  }

  return (
    <div className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Above the fold */}
      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">
              {t.portfolio}
            </Link>
            <span className="opacity-40">/</span>
            <span>{lang === 'en' ? 'Ulbra — Health & Tech LPs' : 'Ulbra — Saúde & Tech'}</span>
          </p>

          <div className="mt-10 sm:mt-12 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            {lang === 'en' ? 'Education · Health & Technology' : 'Educação · Saúde & Tecnologia'}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {lang === 'en'
              ? 'Three landing pages, one core promise: real practice from day one.'
              : 'Três landing pages, um mesmo argumento: prática real desde o início.'}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.client}</p>
              <p className="text-[15px] font-medium text-white/80">Ulbra</p>
            </div>
            <div className="border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.deliverable}</p>
              <p className="text-[15px] font-medium text-white/80">
                {lang === 'en'
                  ? '3 LPs — Physiotherapy, Pharmacy and Computer Science'
                  : '3 LPs — Fisioterapia, Farmácia e Ciências da Computação'}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.context}</p>
              <p className="text-[15px] font-medium text-white/80">
                {lang === 'en'
                  ? 'Lead generation for on‑campus and blended programs'
                  : 'Captação para cursos presencial e semipresencial'}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      {/* Briefing */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.briefing}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                {lang === 'en'
                  ? 'Three programs, three audiences, one argument that never changes: real practice from the start.'
                  : 'Três cursos, três públicos, um argumento que não muda: prática real desde o início.'}
              </h2>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">
                {lang === 'en'
                  ? 'All three pieces faced the same classic challenge of higher‑education lead generation: break away from generic institutional copy and speak directly to the fear and desire of someone choosing a degree. Each area has its own fear and its own ambition — and the copy had to honour that.'
                  : 'O desafio dessas três peças era o mesmo de sempre na captação para ensino superior: fugir do institucional genérico e falar diretamente com a dor e o desejo de quem está escolhendo o curso. Cada área tem seu próprio medo e sua própria ambição — e a copy precisava honrar isso.'}
              </p>
              <p className="mb-4 text-[15px] leading-relaxed text-white/75">
                {lang === 'en'
                  ? 'For Physiotherapy, the angle is emotional and vocational: people who choose this career want to help others, and the LP reinforces that on‑campus practice from the very first semester is what separates a complete professional from someone who only has a diploma.'
                  : 'Em Fisioterapia, o argumento é emocional e vocacional: quem escolhe essa carreira quer ajudar pessoas, e a LP reforça que a prática presencial desde o 1º semestre é o que separa um profissional completo de um bacharel inseguro.'}
              </p>
              <p className="text-[15px] leading-relaxed text-white/75">
                {lang === 'en'
                  ? 'For Pharmacy, the work was to dismantle the cliché of the pharmacist who “just stands behind a counter” — the copy positions the professional as a key protagonist in the health system. For Computer Science, the strategy was to attack the trap of bootcamps and quick courses head‑on, positioning the bachelor’s as the only training that truly makes the professional future‑proof.'
                  : 'Em Farmácia, o trabalho foi desconstruir o preconceito de que o farmacêutico "só fica atrás de um balcão" — a copy posiciona o profissional como protagonista do sistema de saúde. Em Ciências da Computação, a estratégia foi atacar diretamente a armadilha dos bootcamps e cursos rápidos, posicionando o bacharelado como a única formação que torna o profissional à prova de futuro.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + LP copies */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.copyDelivered}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="mb-6 flex gap-2 overflow-x-auto rounded-full bg-white/5 p-1 text-xs sm:text-[13px]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 font-medium tracking-wide transition-all ${
                      activeTab === tab.id ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-accent/15 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-accent py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  {lang === 'en' ? '✦ Copy delivered' : '✦ Copy entregue'}
                </span>

                <p className="mb-6 border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                  {activeEyebrow}
                </p>

                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <main className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">{t.otherCases}</p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((caseItem) => (
              <li key={caseItem.id}>
                <Link
                  to={localizePath(`/portfolio/${caseItem.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                      {lang === 'en' && caseItem.clientEn ? caseItem.clientEn : caseItem.client}
                    </p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">
                      {lang === 'en' && caseItem.titleEn ? caseItem.titleEn : caseItem.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* CTA final */}
      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {t.ctaFinalMain}
            <span className="text-amber-accent italic">{t.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function CasePage() {
  const { caseId } = useParams()
  const { lang, localizePath } = useLanguage()
  const caseData = getCaseBySlug(caseId)
  const otherCases = getOtherCases(caseId, 6)
  const t = messages[lang].casePage

  if (!caseData) {
    return <Navigate to={localizePath('/portfolio')} replace />
  }

  if (caseId === 'campanha-cripto') {
    return <CriptotraderCasePage caseData={caseData} />
  }

  if (caseId === 'landing-destaque') {
    return <ParafluCasePage caseData={caseData} />
  }

  if (caseId === 'vagas-remanescentes') {
    return <UlbraMedicinaCasePage caseData={caseData} />
  }

  if (caseId === 'ulbra-pos-psicologia') {
    return <UlbraCasePage caseData={caseData} />
  }

  if (caseId === 'ulbra-transferencia-70') {
    return <UlbraTransferCasePage caseData={caseData} />
  }

  if (caseId === 'ulbra-cartas-venda') {
    return <UlbraCartasCasePage caseData={caseData} />
  }

  if (caseId === 'ulbra-direito-sija') {
    return <UlbraDireitoCasePage caseData={caseData} />
  }

  if (caseId === 'ulbra-saude-tech') {
    return <UlbraSaudeTechCasePage caseData={caseData} />
  }

  if (caseId === 'ultec-escola-empreendedorismo') {
    return <UltecCasePage caseData={caseData} />
  }

  const displayName = (lang === 'en' && caseData.shortTitleEn) ? caseData.shortTitleEn : (caseData.shortTitle || caseData.client)
  const content = getCaseContent(caseId, caseData, lang)

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="mesh-gradient absolute inset-0 pointer-events-none" aria-hidden />

      {/* Above the fold — hero (todos os cases) */}
      <header className="relative z-10 flex min-h-screen flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="absolute left-6 top-32 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-white/50 sm:left-8 xl:left-12">
            <Link to={localizePath('/portfolio')} className="transition-colors hover:text-white">{t.portfolio}</Link>
            <span className="opacity-40">/</span>
            <span>{displayName}</span>
          </p>

          <div className="mt-10 sm:mt-12 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 px-4 text-xs font-medium uppercase tracking-wider text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-accent" />
            {content.pillLabel}
          </div>

          <h1 className="max-w-4xl font-semibold leading-[1.05] tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl">
            {content.heroTitle}
          </h1>

          <div className="mt-12 flex flex-wrap gap-0 border-t border-white/10 pt-8">
            {content.metaStrip.map((item, i) => (
              <div
                key={item.label}
                className={`border-r border-white/10 pr-6 sm:pr-8 mr-6 sm:mr-8 last:border-r-0 last:mr-0 last:pr-0`}
              >
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{item.label}</p>
                <p className={`text-[15px] font-medium ${item.highlight ? 'text-amber-accent' : 'text-white/80'}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60" aria-hidden>
            <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </header>

      {/* 01 — Briefing (todos os cases) */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.briefing}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">01</p>
            </div>
            <div>
              <h2 className="mb-6 font-semibold text-xl leading-snug text-white sm:text-2xl">
                {content.briefingHeading}
              </h2>
              {content.briefingParagraphs.map((p, i) => (
                <p key={i} className={`text-[15px] leading-relaxed text-white/75 ${i === 0 ? 'mb-4' : ''}`}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Copy entregue (todos os cases) */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-accent">{t.copyDelivered}</p>
              <p className="mt-2 text-5xl font-semibold leading-none tracking-tight text-white/[0.06]">02</p>
            </div>
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
                <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-amber-accent/10 blur-2xl" aria-hidden />
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-accent py-1.5 px-4 text-[10px] font-bold uppercase tracking-widest text-black">
                  ✦ {t.copyDelivered}
                </span>
                <p className="mb-6 border-b border-white/10 pb-5 text-[11px] font-medium uppercase tracking-widest text-white/45">
                  {content.copyEyebrow}
                </p>

                <h2 className="mb-3 font-semibold leading-snug text-white text-xl sm:text-2xl">
                  {content.copyHeadline}
                </h2>
                <p className="mb-6 text-base italic leading-relaxed text-white/75">
                  {content.copySub}
                </p>

                {content.copyBlocks && content.copyBlocks.length > 0 ? (
                  <div className="mt-4">
                    {content.copyBlocks.map((block, i) => (
                      <div
                        key={block.label}
                        className={i > 0 ? 'border-t border-white/10 pt-6 mt-6' : ''}
                      >
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-accent">
                          {block.label}
                        </p>
                        <p className="text-[15px] leading-relaxed text-white/75 whitespace-pre-line">
                          {block.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {content.copyParagraphs.map((p, i) => (
                      <p key={i} className="text-[15px] leading-relaxed text-white/75 mb-3 last:mb-6">
                        {p}
                      </p>
                    ))}

                    <ul className="space-y-0 border-t border-white/10">
                      {content.copyList.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-4 border-b border-white/10 py-4 text-[15px] leading-relaxed text-white/75"
                        >
                          <span className="text-amber-accent shrink-0">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <p className="mt-4 text-sm text-white/50">{content.copyNote}</p>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/45">{t.callToAction}</p>
                    <p className="font-semibold text-white text-lg">{content.copyCtaText}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white">
                    {content.copyCtaButton}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros cases */}
      <main className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-widest text-white/50">
            {t.otherCases}
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-4">
            {otherCases.map((c) => (
              <li key={c.id}>
                <Link
                  to={localizePath(`/portfolio/${c.id}`)}
                  className="group flex min-h-[72px] sm:min-h-[80px] items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition-all hover:border-white/20 hover:bg-white/8"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">{lang === 'en' && c.clientEn ? c.clientEn : c.client}</p>
                    <p className="truncate font-semibold text-white transition-colors group-hover:text-amber-accent">
                      {lang === 'en' && c.titleEn ? c.titleEn : c.title}
                    </p>
                  </div>
                  <span className="shrink-0 text-lg text-white/80 transition-colors group-hover:text-amber-accent">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* CTA final */}
      <section className="relative z-10 border-t border-white/10 bg-black py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10 xl:max-w-7xl xl:px-12 2xl:px-16 text-center">
          <p className="mb-8 font-semibold leading-snug text-white text-2xl sm:text-3xl">
            {t.ctaFinalMain}<span className="text-amber-accent italic">{t.ctaFinalItalic}</span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/20 px-10 py-4 text-lg font-semibold text-white transition-all hover:border-white/50 hover:bg-white/30"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
