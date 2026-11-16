import { useState } from 'react'
import { Link } from 'react-router-dom'
import Backdrop from '../components/Backdrop'
import Paper from '../components/Paper'
import Button from '../components/Button'
import Field from '../components/Field'
import Wordmark from '../components/Wordmark'
import Flower from '../components/Flower'
import { copy } from '../lib/copy'
import { validateAuth } from '../lib/validate'
import './AuthPage.css'

// mode: 'signin' | 'signup'
export default function AuthPage({ mode }) {
  const isSignUp = mode === 'signup'
  const t = isSignUp ? copy.auth.signUp : copy.auth.signIn

  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  function update(field) {
    return (event) => {
      setValues((v) => ({ ...v, [field]: event.target.value }))
      if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateAuth(values, { withName: isSignUp })
    setErrors(found)
    if (Object.keys(found).length) return
    // The API call is wired up in the next step.
  }

  return (
    <div className="bg-soft auth">
      <Backdrop />
      <Paper className="auth__card">
        <aside className="auth__side">
          <Flower size={44} className="auth__side-flower" />
          <Wordmark size="lg" />
          <p className="serif italic auth__tagline">{copy.tagline}</p>
          <ul className="auth__lines">
            <li>{copy.auth.side.line1}</li>
            <li>{copy.auth.side.line2}</li>
            <li>{copy.auth.side.line3}</li>
          </ul>
          <Flower size={22} color="var(--sage)" className="auth__side-flower-sm" />
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

          <Button type="submit" block>
            {t.button}
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
