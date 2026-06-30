import { SimulationConfiguration } from '../models/Configuration';

export interface SimulatorRepository {
  getConfig(): Promise<SimulationConfiguration>;
  updateConfig(config: Partial<SimulationConfiguration>): Promise<SimulationConfiguration>;
  startSimulation(scenarioId?: string): Promise<void>;
  stopSimulation(): Promise<void>;
  pauseSimulation(): Promise<void>;
  resumeSimulation(): Promise<void>;
}
