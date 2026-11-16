import { COOKIE_NAME, verifyToken } from '../lib/token.js'
import { unauthorized } from '../lib/httpError.js'

// Reads the session cookie and puts the user id on the request.
// Every route that touches someone's closet goes through this.
export function requireAuth(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) return next(unauthorized())

  try {
    const payload = verifyToken(token)
    req.userId = Number(payload.sub)
    next()
  } catch {
    next(unauthorized('Your session ended. Sign in again.'))
  }
}
