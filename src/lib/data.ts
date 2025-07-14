// src/lib/data.ts
import 'server-only';

import type {
  CoachingConversation,
  Goal,
  CoachPersona,
  User,
  SuggestedCoachingTopic,
} from './types';
import { suggestCoachingTopics as suggestCoachingTopicsFlow } from '@/ai/flows/suggest-coaching-topics';
import { getDb } from './db';

// Simulate API/DB calls
export async function getConversations(): Promise<CoachingConversation[]> {
  const db = await getDb();
  const conversations: CoachingConversation[] = db.conversations || [];
  return conversations
    .filter((c) => c.isActive)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

export async function getConversation(
  id: string
): Promise<CoachingConversation | undefined> {
  const db = await getDb();
  const conversation = db.conversations.find((c: CoachingConversation) => c.id === id);
  return conversation;
}

export async function getGoals(): Promise<Goal[]> {
  const db = await getDb();
  return db.goals;
}

export async function getCoachPersonas(): Promise<CoachPersona[]> {
  const db = await getDb();
  return db.personas;
}

export async function getUser(): Promise<User> {
  const db = await getDb();
  return db.user;
}

export async function getSuggestedTopics(): Promise<SuggestedCoachingTopic[]> {
  const topics = await suggestCoachingTopicsFlow();
  return topics;
}
