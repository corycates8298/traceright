'use server';

/**
 * @fileOverview Implements an AI-powered chatbot for answering questions about supply chain data.
 *
 * - aiPoweredChatbot - A function that processes user questions and returns answers from the AI assistant.
 * - AIPoweredChatbotInput - The input type for the aiPoweredChatbot function.
 * - AIPoweredChatbotOutput - The return type for the aiPoweredChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredChatbotInputSchema = z.object({
  question: z.string().describe('The user question about supply chain data.'),
});
export type AIPoweredChatbotInput = z.infer<typeof AIPoweredChatbotInputSchema>;

const AIPoweredChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s answer to the user question.'),
});
export type AIPoweredChatbotOutput = z.infer<typeof AIPoweredChatbotOutputSchema>;

export async function aiPoweredChatbot(input: AIPoweredChatbotInput): Promise<AIPoweredChatbotOutput> {
  return aiPoweredChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredChatbotPrompt',
  input: {schema: AIPoweredChatbotInputSchema},
  output: {schema: AIPoweredChatbotOutputSchema},
  prompt: `You are an AI assistant specialized in answering questions about supply chain data. Use your knowledge to provide informative and helpful answers to the user\'s questions.\n\nQuestion: {{{question}}}`,
});

const aiPoweredChatbotFlow = ai.defineFlow(
  {
    name: 'aiPoweredChatbotFlow',
    inputSchema: AIPoweredChatbotInputSchema,
    outputSchema: AIPoweredChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
