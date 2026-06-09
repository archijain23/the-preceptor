import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'

const testimonials = [
  { name: 'Amelia R.', country: 'New York, USA', service: 'Birth Chart Reading', text: "The most precise reading I've ever had. It felt like sitting with a wise friend who could see decades ahead. I left with a map, not just a feeling.", rating: 5 },
  { name: 'Daniel K.', country: 'London, UK', service: 'Career Guidance', text: "Calm, confident, and breathtakingly accurate. The Preceptor gave me a map I didn't know I needed — my career changed direction within three months.", rating: 5 },
  { name: 'Priya S.', country: 'Toronto, CA', service: 'Kundli Analysis', text: 'A truly luxurious experience. Insightful, grounded and deeply transformative. Worth every moment.', rating: 5 },
  { name: 'Marcus T.', country: 'Los Angeles, USA', service: 'Relationship Consultation', text: "I've worked with multiple astrologers. None compare. The clarity I received reshaped how I see every relationship in my life.", rating: 5 },
  { name: 'Lina M.', country: 'Berlin, DE', service: 'Tarot Reading', text: 'Every word landed. The session was poetic, precise and quietly powerful. I have returned three times.', rating: 5 },
  { name: 'Rohan V.', country: 'Mumbai, IN', service: 'Spiritual Consultation', text: 'Finally someone who could bridge the ancient and the modern with such grace. The remedies have been genuinely life-changing.', rating: 5 },
]

const eyebrow = { fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

export default function TestimonialsPage() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(c => (c + 1) % testimonials.length), 6000)
    return () => clearInterval(t)
  }, [])

  const t = testimonials[active]

  return (
    <section style={{ padding: 'clamp(6rem, 12vw, 10rem) 1.5rem', background: 'oklch(0.08 0.022 272)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Reveal><span style={eyebrow}>Client Stories</span></Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', lineHeight: 1.1, marginTop: '1rem' }}>
              Words from those <em style={{ color: 'oklch(0.82 0.12 85)' }}>who have walked this path.</em>
            </h1>
          </Reveal>
        </div>

        <div style={{ maxWidth: '48rem', margin: '0 auto 4rem' }}>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              style={{ background: 'oklch(0.12 0.022 272 / 0.7)', border: '1px solid oklch(0.82 0.12 85 / 0.2)', borderRadius: '1.5rem', padding: 'clamp(2rem, 5vw, 3.5rem)', textAlign: 'center', backdropFilter: 'blur(16px)' }}>
              <Quote size={28} style={{ color: 'oklch(0.82 0.12 85)', opacity: 0.5, margin: '0 auto 1.5rem' }} />
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontStyle: 'italic', color: 'oklch(0.9 0.01 85)', lineHeight: 1.7, marginBottom: '1.5rem' }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={13} style={{ color: 'oklch(0.82 0.12 85)', fill: 'oklch(0.82 0.12 85)' }} />)}
              </div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'oklch(0.96 0.01 85)' }}>{t.name}</p>
              <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(0.55 0.02 272)', marginTop: '0.25rem' }}>{t.country} &mdash; {t.service}</p>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={() => setActive(c => (c - 1 + testimonials.length) % testimonials.length)} aria-label="Previous" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '1px solid oklch(0.82 0.12 85 / 0.3)', background: 'transparent', color: 'oklch(0.82 0.12 85)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowLeft size={15} /></button>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} style={{ height: '0.5rem', width: i === active ? '1.5rem' : '0.5rem', borderRadius: '9999px', background: i === active ? 'oklch(0.82 0.12 85)' : 'oklch(0.82 0.12 85 / 0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
            <button onClick={() => setActive(c => (c + 1) % testimonials.length)} aria-label="Next" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '1px solid oklch(0.82 0.12 85 / 0.3)', background: 'transparent', color: 'oklch(0.82 0.12 85)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowRight size={15} /></button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1.25rem' }}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <div style={{ background: 'oklch(0.12 0.022 272 / 0.5)', border: '1px solid oklch(0.82 0.12 85 / 0.12)', borderRadius: '1rem', padding: '1.75rem', backdropFilter: 'blur(12px)' }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={11} style={{ color: 'oklch(0.82 0.12 85)', fill: 'oklch(0.82 0.12 85)' }} />)}
                </div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', fontStyle: 'italic', color: 'oklch(0.8 0.01 85)', lineHeight: 1.6, marginBottom: '1.25rem' }}>&ldquo;{t.text}&rdquo;</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', color: 'oklch(0.96 0.01 85)' }}>{t.name}</p>
                <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'oklch(0.45 0.02 272)', marginTop: '0.2rem' }}>{t.service}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
