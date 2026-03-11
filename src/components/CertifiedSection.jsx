import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

export default function CertifiedSection() {
  const { lang } = useLanguage()
  const t = messages[lang].home.certified
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(true)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.4, rootMargin: '-15% 0px 0px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="certificado"
      className="relative border-t border-white/10 bg-black py-16 sm:py-20 lg:py-24"
      aria-labelledby="certificado-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:items-stretch">
          {/* Coluna esquerda: imagem em retângulo com bordas bem arredondadas */}
          <div
            className={`certified-img-wrap relative min-h-[220px] w-full overflow-hidden rounded-3xl bg-black/80 lg:min-h-0 lg:h-full [border:none]`}
            data-visible={isVisible}
          >
            {imgLoaded ? (
              <div className="certified-img-crop h-full w-full">
                <img
                  src="/certificado-aaa.png"
                  alt={t.imageAlt}
                  className="h-full w-full object-cover object-center border-0 outline-none"
                  onError={() => setImgLoaded(false)}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
                <span className="text-sm font-medium text-white/40">{t.imageFallback}</span>
              </div>
            )}
          </div>

          {/* Coluna direita: só título, sem ícone e sem borda */}
          <div
            className={`certified-text-wrap flex flex-col justify-center rounded-3xl bg-white/[0.03] px-6 py-8 backdrop-blur-sm sm:px-8 sm:py-10 lg:px-10 lg:py-12`}
            data-visible={isVisible}
          >
            <h2 id="certificado-heading" className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight">
              <span className="text-amber-accent">{t.titleHighlight}</span>{t.titleRest}
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
