import { createFileRoute } from '@tanstack/react-router'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BookingCTA from '@/components/home/BookingCTA'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <BookingCTA />
    </>
  )
}
