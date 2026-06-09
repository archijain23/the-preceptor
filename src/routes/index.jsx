import { Link } from '@tanstack/react-router'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Star, Sparkles, Heart, Briefcase, Moon, BookOpen, ChevronDown, Quote } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const services = [
  { icon: Star, title: 'Birth Chart Reading', desc: 'A cinematic decode of your natal sky — purpose, gifts, and life arc.' },
  { icon: Briefcase, title: 'Career Guidance', desc: 'Strategic timing and direction aligned with your dharma and ambition.' },
  { icon: Heart, title: 'Relationship Consultation', desc: 'Synastry and compatibility guidance for love, family, and partnership.' },
  { icon: Moon, title: 'Tarot Reading', desc: 'Intuitive symbolic readings for clarity at decisive crossroads.' },
  { icon: Sparkles, title: 'Spiritual Consultation', desc: 'Personal practices, rituals, and remedies for inner alignment.' },
  { icon: BookOpen, title: 'Kundli Analysis', desc: 'Deep Vedic chart analysis with predictive timelines and dashas.' },
]

const testimonials = [
  { name: 'Amelia R.', country: 'New York, USA', text: "The most precise reading I've ever had. It felt like sitting with a wise friend who could see decades ahead.", rating: 5 },
  { name: 'Daniel K.', country: 'London, UK', text: "Calm, confident, and breathtakingly accurate. The Preceptor gave me a map I didn't know I needed.", rating: 5 },
  { name: 'Priya S.', country: 'Toronto, CA', text: 'A truly luxurious experience. Insightful, grounded and deeply transformative.', rating: 5 },
  { name: 'Marcus T.', country: 'Los Angeles, USA', text: "I've worked with multiple astrologers. None compare. The clarity I received reshaped my career.", rating: 5 },
  { name: 'Lina M.', country: 'Berlin, DE', text: 'Every word landed. The session was poetic, precise and quietly powerful.', rating: 5 },
]

const achievements = [
  { value: '12+', label: 'Years of Practice' },
  { value: '8,400', label: 'Sessions Delivered' },
  { value: '47', label: 'Countries Served' },
  { value: '4.98', label: 'Average Rating' },
]

const faqs = [
  { q: 'How does an online consultation work?', a: 'Sessions are conducted over a private video call. You receive a calendar invite, an intake form, and a recording afterwards.' },
  { q: 'What details are required to book?', a: 'Your full date of birth, exact time of birth, and place of birth — plus the questions on your mind.' },
  { q: 'How long is a session?', a: 'Standard consultations run 60 minutes. Deep-dive readings extend to 90 minutes with a written summary.' },
  { q: 'Can international clients book?', a: 'Absolutely. We serve clients across all timezones with white-glove scheduling.' },
  { q: 'Are sessions confidential?', a: 'Yes. Every conversation is held in complete confidence. Recordings are shared only with you.' },
]

