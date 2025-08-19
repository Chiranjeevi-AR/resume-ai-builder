import React, { useState, createContext } from 'react'
import { AuthContext, useAuthProvider } from '@/hooks/useAuth'
import { LandingPage } from '@/components/pages/LandingPage'
import { AuthPage } from '@/components/pages/AuthPage'
import { Dashboard } from '@/components/pages/Dashboard'
import { ResumeBuilder } from '@/components/pages/ResumeBuilder'
import { AIMatchmaker } from '@/components/pages/AIMatchmaker'
import { JobsPage } from '@/components/pages/JobsPage'
import { ProfilePage } from '@/components/pages/ProfilePage'
import { Layout } from '@/components/Layout'
import { OnboardingPage } from '@/components/pages/OnboardingPage'

type Page = 'landing' | 'auth' | 'dashboard' | 'resume-builder' | 'ai-matchmaker' | 'jobs' | 'profile' | 'onboarding'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const authValue = useAuthProvider()
  const { user, isLoading } = authValue

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
  }


  // Helper: check if user profile is complete
  const isProfileComplete = (userObj: any) => {
    if (!userObj) return false;
    // You can adjust required fields as needed
    return (
      userObj.name &&
      userObj.email &&
      Array.isArray(userObj.skills) && userObj.skills.length > 0
    );
  };

  const renderPage = () => {
    // If not logged in, only allow landing/auth
    if (!user && currentPage !== 'landing' && currentPage !== 'auth') {
      return <LandingPage onNavigate={handleNavigate} />;
    }

    // If logged in but profile is incomplete, always show onboarding
    if (user && !isProfileComplete(user)) {
      return <OnboardingPage onNavigate={handleNavigate} />;
    }

    // If logged in and profile is complete, allow normal navigation
    if (user && (currentPage === 'landing' || currentPage === 'auth')) {
      return (
        <Layout currentPage="dashboard" onNavigate={handleNavigate}>
          <Dashboard onNavigate={handleNavigate} />
        </Layout>
      );
    }

    switch (currentPage) {
      case 'onboarding':
        return <OnboardingPage onNavigate={handleNavigate} />;
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return (
          <Layout currentPage={currentPage} onNavigate={handleNavigate}>
            <Dashboard onNavigate={handleNavigate} />
          </Layout>
        );
      case 'resume-builder':
        return (
          <Layout currentPage={currentPage} onNavigate={handleNavigate}>
            <ResumeBuilder onNavigate={handleNavigate} />
          </Layout>
        );
      case 'ai-matchmaker':
        return (
          <Layout currentPage={currentPage} onNavigate={handleNavigate}>
            <AIMatchmaker onNavigate={handleNavigate} />
          </Layout>
        );
      case 'jobs':
        return (
          <Layout currentPage={currentPage} onNavigate={handleNavigate}>
            <JobsPage onNavigate={handleNavigate} />
          </Layout>
        );
      case 'profile':
        return (
          <Layout currentPage={currentPage} onNavigate={handleNavigate}>
            <ProfilePage onNavigate={handleNavigate} />
          </Layout>
        );
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthContext.Provider value={authValue}>
      <div className="min-h-screen">
        {renderPage()}
      </div>
    </AuthContext.Provider>
  )
}

export default App