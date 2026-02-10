'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, BookOpen, MessageSquare, TrendingUp, ArrowRight, Zap, Users, Brain } from 'lucide-react';
import { GlowingCard, AnimatedCard } from '@/components/ui/animated-components';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

interface LandingScreenProps {
  onStart: (profile: {
    name: string;
    branch: string;
    hostel: string;
    interests: string[];
  }) => void;
}

export function LandingScreen({ onStart }: LandingScreenProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [hostel, setHostel] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const interestOptions = ['Coding', 'Design', 'Core', 'Robotics', 'Sports', 'Arts'];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleStart = () => {
    if (name && branch) {
      onStart({
        name,
        branch,
        hostel,
        interests
      });
    }
  };

  if (!showOnboarding) {
    return (
      <div className="min-h-screen relative overflow-hidden dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br dark:from-purple-500/20 dark:to-purple-500/0 from-purple-500/10 to-purple-500/0 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl dark:from-blue-500/20 dark:to-blue-500/0 from-blue-500/10 to-blue-500/0 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-t dark:from-pink-500/15 dark:to-pink-500/0 from-pink-500/5 to-pink-500/0 rounded-full blur-3xl"></div>
        </div>

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
          <svg className="w-full h-full" {...{ 'xmlns': 'http://www.w3.org/2000/svg' }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="dark:text-primary/5 text-primary/10"/>
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
          <div className="max-w-5xl mx-auto w-full">
            {/* Hero Section */}
            <div className="text-center space-y-8 mb-20">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full dark:bg-purple-500/20 dark:border-purple-500/30 bg-purple-500/10 border border-purple-500/20">
                <Sparkles className="w-4 h-4 dark:text-purple-300 text-purple-600" />
                <span className="text-xs font-semibold dark:text-purple-200 text-purple-700">Introducing Your AI Mentor</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
                  <span className="dark:text-white text-slate-900">Master Your</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 from-purple-600 via-pink-600 to-blue-600">First 90 Days</span>
                </h1>
                <p className="text-base md:text-lg dark:text-gray-300 text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                  Your personal AI mentor guides you through campus life with real advice, daily tasks, and emotional support. From orientation to confidence, we've got you covered.
                </p>
              </div>

              {/* Features Grid - Three columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                {/* Feature 1 */}
                <GlowingCard glow="purple">
                  <div className="mb-4 inline-flex p-3 rounded-2xl dark:bg-gradient-to-br dark:from-purple-500/30 dark:to-purple-500/10 bg-purple-500/20">
                    <Brain className="w-6 h-6 dark:text-purple-300 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white text-slate-900 mb-2">AI Mentor Chat</h3>
                  <p className="text-sm dark:text-gray-300 text-slate-600">Get instant personalized advice on academics, campus life, and personal growth</p>
                </GlowingCard>

                {/* Feature 2 */}
                <GlowingCard glow="blue">
                  <div className="mb-4 inline-flex p-3 rounded-2xl dark:bg-gradient-to-br dark:from-blue-500/30 dark:to-blue-500/10 bg-blue-500/20">
                    <BookOpen className="w-6 h-6 dark:text-blue-300 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white text-slate-900 mb-2">Campus & Study Hub</h3>
                  <p className="text-sm dark:text-gray-300 text-slate-600">Navigate campus, find resources, and discover how to excel in your studies</p>
                </GlowingCard>

                {/* Feature 3 */}
                <GlowingCard glow="pink">
                  <div className="mb-4 inline-flex p-3 rounded-2xl dark:bg-gradient-to-br dark:from-pink-500/30 dark:to-pink-500/10 bg-pink-500/20">
                    <TrendingUp className="w-6 h-6 dark:text-pink-300 text-pink-600" />
                  </div>
                  <h3 className="text-lg font-semibold dark:text-white text-slate-900 mb-2">Progress & Growth</h3>
                  <p className="text-sm dark:text-gray-300 text-slate-600">Track daily milestones and celebrate your journey from day 1 to day 90</p>
                </GlowingCard>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <button
                  onClick={() => setShowOnboarding(true)}
                  className="btn-gradient inline-flex items-center gap-3 text-lg group px-8 py-4 rounded-2xl hover-lift-sm"
                >
                  <Zap className="w-5 h-5" />
                  Start Your 90-Day Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
                </button>
              </div>

              {/* Sign-off */}
              <p className="text-xs dark:text-gray-400 text-slate-500 pt-4">
                ✨ No credit card required • All data saved locally • No tracking
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Onboarding Form with 3D Card
  return (
    <div className="min-h-screen relative dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-96 h-96 dark:bg-purple-500/10 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 dark:bg-blue-500/10 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <button
              onClick={() => setShowOnboarding(false)}
              className="mx-auto mb-6 dark:text-gray-400 dark:hover:text-white text-slate-500 hover:text-slate-900 smooth-transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-3 dark:text-white text-slate-900">
              <span className="text-gradient">Tell Us About Yourself</span>
            </h1>
            <p className="dark:text-gray-300 text-slate-600">Personalize your mentoring experience for maximum impact</p>
          </div>

          {/* 3D Card Container */}
          <CardContainer containerClassName="h-auto">
            <CardBody className="dark:bg-slate-900/50 bg-white/80 dark:border-slate-700 border-slate-200 p-10 space-y-8">
              {/* Name Input */}
              <CardItem
                as="div"
                translateZ={0}
                className="space-y-3"
              >
                <label className="section-label dark:text-purple-400 text-purple-600">Your Name</label>
                <div className="relative">
                  <Input
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-glass dark:bg-slate-800/50 dark:border-slate-700 dark:text-white dark:placeholder-gray-500 bg-white/50 border-slate-300 text-slate-900 placeholder-slate-400 pl-12"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👤</span>
                </div>
              </CardItem>

              {/* Branch Select */}
              <CardItem
                as="div"
                translateZ={0}
                className="space-y-3"
              >
                <label className="section-label dark:text-purple-400 text-purple-600">Your Branch</label>
                <div className="relative">
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full input-glass dark:bg-slate-800/50 dark:border-slate-700 dark:text-white bg-white/50 border-slate-300 text-slate-900 pl-12 appearance-none cursor-pointer"
                  >
                    <option value="">Select your branch</option>
                    <option value="CSE">🖥️ Computer Science Engineering</option>
                    <option value="ECE">📡 Electronics & Communication</option>
                    <option value="EEE">⚡ Electrical Engineering</option>
                    <option value="ME">🔧 Mechanical Engineering</option>
                    <option value="CIVIL">🏗️ Civil Engineering</option>
                    <option value="Other">📚 Other</option>
                  </select>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">⚡</span>
                  <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 dark:text-gray-500 text-gray-400 pointer-events-none" />
                </div>
              </CardItem>

              {/* Hostel Select */}
              <CardItem
                as="div"
                translateZ={0}
                className="space-y-3"
              >
                <label className="section-label dark:text-purple-400 text-purple-600">Living Status</label>
                <div className="relative">
                  <select
                    value={hostel}
                    onChange={(e) => setHostel(e.target.value)}
                    className="w-full input-glass dark:bg-slate-800/50 dark:border-slate-700 dark:text-white bg-white/50 border-slate-300 text-slate-900 pl-12 appearance-none cursor-pointer"
                  >
                    <option value="">Select your status</option>
                    <option value="hostel">🏠 Hostel Student</option>
                    <option value="day">🚗 Day Scholar</option>
                  </select>
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🏢</span>
                  <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 dark:text-gray-500 text-gray-400 pointer-events-none" />
                </div>
              </CardItem>

              {/* Interests */}
              <CardItem
                as="div"
                translateZ={0}
                className="space-y-4"
              >
                <label className="section-label dark:text-purple-400 text-purple-600">Your Interests (Optional)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {interestOptions.map((interest, idx) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-3 rounded-xl font-medium smooth-transition relative overflow-hidden group cursor-pointer ${
                        interests.includes(interest)
                          ? 'gradient-primary text-white shadow-lg shadow-purple-500/50' 
                          : 'dark:bg-slate-800/50 dark:border-slate-700 dark:text-gray-200 dark:hover:border-purple-500/50 bg-white/50 border border-slate-300 text-slate-900 hover:border-purple-400'
                      }`}
                    >
                      <span className="relative z-10">{interest}</span>
                      {interests.includes(interest) && (
                        <Sparkles className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 opacity-70" />
                      )}
                    </button>
                  ))}
                </div>
              </CardItem>

              {/* Progress Bar */}
              <CardItem
                as="div"
                translateZ={0}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold dark:text-gray-400 text-slate-500 uppercase tracking-wide">Profile Completion</span>
                  <span className="text-sm font-semibold dark:text-purple-300 text-purple-600">
                    {Math.round(((name ? 1 : 0) + (branch ? 1 : 0)) / 2 * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full dark:bg-slate-700/50 dark:border-purple-500/20 bg-slate-200/50 border border-purple-300/30 overflow-hidden">
                  <div 
                    className="h-full gradient-primary rounded-full smooth-transition"
                    style={{ width: `${((name ? 1 : 0) + (branch ? 1 : 0)) / 2 * 100}%` }}
                  ></div>
                </div>
              </CardItem>

              {/* Submit Button */}
              <CardItem
                as="div"
                translateZ={0}
                className=""
              >
                <button
                  onClick={handleStart}
                  disabled={!name || !branch}
                  className={`w-full h-14 rounded-xl font-semibold text-base smooth-transition flex items-center justify-center gap-2 relative overflow-hidden group ${
                    name && branch
                      ? 'btn-gradient btn-pulse shadow-lg'
                      : 'dark:bg-slate-800 dark:text-gray-500 bg-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  {name && branch ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Begin My 90-Day Journey
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 smooth-transition" />
                    </>
                  ) : (
                    <span>Fill in your details to continue</span>
                  )}
                </button>
              </CardItem>

              <p className="text-xs dark:text-gray-400 text-slate-500 text-center pt-4">
                Your data is saved locally on your device. We don't collect or store any information.
              </p>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>
  );
}
