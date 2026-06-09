export default function StepConfirmation({ formData, back }) {
  return (
    <div className="wizard-step-content confirmation">
      <div className="confirmation-icon">✨</div>
      <h2>Booking Requested!</h2>
      <p>Thank you, <strong>{formData.name || 'dear seeker'}</strong>. Your session request has been received.</p>
      <div className="confirmation-details">
        <p><strong>Service:</strong> {formData.service?.title}</p>
        <p><strong>Email:</strong> {formData.email}</p>
      </div>
      <p className="confirmation-note">
        You will receive a confirmation email shortly.
        Email integration (Resend) is planned for Phase 3.
      </p>
    </div>
  )
}
