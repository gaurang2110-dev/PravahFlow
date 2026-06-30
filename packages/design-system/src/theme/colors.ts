export const lightColors = {
  primary: '#0F52BA', // Sapphire Blue
  secondary: '#5C5C5C',
  success: '#2E7D32',
  warning: '#ED6C02',
  danger: '#D32F2F',
  info: '#0288D1',

  background: '#F5F5F7',
  surface: '#FFFFFF',
  card: '#FFFFFF',

  border: '#E0E0E0',
  divider: '#EEEEEE',

  textPrimary: '#1D1D1F',
  textSecondary: '#86868B',
  textDisabled: '#BDBDBD',
  textInverse: '#FFFFFF',

  overlay: 'rgba(0, 0, 0, 0.5)',

  mapAccent: '#4285F4',
  vehicleMoving: '#34A853',
  vehicleIdle: '#FBBC05',
  vehicleOffline: '#9AA0A6',
};

export const darkColors = {
  primary: '#478DF4',
  secondary: '#A3A3A3',
  success: '#81C784',
  warning: '#FFB74D',
  danger: '#E57373',
  info: '#4FC3F7',

  background: '#000000',
  surface: '#1C1C1E',
  card: '#1C1C1E',

  border: '#38383A',
  divider: '#2C2C2E',

  textPrimary: '#F5F5F7',
  textSecondary: '#86868B',
  textDisabled: '#636366',
  textInverse: '#1D1D1F',

  overlay: 'rgba(0, 0, 0, 0.7)',

  mapAccent: '#8AB4F8',
  vehicleMoving: '#81C995',
  vehicleIdle: '#FDD663',
  vehicleOffline: '#5F6368',
};

export type ThemeColors = typeof lightColors;
