import React from 'react';
import { View, Image, ViewStyle, StyleSheet, ImageSourcePropType } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { Icon } from '../icons/Icon';

export interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  style,
}) => {
  const { theme } = useTheme();

  const getNumericSize = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm': return 32;
      case 'md': return 48;
      case 'lg': return 64;
      case 'xl': return 96;
      default: return 48;
    }
  };

  const numericSize = getNumericSize();
  const borderRadius = numericSize / 2;

  const containerStyle: ViewStyle = {
    width: numericSize,
    height: numericSize,
    borderRadius,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const getInitials = (nameStr: string) => {
    const parts = nameStr.split(' ').filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (source) {
    return (
      <View style={[containerStyle, style]}>
        <Image
          source={source}
          style={{ width: '100%', height: '100%', borderRadius }}
          resizeMode="cover"
        />
      </View>
    );
  }

  if (name) {
    return (
      <View style={[containerStyle, { backgroundColor: theme.colors.primary }, style]}>
        <Text
          style={{
            color: theme.colors.textInverse,
            fontSize: numericSize * 0.4,
            fontWeight: theme.typography.weights.bold,
          }}
        >
          {getInitials(name)}
        </Text>
      </View>
    );
  }

  return (
    <View style={[containerStyle, { backgroundColor: theme.colors.background }, style]}>
      <Icon name="user" size={numericSize * 0.5} color={theme.colors.textSecondary} />
    </View>
  );
};
