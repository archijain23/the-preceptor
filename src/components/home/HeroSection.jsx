import { Link } from '@tanstack/react-router'

export default function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-heading">
      <div className="hero-inner container">
        <p className="hero-eyebrow">Premium Astrology Consultations</p>
        <h1 id="hero-heading" className="hero-heading">
          Discover Your
          <br />
          <em>Celestial Path</em>
        </h1>
        <p className="hero-body">
          Personalised birth chart readings, relationship compatibility, and life guidance
          from an expert astrologer — available globally.
        </p>
        <div className="hero-actions">
          <Link to="/book" className="btn btn-primary btn-lg">
            Book a Session
          </Link>
          <Link to="/about" className="btn btn-ghost btn-lg">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
