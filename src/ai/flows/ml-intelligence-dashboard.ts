'use server';

/**
 * @fileOverview Flow for visualizing the performance, accuracy, and key drivers of custom Vertex AI models.
 *
 * - generateMlIntelligenceDashboard - A function that generates insights for the ML Intelligence Dashboard.
 * - MlIntelligenceDashboardInput - The input type for the generateMlIntelligenceDashboard function.
 * - MlIntelligenceDashboardOutput - The return type for the generateMlIntelligenceDashboard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MlIntelligenceDashboardInputSchema = z.object({
  modelPerformanceData: z
    .string()
    .describe(
      'Data representing the performance metrics of the Vertex AI models, such as accuracy, precision, and recall.'
    ),
  keyDriversData: z
    .string()
    .describe(
      'Data identifying the key factors driving the models performance, including feature importance and contribution analysis.'
    ),
  visualizationPreferences: z
    .string()
    .optional()
    .describe(
      'Optional preferences for how the data should be visualized, such as chart types or color schemes.'
    ),
});
export type MlIntelligenceDashboardInput = z.infer<typeof MlIntelligenceDashboardInputSchema>;

const MlIntelligenceDashboardOutputSchema = z.object({
  dashboardSummary: z
    .string()
    .describe('A high-level summary of the Vertex AI models performance.'),
  performanceInsights: z
    .string()
    .describe(
      'Detailed insights into the models accuracy, precision, recall, and other relevant metrics.'
    ),
  keyDriversExplanation: z
    .string()
    .describe(
      'Explanation of the key factors driving the models performance, including feature importance.'
    ),
  recommendations: z
    .string()
    .describe(
      'Recommendations for improving the models performance based on the insights gained.'
    ),
});
export type MlIntelligenceDashboardOutput = z.infer<typeof MlIntelligenceDashboardOutputSchema>;

export async function generateMlIntelligenceDashboard(
  input: MlIntelligenceDashboardInput
): Promise<MlIntelligenceDashboardOutput> {
  return mlIntelligenceDashboardFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mlIntelligenceDashboardPrompt',
  input: {schema: MlIntelligenceDashboardInputSchema},
  output: {schema: MlIntelligenceDashboardOutputSchema},
  prompt: `You are a data analyst expert specializing in interpreting machine learning model performance.

  You will use the provided data to generate a comprehensive dashboard summary, performance insights, key drivers explanation, and recommendations for improving the models.

  Model Performance Data: {{{modelPerformanceData}}}
  Key Drivers Data: {{{keyDriversData}}}
  Visualization Preferences: {{{visualizationPreferences}}}

  Based on this data, provide the following:
  1. A concise dashboard summary highlighting the key performance indicators.
  2. Detailed insights into the models accuracy, precision, recall, and other relevant metrics.
  3. An explanation of the key factors driving the models performance, including feature importance.
  4. Actionable recommendations for improving the models performance.
  
  Make sure the output is well-formatted and easy to understand for a data analyst.
  `,
});

const mlIntelligenceDashboardFlow = ai.defineFlow(
  {
    name: 'mlIntelligenceDashboardFlow',
    inputSchema: MlIntelligenceDashboardInputSchema,
    outputSchema: MlIntelligenceDashboardOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
