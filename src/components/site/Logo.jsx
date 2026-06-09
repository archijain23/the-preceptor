/* Celestial eye / all-seeing cosmic mark */
export default function Logo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-label="The Preceptor logo"
      role="img"
    >
      {/* Outer ring */}
      <circle cx="18" cy="18" r="16" stroke="#d4a820" strokeWidth="0.75" opacity="0.6" />
      {/* Inner ring */}
      <circle cx="18" cy="18" r="10" stroke="#d4a820" strokeWidth="0.5" opacity="0.4" />
      {/* Eye outline */}
      <path
        d="M6 18 C10 11, 26 11, 30 18 C26 25, 10 25, 6 18Z"
        stroke="#d4a820"
        strokeWidth="1"
        fill="none"
      />
      {/* Iris */}
      <circle cx="18" cy="18" r="4" stroke="#d4a820" strokeWidth="0.75" fill="none" />
      {/* Pupil */}
      <circle cx="18" cy="18" r="1.5" fill="#d4a820" opacity="0.9" />
      {/* Star points */}
      <line x1="18" y1="2" x2="18" y2="5" stroke="#d4a820" strokeWidth="0.75" opacity="0.5" />
      <line x1="18" y1="31" x2="18" y2="34" stroke="#d4a820" strokeWidth="0.75" opacity="0.5" />
      <line x1="2" y1="18" x2="5" y2="18" stroke="#d4a820" strokeWidth="0.75" opacity="0.5" />
      <line x1="31" y1="18" x2="34" y2="18" stroke="#d4a820" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}
