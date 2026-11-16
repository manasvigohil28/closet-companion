// A flat cream card with a thin border.
export default function Paper({ className = '', children, ...rest }) {
  return (
    <div className={`paper ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}
