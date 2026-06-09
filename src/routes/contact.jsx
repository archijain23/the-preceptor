import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [{ title: 'Contact — The Preceptor' }] }),
  component: ContactPage,
})

const eyebrow = { fontFamily: 'Satoshi, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'oklch(0.82 0.12 85)', opacity: 0.8 }
const inputStyle = { width: '100%', background: 'oklch(0.12 0.022 272 / 0.5)', border: '1px solid oklch(0.82 0.12 85 / 0.18)', borderRadius: '0.75rem', padding: '0.85rem 1.1rem', fontFamily: 'Satoshi, sans-serif', fontSize: '0.875rem', color: 'oklch(0.9 0.01 85)', outline: 'none', boxSizing: 'border-box' }

function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const update = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <section style={{ padding: 'clamp(6rem, 12vw, 10rem) 1.5rem', background: 'oklch(0.08 0.022 272)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span style={eyebrow}>Get in Touch</span>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, color: 'oklch(0.96 0.01 85)', lineHeight: 1.1, marginTop: '1rem' }}>Say hello. <em style={{ color: 'oklch(0.82 0.12 85)' }}>We reply within 24 hours.</em></h1>
          </motion.div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '3rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {[{icon:Mail,label:'Email',value:'hello@thepreceptor.com',href:'mailto:hello@thepreceptor.com'},{icon:Phone,label:'Phone',value:'+1 (212) 555-0117',href:'tel:+12125550117'},{icon:MapPin,label:'Location',value:'New York, NY · Worldwide',href:null}].map(({icon:Icon,label,value,href}) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'oklch(0.82 0.12 85 / 0.1)', border: '1px solid oklch(0.82 0.12 85 / 0.25)', flexShrink: 0 }}>
                  <Icon size={15} style={{ color: 'oklch(0.82 0.12 85)' }} />
                </div>
                <div>
                  <p style={eyebrow}>{label}</p>
                  {href
                    ? <a href={href} style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', color: 'oklch(0.9 0.01 85)', textDecoration: 'none', marginTop: '0.35rem', display: 'block' }}>{value}</a>
                    : <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.9rem', color: 'oklch(0.6 0.02 272)', marginTop: '0.35rem' }}>{value}</p>}
                </div>
              </div>
            ))}
          </div>
          {sent
            ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                style={{ background: 'oklch(0.12 0.022 272 / 0.7)', border: '1px solid oklch(0.82 0.12 85 / 0.2)', borderRadius: '1.25rem', padding: '4rem 2rem', textAlign: 'center', backdropFilter: 'blur(16px)' }}>
                <CheckCircle2 size={40} style={{ color: 'oklch(0.82 0.12 85)', margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', color: 'oklch(0.96 0.01 85)', marginBottom: '0.75rem' }}>Message received.</h3>
                <p style={{ fontFamily: 'Satoshi, sans-serif', fontSize: '0.95rem', color: 'oklch(0.6 0.02 272)' }}>We will be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }}
                style={{ background: 'oklch(0.12 0.022 272 / 0.6)', border: '1px solid oklch(0.82 0.12 85 / 0.15)', borderRadius: '1.25rem', padding: '2.25rem', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ ...eyebrow, display: 'block', marginBottom: '0.5rem' }}>Name</label>
                    <input name="name" type="text" required value={form.name} onChange={update} placeholder="Your name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ ...eyebrow, display: 'block', marginBottom: '0.5rem' }}>Email</label>
                    <input name="email" type="email" required value={form.email} onChange={update} placeholder="your@email.com" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ ...eyebrow, display: 'block', marginBottom: '0.5rem' }}>Subject</label>
                  <input name="subject" type="text" value={form.subject} onChange={update} placeholder="What is on your mind?" style={inputStyle} />
                </div>
                <div>
                  <label style={{ ...eyebrow, display: 'block', marginBottom: '0.5rem' }}>Message</label>
                  <textarea name="message" rows={5} required value={form.message} onChange={update} placeholder="Tell us how we can help..." style={{ ...inputStyle, resize: 'none' }} />
                </div>
                <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'oklch(0.82 0.12 85)', color: 'oklch(0.1 0.02 272)', fontFamily: 'Satoshi, sans-serif', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.9rem 2rem', borderRadius: '9999px', fontWeight: 600, border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}>
                  Send Message <Send size={14} />
                </button>
              </form>
            )}
        </div>
      </div>
    </section>
  )
}
