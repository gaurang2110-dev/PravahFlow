import { TimestampedEntity } from '../interfaces/TimestampedEntity';
import { TripStatus } from '../enums';

export interface Trip extends TimestampedEntity {
  vehicleId: string;
  journeyId?: string;
  status: TripStatus;
  startLocationId?: string;
  endLocationId?: string;
  startTime?: number;
  endTime?: number;
  distanceCovered?: number; // In meters
}

export interface Driver extends TimestampedEntity {
  firstName: string;
  lastName: string;
  licenseNumber: string;
  phoneNumber?: string;
  isActive: boolean;
}
