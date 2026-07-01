import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../index';

const selectVehicleState = (state: RootState) => state.vehicles;

export const selectAllVehicles = createSelector(
  [selectVehicleState],
  (vehicleState) => Object.values(vehicleState.vehicles)
);

export const selectVehicleLocations = createSelector(
  [selectVehicleState],
  (vehicleState) => vehicleState.locations
);

export const selectVehiclesLoading = createSelector(
  [selectVehicleState],
  (vehicleState) => vehicleState.isLoading
);

export const selectVehiclesError = createSelector(
  [selectVehicleState],
  (vehicleState) => vehicleState.error
);

export const selectVehicleById = (id: string) =>
  createSelector([selectVehicleState], (vehicleState) => vehicleState.vehicles[id]);

export const selectVehicleLocationById = (id: string) =>
  createSelector([selectVehicleState], (vehicleState) => vehicleState.locations[id]);

export const selectConnectionStatus = createSelector(
  [selectVehicleState],
  (vehicleState) => vehicleState.connectionStatus
);
