// functions/data-management.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { faker } = require('@faker-js/faker');

// Note: admin.initializeApp() is already called in vision-analysis.js
// If this is a separate deployment, uncomment the line below:
// admin.initializeApp();

const db = admin.firestore();

/**
 * Helper function to check if user is admin
 * Admin status is stored in Firestore users collection
 */
async function isAdmin(uid) {
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return false;
    }
    const userData = userDoc.data();
    return userData.role === 'admin' || userData.isAdmin === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * seedDatabase Cloud Function (HTTPS Callable)
 *
 * Generates a complete interconnected supply chain dataset:
 * - 10 suppliers
 * - 50 raw materials
 * - 5 recipes
 * - 100 orders
 * - Associated traceability events
 *
 * Uses Firestore Batched Writes for efficiency.
 * Admin-only access.
 */
exports.seedDatabase = functions.https.onCall(async (data, context) => {
  // Authentication check
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to seed the database.'
    );
  }

  // Admin authorization check
  const adminStatus = await isAdmin(context.auth.uid);
  if (!adminStatus) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only administrators can seed the database.'
    );
  }

  console.log('Starting database seed by admin:', context.auth.uid);

  try {
    const results = {
      suppliers: 0,
      materials: 0,
      recipes: 0,
      orders: 0,
      events: 0
    };

    // STEP 1: Generate 10 Suppliers
    const supplierIds = [];
    let batch = db.batch();
    let batchCount = 0;

    for (let i = 0; i < 10; i++) {
      const supplierId = db.collection('suppliers').doc().id;
      supplierIds.push(supplierId);

      const supplierData = {
        id: supplierId,
        name: faker.company.name(),
        contact: {
          email: faker.internet.email(),
          phone: faker.phone.number(),
          address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country()
          }
        },
        rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0
        leadTime: Math.floor(Math.random() * 20 + 5), // 5-25 days
        certifications: faker.helpers.arrayElements(
          ['ISO 9001', 'ISO 14001', 'OHSAS 18001', 'FSC', 'Fair Trade'],
          Math.floor(Math.random() * 3 + 1)
        ),
        status: faker.helpers.arrayElement(['active', 'active', 'active', 'pending']),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(db.collection('suppliers').doc(supplierId), supplierData);
      batchCount++;

      if (batchCount >= 500) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }
      results.suppliers++;
    }

    if (batchCount > 0) {
      await batch.commit();
      batch = db.batch();
      batchCount = 0;
    }

    console.log('✓ Created 10 suppliers');

    // STEP 2: Generate 50 Raw Materials
    const materialIds = [];
    const materialCategories = ['metals', 'plastics', 'textiles', 'chemicals', 'components'];

    for (let i = 0; i < 50; i++) {
      const materialId = db.collection('rawMaterials').doc().id;
      materialIds.push(materialId);

      const category = faker.helpers.arrayElement(materialCategories);
      const materialData = {
        id: materialId,
        sku: `RM-${faker.string.alphanumeric(6).toUpperCase()}`,
        name: faker.commerce.productName(),
        category: category,
        description: faker.commerce.productDescription(),
        supplierId: faker.helpers.arrayElement(supplierIds),
        unitPrice: parseFloat(faker.commerce.price({ min: 5, max: 500 })),
        unit: faker.helpers.arrayElement(['kg', 'lbs', 'meters', 'liters', 'units']),
        minimumOrder: Math.floor(Math.random() * 100 + 10),
        stockLevel: Math.floor(Math.random() * 1000),
        reorderPoint: Math.floor(Math.random() * 200 + 50),
        specifications: {
          weight: parseFloat((Math.random() * 100).toFixed(2)),
          dimensions: `${Math.floor(Math.random() * 100)}x${Math.floor(Math.random() * 100)}x${Math.floor(Math.random() * 100)} cm`,
          color: faker.color.human()
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(db.collection('rawMaterials').doc(materialId), materialData);
      batchCount++;

      if (batchCount >= 500) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }
      results.materials++;
    }

    if (batchCount > 0) {
      await batch.commit();
      batch = db.batch();
      batchCount = 0;
    }

    console.log('✓ Created 50 raw materials');

    // STEP 3: Generate 5 Recipes
    const recipeIds = [];

    for (let i = 0; i < 5; i++) {
      const recipeId = db.collection('recipes').doc().id;
      recipeIds.push(recipeId);

      // Each recipe uses 3-8 random materials
      const numIngredients = Math.floor(Math.random() * 6 + 3);
      const selectedMaterials = faker.helpers.arrayElements(materialIds, numIngredients);

      const ingredients = selectedMaterials.map(matId => ({
        materialId: matId,
        quantity: Math.floor(Math.random() * 50 + 1),
        unit: faker.helpers.arrayElement(['kg', 'lbs', 'units', 'liters'])
      }));

      const recipeData = {
        id: recipeId,
        name: `${faker.commerce.productAdjective()} ${faker.commerce.product()}`,
        sku: `RECIPE-${faker.string.alphanumeric(6).toUpperCase()}`,
        description: faker.commerce.productDescription(),
        ingredients: ingredients,
        steps: Array.from({ length: Math.floor(Math.random() * 5 + 3) }, (_, idx) => ({
          stepNumber: idx + 1,
          instruction: faker.lorem.sentence(),
          duration: Math.floor(Math.random() * 60 + 5) // 5-65 minutes
        })),
        yieldQuantity: Math.floor(Math.random() * 100 + 10),
        yieldUnit: faker.helpers.arrayElement(['units', 'kg', 'liters']),
        productionTime: Math.floor(Math.random() * 300 + 60), // 60-360 minutes
        qualityChecks: faker.helpers.arrayElements(
          ['Visual Inspection', 'Weight Check', 'Dimension Verification', 'Color Matching', 'Stress Test'],
          Math.floor(Math.random() * 3 + 2)
        ),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(db.collection('recipes').doc(recipeId), recipeData);
      batchCount++;

      if (batchCount >= 500) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }
      results.recipes++;
    }

    if (batchCount > 0) {
      await batch.commit();
      batch = db.batch();
      batchCount = 0;
    }

    console.log('✓ Created 5 recipes');

    // STEP 4: Generate 100 Orders
    const orderIds = [];
    const orderStatuses = ['pending', 'processing', 'in_production', 'quality_check', 'shipped', 'delivered', 'cancelled'];

    for (let i = 0; i < 100; i++) {
      const orderId = db.collection('orders').doc().id;
      orderIds.push(orderId);

      const orderDate = faker.date.past({ years: 1 });
      const status = faker.helpers.arrayElement(orderStatuses);

      // Random number of line items (1-5 recipes per order)
      const numLineItems = Math.floor(Math.random() * 5 + 1);
      const selectedRecipes = faker.helpers.arrayElements(recipeIds, numLineItems);

      const lineItems = selectedRecipes.map(recipeId => {
        const quantity = Math.floor(Math.random() * 100 + 1);
        const unitPrice = parseFloat(faker.commerce.price({ min: 50, max: 500 }));
        return {
          recipeId: recipeId,
          quantity: quantity,
          unitPrice: unitPrice,
          totalPrice: quantity * unitPrice
        };
      });

      const totalAmount = lineItems.reduce((sum, item) => sum + item.totalPrice, 0);

      const orderData = {
        id: orderId,
        orderNumber: `PO-${faker.string.alphanumeric(8).toUpperCase()}`,
        customerId: `CUST-${faker.string.alphanumeric(6).toUpperCase()}`,
        customerName: faker.company.name(),
        status: status,
        priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
        orderDate: admin.firestore.Timestamp.fromDate(orderDate),
        requestedDeliveryDate: admin.firestore.Timestamp.fromDate(
          new Date(orderDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000)
        ),
        lineItems: lineItems,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        shippingAddress: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country()
        },
        notes: Math.random() > 0.5 ? faker.lorem.sentence() : '',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(db.collection('orders').doc(orderId), orderData);
      batchCount++;

      if (batchCount >= 500) {
        await batch.commit();
        batch = db.batch();
        batchCount = 0;
      }
      results.orders++;
    }

    if (batchCount > 0) {
      await batch.commit();
      batch = db.batch();
      batchCount = 0;
    }

    console.log('✓ Created 100 orders');

    // STEP 5: Generate Traceability Events (2-5 events per order)
    for (const orderId of orderIds) {
      const numEvents = Math.floor(Math.random() * 4 + 2); // 2-5 events per order

      for (let i = 0; i < numEvents; i++) {
        const eventId = db.collection('traceabilityEvents').doc().id;

        const eventTypes = [
          'order_created',
          'materials_sourced',
          'production_started',
          'quality_check_passed',
          'packaging_completed',
          'shipment_dispatched',
          'delivery_confirmed'
        ];

        const eventData = {
          id: eventId,
          orderId: orderId,
          eventType: faker.helpers.arrayElement(eventTypes),
          timestamp: admin.firestore.Timestamp.fromDate(
            faker.date.recent({ days: 30 })
          ),
          location: {
            facility: faker.company.name(),
            city: faker.location.city(),
            coordinates: {
              lat: parseFloat(faker.location.latitude()),
              lng: parseFloat(faker.location.longitude())
            }
          },
          performedBy: faker.person.fullName(),
          details: faker.lorem.sentence(),
          metadata: {
            batchNumber: `BATCH-${faker.string.alphanumeric(8).toUpperCase()}`,
            temperature: Math.random() > 0.5 ? parseFloat((Math.random() * 30 + 10).toFixed(1)) : null,
            humidity: Math.random() > 0.5 ? parseFloat((Math.random() * 40 + 30).toFixed(1)) : null
          },
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        };

        batch.set(db.collection('traceabilityEvents').doc(eventId), eventData);
        batchCount++;

        if (batchCount >= 500) {
          await batch.commit();
          batch = db.batch();
          batchCount = 0;
        }
        results.events++;
      }
    }

    if (batchCount > 0) {
      await batch.commit();
    }

    console.log('✓ Created traceability events');
    console.log('Database seeding complete:', results);

    return {
      success: true,
      message: 'Database seeded successfully with realistic supply chain data',
      results: results
    };

  } catch (error) {
    console.error('Error seeding database:', error);
    throw new functions.https.HttpsError(
      'internal',
      `Failed to seed database: ${error.message}`
    );
  }
});

