/**
 * Converts meters per second to kilometers per hour
 */
export const mpsToKmh = (mps: number): number => {
  return mps * 3.6;
};

/**
 * Converts kilometers per hour to meters per second
 */
export const kmhToMps = (kmh: number): number => {
  return kmh / 3.6;
};

/**
 * Converts meters per second to miles per hour
 */
export const mpsToMph = (mps: number): number => {
  return mps * 2.23694;
};

/**
 * Converts miles per hour to meters per second
 */
export const mphToMps = (mph: number): number => {
  return mph / 2.23694;
};

/**
 * Converts meters to kilometers
 */
export const metersToKm = (meters: number): number => {
  return meters / 1000;
};

/**
 * Converts kilometers to meters
 */
export const kmToMeters = (km: number): number => {
  return km * 1000;
};

/**
 * Converts meters to miles
 */
export const metersToMiles = (meters: number): number => {
  return meters * 0.000621371;
};

/**
 * Converts miles to meters
 */
export const milesToMeters = (miles: number): number => {
  return miles / 0.000621371;
};

/**
 * Converts Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

/**
 * Converts Fahrenheit to Celsius
 */
export const fahrenheitToCelsius = (fahrenheit: number): number => {
  return (fahrenheit - 32) * 5/9;
};
