export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  storageBucket: string;
  projectId: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  databaseURL?: string;
}

export const FIREBASE_CONFIG = 'FIREBASE_CONFIG';
