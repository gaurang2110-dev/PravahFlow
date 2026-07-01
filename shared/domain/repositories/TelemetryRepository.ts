import { RealtimeRepository } from '../interfaces/Repository';
import { VehicleTelemetry } from '../models/Vehicle';

export interface TelemetryRepository extends RealtimeRepository<VehicleTelemetry> {
  // Explicitly requested contracts
  getTelemetry(vehicleId: string): Promise<VehicleTelemetry | null>;
}
