import { FirebaseError } from './FirebaseError';

export class RepositoryError extends FirebaseError {
  public readonly repositoryName: string;
  public readonly operation: string;

  constructor(message: string, repositoryName: string, operation: string, code: string = 'repository/operation-failed') {
    super(message, code, 'repository');
    this.name = 'RepositoryError';
    this.repositoryName = repositoryName;
    this.operation = operation;
  }
}
