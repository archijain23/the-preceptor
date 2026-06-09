import { services } from '@/content/services'

export default function ServicesSection() {
  return (
    <section className="services-section">
      <div className="container">
        <h2 className="section-heading">Consultation Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <span className="service-icon" aria-hidden="true">{service.icon}</span>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <p className="service-price">{service.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
