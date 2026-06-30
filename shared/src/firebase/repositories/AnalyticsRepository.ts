export interface IAnalyticsRepository {
  /**
   * Logs an analytical event.
   */
  logEvent<T>(eventName: string, params: T): Promise<void>;

  /**
   * Retrieves aggregated analytics for a given time period.
   */
  getAggregatedStats<T>(fleetId: string, periodStart: number, periodEnd: number): Promise<T>;
}
