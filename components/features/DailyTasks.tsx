'use client';

import { useMemo, useState, useEffect } from 'react';
import { ArrowLeft, Flame, Star, Zap, CheckCircle2, Trophy } from 'lucide-react';
import { dailyTasksByPhase } from '@/lib/phaseData';

const getPhaseNumber = (day: number): 1 | 2 | 3 => {
  if (day <= 30) return 1;
  if (day <= 60) return 2;
  return 3;
};

interface DailyTasksProps {
  currentDay: number;
  onBack: () => void;
}

const categoryEmojis: Record<string, string> = {
  academics: '📚',
  exploration: '🗺️',
  social: '👥',
  admin: '📋',
  activities: '🎯',
  learning: '💡',
  skills: '⚡',
  planning: '🎯'
};

export function DailyTasks({ currentDay, onBack }: DailyTasksProps) {
  const phase = getPhaseNumber(currentDay);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`tasksDay${currentDay}`);
    if (saved) setCompletedTasks(JSON.parse(saved));
  }, [currentDay]);

  const selectedTasks = useMemo(() => {
    const dayTasks = dailyTasksByPhase[phase];
    return dayTasks.slice(0, 3);
  }, [phase]);

  const toggleTask = (index: number) => {
    const taskId = `${currentDay}-${index}`;
    const updated = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    setCompletedTasks(updated);
    localStorage.setItem(`tasksDay${currentDay}`, JSON.stringify(updated));
  };

  const completionPercent = selectedTasks.length
    ? (completedTasks.length / selectedTasks.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-xl card-flat hover:border-primary/40 smooth-transition shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-white truncate">Today's Tasks</h1>
              <p className="text-xs md:text-sm text-gray-400">Day {currentDay} of your journey</p>
            </div>
          </div>
          <div className="card-flat px-6 py-3 text-center shrink-0">
            <p className="text-3xl font-bold text-purple-300">{Math.round(completionPercent)}%</p>
            <p className="text-xs text-gray-400 mt-1">Complete</p>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Task List */}
        <div className="space-y-3 mb-12 animate-fade-up">
          {selectedTasks.map((task, index) => {
            const taskId = `${currentDay}-${index}`;
            const isCompleted = completedTasks.includes(taskId);
            return (
              <button
                key={index}
                onClick={() => toggleTask(index)}
                className={`w-full card-premium p-6 smooth-transition text-left group hover-lift border ${
                  isCompleted
                    ? 'border-primary/30 bg-gradient-to-r from-primary/10 to-transparent'
                    : 'border-primary/10 hover:border-primary/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg smooth-transition shrink-0 ${
                    isCompleted
                      ? 'bg-gradient-primary text-white'
                      : 'bg-white/5 group-hover:bg-primary/20'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-primary/40 rounded-full group-hover:border-primary/60 smooth-transition" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-lg smooth-transition ${
                      isCompleted
                        ? 'line-through text-gray-500'
                        : 'text-white group-hover:text-primary'
                    }`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 capitalize flex items-center gap-2">
                      {categoryEmojis[task.category]} {task.category}
                    </p>
                  </div>
                  <span className="text-3xl group-hover:scale-125 smooth-transform shrink-0">
                    {categoryEmojis[task.category] || '✓'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="card-premium p-8 border-0 text-center hover-lift">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-500/5 mb-4">
              <Flame className="w-6 h-6 text-red-400" />
            </div>
            <p className="section-label mb-2">Streak</p>
            <p className="text-4xl font-bold text-red-400">{currentDay}</p>
            <p className="text-xs text-gray-400 mt-2">days consistent</p>
          </div>

          <div className="card-premium p-8 border-0 text-center hover-lift">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 mb-4">
              <Star className="w-6 h-6 text-blue-400" />
            </div>
            <p className="section-label mb-2">Tasks Today</p>
            <p className="text-4xl font-bold text-blue-400">{selectedTasks.length}</p>
            <p className="text-xs text-gray-400 mt-2">to complete</p>
          </div>

          <div className="card-premium p-8 border-0 text-center hover-lift">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <p className="section-label mb-2">Completed</p>
            <p className="text-4xl font-bold text-purple-400">{completedTasks.length}</p>
            <p className="text-xs text-gray-400 mt-2">tasks done</p>
          </div>
        </div>

        {/* Achievement Card */}
        {completionPercent === 100 && (
          <div className="card-premium p-8 border-0 text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 mb-12 animate-bounce-subtle">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Perfect Day! 🎉</h3>
            <p className="text-gray-300 mb-4">You've completed all tasks for today. Keep it up!</p>
            <div className="h-1 w-16 gradient-primary rounded-full mx-auto"></div>
          </div>
        )}

        {/* Motivational Message */}
        <div className="card-premium p-8 border-0 text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {completionPercent < 50 ? (
            <>
              <p className="text-xl font-bold text-white mb-2">You've got this! 💪</p>
              <p className="text-gray-300">Complete your tasks one by one. Small steps lead to big wins!</p>
            </>
          ) : completionPercent < 100 ? (
            <>
              <p className="text-xl font-bold text-white mb-2">Almost there! 🏃</p>
              <p className="text-gray-300">Just {selectedTasks.length - completedTasks.length} more task{selectedTasks.length - completedTasks.length !== 1 ? 's' : ''} to go!</p>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
