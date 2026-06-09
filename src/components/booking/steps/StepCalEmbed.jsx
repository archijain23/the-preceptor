/**
 * Phase 2 Integration — Cal.com Embed
 *
 * To activate:
 * 1. Set VITE_CALCOM_USERNAME and VITE_CALCOM_EVENT_SLUG in .env.local
 * 2. Uncomment the Cal.com embed script in index.html:
 *    <script src="https://app.cal.com/embed/embed.js"></script>
 * 3. Remove the placeholder below and use the Cal.com inline embed:
 *    Cal("inline", { elementOrSelector: "#cal-embed", calLink: `${username}/${eventSlug}` })
 */

const CALCOM_USERNAME = import.meta.env.VITE_CALCOM_USERNAME
const CALCOM_EVENT = import.meta.env.VITE_CALCOM_EVENT_SLUG

export default function StepCalEmbed({ formData, next, back }) {
  const isConfigured = CALCOM_USERNAME && CALCOM_EVENT

  return (
    <div className="wizard-step-content">
      <h2>Choose Your Session Time</h2>

      {isConfigured ? (
        // Cal.com embed will render here once Phase 2 is active
        <div
          id="cal-embed"
          className="cal-embed-container"
          style={{ minHeight: '500px', width: '100%' }}
        />
      ) : (
        <div className="integration-placeholder">
          <div className="placeholder-icon">📅</div>
          <h3>Cal.com Integration — Phase 2</h3>
          <p>
            Live calendar booking will appear here once Cal.com is connected.
            <br />
            Add <code>VITE_CALCOM_USERNAME</code> and <code>VITE_CALCOM_EVENT_SLUG</code> to your <code>.env.local</code> to activate.
          </p>
          <ol className="setup-steps">
            <li>Create a free account at <a href="https://cal.com" target="_blank" rel="noopener noreferrer">cal.com</a></li>
            <li>Create an event type (e.g. "Astrology Consultation - 60 min")</li>
            <li>Copy your username and event slug into <code>.env.local</code></li>
            <li>Add the Cal.com embed script to <code>index.html</code></li>
          </ol>
        </div>
      )}

      <div className="wizard-actions">
        <button className="btn btn-ghost" onClick={back}>Back</button>
        <button className="btn btn-primary" onClick={next}>Continue</button>
      </div>
    </div>
  )
}
