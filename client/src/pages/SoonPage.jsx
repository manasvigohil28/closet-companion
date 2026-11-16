// Placeholder for pages built in later steps, so the navigation links go somewhere.
import Paper from '../components/Paper'
import Button from '../components/Button'
import Backdrop from '../components/Backdrop'
import { copy } from '../lib/copy'

export default function SoonPage({ title }) {
  return (
    <div className="page" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
      <Backdrop tone="sage" />
      <Paper style={{ maxWidth: 420, textAlign: 'center' }}>
        <div className="stack">
          <span className="hand">{title}</span>
          <h1 style={{ fontSize: '1.8rem' }}>{copy.soon.title}</h1>
          <p className="soft">{copy.soon.text}</p>
          <Button variant="secondary" to="/">
            {copy.soon.back}
          </Button>
        </div>
      </Paper>
    </div>
  )
}
