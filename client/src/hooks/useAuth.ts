import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, isDemo?: boolean) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useAuthProvider = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session and token
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, isDemo = false): Promise<boolean> => {
    setIsLoading(true)
    try {
      if (isDemo) {
        // Demo user
        const demoUser: User = {
          id: 'demo',
          name: 'John Doe',
          email: 'demo@resumeai.com',
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
        }
        localStorage.setItem('user', JSON.stringify(demoUser))
        localStorage.setItem('token', 'demo-token')
        setUser(demoUser)
        setIsLoading(false)
        return true
      } else {
        // Real user: call backend
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        
        const data = await res.json()
        
        if (!res.ok) {
          console.error('Login failed:', data)
          return false
        }
        
        // Store token and user data
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setUser(data.user)
        setIsLoading(false)
        return true
      }
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        console.error('Signup failed:', data)
        return false
      }
      
      // Store token and user data
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      setIsLoading(false)
      return true
    } catch (error) {
      console.error('Signup error:', error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, login, signup, logout, isLoading }
}

export { AuthContext }