/**
 * clearDatabase Cloud Function (HTTPS Callable)
 *
 * Recursively deletes all documents from specified collections.
 * Uses batched deletes for efficiency.
 * Admin-only access with strong confirmation required.
 */
exports.clearDatabase = functions.https.onCall(async (data, context) => {
  // Authentication check
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to clear the database.'
    );
  }

  // Admin authorization check
  const adminStatus = await isAdmin(context.auth.uid);
  if (!adminStatus) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only administrators can clear the database.'
    );
  }

  // Require confirmation code
  const { confirmationCode } = data;
  if (confirmationCode !== 'DELETE_ALL_DATA') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Invalid confirmation code. You must provide the exact confirmation code to proceed.'
    );
  }

  console.log('Starting database clear by admin:', context.auth.uid);

  // Collections to clear
  const collectionsToDelete = [
    'suppliers',
    'rawMaterials',
    'recipes',
    'orders',
    'traceabilityEvents'
  ];

  try {
    const results = {};

    for (const collectionName of collectionsToDelete) {
      let deletedCount = 0;
      const collectionRef = db.collection(collectionName);

      // Delete in batches of 500 (Firestore limit)
      let hasMore = true;

      while (hasMore) {
        const snapshot = await collectionRef.limit(500).get();

        if (snapshot.empty) {
          hasMore = false;
          break;
        }

        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
          deletedCount++;
        });

        await batch.commit();
      }

      results[collectionName] = deletedCount;
      console.log(`✓ Deleted ${deletedCount} documents from ${collectionName}`);
    }

    console.log('Database clear complete:', results);

    return {
      success: true,
      message: 'Database cleared successfully',
      results: results
    };

  } catch (error) {
    console.error('Error clearing database:', error);
    throw new functions.https.HttpsError(
      'internal',
      `Failed to clear database: ${error.message}`
    );
  }
});

