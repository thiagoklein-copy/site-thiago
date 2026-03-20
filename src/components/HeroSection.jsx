import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LogoMarquee from './LogoMarquee'

function isExternal(href) {
  return href?.startsWith('http') || href?.startsWith('mailto:') || href?.startsWith('tel:')
}
export const HERO_VIDEO_SRC =
  'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/14684159_3840_2160_30fps.mp4'

export default function HeroSection({
  badge = 'Crafting Unique Brand Identities',
  title = 'Branding that you need Indeed',
  titleHighlight,
  subtitle = 'Elevate your brand with custom identity and package design. Showcase your story through bold visuals and strategic design solutions.',
  primaryCta = 'Get Started Now',
  primaryCtaHref = '#',
  secondaryCta = 'See Projects',
  secondaryCtaHref = '#projects',
  scrollHintText = 'Conheça meus projetos',
  scrollHintSubtext = '',
}) {
  const PrimaryCtaTag = isExternal(primaryCtaHref) ? 'a' : Link
  const SecondaryCtaTag = isExternal(secondaryCtaHref) ? 'a' : Link
  const primaryProps = isExternal(primaryCtaHref) ? { href: primaryCtaHref, target: '_blank', rel: 'noopener noreferrer' } : { to: primaryCtaHref }
  const secondaryProps = isExternal(secondaryCtaHref) ? { href: secondaryCtaHref, target: '_blank', rel: 'noopener noreferrer' } : { to: secondaryCtaHref }

  const [videoError, setVideoError] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef(null)
  const srcSetRef = useRef(false)

  // Carrega o vídeo só após o hero estar na tela, liberando a primeira pintura da página
  useEffect(() => {
    if (videoError || srcSetRef.current) return
    const video = videoRef.current
    if (!video) return

    // Garantia explícita para mobile (iOS Safari / Chrome Android)
    video.autoplay = true
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.controls = false
    video.removeAttribute('controls')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')
    video.preload = 'auto'

    video.src = HERO_VIDEO_SRC

    // Tenta iniciar imediatamente (sem depender apenas de handlers)
    try {
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } catch {
      // noop
    }

    srcSetRef.current = true
  }, [videoError])

  const handleVideoCanPlay = () => setVideoReady(true)
  const handleVideoError = () => setVideoError(true)

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden px-4 pt-28 pb-32 sm:px-6 sm:pt-32 sm:pb-36 lg:px-8 lg:pt-40 lg:pb-40"
      aria-labelledby="hero-title"
    >
      {/* Background video - carregamento adiado; fundo preto até o vídeo estar pronto */}
      {!videoError && (
        <div className="hero-video-wrap bg-black" aria-hidden>
          <video
            ref={videoRef}
            muted
            loop
            autoPlay
            playsInline
            webkit-playsinline="true"
            preload="auto"
            controls={false}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            style={{ pointerEvents: 'none' }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
            onCanPlay={handleVideoCanPlay}
            onPlaying={handleVideoCanPlay}
            onError={handleVideoError}
          />
        </div>
      )}

      {/* Mesh gradient overlay */}
      <div className="mesh-gradient pointer-events-none absolute inset-0 z-[1]" />

      {/* Fade para preto na base do hero – suaviza o corte com a próxima seção */}
      <div
        className="hero-fade-to-black pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 sm:h-52 md:h-64 lg:h-80"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-center">
        {/* Pill badge */}
        <div
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm sm:mb-10 sm:px-5 sm:py-2.5 animate-fade-in"
          role="status"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
          <span className="text-sm font-medium text-white/95 sm:text-base">
            {badge}
          </span>
        </div>

        {/* H1 – uma só frase: "Poucos" começa na mesma linha em que termina "bonito." */}
        <h1
          id="hero-title"
          className="hero-headline-mobile mb-6 text-3xl font-semibold leading-none tracking-tight text-white sm:mb-8 sm:leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          {titleHighlight ? (
            <>
              <span className="inline">{title}</span>
              <span className="inline sm:hidden" aria-hidden="true">{"\u00A0"}</span>
              <span className="hidden sm:inline" aria-hidden="true"> </span>
              <span className="hero-headline-part2 inline text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                {titleHighlight}
              </span>
            </>
          ) : (
            title
          )}
        </h1>

        {/* Subtext */}
        <p className="mb-10 max-w-2xl text-base font-medium leading-relaxed text-white/95 sm:mb-12 sm:text-lg md:text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </p>

        {/* CTA buttons – um embaixo do outro no mobile, lado a lado no desktop; centralizados */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <PrimaryCtaTag
            {...primaryProps}
            className="btn-hero-primary group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-base text-white transition-all hover:opacity-100 sm:px-12 sm:py-4.5 sm:text-lg"
          >
            <span className="relative z-10">{primaryCta}</span>
          </PrimaryCtaTag>
          <SecondaryCtaTag
            {...secondaryProps}
            className="btn-hero-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-medium text-white transition-all hover:opacity-95 sm:px-10 sm:py-4"
          >
            {secondaryCta}
          </SecondaryCtaTag>
        </div>

        {/* Scroll hint */}
        <p className="mt-16 flex flex-col items-center gap-3 text-sm text-white/50 sm:mt-20">
          <span>{scrollHintText}</span>
          <svg
            className="h-5 w-5 text-white/70 scroll-arrow-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4 4 4-4" />
          </svg>
        </p>
      </div>

      {/* Faixa de logos em loop */}
      <LogoMarquee />
    </section>
  )
}
