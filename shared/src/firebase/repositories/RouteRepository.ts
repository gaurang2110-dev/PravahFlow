export interface IRouteRepository {
  /**
   * Retrieves a route by its ID.
   */
  getRouteById<T>(routeId: string): Promise<T | null>;

  /**
   * Retrieves all active routes for a fleet.
   */
  getActiveRoutes<T>(fleetId: string): Promise<T[]>;

  /**
   * Creates a new route.
   */
  createRoute<T>(route: T): Promise<string>;

  /**
   * Updates an existing route.
   */
  updateRoute<T>(routeId: string, route: Partial<T>): Promise<void>;
}
