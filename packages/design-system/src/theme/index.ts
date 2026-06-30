import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { spacing, radius } from './spacing';
import { lightShadows, darkShadows } from './shadows';

export const lightTheme = {
  colors: lightColors,
  typography,
  spacing,
  radius,
  shadows: lightShadows,
  isDark: false,
};

export const darkTheme = {
  colors: darkColors,
  typography,
  spacing,
  radius,
  shadows: darkShadows,
  isDark: true,
};

export type Theme = typeof lightTheme;

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
export * from './ThemeProvider';
