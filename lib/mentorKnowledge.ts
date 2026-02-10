export const mentorResponses = {
  phase1: {
    // Phase 1: Orientation (Days 1-30)
    attendance: {
      neutral: "Attendance seriously lo bhai. 75% is mandatory, no compromise. Check the ERP system regularly.",
      stressed: "I get it, tracking attendance is confusing at first. Start checking ERP every week—it becomes habit.",
      motivated: "Keep crushing those attendance goals! Missing classes early on creates bad habits. Stay consistent!"
    },
    campus: {
      neutral: "Start exploring campus. Visit the academic blocks, library, and mess. Get familiar with the layout.",
      stressed: "Take it slow. One building a day. No need to explore everything at once. You'll pick it up naturally.",
      motivated: "Awesome energy! Campus exploration is fun. Visit the library top floor—it's the best kept secret."
    },
    social: {
      neutral: "Talk to your seniors and roommates. They're your best resource for real campus life advice.",
      stressed: "Don't worry about socializing yet if you're overwhelmed. Start with your wing mates first.",
      motivated: "Perfect time to build your circle! Seniors love helping freshers. Go for it!"
    },
    academics: {
      neutral: "Academics start immediately. Get to know your professors and understand the course structure.",
      stressed: "Your first classes are orientation. Pace yourself. You don't need to understand everything immediately.",
      motivated: "Great mindset! Engineering will challenge you, but that's where growth happens!"
    }
  },
  phase2: {
    // Phase 2: Academics + Clubs (Days 31-60)
    clubs: {
      neutral: "Join 1-2 clubs that align with your interests. Clubs help you build skills beyond academics.",
      stressed: "Clubs aren't mandatory right now. Focus on academics first, then explore clubs when ready.",
      motivated: "This is the perfect time! Clubs unlock networking and skill development. Pick wisely!"
    },
    exams: {
      neutral: "First exams approaching. Start making study schedules. Group study sessions are effective.",
      stressed: "Exams are normal. Everyone feels this way. Start small—30 min sessions work better than marathon studying.",
      motivated: "You've got this! Channel that energy into focused study sessions. Consistency beats cramming!"
    },
    skills: {
      neutral: "Start learning coding/technical skills. Platforms like Coding Ninjas or Udemy help.",
      stressed: "Skills development is optional right now. Don't spread yourself thin. Pick one thing.",
      motivated: "Awesome! Learning on the side shows commitment. Use resources wisely and track progress."
    },
    balance: {
      neutral: "Balance is key—academics, clubs, skills, and rest. Create a timetable.",
      stressed: "You don't need to do everything at once. Pick the most important 2-3 things.",
      motivated: "You're managing well! Stay disciplined but also celebrate small wins."
    }
  },
  phase3: {
    // Phase 3: Skills + Confidence (Days 61-90)
    internships: {
      neutral: "Start preparing for summer internships. Build a portfolio and practice interviews.",
      stressed: "Internships aren't everything right now. Focus on learning and getting better first.",
      motivated: "Internship hunting shows growth mindset! Start now—prepare projects and polish that resume."
    },
    confidence: {
      neutral: "By now you should feel more confident. Speak up in classes, attend seminars.",
      stressed: "Imposter syndrome is real. But remember—everyone felt lost on Day 1. You've improved.",
      motivated: "Look how far you've come! Channel that confidence into leadership or mentoring others."
    },
    future: {
      neutral: "Think about your path—Core, Startups, Further Studies, or Placements?",
      stressed: "You don't need to decide everything now. Explore more before committing.",
      motivated: "90 days in, you have enough clarity. Make decisions based on your learning, not just trends!"
    },
    reflection: {
      neutral: "Reflect on what worked and what didn't. Use this insight for the next semester.",
      stressed: "Take it easy. You've done your best. Rest and recharge before next semester.",
      motivated: "You crushed it! Keep this momentum going. You're ready for anything!"
    }
  },
  general: {
    stress: "Deep breath. Everyone feels overwhelmed sometimes. Take a walk, talk to your roommate, or reach out to a senior.",
    motivation: "You've got this! 90 days ago you didn't know anyone here. Look at you now!",
    help: "Stuck? Talk to your seniors, professors, or friends. Don't stay quiet.",
    sleep: "Sleep is important. Don't sacrifice sleep for anything. A rested mind solves problems better.",
    food: "Eat well. Bad nutrition kills productivity. Mess food is okay, add supplements if needed.",
    health: "Physical health = mental health. Use the gym or do sports. It helps.",
    time: "Time management is the biggest skill you'll learn. Get a calendar, plan your week.",
    default: "That's a great question! Let me give you a senior perspective... You're on the right track!"
  }
};

