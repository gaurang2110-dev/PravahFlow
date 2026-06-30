import { ValidationError } from '../errors/ValidationError';

/**
 * Base architecture for mapping between Firebase DTOs and Domain Models.
 * Enforces strict typing and bidirectional conversion.
 *
 * @template TDomain The Domain Model type used within the application's business logic.
 * @template TDto The Data Transfer Object type representing the raw Firebase database structure.
 */
export abstract class BaseMapper<TDomain, TDto> {
  /**
   * Converts a Firebase DTO into a Domain Model.
   *
   * @param dto The raw DTO from Firebase.
   * @returns The corresponding Domain Model.
   * @throws {ValidationError} If the DTO fails validation checks.
   */
  public toDomain(dto: TDto): TDomain {
    const normalizedDto = this.normalize(dto);
    if (!this.validate(normalizedDto)) {
      throw new ValidationError('Failed to map DTO to Domain Model: Validation failed.');
    }
    return this.mapToDomain(normalizedDto);
  }

  /**
   * Converts a Domain Model into a Firebase DTO.
   *
   * @param domain The Domain Model.
   * @returns The corresponding Firebase DTO.
   */
  public toDto(domain: TDomain): TDto {
    return this.mapToDto(domain);
  }

  /**
   * Hook for normalizing the DTO before validation and mapping.
   * Useful for handling legacy database formats or minor schema changes.
   * Defaults to returning the DTO as-is.
   *
   * @param dto The raw DTO.
   * @returns The normalized DTO.
   */
  protected normalize(dto: TDto): TDto {
    return dto;
  }

  /**
   * Hook for validating the DTO before mapping to a Domain Model.
   * Must be implemented by specific mappers to ensure data integrity.
   *
   * @param dto The normalized DTO.
   * @returns True if valid, false otherwise.
   */
  protected abstract validate(dto: TDto): boolean;

  /**
   * The actual implementation to convert a normalized, validated DTO to a Domain Model.
   */
  protected abstract mapToDomain(dto: TDto): TDomain;

  /**
   * The actual implementation to convert a Domain Model to a DTO.
   */
  protected abstract mapToDto(domain: TDomain): TDto;
}
