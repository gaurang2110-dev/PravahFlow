import { IMapper } from './IMapper';
import { MappingError } from '../errors/MappingError';

export abstract class BaseMapper<DomainEntity, DTO> implements IMapper<DomainEntity, DTO> {
  abstract toDomain(dto: DTO): DomainEntity;
  abstract toDTO(domain: DomainEntity): DTO;

  toDomainArray(dtos: DTO[]): DomainEntity[] {
    try {
      return dtos.map((dto) => this.toDomain(dto));
    } catch (error) {
      throw new MappingError('Failed to map array of DTOs to Domain entities', { originalError: error });
    }
  }

  toDTOArray(domains: DomainEntity[]): DTO[] {
    try {
      return domains.map((domain) => this.toDTO(domain));
    } catch (error) {
      throw new MappingError('Failed to map array of Domain entities to DTOs', { originalError: error });
    }
  }
}
