import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  content?: string | number;
  variant?: BadgeVariant;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  content,
  variant = 'primary',
  size = 'md',
  dot = false,
  style,
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'danger': return theme.colors.danger;
      case 'info': return theme.colors.info;
      default: return theme.colors.primary;
    }
  };

  const getSize = () => {
    if (dot) {
      switch (size) {
        case 'sm': return { width: 6, height: 6 };
        case 'md': return { width: 8, height: 8 };
        case 'lg': return { width: 10, height: 10 };
      }
    }

    switch (size) {
      case 'sm': return { minWidth: 16, height: 16, paddingHorizontal: 4 };
      case 'md': return { minWidth: 20, height: 20, paddingHorizontal: 6 };
      case 'lg': return { minWidth: 24, height: 24, paddingHorizontal: 8 };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm': return 10;
      case 'md': return 12;
      case 'lg': return 14;
    }
  };

  const containerStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderRadius: theme.radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    ...getSize(),
  };

  return (
    <View style={[containerStyle, style]}>
      {!dot && content !== undefined && (
        <Text
          style={{
            color: theme.colors.textInverse,
            fontSize: getFontSize(),
            fontWeight: theme.typography.weights.bold,
          }}
        >
          {content}
        </Text>
      )}
    </View>
  );
};
