import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import WelcomePage from './pages/WelcomePage'
import SoonPage from './pages/SoonPage'
import AppShell from './components/AppShell'
import { AuthProvider, useAuth } from './lib/auth'
import { copy } from './lib/copy'

// Nothing renders until we know whether there is a session, otherwise a
// signed-in user would see the sign-in page flash on every refresh.
function Gate({ children, when }) {
  const { user, status } = useAuth()
  if (status === 'loading') return <div className="bg-soft" style={{ minHeight: '100dvh' }} />
  if (when === 'signed-in' && !user) return <Navigate to="/signin" replace />
  if (when === 'signed-out' && user) return <Navigate to="/" replace />
  return children
}

// Signed-in pages share the top and bottom navigation.
function Private({ children }) {
  return (
    <Gate when="signed-in">
      <AppShell>{children}</AppShell>
    </Gate>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/signin"
            element={
              <Gate when="signed-out">
                <AuthPage mode="signin" />
              </Gate>
            }
          />
          <Route
            path="/signup"
            element={
              <Gate when="signed-out">
                <AuthPage mode="signup" />
              </Gate>
            }
          />
          <Route
            path="/"
            element={
              <Private>
                <WelcomePage />
              </Private>
            }
          />
          <Route
            path="/add"
            element={
              <Private>
                <SoonPage title={copy.nav.add} />
              </Private>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
