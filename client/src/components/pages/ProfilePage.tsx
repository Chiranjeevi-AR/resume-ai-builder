import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  FileText, 
  Settings, 
  Activity,
  Download,
  Edit,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'

interface ProfilePageProps {
  onNavigate: (page: string) => void
}

const recentResumes = [
  {
    id: '1',
    name: 'Senior Developer Resume',
    lastModified: '2 hours ago',
    matchScore: 87,
    downloads: 5
  },
  {
    id: '2',
    name: 'Frontend Specialist Resume',
    lastModified: '1 week ago',
    matchScore: 92,
    downloads: 12
  },
  {
    id: '3',
    name: 'Full Stack Resume',
    lastModified: '2 weeks ago',
    matchScore: 78,
    downloads: 8
  }
]

const activityLog = [
  { action: 'Resume updated', details: 'Senior Developer Resume', time: '2 hours ago', icon: FileText },
  { action: 'Job matched', details: 'Frontend Developer at TechCorp (87% match)', time: '5 hours ago', icon: Activity },
  { action: 'Resume exported', details: 'PDF downloaded', time: '1 day ago', icon: Download },
  { action: 'Profile updated', details: 'Skills section enhanced', time: '2 days ago', icon: Settings },
  { action: 'Job applied', details: 'Applied to React Developer position', time: '3 days ago', icon: FileText },
]

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useAuth()
  const [loadingProfile, setLoadingProfile] = useState(false)

  // Neon theme for demo account
  const isDemo = user?.id === 'demo'

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    website: user?.website || '',
    linkedin: user?.linkedin || '',
    bio: user?.bio || '',
    skills: user?.skills || []
  })

  // Fetch latest profile from backend on mount and when user changes
  useEffect(() => {
    // Prevent running this effect if already on onboarding page
    if (typeof window !== 'undefined' && window.location.pathname.includes('onboarding')) {
      return;
    }
    const fetchProfile = async () => {
      if (!user || user.id === 'demo') return
      setLoadingProfile(true)
      try {
        const token = localStorage.getItem('token') || ''
        const res = await fetch('/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (res.ok) {
          const { user: profileUser } = await res.json()
          setProfileData({
            name: profileUser.name || '',
            email: profileUser.email || '',
            phone: profileUser.phone || '',
            location: profileUser.location || '',
            website: profileUser.website || '',
            linkedin: profileUser.linkedin || '',
            bio: profileUser.bio || '',
            skills: profileUser.skills || []
          })
          // Only check for redirect after loading is finished and not on onboarding
          if (
            (!profileUser.name || !profileUser.email || !profileUser.skills || profileUser.skills.length === 0)
          ) {
            onNavigate('onboarding')
          }
        }
      } catch (e) {
        // ignore
      } finally {
        setLoadingProfile(false)
      }
    }
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, onNavigate])

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save to a backend
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'resumes', label: 'My Resumes' },
    { id: 'activity', label: 'Activity' },
    { id: 'settings', label: 'Settings' }
  ]

  return (
    <div className={`space-y-6 ${isDemo ? 'min-h-screen bg-gradient-to-br from-black via-yellow-900/40 to-yellow-400 text-yellow-100 border-4 border-yellow-400 shadow-[0_0_40px_10px_rgba(255,255,0,0.2)] rounded-2xl p-2' : ''}`}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className={isDemo ? 'bg-black border-2 border-yellow-400 shadow-[0_0_24px_4px_rgba(255,255,0,0.3)]' : ''}>
          <CardContent className={`p-8 ${isDemo ? 'bg-gradient-to-br from-black via-yellow-900/60 to-yellow-800' : ''}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <img
                  src={user?.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`}
                  alt="Profile"
                  className={`w-24 h-24 rounded-full object-cover ${isDemo ? 'ring-4 ring-yellow-400 shadow-[0_0_24px_4px_rgba(255,255,0,0.5)]' : ''}`}
                />
                <Button
                  size="icon"
                  variant={isDemo ? 'outline' : 'outline'}
                  className={`absolute -bottom-2 -right-2 rounded-full w-8 h-8 ${isDemo ? 'border-yellow-400 text-yellow-400 bg-black hover:bg-yellow-400 hover:text-black' : ''}`}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className={`text-2xl font-bold mb-2 ${isDemo ? 'text-yellow-300 drop-shadow-[0_0_8px_#fde047]' : 'text-gray-900 dark:text-white'}`}>
                      {profileData.name}
                    </h1>
                    <p className={`mb-4 max-w-lg ${isDemo ? 'text-yellow-200/90' : 'text-gray-600 dark:text-gray-300'}`}>
                      {profileData.bio}
                    </p>
                    <div className={`flex flex-wrap gap-4 text-sm ${isDemo ? 'text-yellow-200/80' : 'text-gray-500 dark:text-gray-400'}`}>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {profileData.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {profileData.phone}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? (isDemo ? 'default' : 'default') : (isDemo ? 'outline' : 'outline')}
                    className={isDemo ? 'border-yellow-400 text-yellow-400 bg-black hover:bg-yellow-400 hover:text-black' : ''}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tab Navigation */}
      <Card className={isDemo ? 'bg-black border-yellow-400' : ''}>
        <CardContent className={`p-0 ${isDemo ? 'bg-gradient-to-r from-black via-yellow-900/60 to-yellow-800' : ''}`}>
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className={`grid lg:grid-cols-3 gap-6 ${isDemo ? 'text-yellow-100' : ''}`}>
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key="overview"
              className="space-y-6"
            >
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">3</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Resumes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">87%</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Best Match</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">25</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Downloads</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">156</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Profile Views</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Skills</CardTitle>
                  {isEditing && (
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Skills
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <Input
                            value={profileData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <Input
                            type="email"
                            value={profileData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <Input
                            value={profileData.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Location</label>
                          <Input
                            value={profileData.location}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Website</label>
                          <Input
                            value={profileData.website}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">LinkedIn</label>
                          <Input
                            value={profileData.linkedin}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileData(prev => ({ ...prev, linkedin: e.target.value }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'resumes' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key="resumes"
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">My Resumes</h3>
                <Button onClick={() => onNavigate('resume-builder')}>
                  <FileText className="w-4 h-4 mr-2" />
                  New Resume
                </Button>
              </div>
              
              {recentResumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {resume.name}
                          </h4>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>Modified {resume.lastModified}</span>
                            <span>•</span>
                            <span>{resume.downloads} downloads</span>
                            <Badge variant="outline" className="ml-auto">
                              {resume.matchScore}% match
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              key="activity"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityLog.map((activity, index) => {
                      const Icon = activity.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1">
                            <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.action}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {activity.details}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              {activity.time}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => onNavigate('resume-builder')}
              >
                <FileText className="w-4 h-4 mr-3" />
                Resume Builder
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => onNavigate('ai-matchmaker')}
              >
                <Activity className="w-4 h-4 mr-3" />
                AI Matchmaker
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => onNavigate('jobs')}
              >
                <User className="w-4 h-4 mr-3" />
                Browse Jobs
              </Button>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{profileData.website}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{profileData.linkedin}</span>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Plan</span>
                  <Badge>Free</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Member since</span>
                  <span className="text-gray-500">Jan 2024</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Upgrade to Pro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}