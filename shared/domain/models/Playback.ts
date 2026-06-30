import { TimestampedEntity } from '../interfaces/TimestampedEntity';
import { VehicleLocation } from './Location';

export interface PlaybackFrame {
  timestamp: number;
  location: VehicleLocation;
}

export interface PlaybackSession extends TimestampedEntity {
  vehicleId: string;
  startTime: number;
  endTime: number;
  frames: PlaybackFrame[];
}
