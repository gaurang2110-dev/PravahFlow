import { FirebaseError } from './FirebaseError';

export class ConnectionError extends FirebaseError {
  constructor(message: string = 'Failed to connect to Firebase services', code: string = 'network/connection-failed') {
    super(message, code, 'database');
    this.name = 'ConnectionError';
  }
}
