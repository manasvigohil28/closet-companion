import { badRequest } from './httpError.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const MIN_PASSWORD = 8

// The browser checks these too, but the browser can be bypassed, so the server decides.
export function parseSignUp(body = {}) {
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  const fields = {}
  if (!name) fields.name = 'Add your name so we know what to call you.'
  else if (name.length > 80) fields.name = 'That name is too long.'
  if (!email) fields.email = 'Add your email to continue.'
  else if (!EMAIL.test(email)) fields.email = 'That email looks off. Check for a typo.'
  if (!password) fields.password = 'Add your password to continue.'
  else if (password.length < MIN_PASSWORD) fields.password = 'Use at least 8 characters.'
  else if (password.length > 200) fields.password = 'That password is too long.'

  if (Object.keys(fields).length) throw badRequest('Check the fields below.', fields)
  return { name, email, password }
}

export function parseSignIn(body = {}) {
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  const fields = {}
  if (!email) fields.email = 'Add your email to continue.'
  if (!password) fields.password = 'Add your password to continue.'

  if (Object.keys(fields).length) throw badRequest('Check the fields below.', fields)
  return { email, password }
}
