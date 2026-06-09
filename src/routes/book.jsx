import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Star, Briefcase, Heart, Moon, Sparkles, BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/book')({
  head: () => ({ meta: [{ title: 'Book a Session — The Preceptor' }] }),
  component: BookPage,
})

const services = [
  { id: 'birth-chart', icon: Star, title: 'Birth Chart Reading', desc: 'A cinematic decode of your natal sky — purpose, gifts, and life arc.', duration: '60 min' },
  { id: 'career', icon: Briefcase, title: 'Career Guidance', desc: 'Strategic timing and direction aligned with your dharma.', duration: '60 min' },
  { id: 'relationship', icon: Heart, title: 'Relationship Consultation', desc: 'Synastry and compatibility guidance for love and partnership.', duration: '60 min' },
  { id: 'tarot', icon: Moon, title: 'Tarot Reading', desc: 'Intuitive readings at decisive crossroads.', duration: '45 min' },
  { id: 'spiritual', icon: Sparkles, title: 'Spiritual Consultation', desc: 'Practices and remedies for inner alignment.', duration: '60 min' },
  { id: 'kundli', icon: BookOpen, title: 'Kundli Analysis', desc: 'Deep Vedic chart with predictive timelines.', duration: '90 min' },
]

const CAL_USERNAME = import.meta.env.VITE_CALCOM_USERNAME || ''
const CAL_EVENT = import.meta.env.VITE_CALCOM_EVENT_SLUG || 'consultation-60min'

const eyebrow = { fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }
const goldBtn = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'oklch(0.82 0.12 85)', color: 'oklch(0.1 0.02 272)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem 2rem', borderRadius: '9999px', fontWeight: 600, border: 'none', cursor: 'pointer' }

function CalEmbed({ service }) {
  if (!CAL_USERNAME) {
    return (
      <div style={{ background: 'oklch(0.12 0.022 272 / 0.6)', border: '1px solid oklch(0.82 0.12 85 / 0.2)', borderRadius: '1.25rem', padding: '4rem 2rem', textAlign: 'center', backdropFilter: 'blur(12px)' }}>
        <CheckCircle2 size={36} style={{ color: 'oklch(0.82 0.12 85)', margin: '0 auto 1.5rem' }} />
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', color: 'oklch(0.96 0.01 85)', marginBottom: '1rem' }}>Almost there!</h3>
        <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', color: 'oklch(0.6 0.02 272)', maxWidth: '32rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Cal.com is not yet configured. Add <code style={{ color: 'oklch(0.82 0.12 85)' }}>VITE_CALCOM_USERNAME</code> to <code style={{ color: 'oklch(0.82 0.12 85)' }}>.env.local</code> to activate live booking.
        </p>
        <a href="https://cal.com" target="_blank" rel="noopener noreferrer" style={goldBtn}>Set up Cal.com <ExternalLink size={14} /></a>
        <p style={{ ...eyebrow, marginTop: '1.5rem' }}>Selected: {service.title}</p>
      </div>
    )
  }
  return (
    <div style={{ width: '100%', height: '600px', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid oklch(0.82 0.12 85 / 0.2)' }}>
      <iframe src={`https://cal.com/${CAL_USERNAME}/${CAL_EVENT}?service=${service.id}`} width="100%" height="100%" frameBorder="0" title={`Book ${service.title}`} />
    </div>
  )
}

function BookPage() {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(null)

  return (
    <section style={{ padding: 'clamp(6rem, 12vw, 10rem) 1.5rem', background: 'oklch(0.08 0.022 272)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={eyebrow}>Private Consultation</span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', lineHeight: 1.05, marginTop: '1rem' }}>
            Book your <em style={{ color: 'oklch(0.82 0.12 85)' }}>session.</em>
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {['Choose Service', 'Schedule'].map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: i <= step ? 'oklch(0.82 0.12 85)' : 'oklch(0.45 0.02 272)' }}>
                <div style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Satoshi, sans-serif', border: `1px solid ${i <= step ? 'oklch(0.82 0.12 85)' : 'oklch(0.3 0.02 272)'}`, background: i <= step ? 'oklch(0.82 0.12 85 / 0.1)' : 'transparent' }}>{i + 1}</div>
                <span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem' }}>{label}</span>
              </div>
              {i < 1 && <div style={{ width: '3rem', height: '1px', background: step > i ? 'oklch(0.82 0.12 85 / 0.5)' : 'oklch(0.2 0.02 272)' }} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1rem' }}>
                {services.map((s) => {
                  const Icon = s.icon
                  const isActive = selected?.id === s.id
                  return (
                    <button key={s.id} onClick={() => setSelected(s)} aria-pressed={isActive}
                      style={{ background: isActive ? 'oklch(0.82 0.12 85 / 0.06)' : 'oklch(0.12 0.022 272 / 0.6)', border: `1px solid ${isActive ? 'oklch(0.82 0.12 85)' : 'oklch(0.82 0.12 85 / 0.12)'}`, borderRadius: '0.875rem', padding: '1.75rem', textAlign: 'left', cursor: 'pointer', backdropFilter: 'blur(12px)', transition: 'all 0.25s' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${isActive ? 'oklch(0.82 0.12 85)' : 'oklch(0.82 0.12 85 / 0.2)'}`, background: isActive ? 'oklch(0.82 0.12 85 / 0.15)' : 'oklch(0.82 0.12 85 / 0.05)', flexShrink: 0 }}>
                          <Icon size={14} style={{ color: isActive ? 'oklch(0.82 0.12 85)' : 'oklch(0.55 0.02 272)' }} />
                        </div>
                        <div>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'oklch(0.96 0.01 85)', marginBottom: '0.35rem' }}>{s.title}</p>
                          <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', color: 'oklch(0.55 0.02 272)', lineHeight: 1.6 }}>{s.desc}</p>
                          <p style={{ ...eyebrow, marginTop: '0.75rem', display: 'block' }}>{s.duration}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button onClick={() => selected && setStep(1)} disabled={!selected} style={{ ...goldBtn, opacity: selected ? 1 : 0.4, cursor: selected ? 'pointer' : 'not-allowed' }}>
                  Choose Date &amp; Time <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          )}
          {step === 1 && selected && (
            <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
              <button onClick={() => setStep(0)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', color: 'oklch(0.55 0.02 272)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '1.5rem' }}>
                <ArrowLeft size={14} /> Back to services
              </button>
              <CalEmbed service={selected} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
