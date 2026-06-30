import React from 'react';
import { ActivityIndicator, View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface LoadingSpinnerProps {
  size?: 'small' | 'large' | number;
  color?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color,
  fullScreen = false,
  style,
}) => {
  const { theme } = useTheme();

  const indicatorSize = typeof size === 'number' ? size : size;

  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, { backgroundColor: theme.colors.background }, style]}>
        <ActivityIndicator
          size={indicatorSize}
          color={color || theme.colors.primary}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        size={indicatorSize}
        color={color || theme.colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
