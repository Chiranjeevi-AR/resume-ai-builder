import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Lightbulb,
  Copy,
  Sparkles,
  FileText
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { calculateMatchScore, getMissingSkills } from '@/lib/utils'

interface AIMatchmakerProps {
  onNavigate: (page: string) => void
}

// Mock resume data
const mockResume = {
  skills: [
    { id: '1', name: 'react', level: 'Expert' },
    { id: '2', name: 'javascript', level: 'Advanced' },
    { id: '3', name: 'typescript', level: 'Advanced' },
    { id: '4', name: 'css', level: 'Intermediate' },
  ]
}

const sampleJobDescription = `We are looking for a Senior Frontend Developer to join our dynamic team.

Requirements:
- 5+ years of experience with React and TypeScript
- Strong proficiency in JavaScript, HTML, and CSS
- Experience with Node.js and Express
- Familiarity with cloud platforms like AWS
- Knowledge of Docker and Kubernetes
- Experience with Git version control
- Strong problem-solving skills and attention to detail

Nice to have:
- Experience with Python for backend development
- Knowledge of SQL databases
- Familiarity with CI/CD pipelines
- Experience with testing frameworks`

export const AIMatchmaker: React.FC<AIMatchmakerProps> = ({ onNavigate }) => {
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [matchResult, setMatchResult] = useState<any>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      return
    }

    setIsAnalyzing(true)
    
    // Simulate API call
    setTimeout(() => {
      const score = calculateMatchScore(mockResume, jobDescription)
      const missingSkills = getMissingSkills(mockResume, jobDescription)
      
      setMatchResult({
        score,
        missingSkills,
        strengths: ['React expertise', 'JavaScript proficiency', 'TypeScript knowledge'],
        suggestions: [
          'Add Node.js experience to your skills section',
          'Include specific examples of cloud platform usage',
          'Highlight any Docker/containerization experience',
          'Mention Git workflows and collaboration experience'
        ]
      })
      setIsAnalyzing(false)
      setShowSuggestions(true)
    }, 2000)
  }

  const loadSampleJob = () => {
    setJobDescription(sampleJobDescription)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20'
    if (score >= 60) return 'bg-yellow-50 dark:bg-yellow-900/20'
    return 'bg-red-50 dark:bg-red-900/20'
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 mr-3" />
              <h1 className="text-3xl font-bold">AI Job Matchmaker</h1>
            </div>
            <p className="text-purple-100 text-lg">
              Paste any job description and get instant analysis of how well your resume matches, 
              plus personalized recommendations to improve your chances.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Job Description Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadSampleJob}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Load Sample
                </Button>
              </div>

              <Textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-64 resize-none"
              />

              <Button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="w-full"
                size="lg"
              >
                {isAnalyzing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 mr-2"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Brain className="w-5 h-5 mr-2" />
                )}
                {isAnalyzing ? 'Analyzing...' : 'Analyze Match'}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {!matchResult && (
            <Card>
              <CardContent className="p-12 text-center">
                <Brain className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-gray-400 dark:text-gray-500">
                  Paste a job description and click "Analyze Match" to see how your resume stacks up.
                </p>
              </CardContent>
            </Card>
          )}

          {matchResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Match Score */}
              <Card className={getScoreBg(matchResult.score)}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Target className={`w-8 h-8 mr-3 ${getScoreColor(matchResult.score)}`} />
                      <span className={`text-4xl font-bold ${getScoreColor(matchResult.score)}`}>
                        {matchResult.score}%
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Match Score</h3>
                    <Progress value={matchResult.score} className="mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {matchResult.score >= 80 
                        ? 'Excellent match! Your resume aligns very well with this role.'
                        : matchResult.score >= 60
                        ? 'Good match with some areas for improvement.'
                        : 'Consider enhancing your resume for this specific role.'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {matchResult.strengths.map((strength: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Missing Skills */}
              {matchResult.missingSkills.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-600">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Skills to Add
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {matchResult.missingSkills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="border-orange-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Consider adding these skills to improve your match score.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Suggestions */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-blue-600">
                        <Lightbulb className="w-5 h-5 mr-2" />
                        AI Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {matchResult.suggestions.map((suggestion: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                                {index + 1}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-3 mt-6">
                        <Button 
                          className="flex-1"
                          onClick={() => onNavigate('resume-builder')}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Update Resume
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setMatchResult(null)}
                        >
                          Analyze Another
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}