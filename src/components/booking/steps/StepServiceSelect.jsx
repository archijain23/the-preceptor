import { services } from '@/content/services'

export default function StepServiceSelect({ formData, update, next }) {
  return (
    <div className="wizard-step-content">
      <h2>Choose Your Consultation</h2>
      <div className="services-grid">
        {services.map((service) => (
          <button
            key={service.id}
            className={`service-card selectable ${formData.service?.id === service.id ? 'selected' : ''}`}
            onClick={() => update({ service })}
            aria-pressed={formData.service?.id === service.id}
          >
            <span className="service-icon">{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <strong>{service.price}</strong>
          </button>
        ))}
      </div>
      <div className="wizard-actions">
        <button
          className="btn btn-primary"
          onClick={next}
          disabled={!formData.service}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
