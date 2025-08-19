import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Brain, 
  Briefcase, 
  TrendingUp, 
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Users
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface DashboardProps {
  onNavigate: (page: string) => void
}

const recentActivity = [
  { action: 'Resume updated', time: '2 hours ago', icon: FileText },
  { action: 'Job match found', time: '5 hours ago', icon: Brain },
  { action: 'Profile completed', time: '1 day ago', icon: CheckCircle },
]

const quickStats = [
  { label: 'Resume Score', value: '87%', trend: '+5%', icon: Star, color: 'text-green-600' },
  { label: 'Job Matches', value: '23', trend: '+12', icon: Briefcase, color: 'text-blue-600' },
  { label: 'Profile Views', value: '156', trend: '+28%', icon: Users, color: 'text-purple-600' },
]

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [userName, setUserName] = React.useState('')
  useEffect(() => {
    const fetchProfile = async () => {
      const userStr = localStorage.getItem('user')
      if (!userStr) return
      const user = JSON.parse(userStr)
      setUserName(user.name || '')
      if (user.id === 'demo') return
      const token = localStorage.getItem('token') || ''
      try {
        const res = await fetch('/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.ok) {
          const { user: profileUser } = await res.json()
          // Redirect to onboarding if profile is incomplete
          if (!profileUser.name || !profileUser.email || !profileUser.skills || profileUser.skills.length === 0) {
            window.location.href = '/onboarding'
          }
        }
      } catch (e) {
        // ignore
      }
    }
    fetchProfile()
  }, [])
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, {userName || 'User'}! 👋</h1>
        <p className="text-blue-100 text-lg">
          Let's continue building your career success story.
        </p>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <Button 
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={() => onNavigate('resume-builder')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Edit Resume
          </Button>
          <Button 
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            onClick={() => onNavigate('jobs')}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Browse Jobs
          </Button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <div className="flex items-baseline space-x-2">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                        <span className={`text-sm font-medium ${stat.color}`}>
                          {stat.trend}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-800`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Resume Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Resume Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Personal Information</span>
                  </div>
                  <Badge variant="secondary">Complete</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm">Work Experience</span>
                  </div>
                  <Badge variant="secondary">Complete</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                    <span className="text-sm">Skills Section</span>
                  </div>
                  <Badge variant="outline">Needs Attention</Badge>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => onNavigate('resume-builder')}
              >
                Continue Building
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-6"
                onClick={() => onNavigate('profile')}
              >
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col"
                onClick={() => onNavigate('ai-matchmaker')}
              >
                <Brain className="w-6 h-6 mb-2 text-purple-600" />
                <span>AI Job Match</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex-col"
                onClick={() => onNavigate('jobs')}
              >
                <Briefcase className="w-6 h-6 mb-2 text-blue-600" />
                <span>Find Jobs</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex-col"
                onClick={() => onNavigate('resume-builder')}
              >
                <FileText className="w-6 h-6 mb-2 text-green-600" />
                <span>Export Resume</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}