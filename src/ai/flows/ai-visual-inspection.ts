'use server';

/**
 * @fileOverview Implements the AI Visual Inspection flow for detecting damage and verifying labels in delivery photos.
 *
 * - aiVisualInspection - A function that handles the visual inspection process.
 * - AIVisualInspectionInput - The input type for the aiVisualInspection function.
 * - AIVisualInspectionOutput - The return type for the aiVisualInspection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const AIVisualInspectionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the delivery, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AIVisualInspectionInput = z.infer<typeof AIVisualInspectionInputSchema>;

const AIVisualInspectionOutputSchema = z.object({
  damageDetected: z
    .boolean()
    .describe('Whether or not damage is detected in the photo.'),
  labelVerified: z
    .boolean()
    .describe('Whether or not the label is verified in the photo.'),
  confidenceScore: z
    .number()
    .describe(
      'A score (0-1) indicating the confidence level of the analysis.'
    ),
  details: z
    .string()
    .describe('A detailed description of the damage and label verification.'),
});
export type AIVisualInspectionOutput = z.infer<typeof AIVisualInspectionOutputSchema>;

export async function aiVisualInspection(
  input: AIVisualInspectionInput
): Promise<AIVisualInspectionOutput> {
  return aiVisualInspectionFlow(input);
}

const aiVisualInspectionPrompt = ai.definePrompt({
  name: 'aiVisualInspectionPrompt',
  input: {schema: AIVisualInspectionInputSchema},
  output: {schema: AIVisualInspectionOutputSchema},
  prompt: `You are an AI assistant specializing in supply chain quality control.

You will analyze the photo of the delivery and determine if there is any damage and if the label is verified.

Based on your analysis, you will set the damageDetected and labelVerified output fields appropriately.
You will also provide a confidence score (0-1) indicating the confidence level of your analysis.

Photo: {{media url=photoDataUri}}
`,
});

const aiVisualInspectionFlow = ai.defineFlow(
  {
    name: 'aiVisualInspectionFlow',
    inputSchema: AIVisualInspectionInputSchema,
    outputSchema: AIVisualInspectionOutputSchema,
  },
  async input => {
    const {output} = await aiVisualInspectionPrompt(input, {
        model: 'googleai/gemini-pro-vision',
    });
    return output!;
  }
);
