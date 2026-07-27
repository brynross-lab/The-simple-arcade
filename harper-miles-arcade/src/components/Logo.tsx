export function Logo({ size = 48 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className="shrink-0"
      aria-hidden="true"
    >
      {/* cabinet body */}
      <rect x="10" y="8" width="100" height="78" rx="18" fill="#FF6FA5" />
      {/* screen */}
      <rect x="21" y="19" width="78" height="50" rx="10" fill="#FFF6E9" />
      {/* face */}
      <circle cx="45" cy="44" r="6" fill="#26265A" />
      <circle cx="75" cy="44" r="6" fill="#26265A" />
      <path
        d="M42 55 Q60 68 78 55"
        stroke="#26265A"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {/* joystick */}
      <rect x="55" y="82" width="10" height="18" rx="5" fill="#4ECDC4" />
      <circle cx="60" cy="102" r="13" fill="#FFC93C" stroke="#26265A" strokeWidth="2.5" />
    </svg>
  )
}
