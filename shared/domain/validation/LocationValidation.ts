import { Coordinate } from '../models/Location';

export const isValidLatitude = (lat: number): boolean => {
  return typeof lat === 'number' && lat >= -90 && lat <= 90;
};

export const isValidLongitude = (lng: number): boolean => {
  return typeof lng === 'number' && lng >= -180 && lng <= 180;
};

export const isValidCoordinate = (coord: Coordinate): boolean => {
  if (!coord) return false;
  return isValidLatitude(coord.latitude) && isValidLongitude(coord.longitude);
};

export const isValidSpeed = (speed: number): boolean => {
  return typeof speed === 'number' && speed >= 0;
};

export const isValidHeading = (heading: number): boolean => {
  return typeof heading === 'number' && heading >= 0 && heading < 360;
};
