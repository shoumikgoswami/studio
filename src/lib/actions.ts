// src/lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import type { CoachPersonaSettings, CoachingConversation } from './types';
import { getDb, updateDb } from './db';

export async function submitMessage(conversationId: string, formData: FormData) {
  // Simulate database update
  await new Promise((resolve) => setTimeout(resolve, 500));
  const db = await getDb();
  const conversation = db.conversations.find(
    (c: CoachingConversation) => c.id === conversationId
  );
  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const userMessage = {
    id: `msg-${conversationId}-${Date.now()}`,
    role: 'user' as const,
    content: formData.get('message') as string,
    createdAt: new Date().toISOString(),
  };

  conversation.messages.push(userMessage);

  // Simulate AI response generation
  const assistantResponse = {
    id: `msg-${conversationId}-${Date.now() + 1}`,
    role: 'assistant' as const,
    content: `Thinking about your message: "${formData.get('message')}"...`,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://placehold.co/40x40.png',
  };
  conversation.messages.push(assistantResponse);

  conversation.updatedAt = new Date().toISOString();

  await updateDb({ conversations: db.conversations });

  revalidatePath(`/coach/c/${conversationId}`);
  return { success: true };
}

export async function editMessage(
  conversationId: string,
  messageId: string,
  newContent: string
) {
  // Simulate database update
  await new Promise((resolve) => setTimeout(resolve, 500));

  const db = await getDb();
  const conversation = db.conversations.find(
    (c: CoachingConversation) => c.id === conversationId
  );
  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const messageIndex = conversation.messages.findIndex(
    (m: any) => m.id === messageId
  );
  if (messageIndex === -1) {
    throw new Error('Message not found');
  }

  // Update the message content
  conversation.messages[messageIndex].content = newContent + ' (edited)';

  // Discard subsequent messages for re-generation
  conversation.messages.splice(messageIndex + 1);

  // Simulate AI re-generation
  const newAssistantMessage = {
    id: `msg-${conversationId}-${Date.now()}`,
    role: 'assistant' as const,
    content: `Based on your updated message, let's re-evaluate. Tell me more about "${newContent}".`,
    createdAt: new Date().toISOString(),
    avatarUrl: 'https://placehold.co/40x40.png',
  };

  conversation.messages.push(newAssistantMessage);
  conversation.updatedAt = new Date().toISOString();

  await updateDb({ conversations: db.conversations });

  revalidatePath(`/coach/c/${conversationId}`);

  return { success: true };
}

export async function createNewConversation(formData: FormData) {
  const title = (formData.get('title') as string) || 'New Conversation';

  const newConversation: CoachingConversation = {
    id: `conv-${Date.now()}`,
    userId: 'user-123',
    title: title,
    focusArea: (formData.get('focusArea') as string) || undefined,
    relatedGoalId: (formData.get('relatedGoalId') as string) || undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [],
    isActive: true,
  };

  const db = await getDb();
  db.conversations.unshift(newConversation);
  await updateDb({ conversations: db.conversations });

  revalidatePath('/coach');
  redirect(`/coach/c/${newConversation.id}`);
}

export async function saveCoachSettings(settings: CoachPersonaSettings) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const db = await getDb();
  db.user.coachSettings = settings;
  await updateDb({ user: db.user });

  revalidatePath('/coach/settings');
  revalidatePath('/coach/c/*');
  return { success: true };
}

export async function saveCustomPreset(
  name: string,
  settings: CoachPersonaSettings
) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const db = await getDb();
  if (!db.user.coachPresets) {
    db.user.coachPresets = [];
  }

  const newPreset = {
    id: `custom-${uuidv4()}`,
    name,
    description: 'A custom configuration for my needs.', // Simplified for mock
    strength: 'Balanced and thoughtful.', // Simplified for mock
    bestFor: 'General coaching conversations.', // Simplified for mock
    isSystemPreset: false,
    settings,
  };

  db.user.coachPresets.push(newPreset);
  await updateDb({ user: db.user });

  revalidatePath('/coach/settings');

  return { success: true, newPreset };
}

export async function deleteCustomPreset(presetId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const db = await getDb();
  const { user, personas } = db;

  if (user.coachPresets) {
    const deletedPreset = user.coachPresets.find((p: any) => p.id === presetId);
    user.coachPresets = user.coachPresets.filter((p: any) => p.id !== presetId);

    // If the active settings were from the deleted preset, reset to default.
    if (
      deletedPreset &&
      user.coachSettings &&
      JSON.stringify(user.coachSettings) ===
        JSON.stringify(deletedPreset.settings)
    ) {
      user.coachSettings = personas.find((p: any) => p.isSystemPreset)!.settings;
    }
  }

  await updateDb({ user: user });

  revalidatePath('/coach/settings');
  revalidatePath('/coach/c/*');

  return { success: true };
}
