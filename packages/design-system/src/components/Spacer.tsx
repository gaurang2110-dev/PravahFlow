import React from 'react';
import { View, ViewStyle } from 'react-native';

export interface SpacerProps {
  size: number;
  horizontal?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({ size, horizontal = false }) => {
  const style: ViewStyle = horizontal
    ? { width: size, height: '100%' }
    : { height: size, width: '100%' };

  return <View style={style} />;
};
