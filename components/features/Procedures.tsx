'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { procedures } from '@/lib/lpuData';
import { ChevronDown, Download } from 'lucide-react';

interface ProceduresProps {
  onBack?: () => void;
}

export function Procedures({ onBack }: ProceduresProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean[] }>({});

  const categories = [...new Set(procedures.map((p) => p.category))];

  const toggleCompleted = (procId: string, stepIdx: number) => {
    if (!completedSteps[procId]) {
      completedSteps[procId] = [];
    }
    const updated = [...completedSteps[procId]];
    updated[stepIdx] = !updated[stepIdx];
    setCompletedSteps({ ...completedSteps, [procId]: updated });
    localStorage.setItem('completedSteps', JSON.stringify(completedSteps));
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'admission':
        return '📝';
      case 'documents':
        return '📄';
      case 'hostel':
        return '🛏️';
      case 'fees':
        return '💳';
      case 'academic':
        return '📚';
      case 'identity':
        return '🪪';
      default:
        return '📋';
    }
  };

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
          <h1 className="text-4xl font-bold text-white mb-2">📋 Procedures & Guides</h1>
          <p className="text-slate-400">
            Step-by-step guides for admission documents, hostel allocation, fee payment, and more
          </p>
        </div>

        {/* Important Note */}
        <Card className="mb-8 border-yellow-500/30 bg-yellow-500/10">
          <CardContent className="pt-6">
            <p className="text-yellow-300 font-semibold mb-2">⚠️ Keep These Handy:</p>
            <p className="text-yellow-200">
              Bookmark this page. You'll need to reference it multiple times during admission and first semester. Download PDFs where available.
            </p>
          </CardContent>
        </Card>

        {/* Procedures by Category */}
        <div className="space-y-6">
          {categories.map((category) => {
            const procs = procedures.filter((p) => p.category === category);
            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-white mb-4">
                  {getCategoryIcon(category)} {category.replace('-', ' ').toUpperCase()}
                </h2>

                <div className="space-y-4 mb-8">
                  {procs.map((proc) => (
                    <Card
                      key={proc.id}
                      className="border-slate-700 hover:border-purple-500 transition-all cursor-pointer"
                      onClick={() =>
                        setExpandedId(expandedId === proc.id ? null : proc.id)
                      }
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg text-white">
                                {proc.title}
                              </CardTitle>
                              {proc.important && (
                                <Badge className="bg-red-600">⚠️ Important</Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-400">
                              Estimated time: {proc.estimatedTime}
                            </p>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${
                              expandedId === proc.id ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </CardHeader>

                      {expandedId === proc.id && (
                        <CardContent className="space-y-4">
                          {/* Steps */}
                          <div>
                            <p className="font-semibold text-purple-300 mb-3">
                              📋 Steps ({proc.steps.length}):
                            </p>
                            <div className="space-y-2">
                              {proc.steps.map((step, idx) => (
                                <div
                                  key={idx}
                                  className={`flex items-start gap-3 p-3 rounded transition-all ${
                                    completedSteps[proc.id]?.[idx]
                                      ? 'bg-green-500/10 border border-green-500/30'
                                      : 'bg-slate-800/50 border border-slate-700'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCompleted(proc.id, idx);
                                  }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={completedSteps[proc.id]?.[idx] || false}
                                    onChange={() => {}}
                                    className="w-5 h-5 mt-1 cursor-pointer"
                                  />
                                  <div>
                                    <p
                                      className={
                                        completedSteps[proc.id]?.[idx]
                                          ? 'text-green-300 line-through'
                                          : 'text-slate-300'
                                      }
                                    >
                                      {idx + 1}. {step}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Progress */}
                            {proc.steps.length > 0 && (
                              <div className="mt-4">
                                <p className="text-xs text-slate-400 mb-1">
                                  Progress:{' '}
                                  {completedSteps[proc.id]?.filter((v) => v).length || 0} /{' '}
                                  {proc.steps.length}
                                </p>
                                <div className="w-full bg-slate-800 rounded-full h-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full transition-all"
                                    style={{
                                      width: `${
                                        ((completedSteps[proc.id]?.filter((v) => v)
                                          .length || 0) /
                                          proc.steps.length) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Contact & Links */}
                          <div className="border-t border-slate-700 pt-4 flex flex-col gap-2">
                            {proc.contact && (
                              <div>
                                <p className="text-sm text-slate-400 mb-1">
                                  📞 Contact:
                                </p>
                                <p className="text-slate-300 font-mono text-sm">
                                  {proc.contact}
                                </p>
                              </div>
                            )}

                            {proc.downloadUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-purple-500 text-purple-400 hover:bg-purple-500/10 justify-start"
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download PDF/Format
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Checklist Summary */}
        <Card className="mt-12 border-purple-500/30 bg-purple-500/5">
          <CardHeader>
            <CardTitle className="text-white">✅ Your Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">
              Total steps completed:{' '}
              <span className="font-bold text-purple-400">
                {Object.values(completedSteps)
                  .flat()
                  .filter((v) => v).length}
              </span>{' '}
              / {procedures.reduce((acc, p) => acc + p.steps.length, 0)}
            </p>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div
                className="bg-purple-600 h-3 rounded-full transition-all"
                style={{
                  width: `${
                    (Object.values(completedSteps)
                      .flat()
                      .filter((v) => v).length /
                      procedures.reduce((acc, p) => acc + p.steps.length, 0)) *
                    100
                  }%`,
                }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Keep tracking your progress by checking off steps as you complete them
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
