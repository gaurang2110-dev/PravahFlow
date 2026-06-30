import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  margin?: number;
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  color,
  margin = 0,
  style,
}) => {
  const { theme } = useTheme();

  const dividerStyle: ViewStyle = {
    backgroundColor: color || theme.colors.divider,
    ...(orientation === 'horizontal'
      ? {
          height: thickness,
          width: '100%',
          marginVertical: margin,
        }
      : {
          width: thickness,
          height: '100%',
          marginHorizontal: margin,
        }),
  };

  return <View style={[dividerStyle, style]} />;
};
