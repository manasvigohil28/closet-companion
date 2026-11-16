// Every environment value the server needs, read in one place.
export const config = {
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  isProduction: process.env.NODE_ENV === 'production',
  // How long a signed-in session lasts.
  sessionDays: 7,
}

export const SESSION_MS = config.sessionDays * 24 * 60 * 60 * 1000
