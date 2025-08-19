import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Brain,
  FileText,
  Zap,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface LandingPageProps {
  onNavigate: (page: string) => void
}

const features = [
  {
    icon: FileText,
    title: 'Smart Resume Builder',
    description: 'Create professional resumes with our intuitive builder and real-time preview.'
  },
  {
    icon: Brain,
    title: 'AI Job Matching',
    description: 'Get personalized job matches and improve your resume with AI-powered insights.'
  },
  {
    icon: Target,
    title: 'Tailored Recommendations',
    description: 'Receive specific suggestions to improve your chances for each job application.'
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Get real-time scoring and feedback on how well your resume matches job requirements.'
  }
]



export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-zinc-100 to-black text-zinc-900">
      {/* Header */}
      <header className="border-b border-yellow-900 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-yellow-400" />
              <span className="ml-2 text-2xl font-bold text-zinc-900">
                ResumeAI
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-black hover:text-yellow-400 font-semibold transition-colors">
                Features
              </a>
              <Button variant="outline" className="border-yellow-400 text-black hover:bg-yellow-400 hover:text-black" onClick={() => onNavigate('auth')}>
                Sign In
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Home Section */}
      <section id="home" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        {/* Dynamic Animated Background */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute top-10 left-1/4 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-30"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-2xl opacity-20"
            animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6">
              Build Resumes That{' '}
              <span className="text-yellow-500">
                Get You Hired
              </span>
            </h1>
            <p className="text-xl text-zinc-600 mb-12 max-w-3xl mx-auto">
              Create professional resumes and get AI-powered job matching to land your dream career.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold shadow"
                  onClick={() => onNavigate('auth')}
                >
                  Build My Resume
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-4 border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-black font-semibold shadow"
                  onClick={() => onNavigate('auth')}
                >
                  Try AI Matchmaker
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-20 bg-white border-b border-yellow-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">About ResumeAI</h2>
          <p className="text-lg text-zinc-600 mb-6">ResumeAI is your modern job search companion. We help you build beautiful, effective resumes and match you to jobs using advanced AI. Our platform is designed for job seekers who want to stand out and land their dream roles.</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black relative overflow-hidden">
        <img src="/job-bg.png" alt="job bg" className="absolute opacity-5 top-0 left-0 w-full h-full object-cover pointer-events-none select-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features for Job Seekers
            </h2>
            <p className="text-xl text-yellow-200 max-w-2xl mx-auto">
              Everything you need to create standout resumes and find the perfect job matches
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-zinc-900 border-yellow-100 hover:border-yellow-400 transition-shadow shadow-sm">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-yellow-900/30 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-yellow-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-yellow-200">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
              Ready to Transform Your Job Search?
            </h2>
            <p className="text-xl text-zinc-600 mb-8">
              Upgrade your career with ResumeAI
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold shadow"
              onClick={() => onNavigate('auth')}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-white via-zinc-100 to-black text-yellow-700 py-12 border-t-2 border-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Brain className="w-6 h-6 text-yellow-500" />
            <span className="ml-2 text-lg font-bold">ResumeAI</span>
          </div>
          <p className="text-center text-yellow-600 mt-4">
            © 2024 ResumeAI. Built with ❤️ for job seekers everywhere.
          </p>
        </div>
      </footer>
    </div>
  )
}