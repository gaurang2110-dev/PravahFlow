import { VehicleType, VehicleStatus } from '../enums';

export interface CreateVehicleDTO {
  licensePlate: string;
  type: VehicleType;
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
}

export interface UpdateVehicleDTO {
  type?: VehicleType;
  make?: string;
  model?: string;
  status?: VehicleStatus;
}
