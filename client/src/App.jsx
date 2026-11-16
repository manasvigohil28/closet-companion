import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import HomePlaceholder from './pages/HomePlaceholder'
import { AuthProvider, useAuth } from './lib/auth'

// Nothing renders until we know whether there is a session, otherwise a
// signed-in user would see the sign-in page flash on every refresh.
function Gate({ children, when }) {
  const { user, status } = useAuth()
  if (status === 'loading') return <div className="bg-soft auth" />
  if (when === 'signed-in' && !user) return <Navigate to="/signin" replace />
  if (when === 'signed-out' && user) return <Navigate to="/" replace />
  return children
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
              <Gate when="signed-in">
                <HomePlaceholder />
              </Gate>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
