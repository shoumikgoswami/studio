export type User = {
  id: string;
  email?: string;
  name?: string;
  avatarUrl?: string;
  coachSettings?: CoachPersonaSettings;
  coachPresets?: CoachPersona[];
};

export type Goal = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: string;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  avatarUrl?: string;
};

export type CoachingConversation = {
  id: string;
  userId: string;
  title: string;
  focusArea?: string;
  relatedGoalId?: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  isActive: boolean;
};

export type CoachPersonaSettings = {
  formality: number; // 1-10
  tone: number; // 1-10 (Direct to Encouraging)
  humor: number; // 1-10
  pace: number; // 1-10 (Reflective to Dynamic)
  useMetaphors: boolean;
  includeQuotes: boolean;
  shareAnecdotes: boolean;
};

export type CoachPersona = {
  id: string;
  name: string;
  description: string;
  strength: string;
  bestFor: string;
  isSystemPreset: boolean;
  settings: CoachPersonaSettings;
};

export type SuggestedCoachingTopic = {
    title: string;
    description: string;
};
