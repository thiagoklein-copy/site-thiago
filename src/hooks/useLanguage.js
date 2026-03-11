import { useLocation } from 'react-router-dom'

export function useLanguage() {
  const location = useLocation()
  const { pathname, search, hash } = location

  const isEn =
    pathname === '/en' ||
    pathname === '/en/' ||
    pathname.startsWith('/en/')

  const lang = isEn ? 'en' : 'pt'

  const localizePath = (path) => {
    if (!path.startsWith('/')) return path

    if (isEn) {
      if (path === '/') return '/en'
      if (path.startsWith('/en/')) return path
      // About: rota em PT é /sobre, em EN é /en/about
      if (path === '/sobre') return '/en/about'
      return `/en${path}`
    }

    // PT: garantir que não mantenha /en ao gerar links padrão
    if (path === '/en' || path === '/en/') return '/'
    if (path.startsWith('/en/')) {
      const stripped = path.slice(3)
      if (stripped === 'about') return '/sobre'
      return stripped === '' ? '/' : stripped
    }

    return path
  }

  const currentFullPath = pathname + search + hash

  return {
    lang,
    isEn,
    pathname,
    search,
    hash,
    currentFullPath,
    localizePath,
  }
}

