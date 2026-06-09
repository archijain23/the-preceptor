import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export const Route = createFileRoute('/testimonials')({
  head: () => ({ meta: [{ title: 'Testimonials — The Preceptor' }] }),
  component: TestimonialsPage,
})

const testimonials = [
  { name: 'Amelia R.', role: 'Entrepreneur', country: 'New York, USA', service: 'Birth Chart Reading', text: 'The most precise reading I have ever had. It felt like sitting with a wise friend who could see decades ahead. The clarity I received was unlike anything I expected.', rating: 5 },
  { name: 'Daniel K.', role: 'Creative Director', country: 'London, UK', service: 'Career Guidance', text: 'Calm, confident, and breathtakingly accurate. The Preceptor gave me a map I did not know I needed. I restructured my entire business within three months.', rating: 5 },
  { name: 'Priya S.', role: 'Physician', country: 'Toronto, CA', service: 'Relationship Consultation', text: 'A truly luxurious experience. Insightful, grounded and deeply transformative. I have referred half of my friends.', rating: 5 },
  { name: 'Marcus T.', role: 'Venture Partner', country: 'Los Angeles, USA', service: 'Kundli Analysis', text: 'The clarity I received reshaped my next career move and confirmed the timing I had been uncertain about for two years.', rating: 5 },
  { name: 'Lina M.', role: 'Author', country: 'Berlin, DE', service: 'Tarot Reading', text: 'Every word landed. The session was poetic, precise and quietly powerful.', rating: 5 },
  { name: 'Yuki T.', role: 'Product Designer', country: 'Tokyo, JP', service: 'Spiritual Consultation', text: 'The Preceptor helped me see patterns I had been blind to for a decade. The remedies were simple, elegant, and effective.', rating: 5 },
  { name: 'Sofia L.', role: 'Therapist', country: 'Barcelona, ES', service: 'Birth Chart Reading', text: 'I booked out of curiosity. I left with a completely different understanding of my path. A rare and gifted practitioner.', rating: 5 },
  { name: 'James W.', role: 'Architect', country: 'Sydney, AU', service: 'Career Guidance', text: 'Precise, professional, and deeply kind. The session gave me the confidence to make a decision I had been delaying for three years.', rating: 5 },
]

const eyebrow = { fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }

function TestimonialsPage() {
  return (
    <section style={{ padding: 'clamp(6rem, 12vw, 10rem) 1.5rem', background: 'oklch(0.08 0.022 272)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={eyebrow}>Client Stories</span>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', lineHeight: 1.1, marginTop: '1rem' }}>
              Trust earned, <em style={{ color: 'oklch(0.82 0.12 85)' }}>one consultation at a time.</em>
            </h1>
            <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '1.1rem', color: 'oklch(0.6 0.02 272)', marginTop: '1rem' }}>Clients from 47 countries.</p>
          </motion.div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(380px, 100%), 1fr))', gap: '1.25rem' }}>
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              style={{ background: 'oklch(0.12 0.022 272 / 0.7)', border: '1px solid oklch(0.82 0.12 85 / 0.18)', borderRadius: '1.25rem', padding: '2.25rem', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Quote size={22} style={{ color: 'oklch(0.82 0.12 85)', opacity: 0.45 }} />
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.15rem', fontStyle: 'italic', color: 'oklch(0.9 0.01 85)', lineHeight: 1.75, flex: 1 }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={12} style={{ color: 'oklch(0.82 0.12 85)', fill: 'oklch(0.82 0.12 85)' }} />)}
              </div>
              <div style={{ paddingTop: '0.75rem', borderTop: '1px solid oklch(0.82 0.12 85 / 0.1)' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: 'oklch(0.96 0.01 85)' }}>{t.name}</p>
                <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.7rem', color: 'oklch(0.5 0.02 272)', marginTop: '0.2rem' }}>{t.role} · {t.country}</p>
                <p style={{ ...eyebrow, marginTop: '0.4rem', display: 'block' }}>{t.service}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
