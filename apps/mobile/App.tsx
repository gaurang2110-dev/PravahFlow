/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { AppProvider } from './providers/AppProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RootNavigator } from './navigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ErrorBoundary>
      <AppProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
          translucent
        />
        <RootNavigator />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
