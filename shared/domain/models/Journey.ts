import { TimestampedEntity } from '../interfaces/TimestampedEntity';
import { JourneyStatus } from '../enums';
import { Coordinate } from './Location';

export interface JourneyCheckpoint {
  id: string;
  name: string;
  coordinate: Coordinate;
  plannedArrivalTime?: number;
  actualArrivalTime?: number;
  plannedDepartureTime?: number;
  actualDepartureTime?: number;
  status: 'PENDING' | 'ARRIVED' | 'DEPARTED' | 'SKIPPED';
}

export interface Journey extends TimestampedEntity {
  vehicleId: string;
  driverId?: string;
  routeId?: string;
  status: JourneyStatus;
  startTime?: number;
  endTime?: number;
  checkpoints: JourneyCheckpoint[];
  metadata?: Record<string, string | number | boolean>;
}
