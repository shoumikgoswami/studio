import type { CoachingConversation, Goal, CoachPersonaSettings, Message } from './types';

const USER_ID = 'user-123';

const mockGoals: Goal[] = [
  { id: 'goal-1', userId: USER_ID, title: 'Improve Public Speaking', createdAt: new Date().toISOString() },
  { id: 'goal-2', userId: USER_ID, title: 'Learn a new programming language', createdAt: new Date().toISOString() },
];

const mockPersonas: CoachPersonaSettings[] = [
  { id: 'persona-1', userId: 'system', name: 'MOTI The Motivator', isSystemPreset: true, formality: 3, tone: 9, humor: 6, pace: 8 },
  { id: 'persona-2', userId: 'system', name: 'SOCRATES The Strategist', isSystemPreset: true, formality: 8, tone: 3, humor: 2, pace: 2 },
  { id: 'persona-3', userId: USER_ID, name: 'My Custom Coach', isSystemPreset: false, formality: 5, tone: 5, humor: 5, pace: 5 },
];

export const mockMessages: Record<string, Message[]> = {
  'conv-1': [
    { id: 'msg-1-1', role: 'assistant', content: "Hello! I'm AdaptAI Coach. What's on your mind today?", createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), avatarUrl: 'https://placehold.co/40x40.png' },
    { id: 'msg-1-2', role: 'user', content: "I'm feeling a bit stuck on a project.", createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(), avatarUrl: 'https://placehold.co/40x40.png' },
    { id: 'msg-1-3', role: 'assistant', content: "I understand. Sometimes a fresh perspective can help. Can you tell me a bit more about the project and where you're feeling stuck?", createdAt: new Date(Date.now() - 1000 * 60 * 6).toISOString(), avatarUrl: 'https://placehold.co/40x40.png' }
  ],
  'conv-2': [
    { id: 'msg-2-1', role: 'assistant', content: "Welcome back! Let's continue our discussion on leadership.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), avatarUrl: 'https://placehold.co/40x40.png' }
  ]
};

export const mockConversations: CoachingConversation[] = [
  { id: 'conv-1', userId: USER_ID, title: "Feeling Stuck on Project", focusArea: "Problem Solving", createdAt: new Date(Date.now() - 1000 * 60 * 11).toISOString(), updatedAt: new Date(Date.now() - 1000 * 60 * 6).toISOString(), messages: mockMessages['conv-1'] },
  { id: 'conv-2', userId: USER_ID, title: "Leadership Skills", focusArea: "Growth", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), messages: mockMessages['conv-2'] },
  { id: 'conv-3', userId: USER_ID, title: "Weekly Check-in", focusArea: "Accountability", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), messages: [] },
];

// Simulate API/DB calls
export async function getConversations(): Promise<CoachingConversation[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockConversations.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function getConversation(id: string): Promise<CoachingConversation | undefined> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const conversation = mockConversations.find(c => c.id === id);
  if (conversation) {
    return { ...conversation, messages: mockMessages[id] || [] };
  }
  return undefined;
}

export async function getGoals(): Promise<Goal[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockGoals;
}

export async function getCoachPersonas(): Promise<CoachPersonaSettings[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPersonas;
}

export async function getCoachSettings(): Promise<CoachPersonaSettings> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPersonas.find(p => p.id === 'persona-3')!;
}
