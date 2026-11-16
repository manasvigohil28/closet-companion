import pg from 'pg'
import { config } from '../config.js'

// One shared pool of connections for the whole server.
// Opening a new connection per query would be slow and would exhaust the database.
export const pool = new pg.Pool({
  connectionString: config.databaseUrl,
  // Neon and Render require TLS. Locally it is usually off.
  ssl: config.databaseUrl?.includes('localhost') ? false : { rejectUnauthorized: false },
  max: 10,
})

export const query = (text, params) => pool.query(text, params)
