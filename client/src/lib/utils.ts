import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API utility functions
export const apiCall = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token')
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    headers: defaultHeaders,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' }
  }
  return { isValid: true }
}

export const validateRequired = (value: string, fieldName: string): { isValid: boolean; message?: string } => {
  if (!value.trim()) {
    return { isValid: false, message: `${fieldName} is required` }
  }
  return { isValid: true }
}

export const calculateMatchScore = (resume: any, jobDescription: string): number => {
  // Simple mock algorithm - in real app, this would use AI/ML
  const resumeSkills = resume.skills?.map((s: any) => s.name.toLowerCase()) || []
  const jdLower = jobDescription.toLowerCase()
  
  const commonSkills = resumeSkills.filter((skill: string) => 
    jdLower.includes(skill)
  )
  
  return Math.min(Math.round((commonSkills.length / Math.max(resumeSkills.length, 1)) * 100), 95)
}

export const getMissingSkills = (resume: any, jobDescription: string): string[] => {
  const commonTechSkills = ['react', 'javascript', 'python', 'java', 'sql', 'aws', 'docker', 'kubernetes', 'git', 'nodejs']
  const jdLower = jobDescription.toLowerCase()
  const resumeSkills = resume.skills?.map((s: any) => s.name.toLowerCase()) || []
  
  return commonTechSkills.filter(skill => 
    jdLower.includes(skill) && !resumeSkills.includes(skill)
  ).slice(0, 5)
}