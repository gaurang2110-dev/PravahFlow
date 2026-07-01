import { RepositoryError, NotFoundError } from '../../../domain/errors/RepositoryError';
import { ICacheProvider } from '../cache/ICacheProvider';
import { IMapper } from '../mappers/IMapper';

export abstract class BaseRepository<DomainEntity, DTO> {
  protected constructor(
    protected mapper: IMapper<DomainEntity, DTO>,
    protected cache?: ICacheProvider,
    protected collectionName?: string
  ) {}

  protected async handleError(operation: string, error: unknown): Promise<never> {
    if (error instanceof RepositoryError) {
      throw error;
    }

    throw new RepositoryError(`Error during ${operation} in ${this.constructor.name}`, {
      originalError: error instanceof Error ? error.message : String(error)
    });
  }
}
