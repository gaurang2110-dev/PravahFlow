import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

export interface MapProps {
  initialRegion?: Region;
  children?: React.ReactNode;
}

// Center of India roughly
const DEFAULT_REGION: Region = {
  latitude: 20.5937,
  longitude: 78.9629,
  latitudeDelta: 25.0, // Zoom out enough to show the country
  longitudeDelta: 25.0,
};

export const Map: React.FC<MapProps> = ({ initialRegion = DEFAULT_REGION, children }) => {
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null); // For future use if api key fails or similar

  useEffect(() => {
    // In a real scenario, you'd check permissions and API keys here
    // For now, simulate async map initialization setup
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading Map...</Text>
      </View>
    );
  }

  if (error) {
     return (
       <View style={[styles.container, styles.centered]}>
         <Text style={styles.errorText}>Failed to load map: {error}</Text>
       </View>
     );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={false}
        showsScale={false}
      >
        {children}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    padding: 20,
  }
});
