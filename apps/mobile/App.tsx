

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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LiveMapScreen } from './screens/LiveMapScreen';
import { firebaseManager } from './core/firebase';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    firebaseManager.initialize();
  }, []);

  return (
    <SafeAreaProvider>

      <ErrorBoundary>
        <AppProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor="transparent"
            translucent
          />
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <LiveMapScreen />
          <RootNavigator />
        </AppProvider>
      </ErrorBoundary>

    </SafeAreaProvider>
  );
}

export default App;
