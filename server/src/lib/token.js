import jwt from 'jsonwebtoken'
import { config, SESSION_MS } from '../config.js'

export const COOKIE_NAME = 'cc_session'

export function signToken(userId) {
  // The token says who the user is and when it stops being valid. Nothing secret goes inside.
  return jwt.sign({ sub: String(userId) }, config.jwtSecret, {
    expiresIn: `${config.sessionDays}d`,
  })
}

export function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret)
}

export const cookieOptions = {
  httpOnly: true, // JavaScript in the browser cannot read it, which blunts XSS token theft
  sameSite: config.isProduction ? 'none' : 'lax', // 'none' because the API is on another domain in production
  secure: config.isProduction, // only sent over HTTPS in production
  maxAge: SESSION_MS,
  path: '/',
}
