import { useState, useMemo } from 'react'
import Footer from '../components/Footer'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

const FILTER_IDS = ['all', 'copywriting', 'marketing', 'comportamento', 'ia']

const POSTS = [
  {
    id: 'voce-precisa-de-um-inimigo',
    title: 'Você precisa de um inimigo',
    excerpt:
      'A tática mais poderosa (e perigosa) para criar conexão, lealdade e vender muito. A gente vive num mundo barulhento... Se você não escolher um lado, se não definir contra o que (ou quem) você luta, sua voz some. O inimigo comum é uma das ferramentas mais antigas e poderosas do copywriting e do storytelling. E, na maioria das vezes, ele não é uma pessoa.',
    categoryTags: ['marketing', 'copywriting'],
    image: '/voce-precisa-inimigo.png',
    url: 'https://thiagoklein.substack.com/p/voce-precisa-de-um-inimigo',
  },
  {
    id: 'guia-historias-chatas',
    title: 'Guia: como parar de contar histórias chatas?',
    excerpt:
      'O segredo dos maiores roteiristas do mundo para criar tensão que conecta, prende e vende. Uma história não é uma sequência de eventos. É uma cadeia de causa e efeito. Aprendi isso com os roteiristas de South Park, considerada uma das melhores e mais inteligentes animações do mundo.',
    categoryTags: ['marketing', 'copywriting'],
    image: '/guia-historias-chatas.png',
    url: 'https://thiagoklein.substack.com/p/guia-como-parar-de-contar-historias',
  },
  {
    id: 'como-ser-original',
    title: 'Como ser original se tudo já foi dito?',
    excerpt:
      'A resposta que separa quem cria conteúdo de quem só repete o que já existe. A primeira coisa que a gente precisa entender é: originalidade pura não existe. É mito. Qualquer texto é escrito a partir de outros textos. Querer criar algo 100% do zero é a receita pro bloqueio eterno.',
    categoryTags: ['marketing'],
    image: '/como-ser-original.png',
    url: 'https://thiagoklein.substack.com/p/como-ser-original-se-tudo-ja-foi',
  },
  {
    id: 'ninguem-copy-ciencia',
    title: 'Ninguém foi demitido por usar copywriting baseado na ciência',
    excerpt:
      'Fiquei 32 horas nas últimas semanas estudando dicas de copywriting baseadas na ciência. Estas foram as melhores descobertas. Eu passei muito tempo em uma angústia que talvez você conheça. A de ler dezenas de dicas de marketing e, no fundo, sentir que tudo não passava de um grande “confia na call”. O que realmente funciona?',
    categoryTags: ['comportamento', 'marketing', 'copywriting'],
    image: '/ninguem-copy-ciencia.png',
    url: 'https://thiagoklein.substack.com/p/ninguem-foi-demitido-por-usar-copywriting',
  },
  {
    id: 'voce-precisa-ficar-entediado',
    title: 'Você precisa ficar entediado',
    excerpt:
      'O scroll infinito está matando suas melhores ideias. Os 30 segundos no elevador. O sinal fechado que não abre nunca. A fila do caixa que não anda. Eu era mestre em preencher cada um desses míseros segundos. Celular na mão, rolo o feed, abro um app, vejo uma notícia… Qualquer coisa pra não ficar parado. Pra não ficar entediado. Eu achava que isso era ser produtivo. Que estava “otimizando” meu tempo. Que bela mentira.',
    categoryTags: ['marketing', 'comportamento'],
    image: '/voce-precisa-ficar-entediado.png',
    url: 'https://thiagoklein.substack.com',
  },
  {
    id: 'ciencia-conversas',
    title: 'A ciência por trás das conversas que conectam',
    excerpt:
      'Uma lição do The New York Times e de um cirurgião de câncer sobre por que seu cliente não te entende. Por muito tempo, eu achei que o problema estava nas palavras que eu usava. Até que me deparei com uma palestra de Charles Duhigg, ex-repórter do New York Times. Ele explicou que o problema não está nas palavras. Está na conversa que a gente pensa que está tendo.',
    categoryTags: ['marketing', 'comportamento', 'copywriting'],
    image: '/ciencia-conversas.png',
    url: 'https://thiagoklein.substack.com/p/a-ciencia-por-tras-das-conversas',
  },
]

export default function Blog() {
  const { lang } = useLanguage()
  const t = messages[lang].newsletter
  const [filter, setFilter] = useState('all')

  const filteredPosts = useMemo(() => {
    if (filter === 'all') return POSTS
    return POSTS.filter((post) => post.categoryTags.includes(filter))
  }, [filter])

  return (
    <main className="relative min-h-screen bg-black">
      <div className="mesh-gradient pointer-events-none absolute inset-0" aria-hidden />

      <section className="relative z-10 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {t.heading}
            </h1>
            <p className="mt-4 text-base text-white/75 sm:text-lg">
              {t.subtitle}
            </p>
          </div>

          {/* Filtros */}
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:mt-12">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
              {t.filterLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {FILTER_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                    filter === id
                      ? 'bg-white text-black border-white'
                      : 'border-white/15 bg-white/[0.02] text-white/70 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {t.filters[id]}
                </button>
              ))}
            </div>
          </div>

          {/* Cards de artigos */}
          <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-2">
            {filteredPosts.map((post) => {
              const content = t.posts[post.id] || {}
              return (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.06]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/10 sm:aspect-[16/9]">
                    <img
                      src={post.image}
                      alt=""
                      className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                        post.id === 'como-ser-original'
                          ? 'object-[center_55%]'
                          : post.id === 'guia-historias-chatas'
                          ? 'object-[center_65%]'
                          : post.id === 'ninguem-copy-ciencia'
                          ? 'object-[center_60%]'
                          : 'object-[center_30%]'
                      }`}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1200'
                      }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 to-transparent" />
                    {post.date && (
                      <span className="pointer-events-none absolute bottom-4 left-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
                        {post.date}
                      </span>
                    )}
                  </div>
                  <div className="flex min-h-[140px] flex-col px-5 pt-5 pb-3 sm:min-h-[160px] sm:px-6 sm:pt-6 sm:pb-4">
                    <div className="flex flex-1 flex-col gap-3">
                      <h2 className="text-2xl font-semibold leading-snug text-white sm:text-3xl">
                        {content.title || post.id}
                      </h2>
                      <p className="text-base leading-relaxed text-white/80 sm:text-[15px]">
                        {content.excerpt || ''}
                      </p>
                    </div>
                    <div
                      className={`flex justify-start ${
                        post.id === 'voce-precisa-de-um-inimigo' || post.id === 'guia-historias-chatas'
                          ? 'mt-9 sm:mt-11'
                          : 'mt-8 sm:mt-10'
                      }`}
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-accent">
                        {t.readMore}
                      </span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA final — subtexto */}
      <section className="relative z-10 border-t border-white/10 bg-black py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-accent">
            {t.ctaEyebrow}
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {t.ctaHeading}
          </h2>
          <a
            href="https://thiagoklein.substack.com/?utm_campaign=profile_chips"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow mt-8 inline-flex items-center justify-center rounded-2xl border border-white/50 bg-white/20 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:border-white hover:bg-white/30 sm:text-lg"
          >
            {t.ctaButton}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
