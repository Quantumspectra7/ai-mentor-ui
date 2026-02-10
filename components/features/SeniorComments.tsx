'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { seniorComments } from '@/lib/lpuData';
import { ThumbsUp } from 'lucide-react';

interface SeniorCommentsProps {
  onBack?: () => void;
}

export function SeniorComments({ onBack }: SeniorCommentsProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'helpful' | 'recent'>('helpful');

  const branches = ['all', ...new Set(seniorComments.map((c) => c.branch))];
  const moods = ['all', 'motivation', 'reality-check', 'warning', 'funny'];

  const filtered = useMemo(
    () =>
      seniorComments
        .filter((comment) => {
          return (
            (selectedBranch === 'all' || comment.branch === selectedBranch) &&
            (selectedMood === 'all' || comment.mood === selectedMood)
          );
        })
        .sort((a, b) => {
          if (sortBy === 'helpful') {
            return b.helpful - a.helpful;
          }
          return 0;
        }),
    [selectedBranch, selectedMood, sortBy]
  );

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'motivation':
        return '💪';
      case 'reality-check':
        return '⚡';
      case 'warning':
        return '⚠️';
      case 'funny':
        return '😂';
      default:
        return '💬';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'motivation':
        return 'bg-green-500/20 border-green-500/50 text-green-300';
      case 'reality-check':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300';
      case 'warning':
        return 'bg-red-500/20 border-red-500/50 text-red-300';
      case 'funny':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
      default:
        return 'bg-slate-500/20 border-slate-500/50';
    }
  };

  return (
    <div className="space-y-10">
        {/* Header */}
        <div className="mb-12">
          {onBack && (
            <Button variant="outline" className="mb-4" onClick={onBack}>
              ← Back
            </Button>
          )}
          <p className="eyebrow text-xs text-amber-300">Senior Advice</p>
          <h1 className="font-display hero-title text-4xl text-amber-50 mb-2 md:text-5xl">💬 Senior Comments</h1>
          <p className="text-amber-100/70">
            Raw, unfiltered wisdom from seniors. {filtered.length} comments
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div>
            <p className="text-sm font-semibold text-amber-100/70 mb-2">Filter by Branch:</p>
            <div className="flex flex-wrap gap-2">
              {branches.map((branch) => (
                <Badge
                  key={branch}
                  variant={selectedBranch === branch ? 'default' : 'outline'}
                  onClick={() => setSelectedBranch(branch)}
                  className={`cursor-pointer ${
                    selectedBranch === branch
                      ? 'bg-amber-500 text-black hover:bg-amber-400'
                      : 'border-amber-500/30 text-amber-100'
                  }`}
                >
                  {branch.toUpperCase()}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-amber-100/70 mb-2">Filter by Type:</p>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <Badge
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`cursor-pointer ${getMoodColor(mood)}`}
                  variant="outline"
                >
                  {getMoodIcon(mood)} {mood.replace('-', ' ').charAt(0).toUpperCase() + mood.replace('-', ' ').slice(1)}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={sortBy === 'helpful' ? 'default' : 'outline'}
              onClick={() => setSortBy('helpful')}
              className={
                sortBy === 'helpful'
                  ? 'bg-amber-500 text-black hover:bg-amber-400'
                  : 'border-amber-500/30 text-amber-100'
              }
            >
              Most Helpful 👍
            </Button>
            <Button
              size="sm"
              variant={sortBy === 'recent' ? 'default' : 'outline'}
              onClick={() => setSortBy('recent')}
              className={
                sortBy === 'recent'
                  ? 'bg-amber-500 text-black hover:bg-amber-400'
                  : 'border-amber-500/30 text-amber-100'
              }
            >
              Most Recent ⏰
            </Button>
          </div>
        </div>

        {/* Comments Grid */}
        <div className="space-y-4">
          {filtered.map((comment) => (
            <Card
              key={comment.id}
              className={`luxe-card border ${getMoodColor(comment.mood).split(' ').slice(2).join(' ')} transition-all`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-2xl">{getMoodIcon(comment.mood)}</div>
                      <div>
                        <p className="font-semibold text-amber-50">
                          {comment.name ? comment.name : 'Anonymous Senior'}
                        </p>
                        <p className="text-xs text-amber-100/60">
                          {comment.branch} • Year {comment.year}
                          {comment.hostel && ` • ${comment.hostel}`}
                          {comment.gender && ` • ${comment.gender === 'M' ? 'Male' : 'Female'}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge className={getMoodColor(comment.mood)}>
                    {comment.mood.replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-amber-100/70 italic mb-4 text-lg leading-relaxed">"{comment.advice}"</p>

                <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                  <div className="flex gap-2">
                    {comment.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs border-amber-500/30 text-amber-200">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="text-amber-200 hover:text-emerald-300">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {comment.helpful}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-amber-100/70 text-lg">
              No comments found. Try adjusting filters!
            </p>
          </div>
        )}

        {/* Insight */}
        <Card className="mt-16 luxe-card border-amber-500/30">
          <CardHeader>
            <p className="text-amber-50 font-bold mb-2">💡 Why Senior Comments Matter</p>
          </CardHeader>
          <CardContent className="text-amber-100/70 space-y-2 text-sm">
            <p>✓ These are real people who lived through what you're about to experience</p>
            <p>✓ They won't sugarcoat- you get honest, street-level wisdom</p>
            <p>✓ Filter by branch/mood to find the most relevant advice</p>
            <p>✓ The "Reality Check" and "Warning" comments? Read them 10 times. They save lives.</p>
            <p>✓ Bookmark the "Funny" ones for when you're stressed 😂</p>
          </CardContent>
        </Card>
    </div>
  );
}
