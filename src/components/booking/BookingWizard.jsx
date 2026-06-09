import { useState } from 'react'
import StepServiceSelect from './steps/StepServiceSelect'
import StepBirthDetails from './steps/StepBirthDetails'
import StepCalEmbed from './steps/StepCalEmbed'
import StepConfirmation from './steps/StepConfirmation'

const STEPS = ['Select Service', 'Your Details', 'Choose Time', 'Confirm']

export default function BookingWizard() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    service: null,
    name: '',
    email: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    question: '',
  })

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))
  const update = (data) => setFormData((prev) => ({ ...prev, ...data }))

  return (
    <div className="booking-wizard">
      {/* Progress Bar */}
      <div className="wizard-progress" role="progressbar" aria-valuenow={step + 1} aria-valuemax={STEPS.length}>
        {STEPS.map((label, i) => (
          <div key={label} className={`wizard-step ${i <= step ? 'active' : ''}`}>
            <span className="wizard-step-num">{i + 1}</span>
            <span className="wizard-step-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="wizard-content">
        {step === 0 && <StepServiceSelect formData={formData} update={update} next={next} />}
        {step === 1 && <StepBirthDetails formData={formData} update={update} next={next} back={back} />}
        {step === 2 && <StepCalEmbed formData={formData} next={next} back={back} />}
        {step === 3 && <StepConfirmation formData={formData} back={back} />}
      </div>
    </div>
  )
}
