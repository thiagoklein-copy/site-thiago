import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium text-white transition-colors hover:text-white/90"
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        <span
          className={`shrink-0 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-5 pr-8 text-base leading-relaxed text-white/75">{item.answer}</p>
      </div>
    </div>
  )
}

export default function FaqSection() {
  const { lang } = useLanguage()
  const t = messages[lang].home.faq
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section
      id="faq"
      className="relative border-t border-white/10 pt-12 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.heading}
            </h2>
            <p className="mt-4 max-w-md text-base text-white/70 sm:text-lg">
              {t.subheading}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 backdrop-blur-sm sm:px-6">
            {t.items.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
