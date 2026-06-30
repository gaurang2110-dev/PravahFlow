import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { VehicleMarker } from './VehicleMarker';
import {
  selectAllVehicles,
  selectVehicleLocations,
  selectVehiclesError,
} from '../../store/slices/vehicles/selectors';

export const VehicleLayer: React.FC = () => {
  const vehicles = useSelector(selectAllVehicles);
  const locations = useSelector(selectVehicleLocations);
  const error = useSelector(selectVehiclesError);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading vehicles: {error}</Text>
      </View>
    );
  }

  return (
    <>
      {vehicles.map((vehicle) => {
        const location = locations[vehicle.id];
        if (!location || !location.coordinate) {
          return null;
        }

        return (
          <VehicleMarker
            key={vehicle.id}
            vehicle={vehicle}
            location={location}
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 8,
    zIndex: 1000,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
