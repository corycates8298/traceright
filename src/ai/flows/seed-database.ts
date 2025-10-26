'use server';
/**
 * @fileOverview A Genkit flow to seed the Firestore database with realistic fake data.
 *
 * - seedDatabase - A function that populates the database.
 * - SeedDatabaseOutput - The return type for the seedDatabase function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, collection, writeBatch, serverTimestamp, doc } from 'firebase/firestore';
import { faker } from '@faker-js/faker';
import { initializeFirebase } from '@/firebase';

const SeedDatabaseOutputSchema = z.object({
  message: z.string(),
  counts: z.object({
    suppliers: z.number(),
    materials: z.number(),
    recipes: z.number(),
    orders: z.number(),
    inventory: z.number(),
  }),
});
export type SeedDatabaseOutput = z.infer<typeof SeedDatabaseOutputSchema>;

export async function seedDatabase(): Promise<SeedDatabaseOutput> {
  return seedDatabaseFlow();
}

const seedDatabaseFlow = ai.defineFlow(
  {
    name: 'seedDatabaseFlow',
    outputSchema: SeedDatabaseOutputSchema,
  },
  async () => {
    const { firestore } = initializeFirebase();
    const batch = writeBatch(firestore);

    // Constants for seeding
    const NUM_SUPPLIERS = 10;
    const NUM_MATERIALS = 50;
    const NUM_RECIPES = 10;
    const NUM_ORDERS = 100;
    const NUM_WAREHOUSES = 3;

    // 1. Create Warehouses
    const warehouses: any[] = [];
    for (let i = 0; i < NUM_WAREHOUSES; i++) {
        const warehouse = {
            id: faker.string.uuid(),
            name: `${faker.company.name()} Warehouse`,
            address: {
                street: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state({ abbreviated: true }),
                zip: faker.location.zipCode(),
                country: 'USA',
            },
            location: {
                lat: faker.location.latitude(),
                lng: faker.location.longitude(),
            },
            capacity: faker.number.int({ min: 10000, max: 100000 }),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            customFields: {},
        };
        warehouses.push(warehouse);
        const warehouseRef = doc(firestore, 'warehouses', warehouse.id);
        batch.set(warehouseRef, warehouse);
    }

    // 2. Create Suppliers
    const suppliers: any[] = [];
    for (let i = 0; i < NUM_SUPPLIERS; i++) {
      const companyName = faker.company.name();
      const supplier = {
        id: faker.string.uuid(),
        name: companyName,
        logoUrl: faker.image.avatar(),
        status: faker.helpers.arrayElement(['Active', 'Inactive', 'On-hold']),
        performance: {
          onTimeDelivery: faker.number.int({ min: 85, max: 100 }),
          qualityScore: faker.number.int({ min: 90, max: 100 }),
          responseRate: faker.number.int({ min: 95, max: 100 }),
        },
        contact: {
          name: faker.person.fullName(),
          email: faker.internet.email({
            firstName: 'contact',
            lastName: companyName.toLowerCase().replace(/\s/g, ''),
          }),
          phone: faker.phone.number(),
        },
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state({ abbreviated: true }),
          zip: faker.location.zipCode(),
          country: 'USA',
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        customFields: {},
      };
      suppliers.push(supplier);
      const supplierRef = doc(firestore, 'suppliers', supplier.id);
      batch.set(supplierRef, supplier);
    }

    // 3. Create Materials
    const materials: any[] = [];
    for (let i = 0; i < NUM_MATERIALS; i++) {
      const supplier = faker.helpers.arrayElement(suppliers);
      const material = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        supplierId: supplier.id,
        sku: `MAT-${faker.string.alphanumeric(8).toUpperCase()}`,
        cost: parseFloat(faker.commerce.price({ min: 1, max: 200 })),
        unit: faker.helpers.arrayElement(['kg', 'pcs', 'liter', 'meter']),
        reorderPoint: faker.number.int({ min: 50, max: 200}),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        customFields: {},
      };
      materials.push(material);
      const materialRef = doc(firestore, 'materials', material.id);
      batch.set(materialRef, material);
    }

    // 4. Create Recipes
    const recipes: any[] = [];
    for (let i = 0; i < NUM_RECIPES; i++) {
        const num_ingredients = faker.number.int({ min: 2, max: 5 });
        const ingredients = [];
        for (let j = 0; j < num_ingredients; j++) {
            ingredients.push({
                materialId: faker.helpers.arrayElement(materials).id,
                quantity: faker.number.int({ min: 1, max: 10 }),
            });
        }

        const recipe = {
            id: faker.string.uuid(),
            name: `Finished Good #${i + 1}`,
            outputMaterialId: faker.helpers.arrayElement(materials).id,
            outputQuantity: faker.number.int({ min: 1, max: 5 }),
            ingredients,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            customFields: {},
        };
        recipes.push(recipe);
        const recipeRef = doc(firestore, 'recipes', recipe.id);
        batch.set(recipeRef, recipe);
    }

    // 5. Create Orders
    const orders: any[] = [];
    for (let i = 0; i < NUM_ORDERS; i++) {
      const items = [];
      const num_items = faker.number.int({ min: 1, max: 4 });
      let totalValue = 0;
      for (let j = 0; j < num_items; j++) {
        const material = faker.helpers.arrayElement(materials);
        const quantity = faker.number.int({ min: 10, max: 200 });
        const priceAtTime = material.cost;
        totalValue += quantity * priceAtTime;
        items.push({
          materialId: material.id,
          quantity,
          priceAtTime,
        });
      }

      const createdAt = faker.date.between({ from: '2023-01-01', to: new Date() });

      const order = {
        id: `ORD-${createdAt.getFullYear()}-${faker.string.numeric(4)}`,
        type: faker.helpers.arrayElement(['Purchase', 'Sale', 'Transfer']),
        status: faker.helpers.arrayElement([
          'Pending', 'Processing', 'In-Transit', 'Delivered', 'Cancelled', 'Delayed'
        ]),
        supplierId: faker.helpers.arrayElement(suppliers).id,
        items,
        totalValue,
        trackingId: `1Z${faker.string.alphanumeric(16).toUpperCase()}`,
        expectedDeliveryDate: faker.date.future({ refDate: createdAt }),
        createdAt,
        updatedAt: createdAt,
        customFields: {},
      };
      orders.push(order);
      const orderRef = doc(firestore, 'orders', order.id);
      batch.set(orderRef, order);
    }
    
    // 6. Create inventory
    let inventoryCount = 0;
    for (const warehouse of warehouses) {
        for(const material of materials) {
            const inventory = {
                id: `${warehouse.id}_${material.id}`,
                warehouseId: warehouse.id,
                materialId: material.id,
                quantity: faker.number.int({ min: 0, max: 1000 }),
                lastRestocked: faker.date.recent(),
                updatedAt: serverTimestamp(),
                customFields: {},
            };
            const inventoryRef = doc(firestore, 'inventory', inventory.id);
            batch.set(inventoryRef, inventory);
            inventoryCount++;
        }
    }


    await batch.commit();

    return {
      message: 'Database successfully seeded.',
      counts: {
        suppliers: NUM_SUPPLIERS,
        materials: NUM_MATERIALS,
        recipes: NUM_RECIPES,
        orders: NUM_ORDERS,
        inventory: inventoryCount,
      },
    };
  }
);
