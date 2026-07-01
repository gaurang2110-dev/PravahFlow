export interface IMapper<DomainEntity, DTO> {
  toDomain(dto: DTO): DomainEntity;
  toDTO(domain: DomainEntity): DTO;
}
