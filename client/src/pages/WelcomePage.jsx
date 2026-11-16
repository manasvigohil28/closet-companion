import { Shirt, Sparkles, ShoppingBag } from 'lucide-react'
import Backdrop from '../components/Backdrop'
import Button from '../components/Button'
import Flower from '../components/Flower'
import { useAuth } from '../lib/auth'
import { copy } from '../lib/copy'
import './WelcomePage.css'

const steps = [
  { ...copy.welcome.steps[0], Icon: Shirt, tone: 'peach' },
  { ...copy.welcome.steps[1], Icon: Sparkles, tone: 'sage' },
  { ...copy.welcome.steps[2], Icon: ShoppingBag, tone: 'blush' },
]

// Shown after sign-in while the closet is empty.
export default function WelcomePage() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0]

  return (
    <div className="welcome">
      <Backdrop />

      <header className="welcome__head">
        <span className="hand">{copy.welcome.script}</span>
        <h1>
          {copy.welcome.title}
          {firstName ? `, ${firstName}` : ''}
        </h1>
        <p className="welcome__lede soft">{copy.welcome.lede}</p>
      </header>

      <ol className="welcome__steps">
        {steps.map(({ number, title, text, Icon, tone }) => (
          <li key={number} className={`step step--${tone}`}>
            <span className="step__number">{number}</span>
            <Icon className="step__icon" size={26} strokeWidth={1.4} aria-hidden="true" />
            <h2 className="step__title">{title}</h2>
            <p className="step__text">{text}</p>
          </li>
        ))}
      </ol>

      <div className="welcome__cta">
        <Flower size={26} className="welcome__cta-flower" />
        <Button to="/add">{copy.welcome.cta}</Button>
        <p className="welcome__note soft">{copy.welcome.note}</p>
      </div>
    </div>
  )
}
