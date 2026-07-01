export interface ISimulatorDataSource<T> {
  startSimulation(scenarioId: string): Promise<void>;
  stopSimulation(): Promise<void>;
  getSimulatedData(): Promise<T[]>;
}
