export const phaseTitles = {
  1: "Orientation Phase",
  2: "Academics & Growth Phase",
  3: "Skills & Confidence Phase"
};

export const phaseDescriptions = {
  1: "Get familiar with campus, understand systems, and build your initial support network.",
  2: "Balance academics with skill development and extracurricular activities.",
  3: "Polish your skills, build confidence, and plan your college journey."
};

export const phaseTasks = {
  1: [
    { day: 1, tasks: ["Attend orientation program", "Meet your roommate and floor mates", "Locate important buildings"] },
    { day: 2, tasks: ["Get your ID card", "Visit the library", "Check ERP system"] },
    { day: 3, tasks: ["Attend your first class", "Talk to a professor", "Join one club interest session"] },
    { day: 4, tasks: ["Explore the campus fully", "Visit the mess", "Get your phone recharged"] },
    { day: 5, tasks: ["Visit academic block", "Check attendance on ERP", "Talk to one senior"] },
    { day: 6, tasks: ["Attend a club meeting", "Visit the sports complex", "Make a weekly schedule"] },
    { day: 7, tasks: ["Review your first week", "Connect with classmates", "Plan next week"] },
    { day: 8, tasks: ["Submit any pending documents", "Join class WhatsApp group", "Understand deadline system"] },
    { day: 9, tasks: ["Visit medical center", "Get laundry sorted", "Attend extra class"] },
    { day: 10, tasks: ["Explore the city near campus", "Have lunch with a classmate", "Update family"] },
  ],
  2: [
    { day: 31, tasks: ["Finalize 1-2 clubs to focus on", "Create a study plan", "Start a small project"] },
    { day: 32, tasks: ["Join club communications", "Review notes", "Attend club meeting"] },
    { day: 40, tasks: ["Start coding practice", "Attend seminar", "Complete assignments"] },
    { day: 50, tasks: ["Work on a small project", "Prepare for midterms", "Mentor a junior"] },
    { day: 60, tasks: ["Review progress", "Prepare for exams", "Plan skills"] },
  ],
  3: [
    { day: 61, tasks: ["Work on portfolio", "Practice interview questions", "Attend placement talks"] },
    { day: 70, tasks: ["Complete a project", "Help juniors", "Build something cool"] },
    { day: 80, tasks: ["Prepare resume", "Do mock interviews", "Reflect on growth"] },
    { day: 90, tasks: ["Celebrate your progress", "Plan next semester", "Share your journey with juniors"] },
  ]
};

export const dailyTasksByPhase = {
  1: [
    // Orientation Phase (1-30)
    { title: "Attend morning class", category: "academics" },
    { title: "Explore a new area of campus", category: "exploration" },
    { title: "Talk to one senior", category: "social" },
    { title: "Check ERP attendance", category: "admin" },
    { title: "Join at least one club", category: "activities" },
    { title: "Read campus handbook", category: "learning" },
    { title: "Meet your academic advisor", category: "academics" },
    { title: "Attend a fest/event", category: "social" },
    { title: "Complete your assignments", category: "academics" },
    { title: "Join a study group", category: "academics" },
  ],
  2: [
    // Academics & Growth Phase (31-60)
    { title: "Study for 2 hours", category: "academics" },
    { title: "Work on project", category: "academics" },
    { title: "Attend club activity", category: "activities" },
    { title: "Learn a new skill", category: "skills" },
    { title: "Help a classmate", category: "social" },
    { title: "Prepare for exam", category: "academics" },
    { title: "Build your portfolio", category: "skills" },
    { title: "Attend workshop", category: "learning" },
    { title: "Practice coding", category: "skills" },
    { title: "Read a tech article", category: "learning" },
  ],
  3: [
    // Skills & Confidence Phase (61-90)
    { title: "Build project feature", category: "skills" },
    { title: "Practice DSA", category: "skills" },
    { title: "Attend seminar", category: "learning" },
    { title: "Work on resume", category: "skills" },
    { title: "Do mock interview", category: "skills" },
    { title: "Complete assignment", category: "academics" },
    { title: "Mentor a junior", category: "social" },
    { title: "Build something new", category: "skills" },
    { title: "Read about your interests", category: "learning" },
    { title: "Plan your future", category: "planning" },
  ]
};

