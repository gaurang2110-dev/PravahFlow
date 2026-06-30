import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle } from '../../../../../shared/domain/models/Vehicle';
import { VehicleLocation } from '../../../../../shared/domain/models/Location';

export interface VehicleState {
  vehicles: Record<string, Vehicle>;
  locations: Record<string, VehicleLocation>;
  isLoading: boolean;
  error: string | null;
}

const initialState: VehicleState = {
  vehicles: {},
  locations: {},
  isLoading: false,
  error: null,
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
    updateLocation(state, action: PayloadAction<VehicleLocation>) {
      state.locations[action.payload.vehicleId] = action.payload;
    },
  },
});

export const { setLoading, setError, setVehicles, setLocations, updateLocation } = vehicleSlice.actions;

export default vehicleSlice.reducer;
