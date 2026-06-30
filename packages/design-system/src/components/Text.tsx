import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type TypographyVariant =
  | 'display'
  | 'heading'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'label'
  | 'button';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'disabled'
  | 'inverse'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info';

export interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: TextColor;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight = 'regular',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getTextColor = () => {
    switch (color) {
      case 'primary': return theme.colors.textPrimary;
      case 'secondary': return theme.colors.textSecondary;
      case 'disabled': return theme.colors.textDisabled;
      case 'inverse': return theme.colors.textInverse;
      case 'danger': return theme.colors.danger;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'info': return theme.colors.info;
      default: return theme.colors.textPrimary;
    }
  };

  const getFontWeight = () => {
    switch (variant) {
      case 'display':
      case 'heading':
      case 'title':
        return theme.typography.weights.bold;
      case 'subtitle':
      case 'button':
        return theme.typography.weights.semibold;
      case 'label':
        return theme.typography.weights.medium;
      default:
        return theme.typography.weights[weight];
    }
  };

  const baseStyle: TextStyle = {
    fontSize: theme.typography.sizes[variant],
    fontWeight: getFontWeight(),
    color: getTextColor(),
    textAlign: align,
  };

  return (
    <RNText style={[baseStyle, style]} {...props}>
      {children}
    </RNText>
  );
};
