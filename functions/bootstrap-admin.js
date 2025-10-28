// functions/bootstrap-admin.js
// One-time script to bootstrap the first admin user

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Note: In production, this will use Application Default Credentials
// For local use, set GOOGLE_APPLICATION_CREDENTIALS environment variable
admin.initializeApp();

const db = admin.firestore();

/**
 * Bootstrap the first admin user
 * This must be run manually once to create the initial admin
 */
async function bootstrapAdmin() {
  const adminUserId = 'hWg5L0Cin3duMKe04jYbrY7Lyik1';
  const adminEmail = 'director@truverasolutions.info';

  try {
    console.log('Bootstrapping admin user...');
    console.log('User ID:', adminUserId);
    console.log('Email:', adminEmail);

    await db.collection('users').doc(adminUserId).set({
      email: adminEmail,
      role: 'admin',
      isAdmin: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      bootstrapped: true
    });

    console.log('✅ Admin user bootstrapped successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Sign in with this user account');
    console.log('2. You can now use the seedDatabase function');
    console.log('3. You can grant admin privileges to other users with setUserAdmin');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error bootstrapping admin:', error);
    process.exit(1);
  }
}

bootstrapAdmin();
