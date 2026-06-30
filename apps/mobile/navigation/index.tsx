import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LiveMapScreen } from '../screens/LiveMapScreen';
import { VehicleDetailsScreen } from '../screens/VehicleDetailsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

// Types for navigation
export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  LiveMap: undefined;
  VehicleDetails: undefined;
  Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="LiveMap" component={LiveMapScreen} />
      <MainStack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
      <MainStack.Screen name="Settings" component={SettingsScreen} />
    </MainStack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="Main" component={MainStackNavigator} />
    </RootStack.Navigator>
  );
};
