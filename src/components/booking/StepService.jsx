import { useState } from 'react';
import { services } from '../../content/services';
import styles from './StepService.module.css';

export default function StepService({ booking, next }) {
  const [selected, setSelected] = useState(booking.service);

  return (
    <div>
      <h2 className={styles.heading}>Choose a Service</h2>
      <p className={styles.sub}>Select the type of reading that resonates with your inquiry.</p>

      <div className={styles.grid}>
        {services.map((svc) => (
          <button
            key={svc.id}
            className={`${styles.card} ${selected?.id === svc.id ? styles.selected : ''}`}
            onClick={() => setSelected(svc)}
            aria-pressed={selected?.id === svc.id}
          >
            <span className={styles.icon}>{svc.icon}</span>
            <span className={styles.title}>{svc.title}</span>
            <span className={styles.duration}>{svc.duration}</span>
            <span className={styles.price}>{svc.price}</span>
          </button>
        ))}
      </div>

      <div className={styles.footer}>
        <button
          className="btn btn--solid"
          disabled={!selected}
          onClick={() => next({ service: selected })}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
