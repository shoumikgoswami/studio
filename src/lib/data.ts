import type {
  CoachingConversation,
  Goal,
  CoachPersona,
  Message,
  User,
} from './types';

const USER_ID = 'user-123';

const mockGoals: Goal[] = [
  {
    id: 'goal-1',
    userId: USER_ID,
    title: 'Improve Public Speaking',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'goal-2',
    userId: USER_ID,
    title: 'Learn a new programming language',
    createdAt: new Date().toISOString(),
  },
];

export const mockPersonas: CoachPersona[] = [
  {
    id: 'persona-1',
    name: 'MOTI The Motivator',
    description: 'Focuses on encouragement and building confidence.',
    strength: 'Inspiring action and overcoming self-doubt.',
    bestFor: 'Users who need a boost to get started or stay motivated.',
    isSystemPreset: true,
    settings: {
      formality: 3,
      tone: 9,
      humor: 7,
      pace: 8,
      useMetaphors: true,
      includeQuotes: true,
      shareAnecdotes: true,
    },
  },
  {
    id: 'persona-2',
    name: 'MENTI The Mentor',
    description: 'Provides guidance and shares wisdom.',
    strength: 'Offering practical advice and long-term perspective.',
    bestFor: 'Users seeking structured guidance and learning.',
    isSystemPreset: true,
    settings: {
      formality: 6,
      tone: 7,
      humor: 4,
      pace: 5,
      useMetaphors: true,
      includeQuotes: false,
      shareAnecdotes: true,
    },
  },
  {
    id: 'persona-3',
    name: 'CHAD The Challenger',
    description: 'Pushes users to think critically and step out of their comfort zone.',
    strength: 'Uncovering blind spots and fostering resilience.',
    bestFor: 'Users who are ready to be challenged and want direct feedback.',
    isSystemPreset: true,
    settings: {
      formality: 5,
      tone: 2,
      humor: 5,
      pace: 7,
      useMetaphors: false,
      includeQuotes: true,
      shareAnecdotes: false,
    },
  },
  {
    id: 'persona-4',
    name: 'SAGE The Strategist',
    description: 'Focuses on long-term planning and decision-making.',
    strength: 'Developing clear goals and actionable strategies.',
    bestFor: 'Users who need help with planning and execution.',
    isSystemPreset: true,
    settings: {
      formality: 8,
      tone: 4,
      humor: 1,
      pace: 3,
      useMetaphors: true,
      includeQuotes: true,
      shareAnecdotes: false,
    },
  },
];

export const mockUser: User = {
  id: USER_ID,
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://placehold.co/40x40.png',
  coachSettings: { ...mockPersonas[0].settings },
  coachPresets: [
    {
      id: 'custom-1',
      name: 'My Custom Coach',
      description: 'A custom configuration for my needs.',
      strength: 'Balanced and thoughtful.',
      bestFor: 'General coaching conversations.',
      isSystemPreset: false,
      settings: {
        formality: 5,
        tone: 5,
        humor: 5,
        pace: 5,
        useMetaphors: true,
        includeQuotes: false,
        shareAnecdotes: false,
      },
    },
  ],
};

export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1-1',
      role: 'assistant',
      content: "Hello! I'm AdaptAI Coach. What's on your mind today?",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      avatarUrl: 'https://placehold.co/40x40.png',
    },
    {
      id: 'msg-1-2',
      role: 'user',
      content: "I'm feeling a bit stuck on a project.",
      createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
    {
      id: 'msg-1-3',
      role: 'assistant',
      content:
        "I understand. Sometimes a fresh perspective can help. Can you tell me a bit more about the project and where you're feeling stuck?",
      createdAt: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
      avatarUrl: 'https://placehold.co/40x40.png',
    },
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      role: 'assistant',
      content:
        "Welcome back! Let's continue our discussion on leadership.",
      createdAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 2
      ).toISOString(),
      avatarUrl: 'https://placehold.co/40x40.png',
    },
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      role: 'assistant',
      content: 'This is an archived conversation.',
      createdAt: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * 14
      ).toISOString(),
      avatarUrl: 'https://placehold.co/40x40.png',
    },
  ],
};

export const mockConversations: CoachingConversation[] = [
  {
    id: 'conv-1',
    userId: USER_ID,
    title: 'Feeling Stuck on Project',
    focusArea: 'Problem Solving',
    createdAt: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
    messages: mockMessages['conv-1'],
    isActive: true,
  },
  {
    id: 'conv-2',
    userId: USER_ID,
    title: 'Leadership Skills',
    focusArea: 'Growth',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    messages: mockMessages['conv-2'],
    isActive: true,
  },
  {
    id: 'conv-3',
    userId: USER_ID,
    title: 'Weekly Check-in (Archived)',
    focusArea: 'Accountability',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    messages: [],
    isActive: false,
  },
];

// Simulate API/DB calls
export async function getConversations(): Promise<CoachingConversation[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockConversations
    .filter((c) => c.isActive)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

export async function getConversation(
  id: string
): Promise<CoachingConversation | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const conversation = mockConversations.find((c) => c.id === id);
  if (conversation) {
    // For existing conversations, their messages are in the main `mockMessages` object.
    // For newly created ones, the messages array is on the conversation object itself.
    const messages = mockMessages[id] || conversation.messages || [];
    return { ...conversation, messages };
  }
  return undefined;
}

export async function getGoals(): Promise<Goal[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockGoals;
}

export async function getCoachPersonas(): Promise<CoachPersona[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockPersonas;
}

export async function getUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockUser;
}

export async function getSuggestedTopics(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return [
    'Improve my Grit',
    'Reduce my work stress',
    'Support for: Improve Public Speaking',
    'Navigating Team Conflicts',
    'Leading Through Uncertainty',
    'Strategic Decision Making',
  ];
}
