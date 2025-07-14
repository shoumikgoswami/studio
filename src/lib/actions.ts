'use server';

import { generateCoachingResponse } from '@/ai/flows/generate-coaching-response';
import { suggestCoachingTopics, type SuggestedCoachingTopic } from '@/ai/flows/suggest-coaching-topics';
import { getConversation, mockConversations, mockMessages } from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Message } from './types';


export async function getSuggestedTopics(): Promise<SuggestedCoachingTopic[]> {
  try {
    const topics = await suggestCoachingTopics();
    return topics;
  } catch (error) {
    console.error('Error suggesting topics:', error);
    // Return a fallback list or an empty array in case of an error
    return [
        { title: 'Embracing Change', description: 'Learn how to view change as an opportunity for growth and development.' },
        { title: 'Overcoming Resistance', description: 'Strategies to manage resistance to new situations.' },
        { title: 'Growth Mindset', description: 'Cultivate a mindset that embraces challenges.' },
    ];
  }
}

export async function submitMessage(conversationId: string, formData: FormData) {
  const userInput = formData.get('message') as string;
  if (!userInput?.trim()) return { success: false, error: 'Message is empty.' };

  // 1. Add user message to the conversation (mock)
  if (!mockMessages[conversationId]) {
    mockMessages[conversationId] = [];
  }
  const userMessage: Message = {
    id: `msg-${Date.now()}`,
    role: 'user',
    content: userInput,
    createdAt: new Date().toISOString(),
    avatarUrl: `https://placehold.co/40x40.png`,
  };
  mockMessages[conversationId].push(userMessage);
  
  // Revalidate to show user message instantly
  revalidatePath(`/coach/c/${conversationId}`);


  // 2. Prepare data for AI
  const conversation = await getConversation(conversationId);
  const conversationHistory = (mockMessages[conversationId] || [])
    .map(m => `${m.role}: ${m.content}`)
    .join('\n');
  
  // 3. Call AI to generate a response
  try {
    const aiResponse = await generateCoachingResponse({
      conversationHistory,
      userInput,
      aqData: "User is highly adaptable in changing environments but struggles with emotional resilience.",
      goals: `Current goal: ${conversation?.relatedGoalId || 'Not specified'}`,
      personaSettings: "Current persona: MOTI The Motivator (Friendly, encouraging, uses humor)",
    });

    // 4. Add AI response to the conversation (mock)
    const assistantMessage: Message = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: aiResponse.coachingResponse,
      createdAt: new Date().toISOString(),
      avatarUrl: `https://placehold.co/40x40.png`,
    };
    mockMessages[conversationId].push(assistantMessage);

    // 5. Revalidate path to show AI response
    revalidatePath(`/coach/c/${conversationId}`);
    return { success: true };

  } catch (error) {
    console.error('Error generating AI response:', error);
    const errorMessage = 'Sorry, I encountered an error. Please try again.';
    
    const errorAssistantMessage: Message = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: errorMessage,
      createdAt: new Date().toISOString(),
      avatarUrl: `https://placehold.co/40x40.png`,
    };
    mockMessages[conversationId].push(errorAssistantMessage);

    revalidatePath(`/coach/c/${conversationId}`);
    return { success: false, error: 'Failed to get AI response.' };
  }
}

export async function createNewConversation(formData: FormData) {
  const title = formData.get('title') as string;
  const focusArea = formData.get('focusArea') as string | undefined;
  const relatedGoalId = formData.get('relatedGoalId') as string | undefined;

  const newConversationId = `conv-${Date.now()}`;
  mockConversations.unshift({
    id: newConversationId,
    userId: 'user-123',
    title: title || 'New Conversation',
    focusArea,
    relatedGoalId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [],
  });

  mockMessages[newConversationId] = [
    {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: `Hello! Let's talk about ${title || 'your goals'}. What's on your mind?`,
      createdAt: new Date().toISOString(),
      avatarUrl: `https://placehold.co/40x40.png`,
    },
  ];

  revalidatePath('/coach');
  redirect(`/coach/c/${newConversationId}`);
}
