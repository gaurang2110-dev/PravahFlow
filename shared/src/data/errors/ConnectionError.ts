import { DomainError } from '../../../domain/errors/DomainError';

export class ConnectionError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'CONNECTION_ERROR', details);
  }
}
