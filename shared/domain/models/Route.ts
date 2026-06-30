import { TimestampedEntity } from '../interfaces/TimestampedEntity';
import { Coordinate } from './Location';

export interface RouteWaypoint {
  coordinate: Coordinate;
  order: number;
}

export interface Route extends TimestampedEntity {
  name: string;
  description?: string;
  waypoints: RouteWaypoint[];
  totalDistance?: number; // In meters
  estimatedDuration?: number; // In seconds
}
