'use client';

import { useState } from 'react';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react';
import { campusGuide } from '@/lib/phaseData';

interface CampusGuideProps {
  onBack: () => void;
}

export function CampusGuide({ onBack }: CampusGuideProps) {
  const [activeTab, setActiveTab] = useState<'buildings' | 'facilities' | 'resources'>('buildings');
  const tabs: Array<typeof activeTab> = ['buildings', 'facilities', 'resources'];

  const renderItems = () => {
    const items = campusGuide[activeTab];
    return items.map((item, index) => (
      <div key={index} className="glass-accent rounded-2xl p-6 smooth-transition hover:border-primary/40 group animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 smooth-transition text-2xl">
            {item.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary smooth-transition">{item.name}</h3>
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">{item.description}</p>
            <div className="flex items-start gap-2 pt-3 border-t border-primary/10">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-400">{item.tips}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

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
            <h1 className="text-2xl font-bold text-white">Campus Guide</h1>
            <p className="text-sm text-gray-400">Navigate, explore, and discover your campus</p>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-3 mb-10 flex-wrap animate-fade-up">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl font-medium smooth-transition capitalize ${
                activeTab === tab
                  ? 'btn-gradient text-white'
                  : 'glass hover:border-primary/40'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {renderItems()}
        </div>

        {/* Helpful Tips */}
        <div className="glass-accent rounded-2xl p-8 border-primary/20 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start gap-3 mb-6">
            <Navigation className="w-6 h-6 text-primary flex-shrink-0" />
            <h3 className="text-xl font-semibold text-white">Getting Around Campus</h3>
          </div>
          <ul className="space-y-4">
            {[
              "Get a campus map from the information desk on day 1",
              "Walk around with your wing mates to explore and get familiar",
              "Mark important locations (classes, library, mess) on your phone",
              "Seniors are your best guide. Don't hesitate to ask for directions",
              "Explore one new area every day to build confidence"
            ].map((tip, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-gray-300">
                <span className="text-primary font-bold flex-shrink-0">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
