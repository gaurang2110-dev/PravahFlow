import { DomainError } from './DomainError';
export declare class RepositoryError extends DomainError {
    constructor(message: string, details?: Record<string, unknown>);
}
export declare class NotFoundError extends RepositoryError {
    constructor(entityName: string, id: string);
}
