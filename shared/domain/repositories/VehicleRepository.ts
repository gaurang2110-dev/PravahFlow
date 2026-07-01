import { RealtimeRepository } from '../interfaces/Repository';
import { Vehicle, VehicleTelemetry } from '../models/Vehicle';
import { VehicleLocation } from '../models/Location';

export interface VehicleRepository extends RealtimeRepository<Vehicle> {
  getByStatus(status: string): Promise<Vehicle[]>;
  updateLocation(id: string, location: VehicleLocation): Promise<void>;
  getLocation(id: string): Promise<VehicleLocation | null>;
  getTelemetry(id: string): Promise<VehicleTelemetry | null>;

  // Explicitly requested contracts
  subscribeToVehicles(callback: (vehicles: Vehicle[]) => void): () => void;
  unsubscribe(subscriptionId: string): void;
  getVehicle(id: string): Promise<Vehicle | null>;
  getVehicles(): Promise<Vehicle[]>;
}
