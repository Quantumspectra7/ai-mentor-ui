'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { expectationVsReality } from '@/lib/lpuData';

interface ExpectationVsRealityProps {
  onBack?: () => void;
}

export function ExpectationVsReality({ onBack }: ExpectationVsRealityProps) {
  return (
    <div className="space-y-10">
        {/* Header */}
        <div className="mb-12">
          {onBack && (
            <Button variant="outline" className="mb-4" onClick={onBack}>
              ← Back
            </Button>
          )}
          <p className="eyebrow text-xs text-amber-300">Reality Check</p>
          <h1 className="font-display hero-title text-4xl text-amber-50 mb-2 md:text-5xl">⚡ Expectation vs Reality</h1>
          <p className="text-amber-100/70">
            The honest truth about college life - prepared from 100+ senior interviews
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 luxe-card border-red-500/30">
          <CardContent className="pt-6">
            <p className="text-red-300 font-semibold mb-2">🚨 Most Important:</p>
            <p className="text-red-200">
              If you feel confusing, homesick, or lost in your first 30 days - you're not alone. Literally 80% of freshers feel this way. It's NORMAL. It will pass.
            </p>
          </CardContent>
        </Card>

        {/* Comparisons */}
        <div className="space-y-6">
          {expectationVsReality.map((item, idx) => (
            <Card
              key={item.id}
              className={`border-l-4 ${
                item.impact === 'positive'
                  ? 'border-l-green-500 bg-green-500/5'
                  : item.impact === 'negative'
                  ? 'border-l-red-500 bg-red-500/5'
                  : 'border-l-yellow-500 bg-yellow-500/5'
              } border-amber-500/20 transition-all luxe-card`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl text-amber-50">{item.category}</h3>
                  <Badge
                    className={
                      item.impact === 'positive'
                        ? 'bg-green-600'
                        : item.impact === 'negative'
                        ? 'bg-red-600'
                        : 'bg-yellow-600'
                    }
                  >
                    {item.impact === 'positive' ? '✅ Pleasant Surprise' : item.impact === 'negative' ? '⚠️ Reality Check' : '🤔 Surprising'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Expectation */}
                <div className="p-4 rounded-2xl bg-black/30 border border-teal-500/30">
                  <p className="text-teal-200 font-semibold text-sm mb-2">📌 What You Expect:</p>
                  <p className="text-amber-50">{item.expectation}</p>
                </div>

                {/* Reality */}
                <div className="p-4 rounded-2xl bg-black/30 border border-amber-500/30">
                  <p className="text-amber-200 font-semibold text-sm mb-2">⚡ The Reality:</p>
                  <p className="text-amber-50">{item.reality}</p>
                </div>

                {/* Advice */}
                <div className="p-4 rounded-2xl bg-black/30 border-l-2 border-amber-500">
                  <p className="text-amber-200 font-semibold text-sm mb-2">💡 Our Advice:</p>
                  <p className="text-amber-100/70">{item.advice}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Final Wisdom */}
        <Card className="mt-16 luxe-card border-amber-500/30">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-amber-50">🌟 The Golden Rule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-amber-100/70">
            <p>
              <strong>College is not about perfection. It's about growth.</strong>
            </p>
            <p>
              Every senior who succeeded did so by failing first, learning, and trying again. Your first semester won't define your college, but it will teach you what you need to survive. And that's valuable.
            </p>
            <p className="text-amber-200 italic">
              "The worst part is knowing nothing. Once you know what to expect, you can prepare. And you just did. You're already ahead." - Your Seniors
            </p>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="mt-8 luxe-card border-amber-500/20">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-amber-50">✅ Before Your First Day:</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-amber-100/70">
              <li>✓ Accept that you'll feel lost - that's the first sign of growth</li>
              <li>✓ Make friends with at least 2-3 people in your room/wing</li>
              <li>✓ Join 1-2 clubs that match your interests</li>
              <li>✓ Talk to seniors without hesitation - they WANT to help</li>
              <li>✓ Keep your study routine but leave room for exploration</li>
              <li>✓ Save the contact numbers of your hostel warden and seniors</li>
              <li>✓ Remember: Failure in first month ≠ Failure in life</li>
            </ul>
          </CardContent>
        </Card>
    </div>
  );
}
