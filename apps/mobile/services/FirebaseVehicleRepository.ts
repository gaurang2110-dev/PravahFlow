import { VehicleRepository } from '../../../shared/domain/repositories/VehicleRepository';
import { Vehicle, VehicleTelemetry } from '../../../shared/domain/models/Vehicle';
import { VehicleLocation } from '../../../shared/domain/models/Location';
import { getRealtimeDatabase } from '../core/firebase/RealtimeDatabase';
import { logger } from '../core/logger/ProjectLogger';

function isValidVehicle(data: any): data is Vehicle {
  return data && typeof data.id === 'string' && typeof data.licensePlate === 'string' && typeof data.status === 'string';
}

function isValidLocation(data: any): data is VehicleLocation {
  return data && typeof data.vehicleId === 'string' && data.coordinate && typeof data.coordinate.latitude === 'number';
}

export class FirebaseVehicleRepository implements VehicleRepository {
  public subscribeToVehicleUpdates(
    onInit: (vehicles: Vehicle[]) => void,
    onAdd: (vehicle: Vehicle) => void,
    onChange: (vehicle: Vehicle) => void,
    onRemove: (vehicleId: string) => void,
    onError: (error: Error) => void
  ): () => void {
    const db = getRealtimeDatabase();
    const ref = db.ref('/vehicles');

    let initialLoad = true;
    let initialVehicles: Vehicle[] = [];

    const handleInitialLoad = (snapshot: any) => {
      snapshot.forEach((child: any) => {
        const val = child.val();
        if (isValidVehicle(val)) {
          initialVehicles.push(val);
        }
        return undefined;
      });
      onInit(initialVehicles);
      initialLoad = false;
    };

    // Use once to get initial state to allow batching
    ref.once('value', handleInitialLoad, (error) => {
      logger.error('Failed to load initial vehicles', error);
      onError(error);
    }).then(() => {
      // Setup listeners after initial fetch
    });

    const errorCallback = (error: Error) => {
      logger.error('Vehicle sync error', error);
      onError(error);
    };

    const addListener = ref.on('child_added', (snapshot) => {
      if (initialLoad) return; // Skip if handled by initial once()
      const val = snapshot.val();
      if (isValidVehicle(val)) onAdd(val);
    }, errorCallback);

    const changeListener = ref.on('child_changed', (snapshot) => {
      const val = snapshot.val();
      if (isValidVehicle(val)) onChange(val);
    }, errorCallback);

    const removeListener = ref.on('child_removed', (snapshot) => {
      const val = snapshot.val();
      if (val && typeof val.id === 'string') onRemove(val.id);
    }, errorCallback);

    return () => {
      ref.off('child_added', addListener);
      ref.off('child_changed', changeListener);
      ref.off('child_removed', removeListener);
    };
  }

  public subscribeToLocationUpdates(
    onInit: (locations: VehicleLocation[]) => void,
    onAdd: (location: VehicleLocation) => void,
    onChange: (location: VehicleLocation) => void,
    onRemove: (locationId: string) => void,
    onError: (error: Error) => void
  ): () => void {
    const db = getRealtimeDatabase();
    const ref = db.ref('/locations');

    let initialLoad = true;
    let initialLocations: VehicleLocation[] = [];

    const handleInitialLoad = (snapshot: any) => {
      snapshot.forEach((child: any) => {
        const val = child.val();
        if (isValidLocation(val)) {
          initialLocations.push(val);
        }
        return undefined;
      });
      onInit(initialLocations);
      initialLoad = false;
    };

    ref.once('value', handleInitialLoad, (error) => {
      logger.error('Failed to load initial locations', error);
      onError(error);
    });

    const errorCallback = (error: Error) => {
      logger.error('Location sync error', error);
      onError(error);
    };

    const addListener = ref.on('child_added', (snapshot) => {
      if (initialLoad) return;
      const val = snapshot.val();
      if (isValidLocation(val)) onAdd(val);
    }, errorCallback);

    const changeListener = ref.on('child_changed', (snapshot) => {
      const val = snapshot.val();
      if (isValidLocation(val)) onChange(val);
    }, errorCallback);

    const removeListener = ref.on('child_removed', (snapshot) => {
      const val = snapshot.val();
      if (val && typeof val.vehicleId === 'string') onRemove(val.vehicleId);
    }, errorCallback);

    return () => {
      ref.off('child_added', addListener);
      ref.off('child_changed', changeListener);
      ref.off('child_removed', removeListener);
    };
  }

