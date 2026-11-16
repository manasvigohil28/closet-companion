import { createApp } from './app.js'
import { config } from './config.js'
import { createMemoryUsersRepo } from './db/users.memory.js'

// --memory runs without a database, for trying the app before Postgres is set up.
const useMemory = process.argv.includes('--memory')

if (!config.jwtSecret) {
  console.error('JWT_SECRET is missing. Copy .env.example to .env and fill it in.')
  process.exit(1)
}
if (!useMemory && !config.databaseUrl) {
  console.error('DATABASE_URL is missing. Add it to .env, or run: npm run dev:memory')
  process.exit(1)
}

const usersRepo = useMemory
  ? createMemoryUsersRepo()
  : (await import('./db/users.pg.js')).usersRepo

createApp({ usersRepo }).listen(config.port, () => {
  console.log(
    `API on http://localhost:${config.port}${useMemory ? '  (memory mode, data is not saved)' : ''}`,
  )
})
