import { AppConfig } from '../config';
import { Vehicle, Route, SimulationState } from '../repositories';

// Define Location type locally since it's an architecture placeholder
export interface Location {
  latitude: number;
  longitude: number;
}

export interface SimulationEngine {
  start(): Promise<void>;
  stop(): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
}

export interface MovementEngine {
  calculateNextPositions(vehicles: Vehicle[], deltaTimeMs: number): Promise<Vehicle[]>;
}

export interface VehicleManager {
  addVehicle(vehicle: Vehicle): Promise<void>;
  removeVehicle(id: string): Promise<void>;
  getVehicles(): Promise<Vehicle[]>;
  updateVehicle(vehicle: Vehicle): Promise<void>;
}

export interface RouteManager {
  assignRoute(vehicleId: string, routeId: string): Promise<void>;
  getRoute(routeId: string): Promise<Route | null>;
  calculatePath(start: Location, end: Location): Promise<Route>;
}

export interface ConfigurationManagerEngine {
  // Aliased to prevent conflict with config/index.ts ConfigurationManager if needed,
  // or it could just re-export it. For architecture, we'll keep it distinct.
  applyConfiguration(config: AppConfig): Promise<void>;
}

export interface WorkerPool {
  executeTask<T, R>(task: string, data: T): Promise<R>;
  scale(workers: number): Promise<void>;
  terminate(): Promise<void>;
}

export interface StateManager {
  getState(): Promise<SimulationState>;
  saveState(state: SimulationState): Promise<void>;
  applyDelta(delta: Partial<SimulationState>): Promise<void>;
}
