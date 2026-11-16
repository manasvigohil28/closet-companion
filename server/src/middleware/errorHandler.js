import { HttpError } from '../lib/httpError.js'

// The last middleware. Every thrown error ends up here so responses stay consistent.
export function errorHandler(err, _req, res, _next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message, fields: err.fields })
  }

  // Anything unexpected is logged for us and kept vague for the user,
  // so stack traces and database details never reach the browser.
  console.error(err)
  res.status(500).json({ message: 'Something went wrong on our side. Try again.' })
}

export function notFoundHandler(_req, res) {
  res.status(404).json({ message: 'Not found.' })
}