export const getPhaseNumber = (day: number): 1 | 2 | 3 => {
  if (day <= 30) return 1;
  if (day <= 60) return 2;
  return 3;
};

export const getMentorResponse = (input: string, phase: 1 | 2 | 3, mood: 'neutral' | 'stressed' | 'motivated' = 'neutral'): string => {
  const lowerInput = input.toLowerCase();
  
  // Phase-specific responses
  if (phase === 1) {
    if (lowerInput.includes('attendance') || lowerInput.includes('erp') || lowerInput.includes('class')) {
      return mentorResponses.phase1.attendance[mood];
    }
    if (lowerInput.includes('campus') || lowerInput.includes('explore') || lowerInput.includes('lost')) {
      return mentorResponses.phase1.campus[mood];
    }
    if (lowerInput.includes('friend') || lowerInput.includes('social') || lowerInput.includes('alone')) {
      return mentorResponses.phase1.social[mood];
    }
    if (lowerInput.includes('study') || lowerInput.includes('academics') || lowerInput.includes('exam')) {
      return mentorResponses.phase1.academics[mood];
    }
  } else if (phase === 2) {
    if (lowerInput.includes('club') || lowerInput.includes('activity') || lowerInput.includes('interest')) {
      return mentorResponses.phase2.clubs[mood];
    }
    if (lowerInput.includes('exam') || lowerInput.includes('test') || lowerInput.includes('marks')) {
      return mentorResponses.phase2.exams[mood];
    }
    if (lowerInput.includes('skill') || lowerInput.includes('coding') || lowerInput.includes('learn')) {
      return mentorResponses.phase2.skills[mood];
    }
    if (lowerInput.includes('balance') || lowerInput.includes('busy') || lowerInput.includes('stress')) {
      return mentorResponses.phase2.balance[mood];
    }
  } else if (phase === 3) {
    if (lowerInput.includes('internship') || lowerInput.includes('placement') || lowerInput.includes('job')) {
      return mentorResponses.phase3.internships[mood];
    }
    if (lowerInput.includes('confident') || lowerInput.includes('scared') || lowerInput.includes('imposter')) {
      return mentorResponses.phase3.confidence[mood];
    }
    if (lowerInput.includes('future') || lowerInput.includes('career') || lowerInput.includes('next')) {
      return mentorResponses.phase3.future[mood];
    }
    if (lowerInput.includes('reflect') || lowerInput.includes('progress') || lowerInput.includes('done')) {
      return mentorResponses.phase3.reflection[mood];
    }
  }
  
  // General responses
  if (lowerInput.includes('stress') || lowerInput.includes('anxious') || lowerInput.includes('worried')) {
    return mentorResponses.general.stress;
  }
  if (lowerInput.includes('motivat') || lowerInput.includes('encourage')) {
    return mentorResponses.general.motivation;
  }
  if (lowerInput.includes('help') || lowerInput.includes('problem') || lowerInput.includes('stuck')) {
    return mentorResponses.general.help;
  }
  if (lowerInput.includes('sleep') || lowerInput.includes('tired') || lowerInput.includes('exhausted')) {
    return mentorResponses.general.sleep;
  }
  if (lowerInput.includes('food') || lowerInput.includes('eat') || lowerInput.includes('mess')) {
    return mentorResponses.general.food;
  }
  if (lowerInput.includes('health') || lowerInput.includes('fit') || lowerInput.includes('gym')) {
    return mentorResponses.general.health;
  }
  if (lowerInput.includes('time') || lowerInput.includes('manage') || lowerInput.includes('schedule')) {
    return mentorResponses.general.time;
  }
  
  return mentorResponses.general.default;
};

export const seniorTips = [
  "Library ke top floor pe sabse zyada silence hota hai. Perfect for deep work.",
  "Attend at least one seminar every month. Networking happens there.",
  "Make friends outside your branch. Diversity in friend circle is gold.",
  "Don't compare your progress with others. You're on your own journey.",
  "Save some money from home. Emergency fund is important.",
  "Take part in at least one fest. Campus life is incomplete without it.",
  "Respect your professors. They remember students who put in effort.",
  "Group projects teach collaboration. Master this skill early.",
  "Failure is part of learning. Don't give up after one bad grade.",
  "Your seniors are your best resource. Don't hesitate to ask for help.",
  "Maintain a work-life balance. Burnout is real.",
  "Document your projects. Portfolio matters for placements.",
  "Learn time management early. It's a superpower.",
  "Coffee and naps are underrated productivity tools.",
  "Your 1st year GPA doesn't define your entire college life."
];

export const randomSeniorTip = (): string => {
  return seniorTips[Math.floor(Math.random() * seniorTips.length)];
};
