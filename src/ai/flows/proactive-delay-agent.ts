'use server';

/**
 * @fileOverview A proactive agent that monitors orders for delays and warehouse stock levels,
 * suggests alternative suppliers, and proposes a purchase order.
 *
 * - proactiveDelayAgent - A function that handles the proactive delay agent process.
 * - ProactiveDelayAgentInput - The input type for the proactiveDelayAgent function.
 * - ProactiveDelayAgentOutput - The return type for the proactiveDelayAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ProactiveDelayAgentInputSchema = z.object({
  orderId: z.string().describe('The ID of the order to monitor.'),
  currentStockLevel: z.number().describe('The current stock level of the ordered item.'),
  delayThresholdDays: z.number().describe('The number of days before a delay is considered critical.'),
  salesData: z.string().describe('Sales data for forecasting demand.'),
  supplierData: z.string().describe('Supplier data for finding alternatives.'),
});
export type ProactiveDelayAgentInput = z.infer<typeof ProactiveDelayAgentInputSchema>;

const ProactiveDelayAgentOutputSchema = z.object({
  isDelayed: z.boolean().describe('Whether the order is delayed beyond the threshold.'),
  alternativeSuppliers: z.array(z.string()).describe('A list of alternative suppliers for the item.'),
  suggestedPurchaseOrder: z.string().describe('A suggestion for a purchase order to address low stock.'),
});
export type ProactiveDelayAgentOutput = z.infer<typeof ProactiveDelayAgentOutputSchema>;

export async function proactiveDelayAgent(input: ProactiveDelayAgentInput): Promise<ProactiveDelayAgentOutput> {
  return proactiveDelayAgentFlow(input);
}

const proactiveDelayAgentPrompt = ai.definePrompt({
  name: 'proactiveDelayAgentPrompt',
  input: {schema: ProactiveDelayAgentInputSchema},
  output: {schema: ProactiveDelayAgentOutputSchema},
  prompt: `You are a supply chain manager assistant. You monitor orders for delays and warehouse stock levels, suggest alternative suppliers, and propose a purchase order.

Order ID: {{{orderId}}}
Current Stock Level: {{{currentStockLevel}}}
Delay Threshold (Days): {{{delayThresholdDays}}}
Sales Data: {{{salesData}}}
Supplier Data: {{{supplierData}}}

Determine if the order is delayed beyond the threshold, find alternative suppliers, and suggest a purchase order to address low stock.

Output:
Is Delayed: {{isDelayed}}
Alternative Suppliers: {{alternativeSuppliers}}
Suggested Purchase Order: {{suggestedPurchaseOrder}}`,
});

const proactiveDelayAgentFlow = ai.defineFlow(
  {
    name: 'proactiveDelayAgentFlow',
    inputSchema: ProactiveDelayAgentInputSchema,
    outputSchema: ProactiveDelayAgentOutputSchema,
  },
  async input => {
    const {output} = await proactiveDelayAgentPrompt(input);
    return output!;
  }
);
