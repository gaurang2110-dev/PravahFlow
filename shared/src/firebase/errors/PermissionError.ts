import { FirebaseError } from './FirebaseError';

export class PermissionError extends FirebaseError {
  constructor(message: string = 'Insufficient permissions to perform this operation', code: string = 'permission-denied') {
    super(message, code, 'security');
    this.name = 'PermissionError';
  }
}
