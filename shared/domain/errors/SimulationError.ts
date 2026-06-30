import { DomainError } from './DomainError';

export class SimulationError extends DomainError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'SIMULATION_ERROR', details);
  }
}
