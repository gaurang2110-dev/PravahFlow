import Config from 'react-native-config';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL?: string;
  measurementId?: string;
}

export const getFirebaseConfig = (): FirebaseConfig => {
  return {
    apiKey: Config.FIREBASE_API_KEY || '',
    authDomain: Config.FIREBASE_AUTH_DOMAIN || '',
    projectId: Config.FIREBASE_PROJECT_ID || '',
    storageBucket: Config.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: Config.FIREBASE_APP_ID || '',
    databaseURL: Config.FIREBASE_DATABASE_URL || '',
    measurementId: Config.FIREBASE_MEASUREMENT_ID || '',
  };
};
