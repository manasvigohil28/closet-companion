// A stand-in for the users table that lives in memory.
// Used by the tests, and by `npm run dev:memory` before a real database exists.
// Everything disappears when the server stops.
export function createMemoryUsersRepo() {
  const rows = []
  let nextId = 1

  return {
    async create({ name, email, passwordHash }) {
      const row = {
        id: nextId++,
        name,
        email,
        password_hash: passwordHash,
        created_at: new Date(),
      }
      rows.push(row)
      const { password_hash, ...safe } = row
      return safe
    },

    async findByEmail(email) {
      return rows.find((r) => r.email === email) ?? null
    },

    async findById(id) {
      const row = rows.find((r) => r.id === Number(id))
      if (!row) return null
      const { password_hash, ...safe } = row
      return safe
    },
  }
}
