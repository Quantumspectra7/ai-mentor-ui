'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { getPhaseNumber, phaseTitles, phaseDescriptions, randomSeniorTip, motivationalQuotes } from '@/lib/phaseData';
import { MentorChat } from '@/components/features/MentorChat';
import { DailyTasks } from '@/components/features/DailyTasks';
import { CampusGuide } from '@/components/features/CampusGuide';
import { StudyHelper } from '@/components/features/StudyHelper';
import { PanicButton } from '@/components/features/PanicButton';
import { GlowingCard, AnimatedCard } from '@/components/ui/animated-components';
import { MessageCircle, CheckCircle2, MapPin, BookMarked, ChevronLeft, ChevronRight, Zap, Trophy, Sparkles, Flame, Users, Brain } from 'lucide-react';

interface DashboardScreenProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  userProfile: {
    name: string;
    branch: string;
    hostel: string;
    interests: string[];
  };
}

export function DashboardScreen({ 
  currentDay, 
  setCurrentDay, 
  userProfile 
}: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'tasks' | 'campus' | 'study'>('dashboard');
  const phase = getPhaseNumber(currentDay);
  const progressPercent = (currentDay / 90) * 100;
  const tip = randomSeniorTip();
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleNextDay = () => {
    if (currentDay < 90) {
      const newDay = currentDay + 1;
      setCurrentDay(newDay);
      localStorage.setItem('mentorDay', newDay.toString());
    }
  };

  const handlePreviousDay = () => {
    if (currentDay > 1) {
      const newDay = currentDay - 1;
      setCurrentDay(newDay);
      localStorage.setItem('mentorDay', newDay.toString());
    }
  };

  // Render active screen
  if (activeTab === 'chat') {
    return <MentorChat currentDay={currentDay} onBack={() => setActiveTab('dashboard')} />;
  }
  if (activeTab === 'tasks') {
    return <DailyTasks currentDay={currentDay} onBack={() => setActiveTab('dashboard')} />;
  }
  if (activeTab === 'campus') {
    return <CampusGuide onBack={() => setActiveTab('dashboard')} />;
  }
  if (activeTab === 'study') {
    return <StudyHelper onBack={() => setActiveTab('dashboard')} />;
  }

  return (
    <div className="min-h-screen relative dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-96 h-96 dark:bg-purple-500/12 bg-purple-500/5 rounded-full blur-3xl animate-float-in"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 dark:bg-blue-500/12 bg-blue-500/5 rounded-full blur-3xl animate-float-in" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute -top-40 right-40 w-80 h-80 dark:bg-pink-500/10 bg-pink-500/5 rounded-full blur-3xl animate-float-in" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 dark:backdrop-blur-2xl dark:border-b dark:border-primary/10 backdrop-blur border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <Sparkles className="w-5 h-5 dark:text-primary text-purple-600 shrink-0" />
              <h1 className="text-2xl md:text-3xl font-bold dark:text-white text-slate-900 truncate">
                Welcome back, <span className="text-gradient">{userProfile.name}</span>
              </h1>
            </div>
            <p className="text-sm dark:text-gray-300 text-slate-600">
              {userProfile.branch}{userProfile.hostel && ` • ${userProfile.hostel}`}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="dark:card-flat dark:px-6 dark:py-3 dark:flex dark:items-center dark:gap-2 bg-white/50 dark:bg-slate-800/50 px-6 py-3 flex items-center gap-2 rounded-xl dark:border dark:border-slate-700 border border-slate-200">
              <Flame className="w-5 h-5 text-red-500" />
              <div>
                <span className="font-bold dark:text-white text-slate-900 text-lg">{currentDay}</span>
                <span className="text-xs dark:text-gray-400 text-slate-500">/90</span>
              </div>
            </div>
            <PanicButton />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Phase Progress Card */}
        <GlowingCard glow="purple" className="mb-12 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 fade-in">
          <div className="flex-1">
            <div className="mb-2 inline-flex items-center gap-2 badge-gradient dark:badge-gradient">
              <Zap className="w-3 h-3" />
              <span className="text-xs font-semibold dark:text-purple-200 text-purple-700">Phase {phase}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-slate-900 mb-2">{phaseTitles[phase]}</h2>
            <p className="dark:text-gray-300 text-slate-600 max-w-lg">{phaseDescriptions[phase]}</p>
          </div>
          <div className="md:text-right">
            <div className="text-5xl md:text-6xl font-bold text-gradient mb-2">{Math.round(progressPercent)}%</div>
            <p className="text-sm dark:text-gray-300 text-slate-600">
              <span className="font-semibold dark:text-white text-slate-900">{90 - currentDay}</span> days remaining
            </p>
          </div>
        </GlowingCard>

        {/* Progress Bar */}
        <div className="mb-12 fade-in stagger-1">
          <div className="flex justify-between items-center mb-3">
            <span className="section-label dark:text-purple-400 text-purple-600">Overall Progress</span>
            <span className="text-sm font-bold dark:text-primary text-purple-600">{currentDay} of 90</span>
          </div>
          <div className="relative h-2 dark:bg-white/5 dark:border-primary/10 dark:border bg-slate-200/50 border border-slate-300/50 rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary smooth-transition rounded-full"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="h-full w-full opacity-50 animate-shimmer" style={{
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                backgroundSize: '200% 100%'
              }}></div>
            </div>
          </div>
          <div className="mt-3 text-xs dark:text-gray-400 text-slate-500">
            {phase === 1 && 'Days 1-30: Orientation • Building foundation'}
            {phase === 2 && 'Days 31-60: Growth • Developing skills'}
            {phase === 3 && 'Days 61-90: Confidence • Polishing yourself'}
          </div>
        </div>

        {/* Feature Cards Grid - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 fade-in stagger-2">
          {/* Chat Card */}
          <button
            onClick={() => setActiveTab('chat')}
            className="relative group/card rounded-2xl p-6 text-left smooth-transition hover:-translate-y-1 dark:bg-slate-900/50 dark:border dark:border-slate-700/50 dark:hover:border-purple-500/50 bg-white/50 border border-slate-200/50 hover:border-purple-400"
          >
            <div className="absolute inset-0 rounded-2xl dark:bg-gradient-to-br dark:from-purple-500/10 dark:to-transparent from-purple-500/5 to-transparent opacity-0 group-hover/card:opacity-100 smooth-transition"></div>
            <div className="relative z-10">
              <div className="mb-4 inline-block p-3 rounded-2xl dark:bg-gradient-to-br dark:from-purple-500/20 dark:to-purple-500/5 bg-purple-500/10 group-hover/card:from-purple-500/30 group-hover/card:to-purple-500/15 smooth-transition">
                <Brain className="w-6 h-6 dark:text-purple-300 text-purple-600" />
              </div>
              <h3 className="font-bold dark:text-white text-slate-900 mb-2 group-hover/card:dark:text-purple-300 group-hover/card:text-purple-600 smooth-transition">AI Chat Mentor</h3>
              <p className="text-xs dark:text-gray-300 text-slate-600">Ask anything anytime</p>
              <div className="mt-4 flex items-center dark:text-purple-300 text-purple-600 text-xs font-semibold opacity-0 group-hover/card:opacity-100 smooth-transition-fast gap-1">
                Open <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </button>

          {/* Tasks Card */}
          <button
            onClick={() => setActiveTab('tasks')}
            className="relative group/card rounded-2xl p-6 text-left smooth-transition hover:-translate-y-1 dark:bg-slate-900/50 dark:border dark:border-slate-700/50 dark:hover:border-blue-500/50 bg-white/50 border border-slate-200/50 hover:border-blue-400"
          >
            <div className="absolute inset-0 rounded-2xl dark:bg-gradient-to-br dark:from-blue-500/10 dark:to-transparent from-blue-500/5 to-transparent opacity-0 group-hover/card:opacity-100 smooth-transition"></div>
            <div className="relative z-10">
              <div className="mb-4 inline-block p-3 rounded-2xl dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-blue-500/5 bg-blue-500/10 group-hover/card:from-blue-500/30 group-hover/card:to-blue-500/15 smooth-transition">
                <CheckCircle2 className="w-6 h-6 dark:text-blue-300 text-blue-600" />
              </div>
              <h3 className="font-bold dark:text-white text-slate-900 mb-2 group-hover/card:dark:text-blue-300 group-hover/card:text-blue-600 smooth-transition">Daily Tasks</h3>
              <p className="text-xs dark:text-gray-300 text-slate-600">Track your wins</p>
              <div className="mt-4 flex items-center dark:text-blue-300 text-blue-600 text-xs font-semibold opacity-0 group-hover/card:opacity-100 smooth-transition-fast gap-1">
                Start <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </button>

          {/* Campus Card */}
          <button
            onClick={() => setActiveTab('campus')}
            className="relative group/card rounded-2xl p-6 text-left smooth-transition hover:-translate-y-1 dark:bg-slate-900/50 dark:border dark:border-slate-700/50 dark:hover:border-pink-500/50 bg-white/50 border border-slate-200/50 hover:border-pink-400"
          >
            <div className="absolute inset-0 rounded-2xl dark:bg-gradient-to-br dark:from-pink-500/10 dark:to-transparent from-pink-500/5 to-transparent opacity-0 group-hover/card:opacity-100 smooth-transition"></div>
            <div className="relative z-10">
              <div className="mb-4 inline-block p-3 rounded-2xl dark:bg-gradient-to-br dark:from-pink-500/20 dark:to-pink-500/5 bg-pink-500/10 group-hover/card:from-pink-500/30 group-hover/card:to-pink-500/15 smooth-transition">
                <MapPin className="w-6 h-6 dark:text-pink-300 text-pink-600" />
              </div>
              <h3 className="font-bold dark:text-white text-slate-900 mb-2 group-hover/card:dark:text-pink-300 group-hover/card:text-pink-600 smooth-transition">Campus Guide</h3>
              <p className="text-xs dark:text-gray-300 text-slate-600">Explore & navigate</p>
              <div className="mt-4 flex items-center dark:text-pink-300 text-pink-600 text-xs font-semibold opacity-0 group-hover/card:opacity-100 smooth-transition-fast gap-1">
                Explore <ChevronRight className="w-3 h-3" />
              </div>
              <h3 className="font-bold dark:text-white text-slate-900 mb-2 group-hover/card:dark:text-cyan-300 group-hover/card:text-cyan-600 smooth-transition">Study Hub</h3>
              <p className="text-xs dark:text-gray-300 text-slate-600">Learn & succeed</p>
              <div className="mt-4 flex items-center dark:text-cyan-300 text-cyan-600 text-xs font-semibold opacity-0 group-hover/card:opacity-100 smooth-transition-fast gap-1">
                Learn <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </button>
        </div>

        {/* Motivation & Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 fade-in stagger-3">
          {/* Tip Card */}
          <GlowingCard glow="purple" className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl dark:bg-gradient-to-br dark:from-purple-500/20 dark:to-purple-500/5 bg-purple-500/10 shrink-0">
                <Sparkles className="w-6 h-6 dark:text-purple-300 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold dark:text-white text-slate-900 mb-3 text-sm">💡 Senior Bhaiya's Tip</h3>
                <p className="text-sm dark:text-gray-300 text-slate-600 leading-relaxed">{tip}</p>
              </div>
            </div>
          </GlowingCard>

          {/* Quote Card */}
          <GlowingCard glow="blue" className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-blue-500/5 bg-blue-500/10 shrink-0">
                <Users className="w-6 h-6 dark:text-blue-300 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold dark:text-white text-slate-900 mb-3 text-sm">✨ Daily Inspiration</h3>
                <p className="text-sm dark:text-gray-300 text-slate-600 leading-relaxed italic">{quote}</p>
              </div>
            </div>
          </GlowingCard>
        </div>

        {/* Day Navigation */}
        <GlowingCard glow="pink" className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12 fade-in stagger-4">
          <div>
            <h3 className="font-bold dark:text-white text-slate-900 mb-1">Your 90-Day Journey</h3>
            <p className="text-sm dark:text-gray-300 text-slate-600">
              You're on <span className="dark:text-purple-300 text-purple-600 font-bold">Day {currentDay}</span> •
              {phase === 1 && ' Orientation Phase'}
              {phase === 2 && ' Growth Phase'}
              {phase === 3 && ' Confidence Phase'}
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={handlePreviousDay}
              disabled={currentDay === 1}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl dark:bg-slate-800/50 dark:border dark:border-slate-700 dark:hover:border-purple-500/50 dark:disabled:opacity-50 dark:disabled:cursor-not-allowed bg-white/50 border border-slate-200/50 hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed smooth-transition hover:-translate-y-0.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            <button
              onClick={handleNextDay}
              disabled={currentDay === 90}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-gradient disabled:opacity-50 disabled:cursor-not-allowed btn-pulse"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </GlowingCard>

        {currentDay === 90 && (
          <div className="relative rounded-2xl p-12 text-center dark:bg-slate-900/50 dark:border dark:border-pink-500/20 bg-white/50 border border-pink-300/50 fade-in">
            <div className="absolute inset-0 rounded-2xl dark:bg-gradient-to-br dark:from-pink-500/10 dark:to-transparent from-pink-500/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-8xl mb-6 animate-float-in">🎉</div>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-500 dark:to-blue-500 mb-4">
                You've Completed 90 Days!
              </h2>
              <p className="text-lg dark:text-gray-300 text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                What an incredible journey! You've grown from a nervous fresher to a confident, adapted student. Now it's time to pay it forward and help other freshers navigate their first 90 days!
              </p>
              <button className="btn-gradient inline-flex items-center gap-2 px-8 py-4 btn-pulse">
                Share Your Story
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
