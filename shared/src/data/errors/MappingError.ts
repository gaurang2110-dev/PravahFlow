import { DomainError } from '../../../domain/errors/DomainError';

export class MappingError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'MAPPING_ERROR', details);
  }
}
