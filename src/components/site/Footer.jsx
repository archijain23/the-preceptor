import { Link } from 'react-router-dom';
import Logo from './Logo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container--wide`}>
        <div className={styles.brand}>
          <Logo size={32} />
          <span className={styles.brandName}>The Preceptor</span>
          <p className={styles.tagline}>
            Ancient wisdom. Timeless guidance.
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          <div className={styles.col}>
            <span className={styles.colTitle}>Navigate</span>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Consult</span>
            <Link to="/book">Book a Session</Link>
            <Link to="/services#natal">Natal Chart</Link>
            <Link to="/services#transit">Transits</Link>
            <Link to="/services#relationship">Synastry</Link>
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <div className="container--wide">
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} The Preceptor. All rights reserved.
          </p>
          <div className={styles.divider} />
        </div>
      </div>
    </footer>
  );
}
