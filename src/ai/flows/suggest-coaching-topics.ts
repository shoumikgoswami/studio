// src/ai/flows/suggest-coaching-topics.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting coaching topics related to adaptability.
 *
 * The flow takes no input and returns a list of suggested coaching topics.
 * Each topic includes a title and a brief description.
 *
 * @interface SuggestedCoachingTopic - Represents a single coaching topic suggestion.
 * @function suggestCoachingTopics - The main function to trigger the topic suggestion flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestedCoachingTopicSchema = z.object({
  title: z.string().describe('The title of the coaching topic.'),
  description: z.string().describe('A brief description of the coaching topic.'),
});

export type SuggestedCoachingTopic = z.infer<typeof SuggestedCoachingTopicSchema>;

const SuggestCoachingTopicsOutputSchema = z.array(SuggestedCoachingTopicSchema);

export type SuggestCoachingTopicsOutput = z.infer<typeof SuggestCoachingTopicsOutputSchema>;

export async function suggestCoachingTopics(): Promise<SuggestCoachingTopicsOutput> {
  return suggestCoachingTopicsFlow();
}

const prompt = ai.definePrompt({
  name: 'suggestCoachingTopicsPrompt',
  output: {schema: SuggestCoachingTopicsOutputSchema},
  prompt: `You are an AI coach specializing in adaptability.
  Suggest coaching topics based on common themes and challenges related to adaptability.
  Provide a list of topics with a title and a brief description for each.
  Return the topics as a JSON array.
  Here are some coaching topics:
  [
    {
      "title": "Embracing Change",
      "description": "Learn how to view change as an opportunity for growth and development."
    },
    {
      "title": "Overcoming Resistance to Change",
      "description": "Discover strategies to manage and overcome resistance to new situations and ideas."
    },
    {
      "title": "Developing a Growth Mindset",
      "description": "Cultivate a mindset that embraces challenges and sees failure as a learning opportunity."
    },
    {
      "title": "Improving Resilience",
      "description": "Build your ability to bounce back from setbacks and adversity."
    },
    {
      "title": "Enhancing Problem-Solving Skills",
      "description": "Develop your ability to analyze problems and find creative solutions."
    }
  ]
  `,
});

const suggestCoachingTopicsFlow = ai.defineFlow(
  {
    name: 'suggestCoachingTopicsFlow',
    outputSchema: SuggestCoachingTopicsOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
