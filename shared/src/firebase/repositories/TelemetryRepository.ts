export interface ITelemetryRepository {
  /**
   * Records a telemetry event for a vehicle.
   */
  recordEvent<T>(vehicleId: string, event: T): Promise<void>;

  /**
   * Retrieves historical telemetry events for a vehicle.
   */
  getHistory<T>(vehicleId: string, startTime: number, endTime: number): Promise<T[]>;
}
