import { Vehicle } from '../models/Vehicle';
import { VehicleType, VehicleStatus } from '../enums';

export const isValidVehicle = (vehicle: Partial<Vehicle>): boolean => {
  if (!vehicle) return false;

  if (!vehicle.licensePlate || typeof vehicle.licensePlate !== 'string' || vehicle.licensePlate.trim() === '') {
    return false;
  }

  if (!vehicle.type || !Object.values(VehicleType).includes(vehicle.type as VehicleType)) {
    return false;
  }

  if (!vehicle.status || !Object.values(VehicleStatus).includes(vehicle.status as VehicleStatus)) {
    return false;
  }

  return true;
};
