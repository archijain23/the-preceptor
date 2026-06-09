import { useState } from 'react';
import { testimonials } from '../../content/testimonials';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(i => (i + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <p className="eyebrow" style={{ textAlign: 'center' }}>Testimonials</p>
        <div className="gold-divider" />
        <h2 className={styles.title}>Words from Seekers</h2>

        <div className={styles.card}>
          <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
          <div className={styles.author}>
            <div className={styles.avatar}>{t.name[0]}</div>
            <div>
              <p className={styles.name}>{t.name}</p>
              <p className={styles.location}>{t.location}</p>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <button className={`btn btn--ghost ${styles.arrow}`} onClick={prev} aria-label="Previous testimonial">
            &#8592;
          </button>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button className={`btn btn--ghost ${styles.arrow}`} onClick={next} aria-label="Next testimonial">
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
}
