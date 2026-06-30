export class SimulatorBaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class SimulationError extends SimulatorBaseError {
  constructor(message: string) {
    super(message);
  }
}

export class ConfigurationError extends SimulatorBaseError {
  constructor(message: string) {
    super(message);
  }
}

export class EngineError extends SimulatorBaseError {
  constructor(message: string) {
    super(message);
  }
}

export class SchedulerError extends SimulatorBaseError {
  constructor(message: string) {
    super(message);
  }
}

export class RouteError extends SimulatorBaseError {
  constructor(message: string) {
    super(message);
  }
}
