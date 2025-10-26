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
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const AskAboutDocumentsInputSchema = z.object({
  query: z.string().describe('The question about the documents.'),
});
export type AskAboutDocumentsInput = z.infer<typeof AskAboutDocumentsInputSchema>;

const AskAboutDocumentsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AskAboutDocumentsOutput = z.infer<typeof AskAboutDocumentsOutputSchema>;

export async function askAboutDocuments(input: AskAboutDocumentsInput): Promise<AskAboutDocumentsOutput> {
  return askAboutDocumentsFlow(input);
}

// This is a placeholder for a real vector search.
// In a production RAG system, you would convert the query to an embedding
// and use it to find similar document chunks from a vector database.
async function findRelevantDocuments(query: string): Promise<string> {
    const { firestore } = initializeFirebase();
    const docsSnapshot = await getDocs(collection(firestore, 'governanceDocs'));
    
    // For this demo, we are concatenating all documents.
    // A real implementation would perform a vector search to find relevant chunks.
    let allDocumentContent = '';
    docsSnapshot.forEach(doc => {
        // Assuming documents have a 'content' field.
        // The current 'governanceDocs' in seed-database doesn't have it,
        // so we'll just use the name and metadata for now.
        const data = doc.data();
        allDocumentContent += `Document: ${data.fileName}\nContent: ${JSON.stringify(data.metadata)}\n\n`;
    });

    if (allDocumentContent === '') {
        return "No documents found in the database to search against. Please seed the database with governance documents.";
    }
    
    return allDocumentContent;
}


const prompt = ai.definePrompt({
  name: 'askAboutDocumentsPrompt',
  input: {schema: z.object({ query: z.string(), documentContent: z.string() }) },
  output: {schema: AskAboutDocumentsOutputSchema},
  prompt: `You are an AI assistant specialized in answering questions about compliance and standard operating procedure (SOP) documents.

  Use the following document content as the primary source of information:

  Document Content: {{{documentContent}}}

  Answer the following question concisely based *only* on the provided content. If the information is not in the documents, state that clearly.

  Question: {{{query}}}
  `,
});

const askAboutDocumentsFlow = ai.defineFlow(
  {
    name: 'askAboutDocumentsFlow',
    inputSchema: AskAboutDocumentsInputSchema,
    outputSchema: AskAboutDocumentsOutputSchema,
  },
  async ({ query }) => {
    // 1. Retrieve relevant document content (in a real RAG, this is a vector search)
    const documentContent = await findRelevantDocuments(query);

    // 2. Pass the retrieved content and the original query to the LLM
    const {output} = await prompt({ query, documentContent });
    return output!;
  }
);
