import { useState } from 'react'

/** URLs dos logos no Supabase (bucket "video portfolio"). size: sm | md | lg | xl | xxl */
const LOGO_URLS = [
  { src: 'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/dell.png.png', alt: 'Dell', size: 'md' },
  { src: 'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/gerdau.png.png', alt: 'Gerdau' },
  { src: 'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/ibasa.png.png', alt: 'IBASA', size: 'md' },
  { src: 'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/petite-jolie.png.png', alt: 'Petite Jolie', size: 'lg' },
  { src: 'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/randon.png.png', alt: 'Randon' },
  { src: 'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/romanzza.png.png', alt: 'Romanzza', size: 'md' },
  { src: 'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/ulbra.png.png', alt: 'ULBRA', size: 'md' },
  { src: 'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/weg.png.png', alt: 'WEG' },
  { src: 'https://xvudbpftftplzmqofcwj.supabase.co/storage/v1/object/public/video%20portfolio/zenklub.png.png', alt: 'Zenklub', size: 'xxl', tightGap: true },
]

const SIZE_CLASSES = {
  sm: 'h-8 max-w-[120px] sm:h-10 sm:max-w-[140px]',
  md: 'h-10 max-w-[160px] sm:h-12 sm:max-w-[200px]',
  lg: 'h-12 max-w-[200px] sm:h-14 sm:max-w-[260px]',
  xl: 'h-14 max-w-[260px] sm:h-16 sm:max-w-[340px] md:h-[4.5rem] md:max-w-[380px]',
  xxl: 'h-28 max-w-[520px] sm:h-32 sm:max-w-[680px] md:h-[9rem] md:max-w-[760px]',
}

function LogoItem({ src, alt, size = 'sm', tightGap = false }) {
  const [failed, setFailed] = useState(false)
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.sm
  const gapClass = tightGap ? 'px-2 sm:px-3' : 'px-6 sm:px-8'

  return (
    <span className={`flex shrink-0 items-center justify-center ${gapClass}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          className={`logo-marquee-img w-auto object-contain object-center opacity-80 transition-opacity hover:opacity-100 ${sizeClass}`}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-sm font-medium text-white/80 sm:text-base">
          {alt}
        </span>
      )}
    </span>
  )
}

export default function LogoMarquee() {
  const list = [...LOGO_URLS, ...LOGO_URLS]

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-10 flex justify-center py-6"
      aria-hidden
    >
      <div className="logo-marquee-viewport relative w-full max-w-4xl overflow-hidden md:max-w-5xl">
        <div className="logo-marquee-track flex items-center">
          {list.map((logo, i) => (
            <LogoItem key={`${logo.alt}-${i}`} src={logo.src} alt={logo.alt} size={logo.size} tightGap={logo.tightGap} />
          ))}
        </div>
      </div>
    </div>
  )
}
