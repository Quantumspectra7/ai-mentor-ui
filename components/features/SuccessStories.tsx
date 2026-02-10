'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { successStories } from '@/lib/lpuData';

interface SuccesStoriesProps {
  onBack?: () => void;
}

export function SuccessStories({ onBack }: SuccesStoriesProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const branches = ['all', ...new Set(successStories.map((s) => s.branch))];
  const categories = ['all', ...new Set(successStories.map((s) => s.category))];

  const filtered = successStories.filter((story) => {
    return (
      (selectedBranch === 'all' || story.branch === selectedBranch) &&
      (selectedCategory === 'all' || story.category === selectedCategory)
    );
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'placement':
        return '💼';
      case 'internship':
        return '🏢';
      case 'hackathon':
        return '🏆';
      case 'startup':
        return '🚀';
      default:
        return '⭐';
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
          <p className="eyebrow text-xs text-amber-300">Success Stories</p>
          <h1 className="font-display hero-title text-4xl text-amber-50 mb-2 md:text-5xl">🏆 Success Stories</h1>
          <p className="text-amber-100/70">
            Real placements, hackathon wins, internships, and startups from LPU students
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="mb-4">
            <p className="text-sm font-semibold text-amber-100/70 mb-2">Filter by Branch:</p>
            <div className="flex flex-wrap gap-2">
              {branches.map((branch) => (
                <Button
                  key={branch}
                  variant={selectedBranch === branch ? 'default' : 'outline'}
                  onClick={() => setSelectedBranch(branch)}
                  className={
                    selectedBranch === branch
                      ? 'bg-amber-500 text-black hover:bg-amber-400'
                      : 'border-amber-500/30 text-amber-100'
                  }
                >
                  {branch.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-amber-100/70 mb-2">Filter by Achievement:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                  className={
                    selectedCategory === cat
                      ? 'bg-teal-500 text-black hover:bg-teal-400'
                      : 'border-amber-500/30 text-amber-100'
                  }
                >
                  {getCategoryIcon(cat)} {cat.replace('-', ' ').toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="space-y-6">
          {filtered.map((story) => (
            <Card key={story.id} className="luxe-card overflow-hidden transition-all">
              <div className="flex flex-col md:flex-row">
                {/* Image placeholder */}
                <div className="w-full md:w-48 h-48 bg-gradient-to-br from-amber-500 to-teal-500 flex items-center justify-center text-5xl">
                  {getCategoryIcon(story.category)}
                </div>

                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="font-display text-2xl text-amber-50 mb-1">{story.title}</CardTitle>
                      <div className="flex gap-2 text-sm text-amber-100/60">
                        <span>📚 {story.branch}</span>
                        <span>📅 Batch {story.year}</span>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-amber-500 to-teal-500 text-black">
                      {getCategoryIcon(story.category)} {story.category.replace('-', ' ')}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-amber-200 mb-1">The Journey:</h4>
                      <p className="text-amber-100/70 text-sm">{story.story}</p>
                    </div>

                    <div className="bg-black/30 p-3 rounded-2xl border-l-2 border-amber-500">
                      <h4 className="font-semibold text-amber-200 text-sm mb-1">🎯 Achievement:</h4>
                      <p className="text-amber-100 text-sm font-bold">{story.achievement}</p>
                    </div>

                    <div className="bg-black/30 p-3 rounded-2xl border-l-2 border-teal-400">
                      <h4 className="font-semibold text-teal-200 text-sm mb-1">💡 Advice:</h4>
                      <p className="text-amber-100/70 text-sm italic">{story.advice}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {story.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-amber-500/30 text-amber-200">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {story.linkedIn && (
                    <Button variant="outline" size="sm" className="mt-4 border-teal-400 text-teal-200 hover:bg-teal-500/10">
                      Connect on LinkedIn
                    </Button>
                  )}
                </CardHeader>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-amber-100/70 text-lg">No stories found with these filters. Try adjusting them!</p>
          </div>
        )}

        {/* Motivation Section */}
        <Card className="mt-16 luxe-card border-amber-500/30">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-amber-50">🌟 Key Insight</CardTitle>
          </CardHeader>
          <CardContent className="text-amber-100/70 space-y-3">
            <p>
              • <strong>Diverse paths exist</strong> - CSE students are not limited to IT, Mechanical + Code = Startup founders, Civil engineers in consulting firms
            </p>
            <p>
              • <strong>First semester matters but isn't everything</strong> - Most success stories picked themselves up in year 2-3
            </p>
            <p>
              • <strong>Skill + Persistence beats intelligence</strong> - Every single story here is someone who worked hard, not necessarily the smartest
            </p>
            <p>
              • <strong>Start something NOW</strong> - These people didn't wait. They picked up coding, joined clubs, started building in first year
            </p>
          </CardContent>
        </Card>
    </div>
  );
}
