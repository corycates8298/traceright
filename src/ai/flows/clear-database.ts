'use server';
/**
 * @fileOverview A Genkit flow to clear specified collections from the Firestore database.
 *
 * - clearDatabase - A function that deletes all documents in key collections.
 * - ClearDatabaseOutput - The return type for the clearDatabase function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getFirestore, collection, getDocs, writeBatch } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const ClearDatabaseOutputSchema = z.object({
  message: z.string(),
  deletedCounts: z.record(z.number()),
});
export type ClearDatabaseOutput = z.infer<typeof ClearDatabaseOutputSchema>;

export async function clearDatabase(): Promise<ClearDatabaseOutput> {
  return clearDatabaseFlow();
}

const COLLECTIONS_TO_DELETE = [
    // 'users', // Skip users - they can only delete their own documents
    'suppliers',
    'materials',
    'recipes',
    'orders',
    'inventory',
    'warehouses',
    'products',
    'batches',
    'shipments',
    'inventoryLocations',
    'inventoryAdjustments',
    'assetManagement',
    'invoices',
    'payments',
    'costs',
    'auditLog',
    'governanceDocs'
];

async function deleteCollection(db: any, collectionPath: string, batchSize = 500) {
    const collectionRef = collection(db, collectionPath);
    const q = collectionRef;
    const querySnapshot = await getDocs(q);

    let count = 0;
    const numDocs = querySnapshot.size;

    if (numDocs === 0) {
        return 0;
    }

    let batch = writeBatch(db);
    for (const document of querySnapshot.docs) {
        batch.delete(document.ref);
        count++;
        if (count % batchSize === 0) {
            await batch.commit();
            batch = writeBatch(db);
        }
    }

    if (count % batchSize !== 0) {
        await batch.commit();
    }
    
    return numDocs;
}

const clearDatabaseFlow = ai.defineFlow(
  {
    name: 'clearDatabaseFlow',
    outputSchema: ClearDatabaseOutputSchema,
  },
  async () => {
    const { firestore } = initializeFirebase();
    const deletedCounts: Record<string, number> = {};

    for (const collectionName of COLLECTIONS_TO_DELETE) {
        try {
            const count = await deleteCollection(firestore, collectionName);
            deletedCounts[collectionName] = count;
        } catch (error) {
            console.error(`Error deleting collection ${collectionName}:`, error);
            // We still want to try deleting other collections, so we don't rethrow here.
            // A count of 0 will be the indicator of failure for a specific collection.
            deletedCounts[collectionName] = 0;
        }
    }

    return {
      message: 'All specified database collections have been cleared.',
      deletedCounts,
    };
  }
);
