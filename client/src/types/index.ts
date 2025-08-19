export interface User {
  id: string
  name: string
  email: string
  role?: string
  phone?: string
  location?: string
  skills?: string[]
  bio?: string
  avatar?: string
  createdAt?: string
  updatedAt?: string
}

export interface Resume {
  id: string
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedIn?: string
    website?: string
  }
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
}

export interface Education {
  id: string
  degree: string
  school: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Skill {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  category: 'Technical' | 'Soft' | 'Language' | 'Other'
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link?: string
}

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  experience: string
  skills: string[]
  description: string
  salary?: string
  postedDate: string
}

export interface MatchResult {
  score: number
  missingSkills: string[]
  suggestions: string[]
}