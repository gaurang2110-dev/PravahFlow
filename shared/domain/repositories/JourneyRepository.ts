import { RealtimeRepository } from '../interfaces/Repository';
import { Journey } from '../models/Journey';

export interface JourneyRepository extends RealtimeRepository<Journey> {
  getActiveJourneys(vehicleId?: string): Promise<Journey[]>;
  updateJourneyStatus(id: string, status: string): Promise<void>;

  // Explicitly requested contracts
  getJourney(id: string): Promise<Journey | null>;
}
