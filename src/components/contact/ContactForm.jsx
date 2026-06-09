import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO Phase 3: Wire to Resend email API
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="contact-success">
        <h2>Message Sent ✨</h2>
        <p>Thank you for reaching out. We'll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <div className="contact-wrapper">
      <h1>Get in Touch</h1>
      <p>Have a question before booking? Send a message.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Your name" />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" />
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows={5} value={form.message} onChange={handleChange} required placeholder="Your message..." />
        </div>
        <button type="submit" className="btn btn-primary">Send Message</button>
      </form>
    </div>
  )
}
