import { Link } from 'react-router-dom'

// variant: 'primary' | 'secondary' | 'quiet'
export default function Button({
  variant = 'primary',
  block = false,
  to,
  children,
  className = '',
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
