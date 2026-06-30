import { ThemeMode, MapProvider, Environment, SimulationMode } from '../enums';

export interface AppConfiguration {
  theme: ThemeMode;
  mapProvider: MapProvider;
  environment: Environment;
  features: Record<string, boolean>;
}

export interface SimulationConfiguration {
  mode: SimulationMode;
  updateIntervalMs: number;
  speedMultiplier: number;
  generateAnomalies: boolean;
}

export interface SystemStatus {
  isHealthy: boolean;
  version: string;
  uptime: number;
  activeConnections: number;
  lastDeployment?: number;
}
