import { Link } from '@tanstack/react-router'

export default function BookingCTA() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <h2>Ready to Unlock Your Stars?</h2>
        <p>Sessions available for all timezones. Limited slots each month.</p>
        <Link to="/book" className="btn btn-primary btn-lg">
          Book Now
        </Link>
      </div>
    </section>
  )
}
