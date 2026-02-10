'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, videoData, UserType } from '@/lib/lpuData';
import { Play } from 'lucide-react';

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
    <div className="space-y-10">
        {/* Header */}
        <div className="mb-12">
          {onBack && (
            <Button variant="outline" className="mb-4" onClick={onBack}>
              ← Back
            </Button>
          )}
          <p className="eyebrow text-xs text-amber-300">Video Library</p>
          <h1 className="font-display hero-title text-4xl text-amber-50 mb-2 md:text-5xl">📹 Video Hub</h1>
          <p className="text-amber-100/70">
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
                  ? 'bg-amber-500 text-black hover:bg-amber-400'
                  : 'border-amber-500/30 text-amber-100'
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
          <div className="mt-16 p-8 rounded-3xl luxe-card">
            <h2 className="font-display text-2xl text-amber-50 mb-4">
              💾 Watch Later ({watchLater.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {videos
                .filter((v) => watchLater.includes(v.id))
                .map((video) => (
                  <div
                    key={video.id}
                    className="flex items-start gap-3 p-3 rounded-2xl border border-amber-500/20 bg-black/30"
                  >
                    <div className="text-2xl">📌</div>
                    <div>
                      <p className="font-semibold text-amber-50">{video.title}</p>
                      <p className="text-xs text-amber-100/60">{video.duration} min</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleWatchLater(video.id)}
                      className="ml-auto text-amber-200 hover:text-amber-100"
                    >
                      ✕
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Pro Tips */}
        <Card className="mt-12 luxe-card">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-amber-50">💡 How to use videos effectively</CardTitle>
          </CardHeader>
          <CardContent className="text-amber-100/70 space-y-2">
            <p>✓ Watch the admission/campus tour videos first for overview</p>
            <p>✓ Watch hostel life videos before first day</p>
            <p>✓ Coding videos are most watched (save them!) </p>
            <p>✓ Mark as "Watch Later" and refer before important events</p>
            <p>✓ Rate videos (👍👎) to help other students</p>
          </CardContent>
        </Card>
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
    <Card className="luxe-card transition-all overflow-hidden cursor-pointer group">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-black/40 flex items-center justify-center overflow-hidden">
        <img
          src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 flex items-center justify-center transition-all">
          <Play className="w-16 h-16 text-white/70 group-hover:text-white" />
        </div>
        <Badge className="absolute top-2 right-2 bg-amber-500 text-black">{video.duration}m</Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-lg text-amber-50 line-clamp-2">
          {video.title}
        </CardTitle>
        <CardDescription className="text-amber-100/60">{video.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {video.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-amber-500/50 text-amber-200">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-amber-100/60 mb-4 pb-4 border-b border-amber-500/20">
          <span>👁️ {video.views.toLocaleString()} views</span>
          <span>👍 {video.helpful.toLocaleString()} helpful</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-amber-500 text-black hover:bg-amber-400"
          >
            <Play className="w-4 h-4 mr-1" /> Watch
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onToggleWatchLater}
            className={isWatchLater ? 'border-amber-500 text-amber-200' : 'border-amber-500/30 text-amber-100'}
          >
            {isWatchLater ? '❤️' : '🤍'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