export const campusGuide = {
  buildings: [
    {
      name: "Academic Block A",
      description: "Main classroom building for core subjects",
      tips: "Check the schedule board for class timings",
      icon: "🏢"
    },
    {
      name: "Academic Block B",
      description: "Engineering labs and practical sessions",
      tips: "Lab slots are usually in afternoon. Come 10 min early",
      icon: "🔬"
    },
    {
      name: "Central Library",
      description: "Your study sanctuary with thousands of resources",
      tips: "4th floor is quiet heaven. Go there for deep work",
      icon: "📚"
    },
    {
      name: "Sports Complex",
      description: "Gym, courts, and outdoor activities",
      tips: "Gym timings: 6AM-9PM. Play badminton, basketball, football",
      icon: "⚽"
    },
    {
      name: "Student Center",
      description: "Clubs office, events, and student activities",
      tips: "Where all the action happens. Check weekly announcements",
      icon: "🎯"
    },
    {
      name: "Medical Center",
      description: "Health services and emergency care",
      tips: "Doctor available 9AM-5PM. In emergency, contact security",
      icon: "🏥"
    }
  ],
  facilities: [
    {
      name: "Mess & Cafeteria",
      description: "Food service (vegetarian and non-veg options)",
      tips: "Breakfast 7-8AM, Lunch 12-2PM, Dinner 7-9PM",
      icon: "🍽️"
    },
    {
      name: "Hostel Block A",
      description: "Residential accommodation",
      tips: "Check-in with hostel warden first day",
      icon: "🏠"
    },
    {
      name: "Computer Lab",
      description: "24/7 access to computers for coding and projects",
      tips: "Book slots early during exam time",
      icon: "💻"
    },
    {
      name: "Auditorium",
      description: "Venue for seminars, fests, and events",
      tips: "Check bulletin board for upcoming events",
      icon: "🎤"
    }
  ],
  resources: [
    {
      name: "E-Library",
      description: "Online journals, papers, and e-books",
      tips: "Use your credentials to access from anywhere",
      icon: "🔖"
    },
    {
      name: "Career Center",
      description: "Placement prep and career counseling",
      tips: "Register early for placements. They give interview coaching",
      icon: "🎓"
    },
    {
      name: "IT Help Desk",
      description: "Tech support and Wi-Fi issues",
      tips: "Location: Admin block. Open 9AM-5PM",
      icon: "🖥️"
    }
  ]
};

export const studyResources = {
  programming: {
    title: "Programming Skills",
    topics: [
      { name: "Data Structures", difficulty: "Intermediate", time: "4 weeks" },
      { name: "Algorithms", difficulty: "Advanced", time: "6 weeks" },
      { name: "System Design", difficulty: "Advanced", time: "8 weeks" },
      { name: "Database Design", difficulty: "Intermediate", time: "3 weeks" }
    ],
    tips: "Start with basics. LeetCode Easy problems help build confidence",
    platforms: ["LeetCode", "HackerRank", "CodeChef"]
  },
  mathematics: {
    title: "Mathematics & Core Subjects",
    topics: [
      { name: "Calculus", difficulty: "Intermediate", time: "5 weeks" },
      { name: "Linear Algebra", difficulty: "Intermediate", time: "4 weeks" },
      { name: "Probability", difficulty: "Intermediate", time: "3 weeks" }
    ],
    tips: "Solve past question papers. Practice is key",
    platforms: ["NPTEL", "Khan Academy", "MIT OpenCourseWare"]
  },
  webDevelopment: {
    title: "Web Development",
    topics: [
      { name: "HTML & CSS", difficulty: "Easy", time: "2 weeks" },
      { name: "JavaScript", difficulty: "Intermediate", time: "4 weeks" },
      { name: "React", difficulty: "Intermediate", time: "4 weeks" },
      { name: "Backend Development", difficulty: "Advanced", time: "6 weeks" }
    ],
    tips: "Build projects as you learn. Deploy them on GitHub Pages or Vercel",
    platforms: ["Udemy", "Coursera", "freeCodeCamp"]
  }
};

export const motivationalQuotes = [
  "The best time to plant a tree was 20 years ago. The second best is now.",
  "Your limitations don't define your potential.",
  "Progress over perfection. Every small step counts.",
  "You're doing better than you think you are.",
  "Consistency beats talent every single time.",
  "Fail fast, learn faster.",
  "Your 90 days ago self would be proud of you today.",
  "Don't compare your beginning with someone else's middle.",
  "Success is a marathon, not a sprint.",
  "You have exactly what it takes to reach your goals."
];

export const getPhaseNumber = (day: number): 1 | 2 | 3 => {
  if (day <= 30) return 1;
  if (day <= 60) return 2;
  return 3;
};

export const randomSeniorTip = (): string => {
  const seniorTips = [
    "Wake up early. The library is peaceful before 9 AM.",
    "Join clubs in first week itself. It gets harder later.",
    "Attend professor's office hours. They remember helpful students.",
    "Start projects early, not day before deadline.",
    "Ragging exists, stay calm and it'll pass.",
    "Your first semester GPA matters. Take it seriously.",
    "Make friends outside your department.",
    "The mess food gets better after first month—you adjust.",
    "Attendance matters more than you think for grades.",
    "Get involved in at least one fest/event.",
    "Network with seniors. They become your lifeline.",
    "Start internship hunt by end of 2nd year.",
    "Balance is key. Don't burn out.",
    "Your mental health matters more than marks.",
    "College is about experiences, not just grades."
  ];
  return seniorTips[Math.floor(Math.random() * seniorTips.length)];
};
