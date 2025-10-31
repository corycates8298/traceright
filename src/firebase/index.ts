
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (!getApps().length) {
    let firebaseApp;
    try {
      firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
      if (process.env.NODE_ENV === "production") {
        console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
      }
      firebaseApp = initializeApp(firebaseConfig);
    }
    
    // Initialize App Check
    // if (typeof window !== 'undefined') {
    //     // FOR DEVELOPMENT ONLY: Use App Check debug token
    //     if (process.env.NODE_ENV === 'development') {
    //         (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    //     }

    //     try {
    //         const appCheck = initializeAppCheck(firebaseApp, {
    //             provider: new ReCaptchaV3Provider('6Ld-1vApAAAAAOFf3-S4T8c4j2h-M2L4xR-5S3vE'), // placeholder key
    //             isTokenAutoRefreshEnabled: true
    //         });
    //     } catch (error) {
    //         console.error("App Check initialization error:", error);
    //     }
    // }

    return getSdks(firebaseApp);
  }

  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  const analytics =
    typeof window !== 'undefined' ? getAnalytics(firebaseApp) : null;
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp),
    analytics,
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './errors';
export * from './error-emitter';
