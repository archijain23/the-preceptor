import { Link } from 'react-router-dom';
import { services } from '../../content/services';
import styles from './ServicesSection.module.css';

export default function ServicesSection() {
  return (
    <section className={`section ${styles.section}`} id="services">
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow">What I Offer</p>
          <div className="gold-divider gold-divider--left" />
          <h2 className={styles.title}>Paths of Illumination</h2>
          <p className={styles.subtitle}>
            Each reading is a sacred conversation between your soul and the stars.
          </p>
        </header>

        <div className={styles.grid}>
          {services.map((svc, i) => (
            <article key={svc.id} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">{svc.icon}</div>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.description}</p>
              <div className={styles.meta}>
                <span className={styles.duration}>{svc.duration}</span>
                <span className={styles.price}>{svc.price}</span>
              </div>
              <Link to="/book" className={`btn btn--gold ${styles.cardBtn}`}>
                Book Now
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.viewAll}>
          <Link to="/services" className="btn btn--ghost">View All Services</Link>
        </div>
      </div>
    </section>
  );
}
