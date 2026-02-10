'use client';

import React from 'react';

export function AnimatedBorder({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-pulse"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #ec4899)',
          animation: 'gradient-shift 3s ease infinite',
        }}
      />
      {/* Content */}
      <div className="relative rounded-xl dark:bg-slate-900 bg-white p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}

export function GlowingCard({
  children,
  className = '',
  glow = 'purple',
}: {
  children: React.ReactNode;
  className?: string;
  glow?: 'purple' | 'blue' | 'pink' | 'cyan';
}) {
  const glowColors = {
    purple: 'from-purple-600/20 to-purple-600/5',
    blue: 'from-blue-600/20 to-blue-600/5',
    pink: 'from-pink-600/20 to-pink-600/5',
    cyan: 'from-cyan-600/20 to-cyan-600/5',
  };

  const borderGlows = {
    purple: 'hover:border-purple-600/50',
    blue: 'hover:border-blue-600/50',
    pink: 'hover:border-pink-600/50',
    cyan: 'hover:border-cyan-600/50',
  };

  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 overflow-hidden group transition-all duration-300
        dark:bg-gradient-to-br dark:from-slate-900/50 dark:to-slate-800/50 
        bg-gradient-to-br from-white/50 to-slate-50/50
        dark:border dark:border-slate-700/50 border border-slate-200/50
        ${borderGlows[glow]} ${className}`}
    >
      {/* Gradient glow background */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${glowColors[glow]} opacity-0 group-hover:opacity-100 transition duration-300 blur pointer-events-none`}
      />

      {/* Inner content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function DecorativeBars() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
    </div>
  );
}

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={`rounded-xl backdrop-blur-sm dark:bg-white/5 bg-white/50 
        dark:border dark:border-white/10 border border-white/20
        p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
        ${className}`}
      style={{
        animation: `fade-in-up 0.6s ease-out ${delay * 0.1}s both`,
      }}
    >
      {children}
    </div>
  );
}
