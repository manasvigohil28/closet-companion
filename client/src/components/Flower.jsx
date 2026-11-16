// A small five-petal flower, used as a decoration.
export default function Flower({ size = 28, color = 'var(--peach-deep)', style, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill={color}
      style={style}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="4.5" fill="var(--paper)" />
      <ellipse cx="20" cy="9" rx="4.5" ry="7.5" />
      <ellipse cx="20" cy="31" rx="4.5" ry="7.5" />
      <ellipse cx="9" cy="20" rx="7.5" ry="4.5" />
      <ellipse cx="31" cy="20" rx="7.5" ry="4.5" />
      <ellipse cx="12" cy="12" rx="4" ry="6" transform="rotate(-45 12 12)" />
      <ellipse cx="28" cy="12" rx="4" ry="6" transform="rotate(45 28 12)" />
      <ellipse cx="12" cy="28" rx="4" ry="6" transform="rotate(45 12 28)" />
      <ellipse cx="28" cy="28" rx="4" ry="6" transform="rotate(-45 28 28)" />
      <circle cx="20" cy="20" r="4.5" />
    </svg>
  )
}
