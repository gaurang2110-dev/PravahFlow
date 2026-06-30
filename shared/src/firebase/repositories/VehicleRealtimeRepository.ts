import { Subscription, SubscriptionOptions } from '../database/RealtimeClient';

// Note: Domain models will be strictly typed in future implementation phases
// Using generic placeholders for architecture design.

export interface IVehicleRealtimeRepository {
  /**
   * Subscribes to real-time updates for a specific vehicle.
   */
  observeVehicle<T>(vehicleId: string, onUpdate: (data: T | null) => void): Subscription;

  /**
   * Subscribes to real-time updates for all vehicles in a specific fleet/organization.
   */
  observeFleetVehicles<T>(fleetId: string, onUpdate: (data: T[]) => void, options?: SubscriptionOptions): Subscription;

  /**
   * Updates a vehicle's real-time position.
   */
  updateLocation<TLocation>(vehicleId: string, location: TLocation): Promise<void>;

  /**
   * Updates a vehicle's real-time status.
   */
  updateStatus<TStatus>(vehicleId: string, status: TStatus): Promise<void>;
}
