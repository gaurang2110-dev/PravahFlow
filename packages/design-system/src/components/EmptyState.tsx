import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { Icon, IconName } from '../icons/Icon';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  actionTitle?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionTitle,
  onActionPress,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { padding: theme.spacing[32] }, style]}>
      {icon && (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: theme.colors.surface,
              marginBottom: theme.spacing[24]
            }
          ]}
        >
          <Icon name={icon} size={48} color={theme.colors.textSecondary} />
        </View>
      )}

      <Text variant="title" align="center" style={{ marginBottom: theme.spacing[8] }}>
        {title}
      </Text>

      {description && (
        <Text
          variant="body"
          color="secondary"
          align="center"
          style={{ marginBottom: theme.spacing[24] }}
        >
          {description}
        </Text>
      )}

      {actionTitle && onActionPress && (
        <Button
          title={actionTitle}
          onPress={onActionPress}
          variant="primary"
          style={{ minWidth: 200 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