function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx(c => (c + 1) % testimonials.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const active = testimonials[testimonialIdx]

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.22 0.08 272 / 0.9) 0%, oklch(0.08 0.02 272) 100%)' }}>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, oklch(0.82 0.12 85 / 0.6))' }} />
              <span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }}>Premium Astrology Consultations</span>
              <div className="w-8 h-px" style={{ background: 'linear-gradient(to left, transparent, oklch(0.82 0.12 85 / 0.6))' }} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, lineHeight: 1.05, color: 'oklch(0.96 0.01 85)' }}>
              Your stars,{' '}
              <em style={{ color: 'oklch(0.82 0.12 85)', fontStyle: 'italic' }}>decoded.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: 'oklch(0.7 0.02 272)', maxWidth: '42rem', lineHeight: 1.7 }}>
              Cinematic, deeply personal astrology consultations for high-intention seekers — clarity in love, career, and life's defining chapters.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'oklch(0.82 0.12 85)', color: 'oklch(0.1 0.02 272)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem 2rem', borderRadius: '9999px', fontWeight: 600, textDecoration: 'none' }}>
                Book Your Session <ArrowRight size={15} />
              </Link>
              <a href="#services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid oklch(0.82 0.12 85 / 0.4)', color: 'oklch(0.82 0.12 85)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none', background: 'transparent' }}>
                Explore Services
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="flex items-center gap-8 md:gap-12 mt-4">
              {achievements.map(a => (
                <div key={a.label} className="text-center">
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'oklch(0.82 0.12 85)', fontWeight: 300 }}>{a.value}</p>
                  <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(0.55 0.02 272)', marginTop: '0.25rem' }}>{a.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}>
          <ChevronDown size={18} style={{ color: 'oklch(0.82 0.12 85)' }} />
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: 'clamp(4rem, 8vw, 8rem) 1.5rem', background: 'oklch(0.09 0.022 272)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <Reveal><span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }}>What We Offer</span></Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', marginTop: '1rem', lineHeight: 1.2 }}>
                Sessions crafted around{' '}<em style={{ color: 'oklch(0.82 0.12 85)' }}>what you need to know.</em>
              </h2>
            </Reveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '1.25rem' }}>
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <Reveal key={s.title} delay={i * 0.07}>
                  <div style={{ background: 'oklch(0.12 0.022 272 / 0.6)', border: '1px solid oklch(0.82 0.12 85 / 0.15)', borderRadius: '1rem', padding: '2rem', backdropFilter: 'blur(12px)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', height: '100%' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'oklch(0.82 0.12 85 / 0.1)', border: '1px solid oklch(0.82 0.12 85 / 0.25)', flexShrink: 0 }}>
                      <Icon size={16} style={{ color: 'oklch(0.82 0.12 85)' }} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 500, color: 'oklch(0.96 0.01 85)', marginBottom: '0.5rem' }}>{s.title}</h4>
                      <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.875rem', color: 'oklch(0.6 0.02 272)', lineHeight: 1.7 }}>{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.4}>
            <div className="text-center" style={{ marginTop: '3rem' }}>
              <Link to="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'oklch(0.82 0.12 85)', color: 'oklch(0.1 0.02 272)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem 2rem', borderRadius: '9999px', fontWeight: 600, textDecoration: 'none' }}>
                Book a Session <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 1.5rem', background: 'oklch(0.08 0.022 272)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <Reveal><span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }}>Client Stories</span></Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', marginTop: '1rem' }}>
                Trust earned, <em style={{ color: 'oklch(0.82 0.12 85)' }}>one consultation at a time.</em>
              </h2>
            </Reveal>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={testimonialIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              style={{ background: 'oklch(0.12 0.022 272 / 0.7)', border: '1px solid oklch(0.82 0.12 85 / 0.2)', borderRadius: '1.25rem', padding: 'clamp(2rem, 5vw, 3.5rem)', textAlign: 'center', backdropFilter: 'blur(16px)' }}>
              <Quote size={28} style={{ color: 'oklch(0.82 0.12 85)', opacity: 0.5, margin: '0 auto 1.5rem' }} />
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontStyle: 'italic', color: 'oklch(0.9 0.01 85)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                &ldquo;{active.text}&rdquo;
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
                {Array.from({ length: active.rating }).map((_, i) => <Star key={i} size={13} style={{ color: 'oklch(0.82 0.12 85)', fill: 'oklch(0.82 0.12 85)' }} />)}
              </div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'oklch(0.96 0.01 85)' }}>{active.name}</p>
              <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(0.55 0.02 272)', marginTop: '0.25rem' }}>{active.country}</p>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={() => setTestimonialIdx(c => (c - 1 + testimonials.length) % testimonials.length)} aria-label="Previous" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '1px solid oklch(0.82 0.12 85 / 0.3)', background: 'transparent', color: 'oklch(0.82 0.12 85)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowLeft size={15} /></button>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} aria-label={`Testimonial ${i + 1}`}
                  style={{ height: '0.5rem', width: i === testimonialIdx ? '1.5rem' : '0.5rem', borderRadius: '9999px', background: i === testimonialIdx ? 'oklch(0.82 0.12 85)' : 'oklch(0.82 0.12 85 / 0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
            <button onClick={() => setTestimonialIdx(c => (c + 1) % testimonials.length)} aria-label="Next" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '1px solid oklch(0.82 0.12 85 / 0.3)', background: 'transparent', color: 'oklch(0.82 0.12 85)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ArrowRight size={15} /></button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 1.5rem', background: 'oklch(0.09 0.022 272)' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', textAlign: 'center' }}>
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'oklch(0.82 0.12 85)', fontWeight: 300 }}>{a.value}</p>
              <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'oklch(0.55 0.02 272)', marginTop: '0.25rem' }}>{a.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 1.5rem', background: 'oklch(0.08 0.022 272)' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <Reveal><span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }}>Frequently Asked</span></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', marginTop: '1rem' }}>Common <em style={{ color: 'oklch(0.82 0.12 85)' }}>questions answered.</em></h2></Reveal>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ background: 'oklch(0.12 0.022 272 / 0.6)', border: '1px solid oklch(0.82 0.12 85 / 0.15)', borderRadius: '0.75rem', overflow: 'hidden', backdropFilter: 'blur(12px)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.25rem 1.75rem', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'oklch(0.96 0.01 85)' }}>{f.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.3 }} style={{ color: 'oklch(0.82 0.12 85)', flexShrink: 0, fontSize: '1.25rem', lineHeight: 1 }}>+</motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                        <p style={{ padding: '0 1.75rem 1.5rem', fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', color: 'oklch(0.6 0.02 272)', lineHeight: 1.7 }}>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 1.5rem', background: 'radial-gradient(ellipse 60% 80% at 50% 100%, oklch(0.22 0.08 272 / 0.6) 0%, oklch(0.08 0.022 272) 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <Reveal><span style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }}>Ready to Begin?</span></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', marginTop: '1rem', marginBottom: '1.5rem' }}>A single conversation can shift <em style={{ color: 'oklch(0.82 0.12 85)' }}>the trajectory of a decade.</em></h2></Reveal>
          <Reveal delay={0.2}>
            <Link to="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'oklch(0.82 0.12 85)', color: 'oklch(0.1 0.02 272)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem 2rem', borderRadius: '9999px', fontWeight: 600, textDecoration: 'none' }}>
              Book Your Session <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
