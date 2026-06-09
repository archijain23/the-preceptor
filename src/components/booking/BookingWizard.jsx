import { useState } from 'react';
import StepService from './StepService';
import StepDetails from './StepDetails';
import StepCalEmbed from './StepCalEmbed';
import StepConfirm from './StepConfirm';
import styles from './BookingWizard.module.css';

const STEPS = ['Choose Service', 'Your Details', 'Pick a Time', 'Confirm'];

export default function BookingWizard() {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState({
    service: null,
    name: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    question: '',
  });

  const next = (data) => {
    if (data) setBooking(b => ({ ...b, ...data }));
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className={styles.wizard}>
      {/* Step indicator */}
      <nav className={styles.stepNav} aria-label="Booking progress">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`${styles.stepItem} ${i === step ? styles.active : ''} ${i < step ? styles.done : ''}`}
          >
            <span className={styles.stepNum}>{i < step ? '✓' : i + 1}</span>
            <span className={styles.stepLabel}>{label}</span>
          </div>
        ))}
      </nav>

      <div className={styles.body}>
        {step === 0 && <StepService booking={booking} next={next} />}
        {step === 1 && <StepDetails booking={booking} next={next} back={back} />}
        {step === 2 && <StepCalEmbed booking={booking} next={next} back={back} />}
        {step === 3 && <StepConfirm booking={booking} back={back} />}
      </div>
    </div>
  );
}