/**
 * setUserAdmin Cloud Function (HTTPS Callable)
 *
 * Allows an existing admin to grant admin privileges to another user.
 * Bootstrap: First admin must be set manually in Firestore.
 */
exports.setUserAdmin = functions.https.onCall(async (data, context) => {
  // Authentication check
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You must be logged in to set admin status.'
    );
  }

  // Admin authorization check
  const adminStatus = await isAdmin(context.auth.uid);
  if (!adminStatus) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only administrators can grant admin privileges.'
    );
  }

  const { targetUserId, isAdmin: makeAdmin } = data;

  if (!targetUserId) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Missing required parameter: targetUserId'
    );
  }

  try {
    await db.collection('users').doc(targetUserId).set(
      {
        role: makeAdmin ? 'admin' : 'user',
        isAdmin: makeAdmin,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedBy: context.auth.uid
      },
      { merge: true }
    );

    console.log(`User ${targetUserId} admin status set to ${makeAdmin} by ${context.auth.uid}`);

    return {
      success: true,
      message: `User ${makeAdmin ? 'granted' : 'revoked'} admin privileges`
    };

  } catch (error) {
    console.error('Error setting admin status:', error);
    throw new functions.https.HttpsError(
      'internal',
      `Failed to set admin status: ${error.message}`
    );
  }
});
