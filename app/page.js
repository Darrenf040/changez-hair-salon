import Link from 'next/link'
import HeroCarousel from './components/HeroCarousel'
import ServiceTabs from './components/ServiceTabs'
import StylistsSection from './components/StylistsSection'
import TestimonialsSection from './components/TestimonialsSection'
import InstagramFeed from './components/InstagramFeed'

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <ServiceTabs />
      <StylistsSection />
      <TestimonialsSection />
      <InstagramFeed />
    </div>
  )
} 