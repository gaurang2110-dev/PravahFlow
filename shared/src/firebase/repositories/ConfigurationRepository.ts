export interface IConfigurationRepository {
  /**
   * Retrieves system configuration settings.
   */
  getSystemConfig<T>(): Promise<T | null>;

  /**
   * Retrieves fleet-specific configuration.
   */
  getFleetConfig<T>(fleetId: string): Promise<T | null>;

  /**
   * Updates fleet configuration.
   */
  updateFleetConfig<T>(fleetId: string, config: Partial<T>): Promise<void>;
}
