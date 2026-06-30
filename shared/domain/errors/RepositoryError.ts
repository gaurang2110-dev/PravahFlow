import { DomainError } from './DomainError';

export class RepositoryError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'REPOSITORY_ERROR', details);
  }
}

export class NotFoundError extends RepositoryError {
  constructor(entityName: string, id: string) {
    super(`${entityName} with id ${id} not found`, { entityName, id });
  }
}
