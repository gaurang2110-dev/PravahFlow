import { TimestampedEntity } from '../interfaces/TimestampedEntity';
import { VehicleStatus, VehicleType, EngineStatus } from '../enums';

export interface Vehicle extends TimestampedEntity {
  licensePlate: string;
  type: VehicleType;
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  status: VehicleStatus;
  deviceId?: string;
  driverId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface VehicleTelemetry extends TimestampedEntity {
  vehicleId: string;
  engineStatus: EngineStatus;
  fuelLevel?: number; // Percentage 0-100
  odometer?: number; // In meters
  batteryVoltage?: number;
  engineTemperature?: number;
}
