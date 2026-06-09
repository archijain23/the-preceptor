export default function StepBirthDetails({ formData, update, next, back }) {
  const handleChange = (e) => update({ [e.target.name]: e.target.value })

  return (
    <div className="wizard-step-content">
      <h2>Your Birth Details</h2>
      <form className="birth-form" onSubmit={(e) => { e.preventDefault(); next() }}>
        <div className="form-field">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="birthDate">Date of Birth</label>
            <input id="birthDate" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="birthTime">Time of Birth <span className="optional">(optional)</span></label>
            <input id="birthTime" name="birthTime" type="time" value={formData.birthTime} onChange={handleChange} />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="birthPlace">Place of Birth</label>
          <input id="birthPlace" name="birthPlace" type="text" value={formData.birthPlace} onChange={handleChange} required placeholder="City, Country" />
        </div>
        <div className="form-field">
          <label htmlFor="question">Your Main Question <span className="optional">(optional)</span></label>
          <textarea id="question" name="question" value={formData.question} onChange={handleChange} rows={3} placeholder="What would you like guidance on?" />
        </div>
        <div className="wizard-actions">
          <button type="button" className="btn btn-ghost" onClick={back}>Back</button>
          <button type="submit" className="btn btn-primary">Continue to Booking</button>
        </div>
      </form>
    </div>
  )
}
