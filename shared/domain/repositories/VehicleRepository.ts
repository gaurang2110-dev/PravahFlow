import { RealtimeRepository } from '../interfaces/Repository';
import { Vehicle, VehicleTelemetry } from '../models/Vehicle';
import { VehicleLocation } from '../models/Location';

export interface VehicleRepository extends RealtimeRepository<Vehicle> {
  getByStatus(status: string): Promise<Vehicle[]>;
  updateLocation(id: string, location: VehicleLocation): Promise<void>;
  getLocation(id: string): Promise<VehicleLocation | null>;
  getTelemetry(id: string): Promise<VehicleTelemetry | null>;
}
