import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Rolagem para o topo da página sempre que a rota muda.
 * Garante que o usuário sempre entre na página pelo topo.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
