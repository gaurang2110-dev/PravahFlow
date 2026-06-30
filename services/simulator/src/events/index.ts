export enum EventType {
  VehicleCreated = 'VehicleCreated',
  VehicleStarted = 'VehicleStarted',
  VehicleStopped = 'VehicleStopped',
  VehiclePaused = 'VehiclePaused',
  VehicleResumed = 'VehicleResumed',
  RouteAssigned = 'RouteAssigned',
  SpeedChanged = 'SpeedChanged',
  SimulationStarted = 'SimulationStarted',
  SimulationStopped = 'SimulationStopped',
  ConfigurationUpdated = 'ConfigurationUpdated',
}

export interface SimulatorEvent<T = unknown> {
  id: string;
  type: EventType;
  timestamp: number;
  payload: T;
}

export interface EventBus {
  publish<T>(event: SimulatorEvent<T>): Promise<void>;
  subscribe<T>(type: EventType, handler: (event: SimulatorEvent<T>) => void | Promise<void>): void;
  unsubscribe<T>(type: EventType, handler: (event: SimulatorEvent<T>) => void | Promise<void>): void;
}
