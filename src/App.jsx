import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import Inicio from './pages/Inicio'
import Sobre from './pages/Sobre'
import Portfolio from './pages/Portfolio'
import CasePage from './pages/CasePage'
import Blog from './pages/Blog'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/en" element={<Inicio />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/en/about" element={<Sobre />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/en/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:caseId" element={<CasePage />} />
        <Route path="/en/portfolio/:caseId" element={<CasePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/en/blog" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
