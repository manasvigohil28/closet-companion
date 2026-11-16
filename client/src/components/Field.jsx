import { useId } from 'react'

// A label, an input, and an optional inline error.
export default function Field({ label, error, ...inputProps }) {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id} className="field__label">
        {label}
      </label>
      <input
        id={id}
        className={`input${error ? ' input--error' : ''}`}
        aria-invalid={error ? 'true' : undefined}
        {...inputProps}
      />
      {error && <p className="field__error">{error}</p>}
    </div>
  )
}
