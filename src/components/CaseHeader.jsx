import { Link } from 'react-router-dom'

const WHATSAPP_URL = 'https://wa.me/5551998655005'

export default function CaseHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/95 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5 lg:px-8"
      aria-label="Navegação do case"
    >
      <Link
        to="/"
        className="flex-shrink-0 text-base font-semibold tracking-tight text-white transition-opacity hover:opacity-90 sm:text-lg"
        aria-label="Thiago Klein - Início"
      >
        Thiago Klein
      </Link>

      <Link
        to="/portfolio"
        className="flex items-center gap-2 text-sm font-medium tracking-wide text-white/70 transition-colors hover:text-white"
      >
        <span aria-hidden>←</span>
        Portfólio
      </Link>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/15 sm:px-5"
      >
        Fale comigo
      </a>
    </header>
  )
}
