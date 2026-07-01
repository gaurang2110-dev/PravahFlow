import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Map } from '../components/Map';
import { VehicleLayer } from '../components/vehicles/VehicleLayer';
import { MockVehicleRepository } from '../services/MockVehicleRepository';
import {
  setVehicles,
  setLocations,
  setLoading,
  setError,
} from '../store/slices/vehicles/vehicleSlice';
import { selectVehiclesLoading } from '../store/slices/vehicles/selectors';

const repository = new MockVehicleRepository();

export const LiveMapScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectVehiclesLoading);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        dispatch(setLoading(true));
        const vehicles = await repository.getAll();
        dispatch(setVehicles(vehicles));

        // Fetch initial locations for all vehicles
        const locations = [];
        for (const vehicle of vehicles) {
          const location = await repository.getLocation(vehicle.id);
          if (location) {
            locations.push(location);
          }
        }
        dispatch(setLocations(locations));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch vehicles'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchVehicles();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Map>
        <VehicleLayer />
      </Map>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
