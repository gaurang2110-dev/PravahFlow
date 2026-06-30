import React from 'react';
import { View, ViewProps, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface CardProps extends ViewProps {
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  elevation = 'sm',
  padding = 'md',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getPadding = () => {
    switch (padding) {
      case 'none': return 0;
      case 'sm': return theme.spacing[8];
      case 'md': return theme.spacing[16];
      case 'lg': return theme.spacing[24];
      default: return theme.spacing[16];
    }
  };

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: getPadding(),
    ...theme.shadows[elevation],
  };

  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
};
