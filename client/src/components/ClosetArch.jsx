// A hand-drawn style arch holding a clothing rail, used as the picture on the
// sign-in page. Drawn as SVG so it stays sharp and uses the palette.
export default function ClosetArch({ className = '' }) {
  const line = 'var(--brown)'

  return (
    <svg
      className={className}
      viewBox="0 0 200 250"
      fill="none"
      role="img"
      aria-label="A rail of clothes hanging in a wardrobe"
    >
      {/* arch window */}
      <path
        d="M16 246V96a84 84 0 0 1 168 0v150z"
        fill="var(--paper)"
        stroke="var(--sage-line)"
        strokeWidth="2"
      />

      {/* rail */}
      <path d="M40 78h120" stroke={line} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M40 72v12M160 72v12" stroke={line} strokeWidth="2.4" strokeLinecap="round" />

      <g
        stroke={line}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(100 112) scale(1.12) translate(-100 -112)"
      >
        {/* dress */}
        <path d="M62 78c0 6 4 8 4 12" />
        <path d="M52 96c5-4 9-6 14-6s9 2 14 6" />
        <path d="M52 96c-2 14-4 20-6 34-2 12-3 24-3 34h46c0-10-1-22-3-34-2-14-4-20-6-34" />
        <path d="M43 164c6 3 12 4 23 4s17-1 23-4" />

        {/* shirt */}
        <path d="M100 78c0 6 4 8 4 12" />
        <path d="M90 96c4-4 7-6 14-6s10 2 14 6" />
        <path d="M90 96l-9 10 7 7 4-5" />
        <path d="M118 96l9 10-7 7-4-5" />
        <path d="M92 108v38h24v-38" />

        {/* skirt on a clip hanger */}
        <path d="M148 78c0 6-4 8-4 12" />
        <path d="M130 94h28" />
        <path d="M133 94c-3 16-6 28-9 44h48c-3-16-6-28-9-44" />
        <path d="M124 138c8 3 16 4 24 4s16-1 24-4" />
      </g>

      {/* tiny flower on the floor */}
      <g fill="var(--peach-deep)">
        <circle cx="152" cy="196" r="3" />
        <ellipse cx="152" cy="188" rx="3" ry="4.5" />
        <ellipse cx="152" cy="204" rx="3" ry="4.5" />
        <ellipse cx="144" cy="196" rx="4.5" ry="3" />
        <ellipse cx="160" cy="196" rx="4.5" ry="3" />
        <circle cx="152" cy="196" r="2.2" fill="var(--paper)" />
      </g>

      {/* sparkle */}
      <path
        d="M46 196c.6 4.2 3 6.6 7.2 7.2-4.2.6-6.6 3-7.2 7.2-.6-4.2-3-6.6-7.2-7.2 4.2-.6 6.6-3 7.2-7.2Z"
        fill="var(--peach-deep)"
      />
    </svg>
  )
}
