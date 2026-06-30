import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  View
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { Icon, IconName } from '../icons/Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  title,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border;
    switch (variant) {
      case 'primary': return theme.colors.primary;
      case 'secondary': return theme.colors.secondary;
      case 'danger': return theme.colors.danger;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default: return theme.colors.primary;
    }
  };

  const getBorderColor = () => {
    if (disabled && variant === 'outline') return theme.colors.textDisabled;
    if (variant === 'outline') return theme.colors.border;
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return 'disabled';
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return 'inverse';
      case 'outline':
      case 'ghost':
        return 'primary';
      default: return 'inverse';
    }
  };

  const getIconColor = () => {
    if (disabled) return theme.colors.textDisabled;
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        return theme.colors.textInverse;
      case 'outline':
      case 'ghost':
        return theme.colors.textPrimary;
      default: return theme.colors.textInverse;
    }
  };

  const containerStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    borderWidth: variant === 'outline' ? 1 : 0,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing[12],
    paddingHorizontal: theme.spacing[24],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48, // Minimum touch target
    opacity: loading ? 0.7 : 1,
  };

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ disabled, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getIconColor()} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && (
            <Icon name={icon} color={getIconColor()} size={20} style={styles.leftIcon} />
          )}
          <Text variant="button" color={getTextColor()}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Icon name={icon} color={getIconColor()} size={20} style={styles.rightIcon} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
