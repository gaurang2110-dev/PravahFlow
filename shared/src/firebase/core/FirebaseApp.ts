import { FirebaseConfig } from '../environment/config';
import { ConnectionError } from '../errors/ConnectionError';
import { FirebaseError } from '../errors/FirebaseError';

/**
 * Interface representing a core Firebase application instance.
 * Abstracted to support potential underlying implementations (web vs react-native).
 */
export interface IFirebaseApp {
  readonly name: string;
  readonly options: FirebaseConfig;
}

/**
 * Interface representing the modules that can be initialized.
 */
export interface FirebaseModules {
  database?: unknown; // To be typed strictly in future when RTDB is implemented
  firestore?: unknown; // To be typed strictly in future when Firestore is implemented
  auth?: unknown; // To be typed strictly in future when Auth is implemented
  storage?: unknown; // To be typed strictly in future when Storage is implemented
}

/**
 * Core initialization architecture for Firebase.
 * Provides a scalable way to initialize modules.
 */
export class FirebaseCore {
  private static instance: FirebaseCore | null = null;
  private app: IFirebaseApp | null = null;
  private isInitialized: boolean = false;
  private modules: FirebaseModules = {};

  private constructor() {}

  public static getInstance(): FirebaseCore {
    if (!FirebaseCore.instance) {
      FirebaseCore.instance = new FirebaseCore();
    }
    return FirebaseCore.instance;
  }

  /**
   * Initializes the Firebase application.
   *
   * @param config Firebase configuration
   * @param appInstance The underlying Firebase app instance (e.g. from firebase/app or @react-native-firebase/app)
   */
  public initialize(config: FirebaseConfig, appInstance: IFirebaseApp): void {
    if (this.isInitialized) {
      return;
    }

    try {
      this.app = appInstance;
      this.isInitialized = true;
    } catch (error) {
      throw new ConnectionError(
        `Failed to initialize Firebase: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  public getApp(): IFirebaseApp {
    this.ensureInitialized();
    return this.app!;
  }

  public registerModule(name: keyof FirebaseModules, moduleInstance: unknown): void {
    this.ensureInitialized();
    this.modules[name] = moduleInstance;
  }

  public getModule<K extends keyof FirebaseModules>(name: K): FirebaseModules[K] {
    this.ensureInitialized();
    const module = this.modules[name];
    if (!module) {
      throw new FirebaseError(`Module ${name} has not been registered.`, 'core/module-not-found');
    }
    return module;
  }

  private ensureInitialized(): void {
    if (!this.isInitialized || !this.app) {
      throw new FirebaseError('Firebase core has not been initialized. Call initialize() first.', 'core/not-initialized');
    }
  }
}
