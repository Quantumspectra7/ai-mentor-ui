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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          {onBack && (
            <Button variant="outline" className="mb-4" onClick={onBack}>
              ← Back
            </Button>
          )}
          <h1 className="text-4xl font-bold text-white mb-2">🏆 Success Stories</h1>
          <p className="text-slate-400">
            Real placements, hackathon wins, internships, and startups from LPU students
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-300 mb-2">Filter by Branch:</p>
            <div className="flex flex-wrap gap-2">
              {branches.map((branch) => (
                <Button
                  key={branch}
                  variant={selectedBranch === branch ? 'default' : 'outline'}
                  onClick={() => setSelectedBranch(branch)}
                  className={
                    selectedBranch === branch
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'border-slate-700'
                  }
                >
                  {branch.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-300 mb-2">Filter by Achievement:</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                  className={
                    selectedCategory === cat
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'border-slate-700'
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
            <Card key={story.id} className="border-slate-700 overflow-hidden hover:border-purple-500 transition-all">
              <div className="flex flex-col md:flex-row">
                {/* Image placeholder */}
                <div className="w-full md:w-48 h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-5xl">
                  {getCategoryIcon(story.category)}
                </div>

                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-2xl text-white mb-1">{story.title}</CardTitle>
                      <div className="flex gap-2 text-sm text-slate-400">
                        <span>📚 {story.branch}</span>
                        <span>📅 Batch {story.year}</span>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                      {getCategoryIcon(story.category)} {story.category.replace('-', ' ')}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-purple-300 mb-1">The Journey:</h4>
                      <p className="text-slate-300 text-sm">{story.story}</p>
                    </div>

                    <div className="bg-slate-800/50 p-3 rounded border-l-2 border-purple-500">
                      <h4 className="font-semibold text-yellow-300 text-sm mb-1">🎯 Achievement:</h4>
                      <p className="text-slate-300 text-sm font-bold">{story.achievement}</p>
                    </div>

                    <div className="bg-slate-800/50 p-3 rounded border-l-2 border-blue-500">
                      <h4 className="font-semibold text-blue-300 text-sm mb-1">💡 Advice:</h4>
                      <p className="text-slate-300 text-sm italic">{story.advice}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {story.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-300">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {story.linkedIn && (
                    <Button variant="outline" size="sm" className="mt-4 border-blue-500 text-blue-400 hover:bg-blue-500/10">
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
            <p className="text-slate-400 text-lg">No stories found with these filters. Try adjusting them!</p>
          </div>
        )}

        {/* Motivation Section */}
        <Card className="mt-16 border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="text-white">🌟 Key Insight</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-3">
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
    </div>
  );
}
