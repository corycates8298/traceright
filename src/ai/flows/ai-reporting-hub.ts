'use server';

/**
 * @fileOverview A reporting AI agent that allows users to ask questions about compliance and SOP documents.
 *
 * - askAboutDocuments - A function that handles the question answering process.
 * - AskAboutDocumentsInput - The input type for the askAboutDocuments function.
 * - AskAboutDocumentsOutput - The return type for the askAboutDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAboutDocumentsInputSchema = z.object({
  query: z.string().describe('The question about the documents.'),
  documentContent: z
    .string()
    .describe('The content of the compliance and SOP documents.'),
});
export type AskAboutDocumentsInput = z.infer<typeof AskAboutDocumentsInputSchema>;

const AskAboutDocumentsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AskAboutDocumentsOutput = z.infer<typeof AskAboutDocumentsOutputSchema>;

export async function askAboutDocuments(input: AskAboutDocumentsInput): Promise<AskAboutDocumentsOutput> {
  return askAboutDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askAboutDocumentsPrompt',
  input: {schema: AskAboutDocumentsInputSchema},
  output: {schema: AskAboutDocumentsOutputSchema},
  prompt: `You are an AI assistant specialized in answering questions about compliance and standard operating procedure (SOP) documents.

  Use the following document content as the primary source of information:

  Document Content: {{{documentContent}}}

  Answer the following question:

  Question: {{{query}}}
  `,
});

const askAboutDocumentsFlow = ai.defineFlow(
  {
    name: 'askAboutDocumentsFlow',
    inputSchema: AskAboutDocumentsInputSchema,
    outputSchema: AskAboutDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
