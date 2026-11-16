import test from 'node:test'
import assert from 'node:assert/strict'

process.env.JWT_SECRET ??= 'test-secret'
process.env.NODE_ENV = 'test'

const { createApp } = await import('../src/app.js')
const { createMemoryUsersRepo } = await import('../src/db/users.memory.js')

// Starts the app on a free port and returns helpers that keep the session cookie,
// the way a browser would.
async function startApp() {
  const app = createApp({ usersRepo: createMemoryUsersRepo() })
  const server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  const base = `http://localhost:${server.address().port}`
  let cookie = ''

  async function call(path, options = {}) {
    const res = await fetch(base + path, {
      ...options,
      headers: {
        'content-type': 'application/json',
        ...(cookie ? { cookie } : {}),
        ...options.headers,
      },
    })
    const setCookie = res.headers.get('set-cookie')
    if (setCookie) cookie = setCookie.split(';')[0]
    const body = await res.json().catch(() => null)
    return { status: res.status, body, setCookie }
  }

  const post = (path, data) => call(path, { method: 'POST', body: JSON.stringify(data) })
  const get = (path) => call(path)
  const close = () => new Promise((resolve) => server.close(resolve))

  return { post, get, close, forgetCookie: () => (cookie = '') }
}

const alice = { name: 'Alice', email: 'alice@example.com', password: 'lemon-cake-99' }

test('POST /api/auth/signup creates an account and sets a session cookie', async (t) => {
  const app = await startApp()
  t.after(app.close)

  const res = await app.post('/api/auth/signup', alice)

  assert.equal(res.status, 201)
  assert.equal(res.body.user.email, 'alice@example.com')
  assert.equal(res.body.user.password_hash, undefined, 'never send the hash to the browser')
  assert.match(res.setCookie, /HttpOnly/i)
})

test('POST /api/auth/signup rejects a short password and a bad email', async (t) => {
  const app = await startApp()
  t.after(app.close)

  const res = await app.post('/api/auth/signup', { name: 'A', email: 'nope', password: 'short' })

  assert.equal(res.status, 400)
  assert.ok(res.body.fields.email)
  assert.ok(res.body.fields.password)
})

test('POST /api/auth/signup rejects an email that is already registered', async (t) => {
  const app = await startApp()
  t.after(app.close)

  await app.post('/api/auth/signup', alice)
  const res = await app.post('/api/auth/signup', alice)

  assert.equal(res.status, 409)
  assert.ok(res.body.fields.email)
})

test('POST /api/auth/signin works with the right password and fails with the wrong one', async (t) => {
  const app = await startApp()
  t.after(app.close)
  await app.post('/api/auth/signup', alice)

  const ok = await app.post('/api/auth/signin', { email: alice.email, password: alice.password })
  assert.equal(ok.status, 200)
  assert.equal(ok.body.user.name, 'Alice')

  const bad = await app.post('/api/auth/signin', { email: alice.email, password: 'wrong-one-123' })
  assert.equal(bad.status, 401)

  const unknown = await app.post('/api/auth/signin', { email: 'nobody@example.com', password: 'wrong-one-123' })
  assert.equal(
    unknown.body.message,
    bad.body.message,
    'same message either way, so emails cannot be discovered',
  )
})

test('GET /api/auth/me needs a session and returns the signed-in user', async (t) => {
  const app = await startApp()
  t.after(app.close)

  const noSession = await app.get('/api/auth/me')
  assert.equal(noSession.status, 401)

  await app.post('/api/auth/signup', alice)
  const withSession = await app.get('/api/auth/me')
  assert.equal(withSession.status, 200)
  assert.equal(withSession.body.user.email, alice.email)
})

test('POST /api/auth/signout clears the session', async (t) => {
  const app = await startApp()
  t.after(app.close)
  await app.post('/api/auth/signup', alice)

  const out = await app.post('/api/auth/signout', {})
  assert.equal(out.status, 200)

  const after = await app.get('/api/auth/me')
  assert.equal(after.status, 401)
})
