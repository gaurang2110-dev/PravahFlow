export interface IJourneyRepository {
  /**
   * Retrieves a journey by its ID.
   */
  getJourneyById<T>(journeyId: string): Promise<T | null>;

  /**
   * Retrieves all journeys for a specific vehicle.
   */
  getVehicleJourneys<T>(vehicleId: string): Promise<T[]>;

  /**
   * Starts a new journey for a vehicle.
   */
  startJourney<T>(journey: T): Promise<string>;

  /**
   * Completes an active journey.
   */
  completeJourney(journeyId: string): Promise<void>;
}
