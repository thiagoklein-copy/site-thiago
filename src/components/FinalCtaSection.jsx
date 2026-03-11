import { useEffect, useRef, useState } from 'react'
import { HERO_VIDEO_SRC } from './HeroSection'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

const WHATSAPP_URL = 'https://wa.me/5551998655005'

export default function FinalCtaSection() {
  const { lang } = useLanguage()
  const t = messages[lang].home.finalCta
  const [videoError, setVideoError] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef(null)
  const srcSetRef = useRef(false)

  useEffect(() => {
    if (videoError || srcSetRef.current) return
    const video = videoRef.current
    if (!video) return
    video.src = HERO_VIDEO_SRC
    video.preload = 'auto'
    srcSetRef.current = true
  }, [videoError])

  const handleVideoCanPlay = () => setVideoReady(true)
  const handleVideoError = () => setVideoError(true)

  return (
    <section className="relative overflow-hidden bg-black pt-24 pb-14 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
      {/* Background video - mesmo comportamento do Hero */}
      {!videoError && (
        <div className="hero-video-wrap bg-black" aria-hidden>
          <video
            ref={videoRef}
            muted
            loop
            autoPlay
            playsInline
            className={`final-cta-video absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            onCanPlay={handleVideoCanPlay}
            onError={handleVideoError}
          />
        </div>
      )}

      {/* Mesh gradient + fades, igual ao hero (topo e base) */}
      <div className="mesh-gradient pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      {/* Esfumaçado no topo para suavizar a transição do fundo preto anterior para o vídeo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32 sm:h-40 md:h-48 bg-gradient-to-b from-black via-black/70 to-transparent"
        aria-hidden
      />
      {/* Fade na base, como no hero */}
      <div
        className="hero-fade-to-black pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-32 sm:h-40 md:h-48"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {t.heading}
        </h2>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow mt-8 inline-flex items-center justify-center rounded-2xl border border-white/50 bg-white/20 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition-all hover:border-white hover:bg-white/30 sm:text-lg"
        >
          {t.cta}
        </a>
      </div>
    </section>
  )
}

