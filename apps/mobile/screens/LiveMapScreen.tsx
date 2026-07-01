import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Map } from '../components/Map';
import { VehicleLayer } from '../components/vehicles/VehicleLayer';
import { FirebaseVehicleRepository } from '../services/FirebaseVehicleRepository';
import {
  setLoading,
  setError,
  setConnectionStatus,
  setVehicles,
  setLocations,
  upsertVehicle,
  removeVehicle,
  upsertLocation,
  removeLocation,
} from '../store/slices/vehicles/vehicleSlice';
import { selectVehiclesLoading, selectConnectionStatus } from '../store/slices/vehicles/selectors';

const repository = new FirebaseVehicleRepository();

export const LiveMapScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectVehiclesLoading);
  const connectionStatus = useSelector(selectConnectionStatus);

  useEffect(() => {
    dispatch(setLoading(true));

    try {
      const unsubscribeStatus = repository.subscribeToConnectionStatus((status) => {
        dispatch(setConnectionStatus(status));
      });

      const unsubscribeVehicles = repository.subscribeToVehicleUpdates(
        (initialVehicles) => {
          dispatch(setVehicles(initialVehicles));
          dispatch(setLoading(false));
        },
        (vehicle) => dispatch(upsertVehicle(vehicle)),
        (vehicle) => dispatch(upsertVehicle(vehicle)),
        (vehicleId) => dispatch(removeVehicle(vehicleId)),
        (error) => dispatch(setError(error.message))
      );

      const unsubscribeLocations = repository.subscribeToLocationUpdates(
        (initialLocations) => dispatch(setLocations(initialLocations)),
        (location) => dispatch(upsertLocation(location)),
        (location) => dispatch(upsertLocation(location)),
        (locationId) => dispatch(removeLocation(locationId)),
        (error) => dispatch(setError(error.message))
      );

      return () => {
        unsubscribeStatus();
        unsubscribeVehicles();
        unsubscribeLocations();
      };
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to initialize realtime tracking'));
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      {connectionStatus !== 'Connected' && (
        <View style={styles.statusBanner}>
          <Text style={styles.statusText}>
            {connectionStatus === 'Connecting' ? 'Connecting to realtime servers...' : 'Offline. Trying to reconnect...'}
          </Text>
        </View>
      )}
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
  statusBanner: {
    backgroundColor: '#ff9800',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: '#ffffff',
    fontWeight: 'bold',
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
