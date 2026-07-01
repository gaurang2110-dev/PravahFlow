import firebase from '@react-native-firebase/app';
import { getFirebaseConfig } from './config';

class FirebaseManager {
  private static instance: FirebaseManager;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): FirebaseManager {
    if (!FirebaseManager.instance) {
      FirebaseManager.instance = new FirebaseManager();
    }
    return FirebaseManager.instance;
  }

  public initialize(): void {
    if (this.isInitialized) {
      return;
    }

    try {
      const config = getFirebaseConfig();

      // Basic validation to ensure critical config exists before initializing
      if (!config.apiKey || !config.projectId || !config.appId) {
        throw new Error('Missing critical Firebase configuration (apiKey, projectId, appId)');
      }

      if (firebase.apps.length === 0) {
        firebase.initializeApp(config);
      }
      this.isInitialized = true;
    } catch (error) {
      // Gracefully handle initialization failures to prevent application crashes
      // In a production environment, this would integrate with a separate crash reporting service
    }
  }

  public getApp() {
    if (!this.isInitialized) {
      this.initialize();
    }
    return firebase.app();
  }
}

export const firebaseManager = FirebaseManager.getInstance();
