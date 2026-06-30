export type Environment = 'development' | 'staging' | 'production';

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

export interface AppConfig {
  environment: Environment;
  firebase: FirebaseConfig;
  features: {
    enableAnalytics: boolean;
    enableCrashlytics: boolean;
    useEmulator: boolean;
  };
}

/**
 * Strategy for providing environment configuration without hardcoding secrets.
 *
 * Implementations of this interface should load variables securely based on
 * the target platform (e.g. react-native-dotenv for mobile, import.meta.env for web).
 */
export interface ConfigProvider {
  getConfig(): AppConfig;
}
