import React from 'react';
import { TouchableOpacity, ViewStyle, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { Icon, IconName } from '../icons/Icon';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  onClose?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  icon,
  onClose,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border;
    return selected ? theme.colors.primary : theme.colors.surface;
  };

  const getBorderColor = () => {
    if (disabled) return theme.colors.border;
    return selected ? theme.colors.primary : theme.colors.border;
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textDisabled;
    return selected ? theme.colors.textInverse : theme.colors.textPrimary;
  };

  const containerStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderColor: getBorderColor(),
    borderWidth: 1,
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[12],
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    opacity: disabled ? 0.7 : 1,
  };

  const Content = () => (
    <View style={styles.content}>
      {icon && (
        <Icon
          name={icon}
          size={16}
          color={getTextColor()}
          style={styles.icon}
        />
      )}
      <Text
        variant="caption"
        style={{ color: getTextColor(), fontWeight: theme.typography.weights.medium }}
      >
        {label}
      </Text>
      {onClose && (
        <TouchableOpacity
          onPress={onClose}
          disabled={disabled}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon
            name="close"
            size={16}
            color={getTextColor()}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[containerStyle, style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Content />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[containerStyle, style]}>
      <Content />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  closeIcon: {
    marginLeft: 4,
  },
});
