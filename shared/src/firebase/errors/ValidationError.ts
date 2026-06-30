import { FirebaseError } from './FirebaseError';

export class ValidationError extends FirebaseError {
  public readonly field?: string;

  constructor(message: string, field?: string, code: string = 'validation/invalid-data') {
    super(message, code, 'mappers');
    this.name = 'ValidationError';
    this.field = field;
  }
}
