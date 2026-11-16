import { copy } from './copy'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const e = copy.auth.errors

export function validateAuth({ name, email, password }, { withName }) {
  const errors = {}
  if (withName && !name.trim()) errors.name = e.nameRequired
  if (!email.trim()) errors.email = e.emailRequired
  else if (!EMAIL.test(email.trim())) errors.email = e.emailInvalid
  if (!password) errors.password = e.passwordRequired
  else if (password.length < 8) errors.password = e.passwordShort
  return errors
}
