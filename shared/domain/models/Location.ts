import { TimestampedEntity } from '../interfaces/TimestampedEntity';
import { MovementState } from '../enums';

export interface Coordinate {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface VehicleLocation extends TimestampedEntity {
  vehicleId: string;
  coordinate: Coordinate;
  heading: number; // 0-359 degrees
  speed: number; // In meters per second
  accuracy?: number; // In meters
  movementState: MovementState;
}
