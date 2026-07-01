import React from 'react';
import { Marker } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { Vehicle } from '../../../../shared/domain/models/Vehicle';
import { VehicleLocation } from '../../../../shared/domain/models/Location';
import { VehicleStatus } from '../../../../shared/domain/enums';

export interface VehicleMarkerProps {
  vehicle: Vehicle;
  location: VehicleLocation;
}

const VehicleMarkerComponent: React.FC<VehicleMarkerProps> = ({ vehicle, location }) => {
  // Determine color based on status for future styling
  const markerColor = vehicle.status === VehicleStatus.ACTIVE ? 'green' : 'gray';

  return (
    <Marker
      coordinate={{
        latitude: location.coordinate.latitude,
        longitude: location.coordinate.longitude,
      }}
      title={vehicle.licensePlate}
      description={`Status: ${vehicle.status}`}
      rotation={location.heading}
      anchor={{ x: 0.5, y: 0.5 }}
      // For thousands of markers, tracksViewChanges={false} is good for performance
      tracksViewChanges={false}
    >
      <View style={[styles.markerContainer, { borderColor: markerColor }]}>
        <Text style={styles.markerText}>{vehicle.licensePlate.substring(0, 3)}</Text>
      </View>
    </Marker>
  );
};

export const VehicleMarker = React.memo(VehicleMarkerComponent);

const styles = StyleSheet.create({
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
  },
});
