import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Starfield background */}
      <div className={styles.stars} aria-hidden="true">
        {Array.from({ length: 80 }).map((_, i) => (
          <span key={i} className={styles.star} style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 0.5}px`,
            height: `${Math.random() * 2 + 0.5}px`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }} />
        ))}
      </div>

      <div className={`${styles.content} container`}>
        <p className="eyebrow">Vedic Astrology &amp; Spiritual Counsel</p>
        <div className="gold-divider" />

        <h1 className={styles.heading}>
          <span className={styles.headingLine}>Illuminate Your</span>
          <span className={`${styles.headingLine} ${styles.italic}`}>
            Celestial Path
          </span>
        </h1>

        <p className={styles.sub}>
          Ancient Jyotish wisdom meets modern clarity — personalised readings
          that reveal the cosmic blueprint written at your birth.
        </p>

        <div className={styles.actions}>
          <Link to="/book" className="btn btn--solid">Book a Consultation</Link>
          <Link to="/services" className="btn btn--ghost">Explore Services</Link>
        </div>

        {/* Decorative zodiac wheel hint */}
        <div className={styles.wheel} aria-hidden="true">
          <svg viewBox="0 0 200 200" width="200" height="200" className={styles.wheelSvg}>
            <circle cx="100" cy="100" r="95" stroke="rgba(212,168,32,0.15)" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="70" stroke="rgba(212,168,32,0.08)" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="45" stroke="rgba(212,168,32,0.12)" strokeWidth="0.75" fill="none" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x1 = 100 + 45 * Math.cos(angle);
              const y1 = 100 + 45 * Math.sin(angle);
              const x2 = 100 + 95 * Math.cos(angle);
              const y2 = 100 + 95 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(212,168,32,0.1)" strokeWidth="0.5" />;
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