  public subscribeToConnectionStatus(
    onStatusChange: (status: 'Connecting' | 'Connected' | 'Disconnected' | 'Reconnecting') => void
  ): () => void {
    const db = getRealtimeDatabase();
    const ref = db.ref('.info/connected');

    let initial = true;

    const listener = ref.on('value', (snapshot) => {
      const connected = snapshot.val();
      if (connected === true) {
        onStatusChange('Connected');
        initial = false;
      } else {
        if (!initial) {
          onStatusChange('Disconnected'); // Using Disconnected for offline state
        } else {
          onStatusChange('Connecting');
        }
      }
    });

    return () => ref.off('value', listener);
  }

  // --- Implement base VehicleRepository ---
  async getByStatus(status: string): Promise<Vehicle[]> {
    const db = getRealtimeDatabase();
    const snapshot = await db.ref('/vehicles').orderByChild('status').equalTo(status).once('value');
    const vehicles: Vehicle[] = [];
    snapshot.forEach((child) => {
      const val = child.val();
      if (isValidVehicle(val)) vehicles.push(val);
      return undefined;
    });
    return vehicles;
  }

  async updateLocation(id: string, location: VehicleLocation): Promise<void> {
    const db = getRealtimeDatabase();
    await db.ref(`/locations/${id}`).set(location);
  }

  async getLocation(id: string): Promise<VehicleLocation | null> {
    const db = getRealtimeDatabase();
    const snapshot = await db.ref(`/locations/${id}`).once('value');
    const val = snapshot.val();
    return isValidLocation(val) ? val : null;
  }

  async getTelemetry(id: string): Promise<VehicleTelemetry | null> {
    const db = getRealtimeDatabase();
    const snapshot = await db.ref(`/telemetry/${id}`).once('value');
    return snapshot.exists() ? (snapshot.val() as VehicleTelemetry) : null;
  }

  subscribeToVehicles(callback: (vehicles: Vehicle[]) => void): () => void {
    const db = getRealtimeDatabase();
    const ref = db.ref('/vehicles');

    const listener = ref.on('value', (snapshot) => {
      const vehicles: Vehicle[] = [];
      snapshot.forEach((child) => {
        const val = child.val();
        if (isValidVehicle(val)) vehicles.push(val);
        return undefined;
      });
      callback(vehicles);
    }, (error) => {
        logger.error('Error fetching vehicles', error);
    });

    return () => ref.off('value', listener);
  }

  unsubscribe(subscriptionId: string): void {
  }

  async getVehicle(id: string): Promise<Vehicle | null> {
    return this.getById(id);
  }

  async getVehicles(): Promise<Vehicle[]> {
    return this.getAll();
  }

  // --- Implement RealtimeRepository ---
  subscribe(callback: (items: Vehicle[]) => void): () => void {
    return this.subscribeToVehicles(callback);
  }

  subscribeToId(id: string, callback: (item: Vehicle | null) => void): () => void {
    const db = getRealtimeDatabase();
    const ref = db.ref(`/vehicles/${id}`);

    const listener = ref.on('value', (snapshot) => {
      const val = snapshot.val();
      callback(isValidVehicle(val) ? val : null);
    });

    return () => ref.off('value', listener);
  }

  // --- Implement Repository ---
  async getById(id: string): Promise<Vehicle | null> {
    const db = getRealtimeDatabase();
    const snapshot = await db.ref(`/vehicles/${id}`).once('value');
    const val = snapshot.val();
    return isValidVehicle(val) ? val : null;
  }

  async getAll(): Promise<Vehicle[]> {
    const db = getRealtimeDatabase();
    const snapshot = await db.ref('/vehicles').once('value');
    const vehicles: Vehicle[] = [];
    snapshot.forEach((child) => {
      const val = child.val();
      if (isValidVehicle(val)) vehicles.push(val);
      return undefined;
    });
    return vehicles;
  }

  async create(item: Vehicle): Promise<Vehicle> {
    const db = getRealtimeDatabase();
    await db.ref(`/vehicles/${item.id}`).set(item);
    return item;
  }

  async update(id: string, item: Partial<Vehicle>): Promise<Vehicle> {
    const db = getRealtimeDatabase();
    await db.ref(`/vehicles/${id}`).update(item);
    const updated = await this.getById(id);
    if (!updated) throw new Error('Failed to update vehicle');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const db = getRealtimeDatabase();
    await db.ref(`/vehicles/${id}`).remove();
  }
}
