'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { branchInfo, branchQuiz } from '@/lib/lpuData';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

interface BranchExplorerProps {
  onBack?: () => void;
}

export function BranchExplorer({ onBack }: BranchExplorerProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  if (showQuiz) {
    return (
      <BranchQuiz
        onBack={() => {
          setShowQuiz(false);
          setQuizAnswers([]);
        }}
        onQuizComplete={(results) => {
          setQuizAnswers(results);
          setShowQuiz(false);
        }}
      />
    );
  }

  const displayBranch = selectedBranch
    ? branchInfo.find((b) => b.id === selectedBranch)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          {onBack && (
            <Button variant="outline" className="mb-4" onClick={onBack}>
              ← Back
            </Button>
          )}
          <h1 className="text-4xl font-bold text-white mb-2">🧭 Branch Explorer</h1>
          <p className="text-slate-400">
            Explore careers, placements, and reality of each branch at LPU
          </p>

          <Button
            onClick={() => setShowQuiz(true)}
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            🎯 Take "Is This Branch For You?" Quiz
          </Button>
        </div>

        {!displayBranch ? (
          // Branch Selection Grid
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {branchInfo.map((branch) => (
              <Card
                key={branch.id}
                className="cursor-pointer border-slate-700 hover:border-purple-500 transition-all hover:scale-105 overflow-hidden group"
                onClick={() => setSelectedBranch(branch.id)}
              >
                <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{branch.name}</CardTitle>
                  <p className="text-sm text-slate-400 mt-2">{branch.description}</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">📊 Placement Rate</span>
                      <span className="font-bold text-green-400">{branch.placementRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">💰 Avg Package</span>
                      <span className="font-bold text-yellow-400">₹{branch.avgPackage} LPA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">🏢 Top Recruiters</span>
                      <span className="text-xs text-slate-300">
                        {branch.topRecruiters[0]}, {branch.topRecruiters[1]}...
                      </span>
                    </div>
                  </div>

                  <Button
                    fullWidth
                    variant="outline"
                    className="w-full mt-4 border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Detailed Branch View
          <div>
            <Button
              variant="outline"
              className="mb-6"
              onClick={() => setSelectedBranch(null)}
            >
              ← Back to Branches
            </Button>

            <Card className="border-purple-500/30 bg-slate-900/50 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl text-white mb-2">
                      {displayBranch?.name}
                    </CardTitle>
                    <p className="text-slate-400">{displayBranch?.description}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Key Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-slate-800 border border-green-500/30">
                    <p className="text-sm text-slate-400 mb-1">📊 Placement Rate</p>
                    <p className="text-3xl font-bold text-green-400">
                      {displayBranch?.placementRate}%
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800 border border-yellow-500/30">
                    <p className="text-sm text-slate-400 mb-1">💰 Average Package</p>
                    <p className="text-3xl font-bold text-yellow-400">
                      ₹{displayBranch?.avgPackage} LPA
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-800 border border-blue-500/30">
                    <p className="text-sm text-slate-400 mb-1">🎯 Career Paths</p>
                    <p className="text-lg font-bold text-blue-400">
                      {displayBranch?.careerPaths.length} Options
                    </p>
                  </div>
                </div>

                {/* Subjects */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">📚 Core Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayBranch?.subjects.map((subject) => (
                      <Badge key={subject} className="bg-purple-600/50">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Top Recruiters */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">🏢 Top Recruiters</h3>
                  <div className="grid md:grid-cols-3 gap-2">
                    {displayBranch?.topRecruiters.map((recruiter) => (
                      <div
                        key={recruiter}
                        className="p-3 rounded bg-slate-800 border border-blue-500/30 text-center"
                      >
                        <p className="text-white font-semibold">{recruiter}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Paths */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">🚀 Career Paths</h3>
                  <div className="space-y-2">
                    {displayBranch?.careerPaths.map((path) => (
                      <div
                        key={path}
                        className="p-3 rounded bg-slate-800 border border-green-500/30 text-slate-200 flex items-center gap-2"
                      >
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        {path}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Is This For You */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">✅ Is This for You?</h3>
                  <div className="space-y-2">
                    {displayBranch?.isForYou.map((reason) => (
                      <div
                        key={reason}
                        className="p-2 rounded bg-green-500/10 border border-green-500/30 text-green-300 text-sm"
                      >
                        ✓ {reason}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Need Urgently */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">🎯 You Need Urgently</h3>
                  <div className="space-y-2">
                    {displayBranch?.needUrgently.map((need) => (
                      <div
                        key={need}
                        className="p-2 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm"
                      >
                        ⚡ {need}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Senior Advice */}
                <div className="bg-slate-800/50 border-l-4 border-purple-500 p-4 rounded">
                  <p className="text-sm text-slate-400 mb-2">💬 Senior Advice:</p>
                  <p className="text-white italic">"{displayBranch?.seniorAdvice}"</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quiz CTA */}
        {!showQuiz && !displayBranch && (
          <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
            <CardHeader>
              <CardTitle className="text-white">🤔 Still Can't Decide?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Take our interactive quiz to find out which branch matches your interests, skills, and career goals.
              </p>
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                🎯 Start Quiz (2 min)
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function BranchQuiz({
  onBack,
  onQuizComplete,
}: {
  onBack: () => void;
  onQuizComplete: (results: string[]) => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (branchIds: string[]) => {
    const newAnswers = [...answers, ...branchIds];
    setAnswers(newAnswers);

    if (currentQ < branchQuiz.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate results
      const branchCounts = branchInfo.map((b) => ({
        branch: b.name,
        branchId: b.id,
        count: newAnswers.filter((id) => id === b.id).length,
      }));

      branchCounts.sort((a, b) => b.count - a.count);

      // Show results
      onQuizComplete(newAnswers);
    }
  };

  const question = branchQuiz[currentQ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Button variant="outline" className="mb-8" onClick={onBack}>
          ← Back
        </Button>

        <Card className="border-purple-500/30 bg-slate-900/50">
          <CardHeader>
            <div className="mb-4">
              <p className="text-purple-400 font-semibold">Question {currentQ + 1} of {branchQuiz.length}</p>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQ + 1) / branchQuiz.length) * 100}%` }}
                />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">{question.question}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleAnswer(option.branch)}
                  variant="outline"
                  className="w-full justify-start h-auto py-4 px-6 border-slate-700 hover:border-purple-500 hover:bg-purple-500/10 text-left"
                >
                  <span className="text-lg">{option.text}</span>
                </Button>
              ))}
            </div>

            <p className="text-xs text-slate-400 mt-8 text-center">
              Your answers help us recommend the best branch for you
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
