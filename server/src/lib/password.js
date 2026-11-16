import bcrypt from 'bcryptjs'

// Work factor. Higher is slower to crack and slower to log in. 12 is a common balance.
const ROUNDS = 12

export function hashPassword(plain) {
  return bcrypt.hash(plain, ROUNDS)
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash)
}
