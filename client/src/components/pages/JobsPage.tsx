import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  Filter,
  Briefcase,
  Building,
  Calendar,
  ExternalLink,
  Brain
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { Job } from '@/types'

interface JobsPageProps {
  onNavigate: (page: string) => void
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experience: '5+ years',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    description: 'Join our dynamic team building cutting-edge web applications...',
    salary: '$120k - $180k',
    postedDate: '2 days ago'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ years',
    skills: ['JavaScript', 'Python', 'React', 'Django'],
    description: 'Work on exciting products used by millions of users...',
    salary: '$100k - $140k',
    postedDate: '1 week ago'
  },
  {
    id: '3',
    title: 'Frontend Developer',
    company: 'Design Studio',
    location: 'New York, NY',
    type: 'Contract',
    experience: '2+ years',
    skills: ['Vue.js', 'CSS', 'JavaScript', 'Figma'],
    description: 'Create beautiful user interfaces for premium brands...',
    salary: '$80 - $100/hr',
    postedDate: '3 days ago'
  },
  {
    id: '4',
    title: 'React Developer',
    company: 'E-commerce Giant',
    location: 'Seattle, WA',
    type: 'Full-time',
    experience: '4+ years',
    skills: ['React', 'Redux', 'TypeScript', 'GraphQL'],
    description: 'Build scalable e-commerce solutions...',
    salary: '$110k - $150k',
    postedDate: '5 days ago'
  },
  {
    id: '5',
    title: 'Junior Web Developer',
    company: 'Local Agency',
    location: 'Austin, TX',
    type: 'Full-time',
    experience: '1+ years',
    skills: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
    description: 'Great opportunity for a growing developer...',
    salary: '$50k - $70k',
    postedDate: '1 week ago'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Cloud Solutions',
    location: 'Denver, CO',
    type: 'Full-time',
    experience: '5+ years',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Python'],
    description: 'Manage cloud infrastructure at scale...',
    salary: '$130k - $170k',
    postedDate: '4 days ago'
  }
]

export const JobsPage: React.FC<JobsPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleMatchResume = (job: Job) => {
    // In a real app, this would pass the job data to AI Matchmaker
    onNavigate('ai-matchmaker')
  }

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
      case 'Part-time':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
      case 'Contract':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
      case 'Internship':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Briefcase className="w-8 h-8 mr-3" />
              <h1 className="text-3xl font-bold">Job Opportunities</h1>
            </div>
            <p className="text-green-100 text-lg">
              Discover your next career opportunity with AI-powered job matching
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t space-y-4"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Type</label>
                  <select className="w-full px-3 py-2 border rounded-md bg-background">
                    <option>All Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience Level</label>
                  <select className="w-full px-3 py-2 border rounded-md bg-background">
                    <option>All Levels</option>
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input placeholder="City, State or Remote" />
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Jobs List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {filteredJobs.length} Jobs Found
          </h2>
          
          <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedJob?.id === job.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {job.title}
                          </h3>
                          <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                            <Building className="w-4 h-4 mr-1" />
                            <span className="text-sm">{job.company}</span>
                          </div>
                        </div>
                        <Badge className={getJobTypeColor(job.type)}>
                          {job.type}
                        </Badge>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.experience}
                        </div>
                        {job.salary && (
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {job.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.skills.length - 4}
                          </Badge>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center text-xs text-gray-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          {job.postedDate}
                        </div>
                        
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMatchResume(job)
                          }}
                          className="flex items-center"
                        >
                          <Brain className="w-3 h-3 mr-1" />
                          Match Resume
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Job Details */}
        <div className="sticky top-6">
          {!selectedJob ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Select a Job
                </h3>
                <p className="text-gray-400 dark:text-gray-500">
                  Click on any job to see detailed information and match it with your resume.
                </p>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{selectedJob.title}</CardTitle>
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{selectedJob.company}</span>
                      </div>
                    </div>
                    <Badge className={getJobTypeColor(selectedJob.type)}>
                      {selectedJob.type}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Job Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location
                      </div>
                      <p className="font-medium">{selectedJob.location}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                        <Clock className="w-4 h-4 mr-2" />
                        Experience
                      </div>
                      <p className="font-medium">{selectedJob.experience}</p>
                    </div>
                    
                    {selectedJob.salary && (
                      <div className="col-span-2">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                          <DollarSign className="w-4 h-4 mr-2" />
                          Salary
                        </div>
                        <p className="font-medium">{selectedJob.salary}</p>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-medium mb-3">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-3">Description</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1"
                      onClick={() => handleMatchResume(selectedJob)}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Match Resume
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center text-xs text-gray-400 pt-2 border-t">
                    <Calendar className="w-3 h-3 mr-2" />
                    Posted {selectedJob.postedDate}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}