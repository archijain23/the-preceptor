import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Star, Briefcase, Heart, Moon, Sparkles, BookOpen, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/services')({
  head: () => ({ meta: [{ title: 'Services — The Preceptor' }] }),
  component: ServicesPage,
})

const services = [
  { icon: Star, title: 'Birth Chart Reading', desc: 'A cinematic decode of your natal sky — purpose, gifts, and life arc. Delivered as a 60-minute private video session with a written summary.', duration: '60 min', ideal: 'Ideal for first-time seekers and those at major life crossroads.' },
  { icon: Briefcase, title: 'Career Guidance', desc: 'Strategic timing and direction aligned with your dharma and professional ambition.', duration: '60 min', ideal: 'Ideal for founders, executives, and career transitions.' },
  { icon: Heart, title: 'Relationship Consultation', desc: 'Synastry and composite chart analysis for love, family, and key partnerships.', duration: '60 min', ideal: 'Ideal for couples, those seeking partnership, or navigating family dynamics.' },
  { icon: Moon, title: 'Tarot Reading', desc: 'Intuitive symbolic readings for clarity at decisive personal crossroads.', duration: '45 min', ideal: 'Ideal for those seeking a second perspective on a specific situation.' },
  { icon: Sparkles, title: 'Spiritual Consultation', desc: 'Personal practices, daily rituals, and Vedic remedies for inner alignment.', duration: '60 min', ideal: 'Ideal for those on a conscious spiritual path seeking structured guidance.' },
  { icon: BookOpen, title: 'Kundli Analysis', desc: 'Deep Vedic chart analysis with predictive timelines, dasha periods, and written report.', duration: '90 min', ideal: 'Ideal for those who want the most comprehensive session available.' },
]

const eyebrow = { fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }

function ServicesPage() {
  return (
    <section style={{ padding: 'clamp(6rem, 12vw, 10rem) 1.5rem', background: 'oklch(0.08 0.022 272)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={eyebrow}>What We Offer</span>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', lineHeight: 1.1, marginTop: '1rem' }}>Every session,{' '}<em style={{ color: 'oklch(0.82 0.12 85)' }}>crafted for you.</em></h1>
            <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '1.05rem', color: 'oklch(0.6 0.02 272)', marginTop: '1.25rem', maxWidth: '36rem', margin: '1.25rem auto 0', lineHeight: 1.7 }}>Each offering is a focused, private session — designed around your story, your questions, your moment.</p>
          </motion.div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                style={{ background: 'oklch(0.12 0.022 272 / 0.6)', border: '1px solid oklch(0.82 0.12 85 / 0.15)', borderRadius: '1.25rem', padding: 'clamp(1.5rem, 3vw, 2.5rem)', backdropFilter: 'blur(12px)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1.5rem 2rem', alignItems: 'center' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'oklch(0.82 0.12 85 / 0.1)', border: '1px solid oklch(0.82 0.12 85 / 0.25)', flexShrink: 0 }}>
                  <Icon size={18} style={{ color: 'oklch(0.82 0.12 85)' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: 'oklch(0.96 0.01 85)', fontWeight: 500 }}>{s.title}</h3>
                    <span style={{ ...eyebrow, opacity: 1 }}>{s.duration}</span>
                  </div>
                  <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', color: 'oklch(0.6 0.02 272)', lineHeight: 1.7, marginBottom: '0.5rem' }}>{s.desc}</p>
                  <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', color: 'oklch(0.82 0.12 85)', opacity: 0.7 }}>{s.ideal}</p>
                </div>
                <Link to="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid oklch(0.82 0.12 85 / 0.4)', color: 'oklch(0.82 0.12 85)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.65rem 1.25rem', borderRadius: '9999px', textDecoration: 'none', whiteSpace: 'nowrap', background: 'transparent' }}>
                  Book <ArrowRight size={12} />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
