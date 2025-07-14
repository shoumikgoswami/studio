'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  mockConversations,
  mockMessages,
  mockPersonas,
  mockUser,
} from './data';
import { CoachPersonaSettings } from './types';
import { v4 as uuidv4 } from 'uuid';

export async function editMessage(
  conversationId: string,
  messageId: string,
  newContent: string
) {
  // Simulate database update
  await new Promise((resolve) => setTimeout(resolve, 500));

  const conversation = mockConversations.find((c) => c.id === conversationId);
  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const messageIndex = conversation.messages.findIndex((m) => m.id === messageId);
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

  // Also update the mockMessages record if it exists
  if (mockMessages[conversationId]) {
    mockMessages[conversationId] = conversation.messages;
  }

  conversation.updatedAt = new Date().toISOString();

  revalidatePath(`/coach/c/${conversationId}`);

  return { success: true };
}

export async function createNewConversation(formData: FormData) {
  const newConversation = {
    id: `conv-${Date.now()}`,
    userId: 'user-123',
    title: formData.get('title') as string,
    focusArea: (formData.get('focusArea') as string) || undefined,
    relatedGoalId: (formData.get('relatedGoalId') as string) || undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [],
    isActive: true,
  };

  mockConversations.push(newConversation);
  revalidatePath('/coach');
  redirect(`/coach/c/${newConversation.id}`);
}

export async function saveCoachSettings(settings: CoachPersonaSettings) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  mockUser.coachSettings = settings;
  revalidatePath('/coach/settings');
  revalidatePath('/coach/c/*');
  return { success: true };
}

export async function saveCustomPreset(
  name: string,
  settings: CoachPersonaSettings
) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!mockUser.coachPresets) {
    mockUser.coachPresets = [];
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

  mockUser.coachPresets.push(newPreset);
  revalidatePath('/coach/settings');

  return { success: true, newPreset };
}

export async function deleteCustomPreset(presetId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (mockUser.coachPresets) {
    mockUser.coachPresets = mockUser.coachPresets.filter(
      (p) => p.id !== presetId
    );
  }
  
  // If the active settings were from the deleted preset, reset to default.
  const activePreset = mockPersonas.find(p => p.id === selectedPresetId);
  if (mockUser.coachSettings === activePreset?.settings) {
      mockUser.coachSettings = mockPersonas[0].settings;
  }

  revalidatePath('/coach/settings');
  revalidatePath('/coach/c/*');
  
  return { success: true };
}
