'use client';

import { useState, useEffect } from 'react';
import { LandingScreen } from '@/components/screens/LandingScreen';
import { DashboardScreen } from '@/components/screens/DashboardScreen';

export default function Page() {
  const [appState, setAppState] = useState<'landing' | 'onboarding' | 'dashboard'>('landing');
  const [currentDay, setCurrentDay] = useState(1);
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

    if (savedDay) setCurrentDay(parseInt(savedDay));
    if (savedState) setAppState(savedState as any);
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
  }, []);

  const handleStartJourney = (profile: typeof userProfile) => {
    setUserProfile(profile);
    localStorage.setItem('mentorDay', '1');
    localStorage.setItem('mentorState', 'dashboard');
    localStorage.setItem('mentorProfile', JSON.stringify(profile));
    setAppState('dashboard');
    setCurrentDay(1);
  };

  if (appState === 'landing') {
    return <LandingScreen onStart={handleStartJourney} />;
  }

  return (
    <DashboardScreen 
      currentDay={currentDay} 
      setCurrentDay={setCurrentDay}
      userProfile={userProfile}
    />
  );
}
