import { NavLink } from 'react-router-dom'
import { Shirt, Plus, LogOut } from 'lucide-react'
import Wordmark from './Wordmark'
import { useAuth } from '../lib/auth'
import { copy } from '../lib/copy'
import './AppShell.css'

const links = [
  { to: '/', label: copy.nav.closet, Icon: Shirt, end: true },
  { to: '/add', label: copy.nav.add, Icon: Plus, end: false },
]

// The frame every signed-in page sits inside: a top bar on desktop,
// a bottom bar on a phone, and the page itself in between.
export default function AppShell({ children }) {
  const { signOut } = useAuth()

  return (
    <div className="shell bg-soft">
      <header className="shell__top">
        <div className="shell__top-inner">
          <NavLink to="/" className="shell__brand" aria-label={copy.appName}>
            <Wordmark />
          </NavLink>

          <nav className="shell__links" aria-label="Main">
            {links.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className="shell__link">
                {label}
              </NavLink>
            ))}
            <button type="button" className="btn btn--quiet" onClick={signOut}>
              {copy.nav.signOut}
            </button>
          </nav>
        </div>
      </header>

      <main className="shell__main">{children}</main>

      <nav className="shell__bottom" aria-label="Main">
        {links.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className="shell__tab">
            <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
            <span>{label}</span>
          </NavLink>
        ))}
        <button type="button" className="shell__tab" onClick={signOut}>
          <LogOut size={20} strokeWidth={1.6} aria-hidden="true" />
          <span>{copy.nav.signOut}</span>
        </button>
      </nav>
    </div>
  )
}
