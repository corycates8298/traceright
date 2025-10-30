// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {
  admin.initializeApp();
} catch (e) {
  // This can happen if the app is already initialized, which is fine.
}


const visionAnalysis = require('./vision-analysis');
// Data management functions are now handled by Genkit flows
// const dataManagement = require('./data-management');

// Export Vision Analysis Functions
exports.analyzeImage = visionAnalysis.analyzeImage;
exports.quickBarcodeScan = visionAnalysis.quickBarcodeScan;
exports.batchAnalyzeImages = visionAnalysis.batchAnalyzeImages;

// Export Data Management Functions (now deprecated, kept for reference if needed)
// exports.seedDatabase = dataManagement.seedDatabase;
// exports.clearDatabase = dataManagement.clearDatabase;
// exports.setUserAdmin = dataManagement.setUserAdmin;

/**
 * Sets custom claims for a user to grant them a specific role.
 * This function is callable by an existing admin.
 */
exports.setUserRole = functions.https.onCall(async (data, context) => {
  // 1. Verify the caller is an admin.
  if (context.auth.token.admin !== true) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Must be an administrative user to set custom claims.'
    );
  }

  const { email, role } = data;

  if (!email || !role) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with "email" and "role" arguments.'
    );
  }

  try {
    // 2. Get the user record by email.
    const user = await admin.auth().getUserByEmail(email);

    // 3. Set the custom claim.
    await admin.auth().setCustomUserClaims(user.uid, { role: role });

    // 4. Update the user's document in Firestore for consistency (optional but good practice)
    const userDocRef = admin.firestore().collection('users').doc(user.uid);
    await userDocRef.set({ role: role }, { merge: true });

    return {
      message: `Success! ${email} has been made a(n) ${role}.`,
    };
  } catch (error) {
    console.error('Error setting user role:', error);
    if (error.code === 'auth/user-not-found') {
      throw new functions.https.HttpsError('not-found', `User with email ${email} not found.`);
    }
    throw new functions.https.HttpsError('internal', 'An internal error occurred.');
  }
});
