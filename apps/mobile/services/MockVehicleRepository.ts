import { VehicleRepository } from '../../../shared/domain/repositories/VehicleRepository';
import { Vehicle, VehicleTelemetry } from '../../../shared/domain/models/Vehicle';
import { VehicleLocation } from '../../../shared/domain/models/Location';
import { VehicleStatus, VehicleType, MovementState } from '../../../shared/domain/enums';

export class MockVehicleRepository implements VehicleRepository {
  private vehicles: Vehicle[] = [
    {
      id: 'v1',
      licensePlate: 'ABC-123',
      type: VehicleType.TRUCK,
      status: VehicleStatus.ACTIVE,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 'v2',
      licensePlate: 'XYZ-987',
      type: VehicleType.VAN,
      status: VehicleStatus.ACTIVE,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  ];

  private locations: Record<string, VehicleLocation> = {
    'v1': {
      id: 'l1',
      vehicleId: 'v1',
      coordinate: { latitude: 28.6139, longitude: 77.2090 }, // New Delhi
      heading: 90,
      speed: 15,
      movementState: MovementState.MOVING,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    'v2': {
      id: 'l2',
      vehicleId: 'v2',
      coordinate: { latitude: 19.0760, longitude: 72.8777 }, // Mumbai
      heading: 0,
      speed: 0,
      movementState: MovementState.IDLE,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  };

  async getByStatus(status: string): Promise<Vehicle[]> {
    return this.vehicles.filter(v => v.status === status);
  }

  async getLocation(id: string): Promise<VehicleLocation | null> {
    return this.locations[id] || null;
  }

  async updateLocation(id: string, location: VehicleLocation): Promise<void> {
    this.locations[id] = location;
  }

  async getTelemetry(id: string): Promise<VehicleTelemetry | null> {
    return null;
  }

  subscribe(callback: (items: Vehicle[]) => void): () => void {
    return () => {};
  }

  subscribeToId(id: string, callback: (item: Vehicle | null) => void): () => void {
    return () => {};
  }

  async getById(id: string): Promise<Vehicle | null> {
    return this.vehicles.find(v => v.id === id) || null;
  }

  async getAll(): Promise<Vehicle[]> {
    return this.vehicles;
  }

  async create(entity: Vehicle): Promise<Vehicle> {
    return entity;
  }

  async update(id: string, entity: Partial<Vehicle>): Promise<Vehicle> {
    return entity as Vehicle;
  }

  async delete(id: string): Promise<void> {}
}
