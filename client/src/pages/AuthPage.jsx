import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Backdrop from '../components/Backdrop'
import Paper from '../components/Paper'
import Button from '../components/Button'
import Field from '../components/Field'
import Wordmark from '../components/Wordmark'
import Flower from '../components/Flower'
import ClosetArch from '../components/ClosetArch'
import { copy } from '../lib/copy'
import { validateAuth } from '../lib/validate'
import { useAuth } from '../lib/auth'
import { ApiError } from '../lib/api'
import './AuthPage.css'

// mode: 'signin' | 'signup'
export default function AuthPage({ mode }) {
  const isSignUp = mode === 'signup'
  const t = isSignUp ? copy.auth.signUp : copy.auth.signIn

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  function update(field) {
    return (event) => {
      setValues((v) => ({ ...v, [field]: event.target.value }))
      if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
      if (formError) setFormError('')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (busy) return

    const found = validateAuth(values, { withName: isSignUp })
    setErrors(found)
    if (Object.keys(found).length) return

    const payload = isSignUp
      ? { name: values.name.trim(), email: values.email.trim(), password: values.password }
      : { email: values.email.trim(), password: values.password }

    setBusy(true)
    setFormError('')
    try {
      await (isSignUp ? signUp(payload) : signIn(payload))
      navigate('/', { replace: true })
    } catch (err) {
      if (err instanceof ApiError && err.fields) setErrors(err.fields)
      else setFormError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bg-soft auth">
      {/* peach and pink shapes, so the sage panel on the card never blends in */}
      <Backdrop tone="peach-blush" strength="soft" />
      <Paper className="auth__card">
        <aside className="auth__side">
          <Flower size={40} className="auth__side-flower" />
          <Wordmark size="lg" align="center" />
          <p className="serif italic auth__tagline">{copy.tagline}</p>
          <ClosetArch className="auth__art" />
          <Flower size={20} color="var(--peach-deep)" className="auth__side-flower-sm" />
        </aside>

        <form className="auth__form" onSubmit={handleSubmit} noValidate>
          <div className="auth__heading">
            <span className="hand">{t.script}</span>
            <h1>{t.title}</h1>
          </div>

          {isSignUp && (
            <Field
              label={copy.auth.fields.name}
              type="text"
              name="name"
              autoComplete="name"
              placeholder={copy.auth.placeholders.name}
              value={values.name}
              onChange={update('name')}
              error={errors.name}
            />
          )}
          <Field
            label={copy.auth.fields.email}
            type="email"
            name="email"
            autoComplete="email"
            placeholder={copy.auth.placeholders.email}
            value={values.email}
            onChange={update('email')}
            error={errors.email}
          />
          <Field
            label={copy.auth.fields.password}
            type="password"
            name="password"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            placeholder={copy.auth.placeholders.password}
            value={values.password}
            onChange={update('password')}
            error={errors.password}
          />

          {formError && (
            <p className="auth__form-error" role="alert">
              {formError}
            </p>
          )}

          <Button type="submit" block disabled={busy}>
            {busy ? t.busy : t.button}
          </Button>

          <p className="auth__switch serif italic soft">
            {t.switchPrompt}{' '}
            <Link to={isSignUp ? '/signin' : '/signup'}>{t.switchLink}</Link>
          </p>
        </form>
      </Paper>
    </div>
  )
}
