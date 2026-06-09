import { createFileRoute } from '@tanstack/react-router'
import ContactForm from '@/components/contact/ContactForm'

export const Route = createFileRoute('/contact')({ component: ContactPage })

function ContactPage() {
  return (
    <section className="page-section">
      <div className="container">
        <ContactForm />
      </div>
    </section>
  )
}
