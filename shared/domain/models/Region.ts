import { TimestampedEntity } from '../interfaces/TimestampedEntity';
import { Coordinate } from './Location';

export interface State extends TimestampedEntity {
  name: string;
  code: string;
  countryCode: string;
}

export interface City extends TimestampedEntity {
  name: string;
  stateId: string;
}

export interface Region extends TimestampedEntity {
  name: string;
  description?: string;
  boundaries: Coordinate[]; // Polygon
}

export interface Geofence extends TimestampedEntity {
  name: string;
  center: Coordinate;
  radius: number; // In meters
  isActive: boolean;
  type: 'INCLUSION' | 'EXCLUSION';
}

export interface MapRegion {
  center: Coordinate;
  latitudeDelta: number;
  longitudeDelta: number;
}
