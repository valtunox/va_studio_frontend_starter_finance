import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '@/lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await authApi.me()
      setUser(data)
      setError(null)
    } catch (err) {
      setUser(null)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async ({ email, password }) => {
    try {
      setError(null)
      setLoading(true)
      const { data } = await authApi.login(email, password)
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      await fetchUser()
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.detail || 'Login failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [fetchUser])

  const register = useCallback(async ({ name, email, password }) => {
    try {
      setError(null)
      setLoading(true)
      await authApi.register({ name, email, password })
      // Auto-login after registration
      return await login({ email, password })
    } catch (err) {
      const message = err.response?.data?.detail || 'Registration failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }, [login])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // Ignore logout API errors
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setUser(null)
      setError(null)
    }
  }, [])

  const forgotPassword = useCallback(async (email) => {
    try {
      setError(null)
      const { data } = await authApi.forgotPassword(email)
      return { success: true, message: data.message }
    } catch (err) {
      const message = err.response?.data?.detail || 'Request failed'
      setError(message)
      return { success: false, error: message }
    }
  }, [])

  const resetPassword = useCallback(async (token, newPassword) => {
    try {
      setError(null)
      const { data } = await authApi.resetPassword(token, newPassword)
      return { success: true, message: data.message }
    } catch (err) {
      const message = err.response?.data?.detail || 'Reset failed'
      setError(message)
      return { success: false, error: message }
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    clearError,
    refreshUser: fetchUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
