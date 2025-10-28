'use server';
/**
 * @fileOverview A Genkit flow to seed the Firestore database with realistic fake data.
 *
 * - seedDatabase - A function that populates the database.
 * - SeedDatabaseOutput - The return type for the seedDatabase function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getFirestore, collection, writeBatch, serverTimestamp, doc, GeoPoint } from 'firebase/firestore';
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
    warehouses: z.number(),
    products: z.number(),
    batches: z.number(),
    shipments: z.number(),
    invoices: z.number(),
    costs: z.number(),
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
    const NUM_PRODUCTS = 15;
    const NUM_ORDERS = 100;
    const NUM_WAREHOUSES = 3;
    const NUM_BATCHES = 20;
    const NUM_INVOICES = 50;
    const NUM_COSTS = 200;

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
            location: new GeoPoint(faker.location.latitude({min: 25, max: 49}), faker.location.longitude({min: -124, max: -67})),
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

    // 3. Create Raw Materials
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

    // 4. Create Recipes and Products
    const recipes: any[] = [];
    const products: any[] = [];
    for (let i = 0; i < NUM_PRODUCTS; i++) {
      const num_ingredients = faker.number.int({ min: 2, max: 5 });
      const ingredients = [];
      let totalCost = 0;
      for (let j = 0; j < num_ingredients; j++) {
          const material = faker.helpers.arrayElement(materials);
          const quantity = faker.number.int({ min: 1, max: 10 });
          ingredients.push({
              materialId: material.id,
              quantity: quantity,
          });
          totalCost += material.cost * quantity;
      }
      
      const productName = `Finished Good #${i + 1} - ${faker.commerce.productAdjective()}`;
      const product = {
          id: faker.string.uuid(),
          name: productName,
          sku: `PROD-${faker.string.alphanumeric(6).toUpperCase()}`,
          description: faker.commerce.productDescription(),
          pricing: parseFloat(faker.commerce.price({ min: totalCost * 1.5, max: totalCost * 3 })),
          currentStock: 0, // will be updated by inventory
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          customFields: {},
          recipeId: '', // will be set below
      };

      const recipe = {
          id: faker.string.uuid(),
          name: `${productName} Recipe`,
          productId: product.id,
          outputQuantity: faker.number.int({ min: 1, max: 5 }),
          ingredients,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          customFields: {},
      };
      recipes.push(recipe);
      product.recipeId = recipe.id;
      products.push(product);

      const recipeRef = doc(firestore, 'recipes', recipe.id);
      batch.set(recipeRef, recipe);
      const productRef = doc(firestore, 'products', product.id);
      batch.set(productRef, product);
    }


    // 5. Create Orders and Shipments
    const orders: any[] = [];
    const shipments: any[] = [];
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
      const status = faker.helpers.arrayElement([
          'Pending', 'Processing', 'In-Transit', 'Delivered', 'Cancelled', 'Delayed'
      ]);

      const order = {
        id: `ORD-${createdAt.getFullYear()}-${faker.string.numeric(4)}`,
        type: faker.helpers.arrayElement(['Purchase', 'Sale', 'Transfer']),
        status: status,
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
      
      if (status === 'In-Transit' || status === 'Delivered' || status === 'Delayed') {
          const originWarehouse = faker.helpers.arrayElement(warehouses);
          const destinationWarehouse = faker.helpers.arrayElement(warehouses.filter(w => w.id !== originWarehouse.id));
          const shipment = {
              id: faker.string.uuid(),
              orderId: order.id,
              carrier: faker.company.name(),
              trackingNumber: order.trackingId,
              status: status as 'In-Transit' | 'Delivered' | 'Delayed',
              originLocation: originWarehouse.location,
              destinationLocation: destinationWarehouse.location,
              currentLocation: new GeoPoint(faker.location.latitude(), faker.location.longitude()),
              estimatedDelivery: order.expectedDeliveryDate,
              actualDelivery: status === 'Delivered' ? faker.date.recent({ refDate: order.expectedDeliveryDate }) : null,
              shippingCost: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
          };
          shipments.push(shipment);
          const shipmentRef = doc(firestore, 'shipments', shipment.id);
          batch.set(shipmentRef, shipment);
      }
    }
    
    // 6. Create inventory for materials and products
    let inventoryCount = 0;
    const allStockableItems = [...materials, ...products];
    for (const warehouse of warehouses) {
        for(const item of allStockableItems) {
            if (faker.datatype.boolean(0.7)) { // Only stock ~70% of items in each warehouse
                const inventory = {
                    id: `${warehouse.id}_${item.id}`,
                    warehouseId: warehouse.id,
                    itemId: item.id, // can be material or product
                    itemType: item.sku.startsWith('MAT') ? 'material' : 'product',
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
    }

    // 7. Create Batches
    for(let i = 0; i < NUM_BATCHES; i++) {
        const recipe = faker.helpers.arrayElement(recipes);
        const startTime = faker.date.past();
        const batchDoc = {
            id: faker.string.uuid(),
            recipeId: recipe.id,
            productId: recipe.productId,
            status: faker.helpers.arrayElement(['Scheduled', 'In-Progress', 'Completed', 'Failed']),
            startTime: startTime,
            endTime: faker.date.future({refDate: startTime}),
            materialsConsumed: recipe.ingredients.map((ing:any) => ({...ing, actualQuantity: ing.quantity * faker.number.float({min: 0.95, max: 1.05})})),
            quantityProduced: recipe.outputQuantity * faker.number.int({min: 0.98, max: 1}),
            costAnalysis: {},
        };
        const batchRef = doc(firestore, 'batches', batchDoc.id);
        batch.set(batchRef, batchDoc);
    }

    // 8. Create Invoices
    for (let i = 0; i < NUM_INVOICES; i++) {
        const order = faker.helpers.arrayElement(orders);
        const invoice = {
            id: `INV-${faker.string.numeric(5)}`,
            orderId: order.id,
            amount: order.totalValue * faker.number.float({min: 1.0, max: 1.05}),
            status: faker.helpers.arrayElement(['Paid', 'Pending', 'Overdue']),
            dueDate: faker.date.future(),
            createdAt: order.createdAt,
        };
        const invoiceRef = doc(firestore, 'invoices', invoice.id);
        batch.set(invoiceRef, invoice);
    }
    
    // 9. Create Costs
    for (let i = 0; i < NUM_COSTS; i++) {
        const cost = {
            id: faker.string.uuid(),
            category: faker.helpers.arrayElement(['Shipping', 'Materials', 'Production', 'Overhead', 'Labor']),
            amount: parseFloat(faker.commerce.price({min: 100, max: 5000})),
            date: faker.date.past(),
            description: faker.lorem.sentence(),
        };
        const costRef = doc(firestore, 'costs', cost.id);
        batch.set(costRef, cost);
    }

    await batch.commit();

    return {
      message: 'Database successfully seeded with complete schema.',
      counts: {
        suppliers: NUM_SUPPLIERS,
        materials: NUM_MATERIALS,
        recipes: recipes.length,
        orders: NUM_ORDERS,
        inventory: inventoryCount,
        warehouses: NUM_WAREHOUSES,
        products: NUM_PRODUCTS,
        batches: NUM_BATCHES,
        shipments: shipments.length,
        invoices: NUM_INVOICES,
        costs: NUM_COSTS,
      },
    };
  }
);
