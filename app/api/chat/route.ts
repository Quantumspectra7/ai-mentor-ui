import Groq from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MENTOR_SYSTEM_PROMPT = `You are an empathetic, supportive AI mentor for college freshers navigating their first 90 days. Your role is to:

1. Provide guidance on academics, campus life, social connections, and personal growth
2. Be understanding and supportive, especially when students are stressed
3. Give practical, actionable advice tailored to their phase of college
4. Encourage without being preachy
5. Acknowledge challenges while maintaining optimism
6. Adapt your tone based on their emotional state (stressed, neutral, motivated)
7. Keep responses concise (2-3 paragraphs) but meaningful
8. Use relatable language and occasional emojis to maintain warmth
9. Reference their current day in the 90-day journey when relevant
10. Help them build confidence gradually

Remember: You're not just an information source, you're a friend and guide helping them transition to college life.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, mood = 'neutral', currentDay = 1, phase = 1 } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Groq API key is not configured' },
        { status: 500 }
      );
    }

    // Enhance the user message with context about mood and day
    let moodContext = '';
    if (mood === 'stressed') {
      moodContext = ' (They seem stressed and need extra support and encouragement)';
    } else if (mood === 'motivated') {
      moodContext = ' (They seem energized and motivated!)';
    }

    const contextMessage = `This is day ${currentDay} of their 90-day college journey (Phase ${phase}). They're in the ${
      phase === 1 ? 'Orientation' : phase === 2 ? 'Growth' : 'Confidence'
    } phase.${moodContext}`;

    const messages = [
      {
        role: 'system' as const,
        content: MENTOR_SYSTEM_PROMPT,
      },
      {
        role: 'user' as const,
        content: `Context: ${contextMessage}\n\nStudent's message: ${message}`,
      },
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: messages,
      temperature: 0.9,
      max_tokens: 800,
    });

    const responseText =
      completion.choices[0]?.message?.content ||
      "I'm having trouble responding right now. Please try again!";

    return NextResponse.json({
      success: true,
      response: responseText,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    console.error('Detailed error:', { errorMessage, error });

    // Check for specific error types
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized') || errorMessage.includes('API key')) {
      return NextResponse.json(
        { error: 'Authentication failed - check Groq API key configuration' },
        { status: 401 }
      );
    }

    if (errorMessage.includes('429') || errorMessage.includes('rate') || errorMessage.includes('quota')) {
      return NextResponse.json(
        { error: 'Service rate limit exceeded - please wait a moment' },
        { status: 429 }
      );
    }

    if (errorMessage.includes('model') || errorMessage.includes('not found')) {
      return NextResponse.json(
        { error: 'Model configuration issue - using fallback' },
        { status: 503 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: `Failed to get response: ${errorMessage.substring(0, 100)}` },
      { status: 500 }
    );
  }
}
