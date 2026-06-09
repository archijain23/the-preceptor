import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  )
}

const credentials = [
  'Jyotish Visharad — Council of Vedic Astrology',
  'Certified Western Astrologer — AFA',
  '12+ years of private practice',
  'Clients in 47 countries',
]

const sectionStyle = { padding: 'clamp(4rem, 8vw, 8rem) 1.5rem', background: 'oklch(0.09 0.022 272)' }
const innerStyle = { maxWidth: '72rem', margin: '0 auto' }
const eyebrow = { fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }
const displayH = { fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, color: 'oklch(0.96 0.01 85)', lineHeight: 1.1 }
const lead = { fontFamily: 'Satoshi, sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'oklch(0.6 0.02 272)', lineHeight: 1.7 }

export default function AboutPage() {
  return (
    <>
      <section style={{ ...sectionStyle, paddingTop: 'clamp(6rem, 12vw, 10rem)', background: 'oklch(0.08 0.022 272)', textAlign: 'center' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <Reveal><span style={eyebrow}>About</span></Reveal>
          <Reveal delay={0.1}><h1 style={{ ...displayH, fontSize: 'clamp(3rem, 7vw, 6rem)', marginTop: '1rem' }}>The Preceptor <em style={{ color: 'oklch(0.82 0.12 85)' }}>story.</em></h1></Reveal>
          <Reveal delay={0.2}><p style={{ ...lead, maxWidth: '40rem', margin: '1.5rem auto 0' }}>Modern luxury astrology, born from a decade of private consultations — translated into language you can act on.</p></Reveal>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={{ ...innerStyle, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))', gap: '4rem', alignItems: 'center' }}>
          <Reveal>
            <div style={{ aspectRatio: '4/5', borderRadius: '1.25rem', background: 'oklch(0.12 0.022 272 / 0.6)', border: '1px solid oklch(0.82 0.12 85 / 0.2)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center' }}>
              <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontStyle: 'italic', color: 'oklch(0.7 0.02 272)', lineHeight: 1.7 }}>&ldquo;The stars do not predict your fate — they reveal your design.&rdquo;</blockquote>
            </div>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Reveal><span style={eyebrow}>Our Origin</span></Reveal>
            <Reveal delay={0.1}><h2 style={{ ...displayH, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Twelve years of practice, <em style={{ color: 'oklch(0.82 0.12 85)' }}>47 countries served.</em></h2></Reveal>
            <Reveal delay={0.2}><p style={lead}>The Preceptor began as a small private practice for friends in the creative industries. Over twelve years, it has grown into a global consultation studio serving founders, artists, healers, and high-intention seekers.</p></Reveal>
            <Reveal delay={0.3}><p style={{ ...lead, fontSize: '0.95rem' }}>Our approach blends classical Vedic astrology, Western tropical analysis, and intuitive symbolic work — translated into clean, modern language you can act on.</p></Reveal>
            <Reveal delay={0.4}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {credentials.map((c, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'Satoshi, sans-serif', fontSize: '0.875rem', color: 'oklch(0.6 0.02 272)' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'oklch(0.82 0.12 85)', flexShrink: 0 }} />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyle, background: 'oklch(0.08 0.022 272)', textAlign: 'center' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <Reveal><span style={eyebrow}>Contact</span></Reveal>
          <Reveal delay={0.1}><h2 style={{ ...displayH, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', margin: '1rem 0 2.5rem' }}>Reach out for <em style={{ color: 'oklch(0.82 0.12 85)' }}>private inquiries.</em></h2></Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
              {[
                { icon: Mail, label: 'Email', value: 'hello@thepreceptor.com', href: 'mailto:hello@thepreceptor.com' },
                { icon: Phone, label: 'Phone', value: '+1 (212) 555-0117', href: 'tel:+12125550117' },
                { icon: MapPin, label: 'Location', value: 'New York, NY · Worldwide', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} style={{ background: 'oklch(0.12 0.022 272 / 0.6)', border: '1px solid oklch(0.82 0.12 85 / 0.15)', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center', backdropFilter: 'blur(12px)' }}>
                  <Icon size={20} style={{ color: 'oklch(0.82 0.12 85)', margin: '0 auto 0.75rem' }} />
                  <p style={eyebrow}>{label}</p>
                  {href
                    ? <a href={href} style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', color: 'oklch(0.9 0.01 85)', textDecoration: 'none', marginTop: '0.5rem', display: 'block' }}>{value}</a>
                    : <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.85rem', color: 'oklch(0.6 0.02 272)', marginTop: '0.5rem' }}>{value}</p>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
