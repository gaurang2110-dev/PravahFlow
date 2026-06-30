import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { store } from '../store';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            {children}
          </NavigationContainer>
        </SafeAreaProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
