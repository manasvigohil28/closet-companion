import { createContext, useContext, useEffect, useState } from 'react'
import { api } from './api'

const AuthContext = createContext(null)

// Holds the signed-in user for the whole app, so any page can read it
// without passing it down through props.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // 'loading' until we have asked the server who is signed in. This is what
  // keeps a page refresh from bouncing a signed-in user back to the sign-in page.
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    api
      .me()
      .then((data) => !cancelled && setUser(data.user))
      .catch(() => !cancelled && setUser(null))
      .finally(() => !cancelled && setStatus('ready'))
    return () => {
      cancelled = true
    }
  }, [])

  const value = {
    user,
    status,
    signIn: async (payload) => setUser((await api.signIn(payload)).user),
    signUp: async (payload) => setUser((await api.signUp(payload)).user),
    signOut: async () => {
      await api.signOut()
      setUser(null)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
