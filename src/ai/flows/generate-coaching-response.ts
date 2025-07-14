// src/ai/flows/generate-coaching-response.ts
'use server';

/**
 * @fileOverview Generates personalized coaching responses based on user data, goals, and coach personality settings.
 *
 * - generateCoachingResponse - A function that generates a coaching response.
 * - GenerateCoachingResponseInput - The input type for the generateCoachingResponse function.
 * - GenerateCoachingResponseOutput - The return type for the generateCoachingResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoachingResponseInputSchema = z.object({
  conversationHistory: z.string().describe('The history of the conversation.'),
  aqData: z.string().describe('The user adaptability assessment data.'),
  goals: z.string().describe('The user goals.'),
  personaSettings: z.string().describe('The coach personality settings.'),
  userInput: z.string().describe('The user input message.'),
});
export type GenerateCoachingResponseInput = z.infer<typeof GenerateCoachingResponseInputSchema>;

const GenerateCoachingResponseOutputSchema = z.object({
  coachingResponse: z.string().describe('The personalized coaching response.'),
});
export type GenerateCoachingResponseOutput = z.infer<typeof GenerateCoachingResponseOutputSchema>;

export async function generateCoachingResponse(
  input: GenerateCoachingResponseInput
): Promise<GenerateCoachingResponseOutput> {
  return generateCoachingResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoachingResponsePrompt',
  input: {schema: GenerateCoachingResponseInputSchema},
  output: {schema: GenerateCoachingResponseOutputSchema},
  prompt: `You are an AI coach. Analyze the user's profile data, goals, and chosen personality settings to generate personalized coaching responses in a chat-based interface.

  Here is the conversation history: {{{conversationHistory}}}
  Here is the user's adaptability assessment data: {{{aqData}}}
  Here are the user's goals: {{{goals}}}
  Here are the coach personality settings: {{{personaSettings}}}
  Here is the user's input: {{{userInput}}}

  Generate a coaching response that is relevant and tailored to the user's needs.
  Your response should be professional, encouraging, and insightful.
`,
});

const generateCoachingResponseFlow = ai.defineFlow(
  {
    name: 'generateCoachingResponseFlow',
    inputSchema: GenerateCoachingResponseInputSchema,
    outputSchema: GenerateCoachingResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
