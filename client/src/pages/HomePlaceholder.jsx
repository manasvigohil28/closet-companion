// Temporary landing spot after signing in. The welcome page and closet replace it
// in the next step.
import Backdrop from '../components/Backdrop'
import Paper from '../components/Paper'
import Button from '../components/Button'
import Wordmark from '../components/Wordmark'
import { useAuth } from '../lib/auth'

export default function HomePlaceholder() {
  const { user, signOut } = useAuth()

  return (
    <div className="bg-soft auth">
      <Backdrop tone="sage" />
      <Paper style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <div className="stack">
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Wordmark />
          </div>
          <p className="hand">signed in</p>
          <h1>Hello, {user?.name}</h1>
          <p className="soft">Your welcome page and closet come next.</p>
          <Button variant="secondary" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </Paper>
    </div>
  )
}
