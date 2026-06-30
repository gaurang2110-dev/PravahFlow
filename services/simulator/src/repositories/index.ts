import { AppConfig } from '../config';

// These are placeholder domain entities until implementation phase
export interface Vehicle { id: string; }
export interface Route { id: string; }
export interface Telemetry { id: string; }
export interface SimulationState { id: string; }

export interface VehicleRepository {
  findById(id: string): Promise<Vehicle | null>;
  findAll(): Promise<Vehicle[]>;
  save(vehicle: Vehicle): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface RouteRepository {
  findById(id: string): Promise<Route | null>;
  findAll(): Promise<Route[]>;
  save(route: Route): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface ConfigurationRepository {
  getConfig(): Promise<AppConfig>;
  saveConfig(config: AppConfig): Promise<void>;
}

export interface TelemetryRepository {
  save(telemetry: Telemetry): Promise<void>;
  findByVehicleId(vehicleId: string): Promise<Telemetry[]>;
}

export interface SimulationRepository {
  getState(): Promise<SimulationState>;
  saveState(state: SimulationState): Promise<void>;
}
