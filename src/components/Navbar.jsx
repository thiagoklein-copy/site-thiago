import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, isEn, localizePath, search, hash } = useLanguage()
  const t = messages[lang]
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: localizePath('/'), label: t.navbar.home },
    { href: localizePath('/sobre'), label: t.navbar.about },
    { href: localizePath('/portfolio'), label: t.navbar.portfolio },
    { href: localizePath('/blog'), label: t.navbar.newsletter },
  ]

  const handleSwitchToEn = () => {
    if (isEn) return
    const { pathname } = location
    const basePath = pathname === '/' ? '/en' : `/en${pathname}`
    navigate(basePath + search + hash, { replace: true })
  }

  const handleSwitchToPt = () => {
    if (!isEn) return
    const { pathname } = location
    if (pathname === '/en' || pathname === '/en/') {
      navigate('/' + search + hash, { replace: true })
      return
    }
    const stripped = pathname.startsWith('/en') ? pathname.slice(3) : pathname
    const target = stripped === '' ? '/' : stripped
    navigate(target + search + hash, { replace: true })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
      <nav
        className="mx-auto flex max-w-6xl items-center rounded-2xl bg-white/5 px-5 py-3 backdrop-blur-xl sm:px-6 sm:py-4 lg:px-8 lg:py-4"
        aria-label="Navegação principal"
      >
        {/* Esquerda: nome */}
        <Link
          to="/"
          className="flex-shrink-0 whitespace-nowrap text-base font-semibold tracking-tight text-white transition-opacity hover:opacity-90 sm:text-xl"
          aria-label="Thiago Klein - Início"
        >
          Thiago Klein
        </Link>

        {/* Centro: links + badge (desktop) */}
        <ul className="hidden flex-1 items-center justify-center gap-6 sm:flex sm:gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive = location.pathname === href || (href !== '/' && location.pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  to={href}
                  className={`text-sm font-medium transition-colors sm:text-base ${
                    isActive ? 'text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
          <li>
            <div className="inline-flex items-center rounded-full bg-white/10 p-0.5">
              <button
                type="button"
                onClick={handleSwitchToPt}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  !isEn ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                PT
              </button>
              <button
                type="button"
                onClick={handleSwitchToEn}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  isEn ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </li>
          <li className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <span className="radar-dot h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
            <span className="text-sm font-medium text-white/95">{t.navbar.availability}</span>
          </li>
        </ul>

        {/* Direita: botão (desktop) */}
        <div className="hidden flex-shrink-0 sm:block">
          <a
            href="https://wa.me/5551998655005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/15 sm:px-5"
          >
            <span className="text-base">✦</span>
            {t.navbar.cta}
          </a>
        </div>

        {/* Mobile: badge + hamburger */}
        <div className="flex flex-1 items-center justify-end gap-3 sm:hidden">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="radar-dot h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
              <span className="text-xs font-medium text-white/95">{t.navbar.availability}</span>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mx-4 mt-2 rounded-2xl bg-black/95 px-4 py-4 backdrop-blur-xl sm:mx-6 sm:max-w-md">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => {
              const isActive = location.pathname === href || (href !== '/' && location.pathname.startsWith(href))
              return (
                <li key={href}>
                  <Link
                    to={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-base font-medium ${
                      isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
            <li className="flex items-center justify-between px-4 py-3">
              <div className="inline-flex items-center rounded-full bg-white/10 p-0.5">
                <button
                  type="button"
                  onClick={() => {
                    handleSwitchToPt()
                    setMenuOpen(false)
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                    !isEn ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  PT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSwitchToEn()
                    setMenuOpen(false)
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                    isEn ? 'bg-white text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                <span className="radar-dot h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                <span className="text-xs font-medium text-white/95">{t.navbar.availability}</span>
              </div>
            </li>
            <li>
              <a
                href="https://wa.me/5551998655005"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-base font-medium text-white hover:bg-white/15"
              >
                <span className="text-base">✦</span>
                {t.navbar.cta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
