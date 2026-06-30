import { Coordinate } from '../models/Location';

export interface LocationProvider {
  getCurrentLocation(): Promise<Coordinate>;
  subscribeToLocationUpdates(callback: (location: Coordinate) => void): () => void;
}
