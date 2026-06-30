import { Platform } from 'react-native';
import { lightColors, darkColors } from './colors';

const createShadows = (color: string) => ({
  none: {
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  sm: Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    android: {
      elevation: 1,
    },
    default: {
      boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.18)',
    },
  }),
  md: Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    android: {
      elevation: 3,
    },
    default: {
      boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.25)',
    },
  }),
  lg: Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
    },
    android: {
      elevation: 10,
    },
    default: {
      boxShadow: '0px 5px 6px 0px rgba(0,0,0,0.34)',
    },
  }),
});

export const lightShadows = createShadows('#000000');
export const darkShadows = createShadows('#000000');
