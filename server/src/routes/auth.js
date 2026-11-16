import { Router } from 'express'
import { hashPassword, verifyPassword } from '../lib/password.js'
import { signToken, cookieOptions, COOKIE_NAME } from '../lib/token.js'
import { parseSignUp, parseSignIn } from '../lib/validate.js'
import { conflict, unauthorized } from '../lib/httpError.js'
import { requireAuth } from '../middleware/requireAuth.js'

// Only ever send these fields back. The password hash never leaves the server.
const publicUser = (row) => ({ id: row.id, name: row.name, email: row.email })

export function authRoutes(usersRepo) {
  const router = Router()

  // POST /api/auth/signup
  router.post('/signup', async (req, res, next) => {
    try {
      const { name, email, password } = parseSignUp(req.body)

      const existing = await usersRepo.findByEmail(email)
      if (existing) {
        throw conflict('Check the fields below.', {
          email: 'That email is already registered. Sign in instead.',
        })
      }

      const passwordHash = await hashPassword(password)
      const user = await usersRepo.create({ name, email, passwordHash })

      res.cookie(COOKIE_NAME, signToken(user.id), cookieOptions)
      res.status(201).json({ user: publicUser(user) })
    } catch (err) {
      next(err)
    }
  })

  // POST /api/auth/signin
  router.post('/signin', async (req, res, next) => {
    try {
      const { email, password } = parseSignIn(req.body)
      const user = await usersRepo.findByEmail(email)

      // Same message whether the email is unknown or the password is wrong,
      // so the response cannot be used to discover which emails have accounts.
      const wrong = unauthorized('That email and password do not match.')
      if (!user) throw wrong
      const ok = await verifyPassword(password, user.password_hash)
      if (!ok) throw wrong

      res.cookie(COOKIE_NAME, signToken(user.id), cookieOptions)
      res.json({ user: publicUser(user) })
    } catch (err) {
      next(err)
    }
  })

  // POST /api/auth/signout
  router.post('/signout', (_req, res) => {
    res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined })
    res.json({ ok: true })
  })

  // GET /api/auth/me
  router.get('/me', requireAuth, async (req, res, next) => {
    try {
      const user = await usersRepo.findById(req.userId)
      if (!user) throw unauthorized()
      res.json({ user: publicUser(user) })
    } catch (err) {
      next(err)
    }
  })

  return router
}
