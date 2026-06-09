import { testimonials } from '@/content/testimonials'

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-heading">What Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="testimonial-card">
              <p className="testimonial-text">"{t.quote}"</p>
              <footer>
                <cite className="testimonial-author">{t.name}</cite>
                <span className="testimonial-location">{t.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
