'use client';

import { useState } from 'react';
import { ArrowLeft, BookOpen, Zap, Lightbulb, Target } from 'lucide-react';
import { studyResources } from '@/lib/phaseData';

interface StudyHelperProps {
  onBack: () => void;
}

export function StudyHelper({ onBack }: StudyHelperProps) {
  const [selectedSubject, setSelectedSubject] = useState<keyof typeof studyResources>('programming');

  const subject = studyResources[selectedSubject];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="glass-accent sticky top-0 z-40 border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg glass smooth-transition hover:border-primary/40"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Study Helper</h1>
            <p className="text-sm text-gray-400">Master subjects with guided learning paths</p>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Subject Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 animate-fade-up">
          {Object.entries(studyResources).map(([key, value], idx) => (
            <button
              key={key}
              onClick={() => setSelectedSubject(key as keyof typeof studyResources)}
              style={{ animationDelay: `${idx * 0.05}s` }}
              className={`glass-accent rounded-2xl p-6 smooth-transition text-left group ${
                selectedSubject === key
                  ? 'border-primary/50 bg-primary/10'
                  : 'border-primary/10 hover:border-primary/30'
              }`}
            >
              <div className={`p-3 rounded-lg mb-4 w-fit ${selectedSubject === key ? 'bg-primary/20' : 'bg-primary/10 group-hover:bg-primary/20'} smooth-transition`}>
                <BookOpen className={`w-6 h-6 ${selectedSubject === key ? 'text-primary' : 'text-primary/60'}`} />
              </div>
              <h3 className="font-semibold text-white group-hover:text-primary smooth-transition">{value.title}</h3>
              <p className="text-xs text-gray-400 mt-2">{value.topics.length} topics</p>
            </button>
          ))}
        </div>

        {/* Topics */}
        <div className="glass-accent rounded-3xl p-10 mb-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-3xl font-bold text-white mb-8">{subject.title}</h2>

          <div className="mb-10">
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Topics to Master
            </h3>
            <div className="space-y-3">
              {subject.topics.map((topic, index) => (
                <div key={index} className="glass rounded-2xl p-5 hover:border-primary/40 smooth-transition group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold group-hover:bg-primary/30 smooth-transition">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white group-hover:text-primary smooth-transition">{topic.name}</h4>
                      <div className="flex gap-3 mt-3 text-xs">
                        <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary font-medium">
                          {topic.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-accent/20 text-accent font-medium">
                          {topic.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mb-10 p-6 rounded-2xl glass-accent border-primary/20">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Senior Tip
            </h3>
            <p className="text-gray-300 leading-relaxed">{subject.tips}</p>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-semibold text-white mb-4">Recommended Learning Platforms</h3>
            <div className="flex flex-wrap gap-3">
              {subject.platforms.map((platform, index) => (
                <button
                  key={index}
                  className="px-4 py-2 rounded-lg glass smooth-transition hover:border-primary/40 font-medium text-sm text-white"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Study Tips Card */}
        <div className="glass-accent rounded-3xl p-10 border-secondary/20 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent" />
            Study Techniques That Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '⏰', title: 'Pomodoro Technique', desc: '25 min study, 5 min break' },
              { icon: '📝', title: 'Active Learning', desc: 'Write, teach, solve problems' },
              { icon: '👥', title: 'Study Groups', desc: 'Learn faster together' },
              { icon: '🔄', title: 'Spaced Repetition', desc: 'Review over days/weeks' }
            ].map((tip, idx) => (
              <div key={idx} className="glass rounded-2xl p-5 hover:border-primary/40 smooth-transition group">
                <p className="text-3xl mb-3">{tip.icon}</p>
                <p className="font-semibold text-white group-hover:text-primary smooth-transition">{tip.title}</p>
                <p className="text-sm text-gray-400 mt-2">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
