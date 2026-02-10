'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Smile, AlertCircle, Zap, MessageCircle, AlertTriangle } from 'lucide-react';
import { getMentorResponse, getPhaseNumber } from '@/lib/mentorKnowledge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
  isError?: boolean;
}

interface MentorChatProps {
  currentDay: number;
  onBack: () => void;
}

export function MentorChat({ currentDay, onBack }: MentorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hey! 👋 I'm your AI mentor. Day ${currentDay} of your journey! I'm here to help with anything - academics, campus life, stress, you name it. What's on your mind?`,
      sender: 'mentor',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [mood, setMood] = useState<'neutral' | 'stressed' | 'motivated'>('neutral');
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const phase = getPhaseNumber(currentDay);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const quickQuestions = [
    { topic: 'Academics', emoji: '📚' },
    { topic: 'Campus Life', emoji: '🏫' },
    { topic: 'Social', emoji: '👥' },
    { topic: 'Stress Help', emoji: '🧘' },
    { topic: 'Motivation', emoji: '⚡' },
    { topic: 'Career', emoji: '🚀' }
  ];

  const moodOptions = [
    { value: 'stressed' as const, icon: AlertCircle, label: 'Stressed', color: 'from-red-500' },
    { value: 'neutral' as const, icon: Smile, label: 'Normal', color: 'from-blue-500' },
    { value: 'motivated' as const, icon: Zap, label: 'Pumped', color: 'from-green-500' }
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Rate limiting: minimum 2 seconds between requests
    const now = Date.now();
    if (now - lastRequestTime < 2000) {
      setApiError('Please wait a moment before sending another message');
      return;
    }
    setLastRequestTime(now);

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setApiError(null);

    try {
      // Try to get response from Groq API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          mood,
          currentDay,
          phase,
        }),
      });

      if (!response.ok) {
        let errorMsg = `API error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.error || errorMsg;
        } catch (e) {
          // If JSON parsing fails, use status message
          errorMsg = response.statusText || errorMsg;
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();

      if (data.success && data.response) {
        const mentorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'mentor',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, mentorMessage]);
      } else {
        throw new Error(data.error || 'Invalid response format');
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Connection error';
      console.error('Detailed error:', errorMessage);
      
      // Provide user-friendly error messages
      let userFriendlyError = errorMessage;
      if (errorMessage.includes('429') || errorMessage.includes('Too many') || errorMessage.includes('rate')) {
        userFriendlyError = 'Server is busy - please wait a few seconds and try again';
      } else if (errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('API key')) {
        userFriendlyError = 'API key issue - try refreshing the page';
      } else if (errorMessage.includes('model') || errorMessage.includes('503')) {
        userFriendlyError = 'Service temporarily unavailable - using smart responses';
      } else if (errorMessage.includes('Connection')) {
        userFriendlyError = 'Connection issue - check your internet';
      }
      
      // Set error state
      setApiError(userFriendlyError);
      
      // Use fallback local response
      const fallbackResponse = getMentorResponse(text, phase, mood);
      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'mentor',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, mentorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-primary/10">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-xl card-flat hover:border-primary/40 smooth-transition shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-white truncate flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-purple-400 shrink-0" />
                Chat with Mentor
              </h1>
              <p className="text-xs md:text-sm text-gray-400">Day {currentDay} • Ask me anything</p>
            </div>
          </div>
          
          {/* Mood Selector */}
          <div className="flex gap-2 ml-4 shrink-0">
            {moodOptions.map(({ value, icon: Icon, label, color }) => (
              <button
                key={value}
                onClick={() => setMood(value)}
                className={`p-2.5 rounded-xl smooth-transition transition-all ${
                  mood === value
                    ? `gradient-primary text-white glow-primary shadow-lg`
                    : 'card-flat hover:border-primary/40'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {apiError && (
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 md:px-6 py-3 relative z-30">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-red-400 text-sm flex-1">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{apiError}</span>
            </div>
            <button
              onClick={() => setApiError(null)}
              className="text-red-400 hover:text-red-300 text-sm font-medium shrink-0"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 md:px-6 py-6 md:py-8 relative z-10 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-5">
          {messages.map((message, idx) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-up`}
              style={{ animationDelay: `${Math.min(idx * 0.08, 0.4)}s` }}
            >
              <div
                className={`max-w-xs md:max-w-sm px-4 py-3 rounded-2xl smooth-transition backdrop-blur-sm ${
                  message.sender === 'user'
                    ? 'gradient-primary text-white rounded-tr-sm shadow-lg'
                    : 'card-flat border-0 rounded-tl-sm text-white'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 font-medium ${
                  message.sender === 'user' 
                    ? 'text-white/70' 
                    : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-up">
              <div className="card-flat border-0 px-5 py-4 rounded-2xl rounded-tl-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="backdrop-blur-xl border-t border-primary/10 px-4 md:px-6 py-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <p className="section-label mb-4">Common Topics</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {quickQuestions.map((q, idx) => (
                <button
                  key={q.topic}
                  onClick={() => handleQuickQuestion(q.topic)}
                  className="px-4 py-3 rounded-xl card-flat smooth-transition hover:border-primary/40 text-sm font-medium text-white animate-fade-up flex items-center justify-center gap-2"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <span>{q.emoji}</span>
                  <span className="hidden sm:inline">{q.topic}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="backdrop-blur-xl border-t border-primary/10 sticky bottom-0 z-40">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex gap-3">
          <Input
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(input);
              }
            }}
            className="flex-1 input-glass px-4 py-3 text-sm"
          />
          <button
            onClick={() => handleSendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="btn-gradient px-4 h-12 w-12 p-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rounded-xl"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
