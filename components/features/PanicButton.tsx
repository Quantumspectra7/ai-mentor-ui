'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react';

const panicResponses = [
  {
    title: "Take a Deep Breath",
    advice: "I get it—things feel overwhelming right now. But here's the truth: This feeling will pass. Take 5 minutes, step away, breathe, and come back.",
    actions: ["Take a 10-minute walk", "Call a friend", "Get some water"]
  },
  {
    title: "You're Not Alone",
    advice: "Everyone feels like this sometimes. Your seniors felt this on their day 1. Your roommate is probably stressed too. Reach out—vulnerability is strength.",
    actions: ["Talk to a friend", "Visit your mentor", "Join a group chat"]
  },
  {
    title: "Focus on What You Can Control",
    advice: "Can't control the exam questions or others' opinions. But you CAN control your effort, attitude, and next action. Start small.",
    actions: ["Pick one task", "Study for 30 mins", "Complete one assignment"]
  },
  {
    title: "Perspective Check",
    advice: "This one moment, this one day, this one exam—it doesn't define your entire college. You have 4 years. You have time to grow.",
    actions: ["Remember your progress", "Reach out for help", "Take a break"]
  },
  {
    title: "The Panic Button Wisdom",
    advice: "The fact that you're stressed means you care. That's actually a good sign. Channel that energy into action, not anxiety.",
    actions: ["Make a plan", "Ask for help", "Rest and recover"]
  }
];

export function PanicButton() {
  const [open, setOpen] = useState(false);
  const [currentResponse, setCurrentResponse] = useState(panicResponses[0]);

  const handleOpen = () => {
    const randomResponse = panicResponses[Math.floor(Math.random() * panicResponses.length)];
    setCurrentResponse(randomResponse);
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 smooth-transition glow-primary flex items-center gap-2 animate-pulse"
      >
        <AlertCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Help!</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md glass-accent border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white flex items-center gap-2">
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              I'm Stressed
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{currentResponse.title}</h3>
              <p className="text-gray-300 leading-relaxed text-sm">{currentResponse.advice}</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-white uppercase tracking-wide">What you can do right now:</p>
              <div className="space-y-2">
                {currentResponse.actions.map((action, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-3 rounded-lg glass smooth-transition hover:border-primary/40 text-left text-sm font-medium text-white text-balance"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl glass border border-primary/20">
              <p className="text-sm text-gray-300 text-balance">
                <strong className="text-primary">Remember:</strong> You've handled 100% of the difficult days in your life so far. You've got this.
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                className="flex-1 px-4 py-2 rounded-lg glass smooth-transition hover:border-primary/40 font-medium"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
              <button
                className="flex-1 px-4 py-2 rounded-lg btn-gradient font-medium"
                onClick={() => {
                  const newResponse = panicResponses[Math.floor(Math.random() * panicResponses.length)];
                  setCurrentResponse(newResponse);
                }}
              >
                More Advice
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
