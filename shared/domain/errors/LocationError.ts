import { DomainError } from './DomainError';

export class LocationError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'LOCATION_ERROR', details);
  }
}
