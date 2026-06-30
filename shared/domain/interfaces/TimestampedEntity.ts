import { BaseEntity } from './BaseEntity';

export interface TimestampedEntity extends BaseEntity {
  createdAt: number;
  updatedAt: number;
}
