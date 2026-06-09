export default function Logo() {
  return (
    <svg
      width="140"
      height="32"
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="The Preceptor"
    >
      {/* Star/celestial mark */}
      <circle cx="10" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="10" x2="10" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="22" x2="10" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="16" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5.86" y1="11.86" x2="4.44" y2="10.44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14.14" y1="20.14" x2="15.56" y2="21.56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14.14" y1="11.86" x2="15.56" y2="10.44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5.86" y1="20.14" x2="4.44" y2="21.56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Wordmark */}
      <text
        x="26"
        y="21"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="18"
        fontWeight="500"
        fill="currentColor"
        letterSpacing="0.02em"
      >
        The Preceptor
      </text>
    </svg>
  )
}
