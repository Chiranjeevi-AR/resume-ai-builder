import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code,
  Plus,
  Trash2,
  Download,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import type { Resume, Experience, Education, Skill, Project } from '@/types'

interface ResumeBuilderProps {
  onNavigate: (page: string) => void
}

const initialResume: Resume = {
  id: '1',
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedIn: 'linkedin.com/in/johndoe',
    website: 'johndoe.com'
  },
  summary: 'Experienced software engineer with 5+ years developing scalable web applications. Passionate about clean code, user experience, and building products that make a difference.',
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: 'Led development of microservices architecture serving 1M+ users. Improved system performance by 40% and reduced deployment time by 60%.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2016-09',
      endDate: '2020-06',
      gpa: '3.8'
    }
  ],
  skills: [
    { id: '1', name: 'React', level: 'Expert', category: 'Technical' },
    { id: '2', name: 'TypeScript', level: 'Advanced', category: 'Technical' },
    { id: '3', name: 'Node.js', level: 'Advanced', category: 'Technical' },
    { id: '4', name: 'Leadership', level: 'Advanced', category: 'Soft' }
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Built full-stack e-commerce platform with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'github.com/johndoe/ecommerce'
    }
  ]
}

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: Award },
]

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onNavigate }) => {
  const [resume, setResume] = useState<Resume>(initialResume)
  const [activeSection, setActiveSection] = useState('personal')
  const [showPreview, setShowPreview] = useState(false)

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }))
  }

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Beginner',
      category: 'Technical'
    }
    setResume(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
  }

  const removeItem = (section: keyof Resume, id: string) => {
    setResume(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section]) 
        ? (prev[section] as any[]).filter(item => item.id !== id)
        : prev[section]
    }))
  }

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF export would be implemented here')
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Form Section */}
      <div className={`${showPreview ? 'hidden lg:block' : 'block'} lg:w-1/2 space-y-6`}>
        {/* Section Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveSection(section.id)}
                    className="flex items-center"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {section.label}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        {activeSection === 'personal' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key="personal"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      value={resume.personalInfo.name}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, name: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={resume.personalInfo.phone}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      value={resume.personalInfo.location}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, location: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn</label>
                    <Input
                      value={resume.personalInfo.linkedIn || ''}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, linkedIn: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <Input
                      value={resume.personalInfo.website || ''}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, website: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Summary */}
        {activeSection === 'summary' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key="summary"
          >
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write a compelling summary of your professional background..."
                  value={resume.summary}
                  onChange={(e) => setResume(prev => ({ ...prev, summary: e.target.value }))}
                  className="min-h-32"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Experience */}
        {activeSection === 'experience' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key="experience"
            className="space-y-4"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Work Experience
                </CardTitle>
                <Button onClick={addExperience} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Experience Entry</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem('experience', exp.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Job Title"
                        value={exp.title}
                        onChange={(e) => setResume(prev => ({
                          ...prev,
                          experience: prev.experience.map(item =>
                            item.id === exp.id ? { ...item, title: e.target.value } : item
                          )
                        }))}
                      />
                      <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => setResume(prev => ({
                          ...prev,
                          experience: prev.experience.map(item =>
                            item.id === exp.id ? { ...item, company: e.target.value } : item
                          )
                        }))}
                      />
                    </div>

                    <Textarea
                      placeholder="Describe your responsibilities and achievements..."
                      value={exp.description}
                      onChange={(e) => setResume(prev => ({
                        ...prev,
                        experience: prev.experience.map(item =>
                          item.id === exp.id ? { ...item, description: e.target.value } : item
                        )
                      }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Skills */}
        {activeSection === 'skills' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key="skills"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Skills
                </CardTitle>
                <Button onClick={addSkill} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {resume.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <Input
                        placeholder="Skill name"
                        value={skill.name}
                        onChange={(e) => setResume(prev => ({
                          ...prev,
                          skills: prev.skills.map(item =>
                            item.id === skill.id ? { ...item, name: e.target.value } : item
                          )
                        }))}
                        className="flex-1"
                      />
                      
                      <select
                        value={skill.level}
                        onChange={(e) => setResume(prev => ({
                          ...prev,
                          skills: prev.skills.map(item =>
                            item.id === skill.id ? { ...item, level: e.target.value as any } : item
                          )
                        }))}
                        className="px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem('skills', skill.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Preview Section */}
      <div className={`${showPreview ? 'block' : 'hidden lg:block'} lg:w-1/2`}>
        <div className="sticky top-6">
          <Card className="h-[calc(100vh-8rem)]">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Resume Preview</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="lg:hidden"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button onClick={handleExportPDF} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-full overflow-auto">
              <div className="bg-white p-8 shadow-lg rounded-lg text-black min-h-full">
                {/* Header */}
                <div className="border-b pb-6 mb-6">
                  <h1 className="text-2xl font-bold">{resume.personalInfo.name}</h1>
                  <div className="text-sm text-gray-600 mt-2 space-y-1">
                    <p>{resume.personalInfo.email} • {resume.personalInfo.phone}</p>
                    <p>{resume.personalInfo.location}</p>
                    {resume.personalInfo.linkedIn && (
                      <p>{resume.personalInfo.linkedIn}</p>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {resume.summary && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Professional Summary</h2>
                    <p className="text-sm text-gray-700">{resume.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {resume.experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Experience</h2>
                    {resume.experience.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium">{exp.title}</h3>
                            <p className="text-sm text-gray-600">{exp.company}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                        </div>
                        <p className="text-sm text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {resume.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill) => (
                        <Badge key={skill.id} variant="secondary" className="text-xs">
                          {skill.name} ({skill.level})
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}