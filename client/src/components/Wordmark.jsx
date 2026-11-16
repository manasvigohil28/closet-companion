// The app name: "closet" in serif, "companion" in script, like a shop logo.
export default function Wordmark({ size = 'md', align = 'left' }) {
  return (
    <span
      className={`wordmark wordmark--${size} wordmark--${align}`}
      aria-label="Closet Companion"
    >
      <span className="wordmark__serif">closet</span>
      <span className="wordmark__script">companion</span>
    </span>
  )
}
