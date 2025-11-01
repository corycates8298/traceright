const admin = require('firebase-admin');

// Initialize with your service account
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Your user ID
const userId = 'hWg5L0Cin3duMKe04jYbrY7Lyik1';

// Set admin role
db.collection('users').doc(userId).set({
  role: 'admin',
  email: 'director@truverasolutions.info',
  createdAt: admin.firestore.FieldValue.serverTimestamp(),
}, { merge: true })
  .then(() => {
    console.log('✅ You are now an admin!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
