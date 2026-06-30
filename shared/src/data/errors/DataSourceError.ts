import { DomainError } from '../../../domain/errors/DomainError';

export class DataSourceError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'DATA_SOURCE_ERROR', details);
  }
}
