const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Thrown for any non-2xx reply. `fields` holds per-field messages from the server.
export class ApiError extends Error {
  constructor(message, fields, status) {
    super(message)
    this.fields = fields
    this.status = status
  }
}

async function request(path, { method = 'GET', body } = {}) {
  let res
  try {
    res = await fetch(BASE + path, {
      method,
      credentials: 'include', // send and accept the session cookie
      headers: body ? { 'content-type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('We could not reach the server. Check your connection and try again.')
  }

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new ApiError(data?.message || 'Something went wrong. Try again.', data?.fields, res.status)
  }
  return data
}

export const api = {
  signUp: (payload) => request('/api/auth/signup', { method: 'POST', body: payload }),
  signIn: (payload) => request('/api/auth/signin', { method: 'POST', body: payload }),
  signOut: () => request('/api/auth/signout', { method: 'POST', body: {} }),
  me: () => request('/api/auth/me'),
}
