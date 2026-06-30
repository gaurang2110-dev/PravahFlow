import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from '../components/Text';

// This is an abstraction layer. In the future, this can be connected to
// react-native-vector-icons, lucide-react-native, or custom SVG icons.
// For now, we render a placeholder to ensure the architecture is sound
// without coupling to a specific library.

export type IconName =
  | 'home'
  | 'map'
  | 'user'
  | 'settings'
  | 'search'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-up'
  | 'chevron-down'
  | 'close'
  | 'check'
  | 'warning'
  | 'info'
  | 'car'
  | 'truck'
  | 'bell'
  | 'menu';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  const { theme } = useTheme();
  const iconColor = color || theme.colors.textPrimary;

  // Placeholder implementation - Replace with actual icon rendering logic later
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size },
        style
      ]}
      accessibilityRole="image"
      accessibilityLabel={`Icon: ${name}`}
    >
      <Text
        style={{
          fontSize: size * 0.5,
          color: iconColor,
          textAlign: 'center'
        }}
      >
        {name.substring(0, 1).toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
