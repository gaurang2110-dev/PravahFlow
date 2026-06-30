import React from 'react';
import { View, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionTitle?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionTitle,
  onActionPress,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: theme.spacing[16] }, style]}>
      <View style={styles.textContainer}>
        <Text variant="title">{title}</Text>
        {subtitle && (
          <Text variant="body" color="secondary" style={{ marginTop: theme.spacing[4] }}>
            {subtitle}
          </Text>
        )}
      </View>

      {actionTitle && onActionPress && (
        <TouchableOpacity
          onPress={onActionPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text variant="button" color="primary">
            {actionTitle}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
});
