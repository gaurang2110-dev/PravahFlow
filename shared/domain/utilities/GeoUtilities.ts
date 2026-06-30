import { Coordinate } from '../models/Location';
import { GEO_CONSTANTS } from '../constants/GeoConstants';

/**
 * Converts degrees to radians
 */
export const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Converts radians to degrees
 */
export const toDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

/**
 * Calculates the Haversine distance between two coordinates in meters
 */
export const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.latitude)) * Math.cos(toRadians(coord2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return GEO_CONSTANTS.EARTH_RADIUS_METERS * c;
};

/**
 * Calculates the initial bearing from coord1 to coord2 in degrees (0-359)
 */
export const calculateBearing = (coord1: Coordinate, coord2: Coordinate): number => {
  const lat1 = toRadians(coord1.latitude);
  const lat2 = toRadians(coord2.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);

  return normalizeHeading(brng);
};

/**
 * Normalizes a heading to be between 0 and 359.99... degrees
 */
export const normalizeHeading = (heading: number): number => {
  return (heading % 360 + 360) % 360;
};

/**
 * Checks if two coordinates are exactly the same
 */
export const areCoordinatesEqual = (coord1: Coordinate, coord2: Coordinate): boolean => {
  return coord1.latitude === coord2.latitude && coord1.longitude === coord2.longitude;
};

/**
 * Normalizes a coordinate to a specific precision
 */
export const normalizeCoordinate = (coord: Coordinate, precision: number = GEO_CONSTANTS.COORDINATE_PRECISION): Coordinate => {
  const factor = Math.pow(10, precision);
  return {
    latitude: Math.round(coord.latitude * factor) / factor,
    longitude: Math.round(coord.longitude * factor) / factor,
    ...(coord.altitude !== undefined ? { altitude: Math.round(coord.altitude * factor) / factor } : {})
  };
};

/**
 * Helper to linearly interpolate between two coordinates
 * Implementation can be extended for spherical interpolation (Slerp) if needed
 */
export const interpolateCoordinate = (coord1: Coordinate, coord2: Coordinate, fraction: number): Coordinate => {
  return {
    latitude: coord1.latitude + (coord2.latitude - coord1.latitude) * fraction,
    longitude: coord1.longitude + (coord2.longitude - coord1.longitude) * fraction
  };
};
