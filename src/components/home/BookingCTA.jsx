import { Link } from 'react-router-dom';
import styles from './BookingCTA.module.css';

export default function BookingCTA() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`${styles.inner} container`}>
        <div className={styles.stars} aria-hidden="true" />
        <p className="eyebrow">Begin Your Journey</p>
        <div className="gold-divider" />
        <h2 className={styles.title}>
          The Stars Await<br />
          <em>Your Question</em>
        </h2>
        <p className={styles.sub}>
          A single consultation can shift the lens through which you see
          your life — past, present, and unfolding.
        </p>
        <Link to="/book" className="btn btn--solid">Schedule a Reading</Link>
      </div>
    </section>
  );
}
