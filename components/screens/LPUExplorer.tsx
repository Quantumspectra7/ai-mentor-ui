'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, GraduationCap, Video, Trophy, FileText, MessageCircle, Lightbulb, Compass } from 'lucide-react';
import { UserType } from '@/lib/lpuData';

interface LPUExplorerProps {
  onSelectUserType: (userType: UserType) => void;
  onNavigateToModule?: (module: string) => void;
}

export function LPUExplorer({ onSelectUserType, onNavigateToModule }: LPUExplorerProps) {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  const userTypes = [
    {
      id: 'pre-admission',
      icon: '🎓',
      title: 'Planning to join LPU',
      description: 'Help with admission, campus selection, and preparation',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'new-student',
      icon: '🧑‍🎓',
      title: 'Newly admitted student',
      description: 'First week prep, documents, hostel info, and orientation',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'fresher',
      icon: '📘',
      title: 'First-year student (90-day mentor)',
      description: 'Guided daily journey through your first 90 days',
      color: 'from-orange-500 to-red-500',
    },
  ];

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              Welcome to LPU Explorer
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Your complete companion for admission, campus life, and success at Lovely Professional University
            </p>
          </div>

          {/* User Type Selection */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {userTypes.map((type) => (
              <Card
                key={type.id}
                className="cursor-pointer border-slate-700 hover:border-purple-500 transition-all hover:scale-105 overflow-hidden"
                onClick={() => setSelectedType(type.id as UserType)}
              >
                <div className={`h-1 bg-gradient-to-r ${type.color}`} />
                <CardHeader>
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <CardTitle className="text-white">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">{type.description}</p>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => setSelectedType(type.id as UserType)}
                  >
                    Continue {type.icon}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Overview */}
          <Card className="border-slate-700 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">What You'll Get</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FeatureItem icon={Video} label="Video Hub" description="15+ authentic campus videos" />
                <FeatureItem icon={Trophy} label="Success Stories" description="Real placements & startups" />
                <FeatureItem icon={FileText} label="Procedures" description="Step-by-step guides & checklists" />
                <FeatureItem icon={MessageCircle} label="Senior Advice" description="Raw unfiltered wisdom" />
                <FeatureItem icon={Lightbulb} label="Reality Check" description="Expectation vs truth" />
                <FeatureItem icon={Compass} label="Branch Explorer" description="Which path is for you?" />
                <FeatureItem icon={Users} label="Peer Connect" description="Common questions answered" />
                <FeatureItem icon={BookOpen} label="90-Day Mentor" description="Personal guided journey" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // After user type is selected - show LPU Explorer modules
  return <LPUExplorerModules userType={selectedType} onNavigateToModule={onNavigateToModule} />;
}

function FeatureItem({ icon: Icon, label, description }: { icon: any; label: string; description: string }) {
  return (
    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
      <Icon className="w-6 h-6 text-purple-400 mb-2" />
      <div className="font-semibold text-white text-sm">{label}</div>
      <div className="text-xs text-slate-400">{description}</div>
    </div>
  );
}

function LPUExplorerModules({ userType, onNavigateToModule }: { userType: UserType; onNavigateToModule?: (module: string) => void }) {
  const modules = [
    {
      id: 'videos',
      icon: '🎥',
      title: 'Video Hub',
      description: 'Campus tours, admission process, hostel life, academics, coding',
    },
    {
      id: 'stories',
      icon: '🏆',
      title: 'Success Stories',
      description: 'Real placements, hackathon winners, startups, diverse careers',
    },
    {
      id: 'procedures',
      icon: '📋',
      title: 'Procedures & Guides',
      description: 'Documents checklist, hostel allocation, fee payment, ID card process',
    },
    {
      id: 'senior-advice',
      icon: '💬',
      title: 'Senior Comments',
      description: 'Honest advice from seniors in your branch and hostel',
    },
    {
      id: 'reality-check',
      icon: '⚡',
      title: 'Reality Check',
      description: 'Expectation vs reality - honest campus truths',
    },
    {
      id: 'branch-explorer',
      icon: '🧭',
      title: 'Branch Explorer',
      description: 'Detailed info, careers, and "is this for you?" quiz',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">LPU Explorer Dashboard</h2>
          <p className="text-slate-400">
            Logged in as: <span className="text-purple-400 font-semibold capitalize">{userType.replace('-', ' ')}</span>
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card
              key={module.id}
              className="cursor-pointer border-slate-700 hover:border-purple-500 transition-all hover:scale-105 overflow-hidden group"
              onClick={() => onNavigateToModule?.(module.id)}
            >
              <CardHeader>
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{module.icon}</div>
                <CardTitle className="text-white">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-6">{module.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10"
                >
                  Explore {module.icon}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Tips */}
        <Card className="mt-12 border-slate-700 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <span>💡</span> Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-2">
            <p>✓ Start with Videos to get real perspective from seniors</p>
            <p>✓ Read Success Stories to see diverse career paths</p>
            <p>✓ Keep Procedures & Guides handy for quick reference</p>
            <p>✓ Senior Comments are raw and unfiltered - most helpful for first month jitters</p>
            <p>✓ If unsure about your branch, take the "Is this branch for you?" quiz</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
