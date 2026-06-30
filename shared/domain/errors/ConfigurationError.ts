import { DomainError } from './DomainError';

export class ConfigurationError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'CONFIGURATION_ERROR', details);
  }
}
