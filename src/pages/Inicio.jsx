import HeroSection from '../components/HeroSection'
import RevenueHighlight from '../components/RevenueHighlight'
import ProjectsSection from '../components/ProjectsSection'
import AboutSection from '../components/AboutSection'
import CertifiedSection from '../components/CertifiedSection'
import ProcessSection from '../components/ProcessSection'
import ServicesSection from '../components/ServicesSection'
import SkillsMarquee from '../components/SkillsMarquee'
import TestimonialsSection from '../components/TestimonialsSection'
import FaqSection from '../components/FaqSection'
import FinalCtaSection from '../components/FinalCtaSection'
import Footer from '../components/Footer'
import { useLanguage } from '../hooks/useLanguage'
import { messages } from '../i18n/messages'

export default function Inicio() {
  const { lang, localizePath } = useLanguage()
  const t = messages[lang].home

  return (
    <main>
      <HeroSection
        badge={t.badge}
        title={t.title}
        titleHighlight={t.titleHighlight}
        subtitle={t.subtitle}
        primaryCta={t.primaryCta}
        primaryCtaHref="https://wa.me/5551998655005"
        secondaryCta={t.secondaryCta}
        secondaryCtaHref={localizePath('/portfolio')}
        scrollHintText={t.scrollHint}
        scrollHintSubtext=""
      />
      <RevenueHighlight />
      <AboutSection />
      <CertifiedSection />
      <ServicesSection />
      <SkillsMarquee />
      <ProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <Footer />
    </main>
  )
}
