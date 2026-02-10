'use client';

import { useState, useEffect } from 'react';
import { LandingScreen } from '@/components/screens/LandingScreen';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { LPUExplorer } from '@/components/screens/LPUExplorer';
import { VideoHub } from '@/components/features/VideoHub';
import { SuccessStories } from '@/components/features/SuccessStories';
import { SeniorComments } from '@/components/features/SeniorComments';
import { BranchExplorer } from '@/components/features/BranchExplorer';
import { ExpectationVsReality } from '@/components/features/ExpectationVsReality';
import { Procedures } from '@/components/features/Procedures';
import { UserType } from '@/lib/lpuData';

type AppState = 'landing' | 'lpu-explorer' | 'lpu-module' | 'onboarding' | 'dashboard';

interface LPUModuleState {
  userType: UserType;
  currentModule: string | null;
}

export default function Page() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentDay, setCurrentDay] = useState(1);
  const [lpuState, setLpuState] = useState<LPUModuleState>({ userType: 'fresher', currentModule: null });
  const [userProfile, setUserProfile] = useState({
    name: '',
    branch: '',
    hostel: '',
    interests: [] as string[]
  });

  useEffect(() => {
    // Load from localStorage
    const savedDay = localStorage.getItem('mentorDay');
    const savedState = localStorage.getItem('mentorState');
    const savedProfile = localStorage.getItem('mentorProfile');
    const savedLpuState = localStorage.getItem('lpuState');

    if (savedDay) setCurrentDay(parseInt(savedDay));
    if (savedState) setAppState(savedState as AppState);
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedLpuState) setLpuState(JSON.parse(savedLpuState));
  }, []);

  const handleSelectUserType = (userType: UserType) => {
    const newLpuState = { userType, currentModule: null };
    setLpuState(newLpuState);
    localStorage.setItem('lpuState', JSON.stringify(newLpuState));
    
    if (userType === 'fresher') {
      // Go to 90-day mentor flow
      setAppState('onboarding');
    } else {
      // Go to LPU Explorer modules
      setAppState('lpu-module');
    }
  };

  const handleNavigateToModule = (module: string) => {
    const newLpuState = { ...lpuState, currentModule: module };
    setLpuState(newLpuState);
    localStorage.setItem('lpuState', JSON.stringify(newLpuState));
    setAppState('lpu-module');
  };

  const handleBackToExplorer = () => {
    const newLpuState = { ...lpuState, currentModule: null };
    setLpuState(newLpuState);
    localStorage.setItem('lpuState', JSON.stringify(newLpuState));
    setAppState('lpu-explorer');
  };

  const handleStartJourney = (profile: typeof userProfile) => {
    setUserProfile(profile);
    localStorage.setItem('mentorDay', '1');
    localStorage.setItem('mentorState', 'dashboard');
    localStorage.setItem('mentorProfile', JSON.stringify(profile));
    setAppState('dashboard');
    setCurrentDay(1);
  };

  // Render based on app state
  if (appState === 'landing') {
    return <LandingScreen onStart={handleStartJourney} />;
  }

  if (appState === 'lpu-explorer') {
    return <LPUExplorer onSelectUserType={handleSelectUserType} onNavigateToModule={handleNavigateToModule} />;
  }

  if (appState === 'lpu-module') {
    const { userType, currentModule } = lpuState;

    if (!currentModule) {
      return <LPUExplorer onSelectUserType={handleSelectUserType} onNavigateToModule={handleNavigateToModule} />;
    }

    // Render the selected module
    switch (currentModule) {
      case 'videos':
        return <VideoHub userType={userType} onBack={handleBackToExplorer} />;
      case 'stories':
        return <SuccessStories onBack={handleBackToExplorer} />;
      case 'procedures':
        return <Procedures onBack={handleBackToExplorer} />;
      case 'senior-advice':
        return <SeniorComments onBack={handleBackToExplorer} />;
      case 'reality-check':
        return <ExpectationVsReality onBack={handleBackToExplorer} />;
      case 'branch-explorer':
        return <BranchExplorer onBack={handleBackToExplorer} />;
      default:
        return <LPUExplorer onSelectUserType={handleSelectUserType} onNavigateToModule={handleNavigateToModule} />;
    }
  }

  if (appState === 'onboarding') {
    return <LandingScreen onStart={handleStartJourney} />;
  }

  // Dashboard (90-day mentor)
  return (
    <DashboardScreen 
      currentDay={currentDay} 
      setCurrentDay={setCurrentDay}
      userProfile={userProfile}
    />
  );
}
