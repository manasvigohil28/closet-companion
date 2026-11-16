import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from './config.js'
import { authRoutes } from './routes/auth.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

// The app is built from whatever user store it is handed.
// Real runs pass the PostgreSQL one, tests pass the in-memory one.
export function createApp({ usersRepo }) {
  const app = express()

  // Only our own frontend may call the API, and it may send the session cookie.
  // In development any localhost port is fine, since Vite moves ports when one is busy.
  const allowed = config.clientUrl.split(',').map((url) => url.trim())
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin) return callback(null, true) // curl, tests, same-origin
        const ok = allowed.includes(origin) || (!config.isProduction && /^http:\/\/localhost:\d+$/.test(origin))
        callback(ok ? null : new Error('Not allowed by CORS'), ok)
      },
      credentials: true,
    }),
  )
  app.use(express.json({ limit: '1mb' }))
  app.use(cookieParser())

  app.get('/api/health', (_req, res) => res.json({ ok: true }))
  app.use('/api/auth', authRoutes(usersRepo))

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
