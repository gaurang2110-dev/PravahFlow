import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle } from '../../../../../shared/domain/models/Vehicle';
import { VehicleLocation } from '../../../../../shared/domain/models/Location';

export interface VehicleState {
  vehicles: Record<string, Vehicle>;
  locations: Record<string, VehicleLocation>;
  isLoading: boolean;
  error: string | null;
  connectionStatus: 'Connecting' | 'Connected' | 'Disconnected' | 'Reconnecting';
}

const initialState: VehicleState = {
  vehicles: {},
  locations: {},
  isLoading: false,
  error: null,
  connectionStatus: 'Disconnected',
};

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setConnectionStatus(state, action: PayloadAction<'Connecting' | 'Connected' | 'Disconnected' | 'Reconnecting'>) {
      state.connectionStatus = action.payload;
    },
    setVehicles(state, action: PayloadAction<Vehicle[]>) {
      state.vehicles = action.payload.reduce((acc, vehicle) => {
        acc[vehicle.id] = vehicle;
        return acc;
      }, {} as Record<string, Vehicle>);
    },
    setLocations(state, action: PayloadAction<VehicleLocation[]>) {
      state.locations = action.payload.reduce((acc, location) => {
        acc[location.vehicleId] = location;
        return acc;
      }, {} as Record<string, VehicleLocation>);
    },
    // Fine-grained updates
    upsertVehicle(state, action: PayloadAction<Vehicle>) {
      state.vehicles[action.payload.id] = action.payload;
    },
    removeVehicle(state, action: PayloadAction<string>) {
      delete state.vehicles[action.payload];
    },
    upsertLocation(state, action: PayloadAction<VehicleLocation>) {
      state.locations[action.payload.vehicleId] = action.payload;
    },
    removeLocation(state, action: PayloadAction<string>) {
      delete state.locations[action.payload];
    },
    updateLocation(state, action: PayloadAction<VehicleLocation>) {
      state.locations[action.payload.vehicleId] = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setConnectionStatus,
  setVehicles,
  setLocations,
  upsertVehicle,
  removeVehicle,
  upsertLocation,
  removeLocation,
  updateLocation
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
