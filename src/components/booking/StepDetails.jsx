import { useState } from 'react';
import styles from './StepDetails.module.css';

export default function StepDetails({ booking, next, back }) {
  const [form, setForm] = useState({
    name:       booking.name,
    email:      booking.email,
    birthDate:  booking.birthDate,
    birthTime:  booking.birthTime,
    birthPlace: booking.birthPlace,
    question:   booking.question,
  });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const valid = form.name && form.email && form.birthDate && form.birthPlace;

  return (
    <div>
      <h2 className={styles.heading}>Your Details</h2>
      <p className={styles.sub}>
        This information helps craft an accurate reading. Birth details are kept confidential.
      </p>

      <div className={styles.grid}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Full Name *</label>
          <input id="name" className="form-input" type="text" value={form.name} onChange={set('name')} placeholder="Your full name" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address *</label>
          <input id="email" className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="birthDate">Date of Birth *</label>
          <input id="birthDate" className="form-input" type="date" value={form.birthDate} onChange={set('birthDate')} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="birthTime">Time of Birth</label>
          <input id="birthTime" className="form-input" type="time" value={form.birthTime} onChange={set('birthTime')} />
        </div>
        <div className={`form-group ${styles.full}`}>
          <label className="form-label" htmlFor="birthPlace">Place of Birth *</label>
          <input id="birthPlace" className="form-input" type="text" value={form.birthPlace} onChange={set('birthPlace')} placeholder="City, Country" required />
        </div>
        <div className={`form-group ${styles.full}`}>
          <label className="form-label" htmlFor="question">Your Primary Question</label>
          <textarea id="question" className="form-textarea" value={form.question} onChange={set('question')} placeholder="What would you most like to understand from this reading?" />
        </div>
      </div>

      <div className={styles.footer}>
        <button className="btn btn--ghost" onClick={back}>Back</button>
        <button className="btn btn--solid" disabled={!valid} onClick={() => next(form)}>Continue</button>
      </div>
    </div>
  );
}
