import { query } from './pool.js'

// Every query uses $1 placeholders. Values never get glued into the SQL string,
// which is what stops SQL injection.
export const usersRepo = {
  async create({ name, email, passwordHash }) {
    const { rows } = await query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, passwordHash],
    )
    return rows[0]
  },

  async findByEmail(email) {
    const { rows } = await query(
      `SELECT id, name, email, password_hash, created_at FROM users WHERE email = $1`,
      [email],
    )
    return rows[0] ?? null
  },

  async findById(id) {
    const { rows } = await query(
      `SELECT id, name, email, created_at FROM users WHERE id = $1`,
      [id],
    )
    return rows[0] ?? null
  },
}
