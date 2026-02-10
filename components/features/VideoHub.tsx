'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, videoData, UserType } from '@/lib/lpuData';
import { Play, Heart, MessageSquare } from 'lucide-react';

interface VideoHubProps {
  userType: UserType;
  onBack?: () => void;
}

export function VideoHub({ userType, onBack }: VideoHubProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [watchLater, setWatchLater] = useState<string[]>([]);

  useEffect(() => {
    // Filter videos for this user type
    const filtered = videoData.filter((v) => v.forUserTypes.includes(userType));
    setVideos(filtered);

    // Load watch-later from localStorage
    const saved = localStorage.getItem(`watchLater-${userType}`);
    if (saved) setWatchLater(JSON.parse(saved));
  }, [userType]);

  const categories = ['all', ...new Set(videos.map((v) => v.category))];

  const displayVideos =
    selectedCategory === 'all'
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  const toggleWatchLater = (videoId: string) => {
    const updated = watchLater.includes(videoId)
      ? watchLater.filter((id) => id !== videoId)
      : [...watchLater, videoId];
    setWatchLater(updated);
    localStorage.setItem(`watchLater-${userType}`, JSON.stringify(updated));
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
          <h1 className="text-4xl font-bold text-white mb-2">📹 Video Hub</h1>
          <p className="text-slate-400">
            {videos.length} videos for {userType.replace('-', ' ')} students
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              className={
                selectedCategory === cat
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'border-slate-700'
              }
            >
              {cat === 'campus-tour' ? '🏫' : cat === 'admission' ? '📝' : cat === 'hostel' ? '🛏️' : cat === 'academics' ? '📚' : '💻'}{' '}
              {cat.replace('-', ' ').toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isWatchLater={watchLater.includes(video.id)}
              onToggleWatchLater={() => toggleWatchLater(video.id)}
            />
          ))}
        </div>

        {/* Watch Later Section */}
        {watchLater.length > 0 && (
          <div className="mt-16 p-8 rounded-lg bg-slate-900 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              💾 Watch Later ({watchLater.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {videos
                .filter((v) => watchLater.includes(v.id))
                .map((video) => (
                  <div
                    key={video.id}
                    className="flex items-start gap-3 p-3 rounded bg-slate-800/50 border border-slate-700"
                  >
                    <div className="text-2xl">📌</div>
                    <div>
                      <p className="font-semibold text-white">{video.title}</p>
                      <p className="text-xs text-slate-400">{video.duration} min</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleWatchLater(video.id)}
                      className="ml-auto text-red-400 hover:text-red-300"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Pro Tips */}
        <Card className="mt-12 border-slate-700 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-white">💡 How to use videos effectively</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-2">
            <p>✓ Watch the admission/campus tour videos first for overview</p>
            <p>✓ Watch hostel life videos before first day</p>
            <p>✓ Coding videos are most watched (save them!) </p>
            <p>✓ Mark as "Watch Later" and refer before important events</p>
            <p>✓ Rate videos (👍👎) to help other students</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function VideoCard({
  video,
  isWatchLater,
  onToggleWatchLater,
}: {
  video: Video;
  isWatchLater: boolean;
  onToggleWatchLater: () => void;
}) {
  return (
    <Card className="border-slate-700 hover:border-purple-500 transition-all overflow-hidden cursor-pointer group">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-slate-800 flex items-center justify-center overflow-hidden">
        <img
          src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 flex items-center justify-center transition-all">
          <Play className="w-16 h-16 text-white/70 group-hover:text-white" />
        </div>
        <Badge className="absolute top-2 right-2 bg-red-600">{video.duration}m</Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-lg text-white line-clamp-2">
          {video.title}
        </CardTitle>
        <CardDescription>{video.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {video.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-purple-500 text-purple-300">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-slate-400 mb-4 pb-4 border-b border-slate-700">
          <span>👁️ {video.views.toLocaleString()} views</span>
          <span>👍 {video.helpful.toLocaleString()} helpful</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            <Play className="w-4 h-4 mr-1" /> Watch
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onToggleWatchLater}
            className={isWatchLater ? 'border-red-500 text-red-400' : 'border-slate-700'}
          >
            {isWatchLater ? '❤️' : '🤍'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
