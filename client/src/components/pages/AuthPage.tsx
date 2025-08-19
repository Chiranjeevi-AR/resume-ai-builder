import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Mail, Lock, ArrowLeft, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'

interface AuthPageProps {
  onNavigate: (page: string) => void
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')
  const { login, signup } = useAuth()

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation (only for signup)
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    // Confirm password validation (only for signup)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})
    setSuccessMessage('')

    try {
      let success = false
      if (isLogin) {
        success = await login(formData.email, formData.password)
        if (success) {
          // Check if user profile is complete
          const storedUser = localStorage.getItem('user')
          let goTo = 'dashboard'
          if (storedUser) {
            const user = JSON.parse(storedUser)
            if (!user.name || !user.email || !user.skills || (Array.isArray(user.skills) && user.skills.length === 0)) {
              goTo = 'onboarding'
            }
          }
          setSuccessMessage('Login successful! Redirecting...')
          setTimeout(() => onNavigate(goTo), 1000)
        } else {
          setErrors({ general: 'Invalid email or password' })
        }
      } else {
        success = await signup(formData.name, formData.email, formData.password)
        if (success) {
          setSuccessMessage('Account created successfully! Redirecting...')
          setTimeout(() => onNavigate('onboarding'), 1000)
        } else {
          setErrors({ general: 'Failed to create account. Please try again.' })
        }
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle input changes
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }))
    }
  }

  // Demo account handler
  const handleDemo = () => {
    login('demo@resumeai.com', 'demo', true).then(() => {
      onNavigate('dashboard')
    })
  }

  // Google auth handler
  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setErrors({})
    setSuccessMessage('')

    try {
      // In a real implementation, you would integrate with Google OAuth
      // For now, we'll simulate the process
      const success = await login('googleuser@resumeai.com', 'google', true)
      if (success) {
        setSuccessMessage('Google authentication successful! Redirecting...')
        setTimeout(() => onNavigate('dashboard'), 1000)
      } else {
        setErrors({ general: 'Google authentication failed. Please try again.' })
      }
    } catch (error) {
      setErrors({ general: 'Google authentication error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    setErrors({})
    setSuccessMessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-yellow-50 to-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('landing')}
          className="mb-8 text-zinc-600 hover:text-yellow-500"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-xl border border-yellow-100 bg-white">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center shadow">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-zinc-900">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
                <CardDescription className="text-lg mt-2 text-yellow-700">
                  {isLogin 
                    ? 'Sign in to your ResumeAI account'
                    : 'Join thousands of professionals using ResumeAI'
                  }
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Success Message */}
              {successMessage && (
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 text-sm">{successMessage}</span>
                </div>
              )}

              {/* Error Message */}
              {errors.general && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-red-800 text-sm">{errors.general}</span>
                </div>
              )}

              {/* Google Sign In */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black font-semibold shadow"
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLogin ? 'Sign in with Google' : 'Continue with Google'}
              </Button>

              {/* Demo Account Option */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 text-base border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black font-semibold shadow"
                onClick={handleDemo}
                disabled={isLoading}
              >
                Try Demo Account
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-yellow-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-yellow-700">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name field (only for signup) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`h-12 pl-10 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Email field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`h-12 pl-10 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`h-12 pl-10 pr-10 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password field (only for signup) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`h-12 pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                </Button>
              </form>

              {/* Toggle Login/Signup */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="text-yellow-600 hover:text-yellow-800 font-medium"
                  disabled={isLoading}
                >
                  {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}