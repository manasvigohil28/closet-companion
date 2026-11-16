// Soft flat blobs and a few tiny flowers and sparkles behind a page.
// Place inside a parent with the bg-soft class.
//
// tone picks which color leads. strength 'wash' is very pale, for pages whose
// cards use the same family of colors. 'soft' is the richer version, used where
// the card on top is a different color and cannot blend into it.
const palettes = {
  peach: ['peach', 'sage', 'blush'],
  sage: ['sage', 'peach', 'blush'],
  blush: ['blush', 'sage', 'peach'],
  // peach leading, pink second: used behind the sage card on the sign-in page
  'peach-blush': ['peach', 'blush', 'sage'],
}

export default function Backdrop({ tone = 'peach', strength = 'wash' }) {
  const [a, b, c] = palettes[tone] ?? palettes.peach
  const shade = (name) => `var(--${name}-${strength})`

  return (
    <div className="backdrop" aria-hidden="true">
      {/* big blob, top left */}
      <svg
        className="backdrop__blob"
        style={{ top: '-18%', left: '-22%', width: '70vw', minWidth: 360 }}
        viewBox="0 0 400 400"
      >
        <path
          fill={shade(a)}
          d="M212 24c72-10 151 28 170 98 20 72-26 139-82 176-57 38-134 46-193 8C47 268 4 199 16 133 27 68 92 40 212 24Z"
        />
      </svg>

      {/* blob, bottom right */}
      <svg
        className="backdrop__blob"
        style={{ bottom: '-14%', right: '-20%', width: '60vw', minWidth: 300 }}
        viewBox="0 0 400 400"
      >
        <path
          fill={shade(b)}
          d="M186 18c85-12 171 46 189 126 18 83-40 150-108 190-66 39-150 36-205-14C9 269 0 193 24 126 48 57 101 30 186 18Z"
        />
      </svg>

      {/* small blob, mid right */}
      <svg
        className="backdrop__blob"
        style={{ top: '38%', right: '-8%', width: '26vw', minWidth: 140 }}
        viewBox="0 0 200 200"
      >
        <path
          fill={shade(c)}
          d="M98 10c48-6 92 26 98 70 6 46-28 86-70 102-44 16-98 2-116-40C-8 98 6 50 40 28 60 16 72 13 98 10Z"
        />
      </svg>

      {/* flower */}
      <svg
        className="backdrop__deco"
        style={{ top: '12%', right: '10%', width: 34 }}
        viewBox="0 0 40 40"
        fill="currentColor"
      >
        <circle cx="20" cy="20" r="4" />
        <ellipse cx="20" cy="8" rx="4" ry="7" />
        <ellipse cx="20" cy="32" rx="4" ry="7" />
        <ellipse cx="8" cy="20" rx="7" ry="4" />
        <ellipse cx="32" cy="20" rx="7" ry="4" />
      </svg>

      {/* sparkles */}
      <svg
        className="backdrop__deco"
        style={{ top: '62%', left: '4%', width: 18 }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" />
      </svg>
      <svg
        className="backdrop__deco"
        style={{ bottom: '22%', left: '14%', width: 12 }}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" />
      </svg>

      {/* small flower, bottom left */}
      <svg
        className="backdrop__deco"
        style={{ bottom: '8%', left: '6%', width: 24, color: 'var(--sage)' }}
        viewBox="0 0 40 40"
        fill="currentColor"
      >
        <circle cx="20" cy="20" r="4" />
        <ellipse cx="20" cy="8" rx="4" ry="7" />
        <ellipse cx="20" cy="32" rx="4" ry="7" />
        <ellipse cx="8" cy="20" rx="7" ry="4" />
        <ellipse cx="32" cy="20" rx="7" ry="4" />
      </svg>
    </div>
  )
}
