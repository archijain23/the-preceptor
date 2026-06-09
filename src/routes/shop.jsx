import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { useState } from 'react'

const eyebrow = { fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }
const goldBtn = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'oklch(0.82 0.12 85)', color: 'oklch(0.1 0.02 272)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem 2rem', borderRadius: '9999px', fontWeight: 600, border: 'none', cursor: 'pointer' }

export default function ShopPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section style={{ padding: 'clamp(6rem, 12vw, 10rem) 1.5rem', background: 'oklch(0.08 0.022 272)', minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '36rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'oklch(0.82 0.12 85 / 0.1)', border: '1px solid oklch(0.82 0.12 85 / 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={28} style={{ color: 'oklch(0.82 0.12 85)' }} />
          </div>
          <span style={eyebrow}>Coming Soon</span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', lineHeight: 1.15 }}>The Shop is being <em style={{ color: 'oklch(0.82 0.12 85)' }}>carefully curated.</em></h1>
          <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '1rem', color: 'oklch(0.6 0.02 272)', lineHeight: 1.7 }}>Digital rituals, chart reports, learning resources, and curated offerings are coming soon.</p>
          {submitted
            ? <p style={{ ...eyebrow, opacity: 1, color: 'oklch(0.82 0.12 85)' }}>You are on the list!</p>
            : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '28rem' }}>
                <input type="email" required placeholder="your@email.com" style={{ flex: 1, background: 'oklch(0.12 0.022 272 / 0.6)', border: '1px solid oklch(0.82 0.12 85 / 0.2)', borderRadius: '9999px', padding: '0.75rem 1.25rem', fontFamily: 'Satoshi, sans-serif', fontSize: '0.875rem', color: 'oklch(0.9 0.01 85)', outline: 'none' }} />
                <button type="submit" style={goldBtn}>Notify Me</button>
              </form>
            )}
        </motion.div>
      </div>
    </section>
  )
}
