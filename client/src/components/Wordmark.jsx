// The app name: "closet" in serif, "companion" in script, like a shop logo.
export default function Wordmark({ size = 'md' }) {
  return (
    <span className={`wordmark wordmark--${size}`} aria-label="Closet Companion">
      <span className="wordmark__serif">closet</span>
      <span className="wordmark__script">companion</span>
    </span>
  )
}
