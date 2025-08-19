import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  FileText, 
  Brain, 
  Briefcase, 
  User, 
  Menu, 
  X,
  Bell,
  Moon,
  Sun,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'

interface LayoutProps {
  children: React.ReactNode
  currentPage: string
  onNavigate: (page: string) => void
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'resume-builder', label: 'Resume Builder', icon: FileText },
  { id: 'ai-matchmaker', label: 'AI Matchmaker', icon: Brain },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'profile', label: 'Profile', icon: User },
]

export const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar - Desktop */}
      <motion.div 
        className="hidden lg:flex lg:w-64 lg:flex-col"
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex items-center flex-shrink-0 px-4 py-6">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              ResumeAI
            </span>
          </div>
          
          <nav className="mt-8 flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </motion.button>
              )
            })}
          </nav>
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <motion.div 
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <motion.div 
            className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            <div className="flex items-center flex-shrink-0 px-4 py-6">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                ResumeAI
              </span>
            </div>
            
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-xl transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </motion.div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </Button>
              
              <h1 className="ml-4 text-2xl font-semibold text-gray-900 dark:text-white capitalize">
                {currentPage.replace('-', ' ')}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <Switch checked={isDark} onCheckedChange={toggleTheme} />
                <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </Button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.avatar}
                  alt={user?.name}
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}